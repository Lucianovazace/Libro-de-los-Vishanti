#!/usr/bin/env python3
"""Arma datos/gustos.json (PRIVADO, no se sube al repo) a partir del ZIP de exportacion de Letterboxd.

Uso: python build_gustos.py letterboxd-USUARIO-....zip [salida/gustos.json] [--sitio mis-vistos-vishanti.json]
Solo lee: watched, ratings, diary, likes/films, watchlist y la columna Favorite Films del perfil.
No guarda email, nombre ni ubicacion.
"""
import csv, io, json, os, re, sys, unicodedata, zipfile, datetime

def leer(z, nombre):
    try:
        with z.open(nombre) as f:
            txt = io.TextIOWrapper(f, encoding="utf-8-sig", newline="")
            return list(csv.DictReader(txt))
    except KeyError:
        return []

def norm(t):
    t = unicodedata.normalize("NFD", t.lower())
    t = "".join(c for c in t if unicodedata.category(c) != "Mn")
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]", " ", t)).strip()


def cargar_alias(vistas):
    """alias-peliculas.txt (español = English) -> {norm(español): norm(English)}; avisa de los que no estan en el historial."""
    ruta = os.path.join(os.path.dirname(os.path.abspath(__file__)), "conocimiento", "alias-peliculas.txt")
    alias = {}
    if not os.path.exists(ruta):
        return alias
    titulos = set()
    for v in vistas:
        n = norm(v["t"])
        titulos.add(n)
        titulos.add(re.sub(r"^the ", "", n))
    sin = []
    for linea in open(ruta, encoding="utf-8"):
        linea = linea.strip()
        if not linea or linea.startswith("#") or "=" not in linea:
            continue
        es, en = [x.strip() for x in linea.split("=", 1)]
        ne, nn = norm(es), norm(en)
        if ne and nn:
            alias[ne] = nn
            if nn not in titulos and re.sub(r"^the ", "", nn) not in titulos:
                sin.append(en)
    print(f"alias: {len(alias)} cargados; {len(sin)} apuntan a peliculas que no estan en tu historial (no pasa nada, quedan por si las ves)")
    return alias


def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    args = sys.argv[1:]
    sitio_json = None
    if "--sitio" in args:
        i = args.index("--sitio")
        sitio_json = args[i + 1]
        del args[i:i + 2]
    z = zipfile.ZipFile(args[0])
    salida = args[1] if len(args) > 1 else "gustos.json"
    watched = leer(z, "watched.csv")
    ratings = {r["Letterboxd URI"]: r for r in leer(z, "ratings.csv")}
    diary = leer(z, "diary.csv")
    likes = {r["Letterboxd URI"] for r in leer(z, "likes/films.csv")}
    wl = leer(z, "watchlist.csv")
    prof = leer(z, "profile.csv")
    usuario = ""
    favs = set()
    if prof:
        usuario = prof[0].get("Username", "")
        for u in (prof[0].get("Favorite Films", "") or "").split(","):
            if u.strip():
                favs.add(u.strip())
    # ultima fecha de visto por pelicula (diario)
    ultima = {}
    for d in diary:
        f = d.get("Watched Date") or d.get("Date")
        k = d["Letterboxd URI"]
        if f and (k not in ultima or f > ultima[k]):
            ultima[k] = f
    vistas = []
    for w in watched:
        k = w["Letterboxd URI"]
        r = ratings.get(k)
        vistas.append({
            "t": w["Name"].replace("\xa0", " "),
            "a": int(w["Year"]) if w["Year"].isdigit() else None,
            "r": float(r["Rating"]) if r and r.get("Rating") else None,
            "f": ultima.get(k) or w["Date"],
            "l": k in likes,
            "fav": k in favs,
        })
    vistas.sort(key=lambda x: x["f"], reverse=True)
    alias = cargar_alias(vistas)
    out = {
        "fuente": "Letterboxd (exportacion oficial)",
        "usuario": usuario,
        "exportado": datetime.date.today().isoformat(),
        "vistas": vistas,
        "pendientes": [{"t": w["Name"].replace("\xa0", " "), "a": int(w["Year"]) if w["Year"].isdigit() else None} for w in wl],
        "alias": alias,
    }
    if sitio_json:
        # Lo marcado como visto en la pagina Libro de los Vishanti (descargado con el fragmento de consola)
        d = json.load(open(sitio_json, encoding="utf-8-sig"))
        ult = {}
        for dia, titulos in (d.get("historial") or {}).items():
            for t in titulos:
                if t not in ult or dia > ult[t]:
                    ult[t] = dia
        out["sitio"] = [{"t": v["titulo"], "tipo": v.get("tipo") or "", "a": v.get("anio"), "cat": v.get("categoria") or "", "f": ult.get(v["titulo"], "")} for v in d.get("vistos", [])]
        print(f"sitio: {len(out['sitio'])} titulos marcados como vistos en la pagina")
    with open(salida, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{salida}: {len(vistas)} vistas, {sum(1 for v in vistas if v['r'] is not None)} puntuadas, {len(out['pendientes'])} pendientes")

main()
