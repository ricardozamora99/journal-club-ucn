¡Listo! ✅ Ya tienes el proyecto creado y corriendo. Ahora empezamos **con el siguiente paso profesional**: **ordenar la estructura** sin construir toda la web todavía.

## Paso 1 — Ver qué te creó Next (para orientarnos)

En otra terminal (o en la misma, si no está ocupada), corre:

```bash
cd ~/Documents/Web\ pages/zamor\ data\ and\ models/zamor-data-models
ls
ls src
ls src/app
```

**Qué hace y por qué:**

* `ls` te muestra qué carpetas existen.
* `src/app` es donde viven las páginas/rutas en Next (App Router).
* Esto nos confirma el “punto de partida” antes de mover cosas.

## Paso 2 — Crear tu “estructura pro” dentro de `src/`

Ahora creamos carpetas vacías (no es código, es organización):

```bash
mkdir -p src/components/{layout,sections,ui} src/styles src/content src/lib src/assets/brand
mkdir -p src/app/\(site\)/{services,demos,projects,about,contact}
mkdir -p src/app/\(site\)/services/\[slug\] src/app/\(site\)/demos/\[slug\] src/app/\(site\)/projects/\[slug\]
```

**Qué hace y por qué (simple):**

* Crea tu estructura profesional para escalar.
* `src/app/(site)/...` agrupa las rutas públicas.
* `[slug]` es la carpeta “comodín” para páginas dinámicas (una sola plantilla para muchas URLs).

## Paso 3 — Comprobar que quedó igual a tu plan

```bash
ls -R src/app/\(site\)
```

**Qué hace:** imprime el árbol de carpetas que acabamos de crear.
**Por qué:** verificamos que la estructura coincide con tu `structure.txt`.

---

Haz **Paso 1** primero y pégame el output (las listas). Luego te guío al Paso 2 según lo que te aparezca.

Perfecto. Ya estás en la base estándar de Next ✅

Ahora sí: **creamos tu estructura profesional**, sin tocar todavía el contenido real.

## Paso 2 — Crear las carpetas “pro”

Ejecuta tal cual:

```bash
mkdir -p src/components/{layout,sections,ui} src/styles src/content src/lib src/assets/brand
mkdir -p src/app/\(site\)/{services,demos,projects,about,contact}
mkdir -p src/app/\(site\)/services/\[slug\] src/app/\(site\)/demos/\[slug\] src/app/\(site\)/projects/\[slug\]
```

### Qué hace y por qué (simple)

* Crea las carpetas para que el proyecto crezca ordenado: `components/`, `styles/`, `content/`, `lib/`, `assets/`.
* Crea las rutas públicas dentro de `src/app/(site)/...`.
* Crea los comodines dinámicos `[slug]` para crecer sin crear 100 carpetas.

## Paso 3 — Verificar

Luego corre:

```bash
ls -R src/app/\(site\)
```

y pégame el output.
