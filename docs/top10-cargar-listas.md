# Guía: cargar una lista nueva al juego "Top 10 de Cine"

Esta guía la lee cada tarea programada. Cada tarea carga UNA sola lista. Otras tareas corren cada 5 minutos con la misma guía, así que hay que trabajar con cuidado de no pisarlas.

## 0. Reglas de oro
- Los datos salen de fuentes actuales leídas durante la tarea (WebSearch/WebFetch o navegador), nunca de memoria. Citar la fuente y la fecha en el campo `fuente`.
- No inventar nombres ni cifras. Si no se puede armar un Top 10 limpio y verificable, NO se carga la lista: se anota el motivo en la sección "Descartado" del doc del proyecto (ver paso 8) y se termina. Un Top 10 limpio = los puestos 1 a 10 sin dudas; si hay empate, todo el grupo empatado tiene que caber dentro de los 10 (campo `g`); si el empate cruza el puesto 10/11, no sirve.
- Exactamente 10 ítems en `items` (ordenados del puesto 1 al 10) y 2 en `fuera` (los puestos 11 y 12, con `r` = su puesto real).
- IMDb suele estar bloqueado desde la sesión. Alternativas válidas: Rotten Tomatoes (guías "All X Movies Ranked by Tomatometer"), The Numbers, Box Office Mojo, Wikipedia, Metacritic. Si se usa un criterio distinto del pedido, decirlo en `sub` y en `fuente`.

## 1. Repo
- Adjuntar el repo GitHub `Lucianovazace/Libro-de-los-Vishanti` con permiso de escritura (add_repo, access push) y clonarlo UNA vez: `git clone --depth 1 https://github.com/Lucianovazace/libro-de-los-vishanti /home/claude/libro-de-los-vishanti` (timeout largo, ~10 min). Registrar la raíz con register_repo_root si la herramienta existe.
- Los archivos del sitio son `index.html`, `script.js` y `style.css` (en la raíz).

## 2. Dónde está el juego
- En `script.js`, buscar el comentario `// Top 10 de Cine:` (bloque `(function () { ... })()` al final del archivo). Dentro están: `T10_LISTAS` (array de listas), `T10_ES` (títulos en español), `T10_COMP` y `T10_ESTUDIO` (compañía/logo de cada película) y `T10_FUENTE_NUMBERS`.
- Antes de empezar, leer las listas existentes para copiar el estilo (por ejemplo `taq-2019`, `hanks-rt`, `actores-taq`).

## 3. Formato de una lista
```js
{
    id: 'robbie-rt', grupo: 'Valoraciones', titulo: 'Mejor valoradas de Margot Robbie',
    sub: 'Sus películas por Tomatometer de Rotten Tomatoes (solo papeles actorales). Las de igual porcentaje están empatadas.',
    tipo: 'peliculas', fmt: 'pct',            // tipo: 'peliculas' | 'actores' | 'directores'; fmt 'pct' = porcentaje, si falta = dólares
    fuente: 'Rotten Tomatoes, guía "...", consultada el <fecha>. ...',
    items: [ { n: 'Título original (como figura en el sitio)', y: 2019, v: 91, g: 'g1' /* solo si hay empate */, a: ['alias', 'título en español'] }, /* x10 */ ],
    fuera: [ { n: 'Título', r: 11, a: [] }, { n: 'Título', r: 12, a: [] } ]
}
```
- `v`: dólares (sin ajustar) o porcentaje, según `fmt`. `y`: año de estreno (opcional).
- Empates: los ítems empatados comparten el mismo `g` y quedan en puestos contiguos.
- Agregar la lista AL FINAL del array `T10_LISTAS` (justo antes del `];`). Elegir un `id` único.
- Si la lista no es de películas (por ejemplo actores o directores), usar el `tipo` correspondiente; entonces no llevan logo ni póster.
- Si el dato mostrado no es dinero ni porcentaje (por ejemplo un año), agregar un `fmt` nuevo en la función `fmtV` y documentarlo.

## 4. Películas: títulos en español, compañía y póster
- Para cada película de `items` y `fuera`: agregar en `T10_ES` (al final del objeto) la entrada `'Título original': ['Título en español/Latinoamérica', 'variante', ...]`, con los títulos en español con los que se la conoce en Argentina y España. Si ya existe la clave, no duplicarla.
- Para cada película de `items`: agregar en `T10_ESTUDIO` (al final del objeto) `'Título original': 'clave'` con la compañía productora/distribuidora principal. Claves con logo en `T10_COMP`: disney, wda, marvel, pixar, lucasfilm, fox, wb, universal, paramount, sony, dreamworks, illumination (sin logo, solo nombre: enlight, levision, cfg). Si falta una compañía, agregarla a `T10_COMP`: `{ n: 'Nombre', u: T10_W + '<carpeta>/<Archivo>/330px-<Archivo>.png' }` (el logo se busca en Wikimedia Commons con la API `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=<nombre>+logo&prop=imageinfo&iiprop=url&iiurlwidth=330&format=json`; usar SIEMPRE ancho 330 px, otros anchos fallan; si no se encuentra, dejar la entrada sin `u` y se mostrará el nombre en texto).
- El póster aparece solo si la película ya está cargada en el sitio; no hay que hacer nada para eso.

## 5. Verificación (obligatoria)
1. `node --check script.js`.
2. Probar el juego en un navegador sin cabeza (Playwright, Python): abrir `file:///.../index.html` con `firebase` simulado (añadir con `add_init_script` un Proxy que devuelva funciones), sobrescribir `window.cambiarSeccion` para mostrar la sección, hacer click en `#tarjeta-top10`, ir a la lista nueva (`window.T10_LISTAS`, botón `#t10-btn-otra` hasta que el título coincida), escribir en `#t10-input` los 10 nombres (original y un título en español) y comprobar que todos dan "¡Sí!" y que un puesto 11/12 da "quedó cerca". No debe haber errores de página.
3. Subir `?v=` de `script.js` y `style.css` en `index.html` (formato `AAAAMMDDx`; poner la fecha de hoy y una letra que siga a la actual).

## 6. Subir
- `git pull --rebase origin main` justo antes de commitear (otras tareas suben cada 5 minutos). Si hay conflicto en `script.js` o `index.html`, conservar los cambios de ambos lados (las listas y entradas de las otras tareas más las propias) y el `?v=` más alto + 1 letra.
- Commit con mensaje `Top 10 de Cine: lista <título>` y los renglones de atribución que correspondan. `git push origin HEAD` (si falla por carrera, repetir pull --rebase y push; hasta 3 veces).

## 7. No tocar otras cosas
No cambiar el diseño ni listas ajenas, salvo para resolver conflictos de fusión.

## 8. Documentar en el Project "Biblioteca De Comics"
- Si la herramienta Projects está disponible: leer `claude/top10-cine.md` con project_read justo antes de escribir (otras tareas también lo actualizan), agregar la lista nueva en "Listas cargadas" (numerada, con puestos, cifras y "Fuera") y reescribir el archivo completo con project_write conservando todo lo demás. Si la lista se descartó, anotar el motivo en "Descartado".
- Si Projects no está disponible, dejarlo anotado en el mensaje final.

## 9. Mensaje final
Dos o tres líneas: qué lista se cargó (o por qué no), fuente usada, y cualquier duda que tenga que revisar Luciano.
