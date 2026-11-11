# impulso.online

Sitio web de impulso.online, una agencia de Lanús que hace páginas web, maneja redes sociales y arma publicidad en Meta Ads.
Está hecho con HTML, CSS y JavaScript vanilla, más GSAP + ScrollTrigger y Lenis por CDN. No necesita build.

## Ver el sitio en tu compu

El sitio usa módulos de JavaScript, así que **no anda si abrís `index.html` con doble click**. Necesitás un servidor local:

```bash
python -m http.server 5500
```

Después entrá a http://localhost:5500. En VS Code también sirve la extensión **Live Server**.

## Qué editar sin tocar el HTML

| Qué querés cambiar | Archivo |
| --- | --- |
| Número de WhatsApp, Instagram, mensajes, video del showreel | `js/data/config.js` |
| Agregar o editar trabajos | `js/data/projects.js` |
| Precios y contenido de los packs | `js/data/packs.js` |
| Colores, tipografías, espaciados | `css/variables.css` |

## Pendientes (`[PLACEHOLDER]`)

- [ ] Capturas reales de Einar Cocina: `assets/img/works/einar-desktop.jpg` y `einar-mobile.jpg`, con la página completa.
- [ ] Link de la web de Einar: `[LINK_WEB_EINAR]` en `js/data/projects.js`.
- [ ] Dominio real en `canonical`, `og:url` y `og:image` de `index.html`.
- [ ] Video del showreel: `assets/video/showreel.mp4` y su ruta en `SHOWREEL_VIDEO`.

## Publicar en Netlify

Conectá el repositorio en Netlify. No hace falta comando de build y la carpeta a publicar es la raíz (`.`), como ya dice `netlify.toml`.
También podés arrastrar la carpeta a app.netlify.com/drop.

## Estructura

```
index.html
css/        variables, base, components, animations y sections/ (una por sección)
js/         main.js, data/ (config, projects, packs) y modules/ (una por funcionalidad)
assets/     img/ y video/
```
