#!/usr/bin/env python3
# Genera indices de estudio para MIA: datos/estudio/<id>.json
# Uso: python build_estudio.py <archivo.txt|.md> <id> "<Titulo>" [salida_dir]
# El archivo puede traer paginas separadas por lineas '--- página ---'.
# (Para PDF: pdftotext -layout archivo.pdf archivo.txt  y insertar form feed -> se separa por \f tambien)
import sys, re, json, unicodedata, os

STOP = set("""de la el los las un una unos unas y o u e en a al del lo que se su sus por con para como es son
fue ser ha han hay mas mas pero sin sobre entre este esta estos estas ese esa eso asi si no ni le les me te nos
muy tambien cuando donde cual cuales segun cada todo toda todos todas otro otra otros otras""".split())

def norm(s):
    d = unicodedata.normalize("NFD", s.lower())
    d = "".join(c for c in d if unicodedata.category(c) != "Mn")
    d = re.sub(r"[^a-z0-9 ]", " ", d)
    return re.sub(r"\s+", " ", d).strip()

def stems(s):
    out = []
    for w in norm(s).split(" "):
        if len(w) < 2 or w in STOP: continue
        if len(w) > 3 and w.endswith("s"): w = w[:-1]
        out.append(w)
    return out

def chunk_page(txt, maxc=1200):
    lines = [re.sub(r"[ \t]+", " ", l).strip() for l in txt.splitlines()]
    lines = [l for l in lines if l and not re.fullmatch(r"[_\-=\s]+", l)]
    # encabezados repetidos de cada pagina
    HDR = re.compile(r"^(E\.?E\.?S\.?T\.? ?N.? ?3|Departamento de Qu[ií]mica\.?|M[oó]dulos de Formaci[oó]n T[eé]cnico espec[ií]fica|Laboratorio de t[eé]cnicas anal[ií]ticas II\.?|T[eé]cnico Qu[ií]mico\.?|Qu[ií]mica Anal[ií]tica\.?)( .{0,40})?$", re.I)
    lines = [l for l in lines if not HDR.match(l)]
    lines = [re.sub(r"^(E\.E\.S\.T\. ?N. ?3 +Departamento de Qu[ií]mica\.? *)|(E\.E\.S\.T\. ?N. ?3 +Departamento de Qu[ií]mica\. +T[eé]cnico Qu[ií]mico\. +Qu[ií]mica Anal[ií]tica\. *)", "", l) for l in lines]
    chunks, cur = [], ""
    for l in lines:
        if len(cur) + len(l) + 1 > maxc and cur:
            chunks.append(cur); cur = ""
        cur = (cur + " " + l).strip()
    if cur: chunks.append(cur)
    return chunks

def main():
    if len(sys.argv) < 4:
        print(__doc__); sys.exit(1)
    src, did, title = sys.argv[1], sys.argv[2], sys.argv[3]
    outdir = sys.argv[4] if len(sys.argv) > 4 else "."
    raw = open(src, encoding="utf-8", errors="replace").read()
    pages = re.split(r"\n?--- página ---\n?|\f", raw)
    items = []
    for i, pg in enumerate(pages, 1):
        for c in chunk_page(pg):
            if len(c) < 40: continue
            k = " ".join(sorted(set(stems(c))))
            items.append({"p": i, "t": c, "k": k})
    os.makedirs(outdir, exist_ok=True)
    path = os.path.join(outdir, did + ".json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump({"id": did, "titulo": title, "chunks": items}, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{path}: {len(pages)} páginas, {len(items)} fragmentos, {os.path.getsize(path)//1024} KB")

if __name__ == "__main__":
    main()
