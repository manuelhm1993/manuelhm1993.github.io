# Milestone v2.0.0 — Auditoría y reparación

## 🌋 Fase 1 — Sprint P1 · Intervención Q1 (Esta sesión)

### Issue #1 — fix: reparar formulario de contacto end-to-end
* **Tipo:** Bug
* **Prioridad:** Alta (Q1)
* **Dificultad:** Media
* **Estado:** ✅ Completado
* **Checklist:**
  - [x] Envolver los campos del formulario de contacto en un elemento `<form id="contactForm">` en `index.html`.
  - [x] Añadir atributos `required` y validaciones básicas en los inputs del HTML.
  - [x] Corregir la acción del formulario y configurar el botón de envío como `type="submit"`.
  - [x] Modificar la función `enviarFormulario` en `assets/js/app.js` para interceptar el evento `submit` (usando `e.preventDefault()`).
  - [x] Actualizar la petición de envío a la URL de AJAX de FormSubmit (`https://formsubmit.co/ajax/manuelhm1993@gmail.com`).
  - [x] Añadir feedback visual de carga en el botón durante el envío (cambiar texto, añadir icono spinner y deshabilitar interacción).
  - [x] Mostrar alertas de éxito o error realistas con SweetAlert2 basadas en la respuesta HTTP recibida de la API.
  - [x] Limpiar los campos del formulario tras un envío exitoso.

### Issue #2 — feat: og:image, JSON-LD, robots.txt, sitemap.xml
* **Tipo:** Front-end
* **Prioridad:** Alta (Q1)
* **Dificultad:** Baja
* **Estado:** ✅ Completado
* **Checklist:**
  - [x] Crear/validar un archivo de imagen para open graph (`og-image.jpg` o `og-image.png`) en `assets/img/`.
  - [x] Añadir metaetiquetas `og:image` y `twitter:image` en el `<head>` de `index.html`.
  - [x] Agregar el marcado estructurado JSON-LD con esquema de tipo `ProfessionalService` o `Person` en `index.html` para mejorar la indexación y SEO local.
  - [x] Crear el archivo `robots.txt` en la raíz del proyecto para autorizar el rastreo correcto.
  - [x] Crear el archivo `sitemap.xml` en la raíz del proyecto listando la URL principal.

### Issue #3 — fix: a11y crítica — focus-visible, preventDefault, nombres CV
* **Tipo:** Bug
* **Prioridad:** Alta (Q1)
* **Dificultad:** Baja
* **Estado:** 🔲 Pendiente
* **Checklist:**
  - [ ] Implementar estilos de foco accesibles (`:focus-visible` o similares) para los elementos interactivos en los estilos CSS.
  - [ ] Asegurar que la función `descargarCV` y los clics en los enlaces de descarga utilicen `e.preventDefault()` de manera correcta para evitar redirecciones o saltos de página indeseados.
  - [ ] Asegurar nombres consistentes para los archivos de descarga de CV (Español vs English).
  - [ ] Revisar que todos los botones e iconos tengan etiquetas accesibles (`aria-label` o texto alternativo).
