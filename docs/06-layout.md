

## Layout en Next.js (App Router)

Un **layout** es una plantilla que envuelve páginas y define la estructura común del sitio.

* **`page.js`**: contenido específico de una ruta (por ejemplo `/services`).
* **`layout.js`**: marco común compartido por varias rutas (por ejemplo **Navbar**, **Footer**, contenedor, estilos generales).

### Ejemplo

Si existe:

* `src/app/(site)/layout.js`
* `src/app/(site)/services/page.js`
* `src/app/(site)/about/page.js`

Entonces **todas** las páginas dentro de `(site)` se renderizan así:

> `layout (estructura común) + page (contenido de la ruta)`

### ¿Por qué usarlo?

Porque así no repites código. Si pones el Navbar y Footer en el layout, aparecen automáticamente en:

* `/services`
* `/demos`
* `/projects`
* `/about`
* `/contact`
* y también en rutas dinámicas como `/services/<slug>`.

### Nota

El folder `(site)` es solo para **organizar** rutas (no aparece en la URL), pero el `layout.js` dentro de `(site)` sí controla la estructura común de esas páginas.

---


# Con mas detalle

Aquí tienes una explicación completa (pero clara) para tus notas.

---

# Layouts en Next.js (App Router) — Teoría y por qué importan

## 1) Qué es un layout

Un **layout** es una “plantilla” que **envuelve** páginas y define cosas que se repiten entre rutas:

* estructura general (header/navbar/footer)
* márgenes / contenedores
* tipografías
* fondo / tema
* estilos globales
* providers (tema, idioma, estado)

En Next.js (App Router), el layout vive en un archivo llamado:

* `layout.js`

y una página vive en:

* `page.js`

**Idea clave:**

> `layout` = marco común
> `page` = contenido específico de una ruta

---

## 2) Cómo funciona por carpetas (la regla importante)

En App Router, **la estructura de carpetas = la estructura de rutas**.

Un `layout.js` en una carpeta **aplica a todas las rutas** dentro de esa carpeta y sus subcarpetas.

Ejemplo:

```
src/app/layout.js
src/app/page.js
src/app/(site)/layout.js
src/app/(site)/services/page.js
```

* `src/app/layout.js` envuelve **todo el sitio** (todas las rutas).
* `src/app/(site)/layout.js` envuelve **solo** las rutas dentro de `(site)`.

---

## 3) Layout global vs layout de sección (site)

### A) Layout global: `src/app/layout.js`

**Qué es:** el layout “raíz” del proyecto.
**A qué aplica:** a **todas** las rutas:

* `/`
* `/services`
* `/projects`
* `/api/...`
* `/login` (si existe)
* `/admin` (si existe)

**Qué se pone ahí normalmente:**

* `<html>` y `<body>` (estructura base del documento)
* importación de `globals.css`
* fuentes
* tema base (variables CSS)
* providers globales

✅ Es el lugar ideal para cosas “universales”.

---

### B) Layout de sección: `src/app/(site)/layout.js`

**Qué es:** layout “solo para el sitio público”.
**A qué aplica:** solo a rutas dentro de `(site)` (que es un grupo organizativo).

Ejemplos de rutas dentro de `(site)`:

* `/services`
* `/services/<slug>`
* `/demos`
* `/projects`
* `/about`
* `/contact`

**Qué se pone ahí normalmente:**

* `<Navbar />`
* `<Footer />`
* estructura común de páginas públicas
* container central

✅ Es ideal cuando quieres que el **sitio público** comparta estructura, pero no todo el proyecto.

---

## 4) Qué es `(site)` y por qué existe

`(site)` es un **route group**.
Significa:

* sirve para **organizar** carpetas
* **NO aparece en la URL**

Ejemplo:
`src/app/(site)/services/page.js` → URL real: `/services` (sin “site”).

Se usa para separar “zonas” del proyecto:

* `(site)` → web pública
* `(admin)` → panel admin
* `(auth)` → login/register
  etc.

---

## 5) Ejemplo visual: “fondo negro global” + “Navbar/Footer solo en (site)”

Imagina que haces esto:

### En `src/app/layout.js` (global)

* defines un **fondo negro** para todo el sitio (o un tema global)

Resultado:

* TODAS las rutas tienen ese fondo (porque es global).

### En `src/app/(site)/layout.js` (site)

* agregas **Navbar + Footer** solo para el sitio público

Resultado:

* `/` (si viene de `src/app/page.js` y NO está dentro de `(site)`)
  ✅ fondo negro
  ❌ no navbar/footer

* `/services` (está dentro de `(site)`)
  ✅ fondo negro
  ✅ navbar/footer

**Por qué es útil:**
porque a veces quieres páginas sin Navbar/Footer:

* `/login` (pantalla limpia)
* `/admin` (otra barra lateral, otro layout)
* `/api/...` (no debe renderizar UI)
* landing pages especiales

---

## 6) ¿Es obligatorio tener `(site)/layout.js`?

No. Si todo tu proyecto será “una web simple”, puedes meter Navbar/Footer en el layout global y ya.

Pero en proyectos profesionales, se prefiere separar porque:

* evita refactors grandes cuando creces
* permite crear “zonas” con UI diferente
* mantiene el código más limpio

---

## 7) Idea final (muy importante)

Los layouts son importantes porque te permiten:

✅ Reutilizar estructura sin repetir código
✅ Separar el sitio en “áreas” (público, admin, auth)
✅ Cambiar el diseño de una sección sin tocar todo
✅ Escalar de forma ordenada

---

Si quieres, en tus notas puedes cerrar con esta frase:

> **Global layout = reglas universales (html/body/estilos base).
> Site layout = UI compartida del sitio público (Navbar/Footer).
> Route groups como `(site)` sirven para organizar y separar secciones sin cambiar la URL.**
