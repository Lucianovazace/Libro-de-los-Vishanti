#!/usr/bin/env python3
"""Arma datos/gustos.json (PRIVADO, no se sube al repo) a partir del ZIP de exportacion de Letterboxd.

Uso: python build_gustos.py letterboxd-USUARIO-....zip [salida/gustos.json]
Solo lee: watched, ratings, diary, likes/films, watchlist y la columna Favorite Films del perfil.
No guarda email, nombre ni ubicacion.
"""
import csv, io, json, sys, zipfile, datetime

def leer(z, nombre):
    try:
        with z.open(nombre) as f:
            txt = io.TextIOWrapper(f, encoding="utf-8-sig", newline="")
            return list(csv.DictReader(txt))
    except KeyError:
        return []

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    z = zipfile.ZipFile(sys.argv[1])
    salida = sys.argv[2] if len(sys.argv) > 2 else "gustos.json"
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
    out = {
        "fuente": "Letterboxd (exportacion oficial)",
        "usuario": usuario,
        "exportado": datetime.date.today().isoformat(),
        "vistas": vistas,
        "pendientes": [{"t": w["Name"].replace("\xa0", " "), "a": int(w["Year"]) if w["Year"].isdigit() else None} for w in wl],
        "alias": {
            "volver al futuro": "back to the future", "guerra de las galaxias": "star wars", "el padrino": "the godfather",
            "los vengadores": "the avengers", "el senor de los anillos": "the lord of the rings", "buscando a nemo": "finding nemo",
            "el caballero de la noche": "the dark knight", "el caballero oscuro": "the dark knight", "parque jurasico": "jurassic park",
            "mi villano favorito": "despicable me", "intensamente": "inside out", "el rey leon": "the lion king",
            "la bella y la bestia": "beauty and the beast", "la sirenita": "the little mermaid", "la princesa y el sapo": "the princess and the frog",
            "ciudad de dios": "city of god", "pulp fiction": "pulp fiction", "origen": "inception", "interestelar": "interstellar",
            "el lobo de wall street": "the wolf of wall street", "gladiador": "gladiator", "titanic": "titanic", "up": "up",
            "volver al futuro 2": "back to the future part ii", "volver al futuro 3": "back to the future part iii",
            "dos tontos muy tontos": "dumb and dumber", "sueno de fuga": "the shawshank redemption",
            "el silencio de los inocentes": "the silence of the lambs", "hombre arana": "spider-man", "spiderman": "spider-man",
            "guardianes de la galaxia": "guardians of the galaxy", "pantera negra": "black panther",
            "viuda negra": "black widow", "capitan america": "captain america", "el hobbit": "the hobbit",
        },
    }
    with open(salida, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{salida}: {len(vistas)} vistas, {sum(1 for v in vistas if v['r'] is not None)} puntuadas, {len(out['pendientes'])} pendientes")

main()
