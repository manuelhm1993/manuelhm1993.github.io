# `<mh/>` mhenriquez.com — Portafolio profesional

Sitio web estático de presentación profesional de Manuel Henríquez / MHenriquez C.A.  
Muestra perfil, servicios, casos de estudio y formulario de contacto.

🌐 [mhenriquez.com](https://mhenriquez.com) · 🏢 [MHenriquez C.A.](https://github.com/MHenriquezCA)

---

### Stack tecnológico 💻

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Alpine.js](https://img.shields.io/badge/alpinejs-white.svg?style=for-the-badge&logo=alpinedotjs&logoColor=%238BC0D0)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)

---

## Estructura

```
/
├── index.html              → Página principal
├── assets/
│   ├── css/                → Estilos por sección
│   ├── js/                 → Scripts de interactividad
│   ├── fonts/              → DM Sans + DM Mono (locales)
│   ├── img/                → Imágenes del sitio
│   └── vendor/
│       ├── fontawesome/    → Iconos (local, sin CDN externo)
│       └── sweetalert2/    → Alertas (local)
└── .github/
    └── copilot-instructions.md
```

---

## Setup local

```bash
git clone https://github.com/manuelhm1993/manuelhm1993.github.io.git
cd manuelhm1993.github.io
python3 -m http.server 8080
# → http://localhost:8080
```

No requiere build step — HTML, CSS y JS planos.

---

## Deploy

Push a `main` → GitHub Actions despliega automáticamente en GitHub Pages.  
Dominio personalizado: `mhenriquez.com` — configurado en Namecheap.

---

## Identidad visual

| Token | Hex | Uso |
|-------|-----|-----|
| Azul profundo | `#1A3A5C` | Fondos principales, logo |
| Azul técnico | `#2E7EC7` | Acentos, CTAs |
| Azul claro | `#7AAED4` | Símbolos `<` y `/>` |
| Negro técnico | `#0F1C2E` | Texto sobre fondo claro |
| Gris neutro | `#F4F6F8` | Fondos secundarios |

**Tipografía:** DM Sans 300/500 · DM Mono 400/500

---

## Notas

- Formulario de contacto pendiente de activación en formsubmit.co (confirmar desde Gmail) — Q1
- Vendor FontAwesome y SweetAlert2 locales — sin dependencias externas en GitHub Pages

---

Desarrollado por [MHenriquez C.A.](https://mhenriquez.com) · Maracaibo, Venezuela