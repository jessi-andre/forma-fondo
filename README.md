# Forma & Fondo — Landing

Landing de marca personal (Branding, UX/UI, Contenido) optimizada para conversión, SEO y performance.  
Live: `https://jessi-andre.github.io/forma-fondo/`

## 🧱 Estructura

## 🚀 Features
- **UI/UX**: hero con doble CTA, sistema de botones unificado, dark mode, animaciones suaves.
- **Secciones**: Servicios, Beneficios (+ métricas), Testimonios (carrusel), Nosotros, FAQ, Contacto.
- **SEO**: meta tags, `canonical`, Open Graph/Twitter, alt en imágenes, H2 por sección, schema.org.
- **Analytics**: **GA4** (gtag) + **Meta Pixel** con evento de **Lead** al enviar el formulario.
- **Accesibilidad**: foco visible, labels ocultas, mínimos táctiles (44px).
- **Performance**: preconnect/dns-prefetch, assets externos controlados.
- **Seguridad**: **CSP** ajustada para GA4 y Meta Pixel.

## 📊 Analytics & Pixel
1. **Google Analytics 4**
   - Creá un stream web y obtené tu **Measurement ID** (formato `G-XXXXXXXXXX`).
   - En `index.html` reemplazá **todas** las ocurrencias de `G-XXXXXXXXXX`.
   - Evento on submit: `generate_lead`.

2. **Meta Pixel**
   - Creá un Pixel y copiá tu **Pixel ID** (numérico).
   - En `index.html` reemplazá **todas** las ocurrencias de `123456789012345`.
   - Evento on submit: `Lead`.

> Los eventos se disparan en `js/script.js` solo cuando el **fetch a Formspree** responde `200 OK`.

## ✉️ Formulario (Formspree)
- Endpoint actual: `https://formspree.io/f/xkgbwywv`.
- Para usar el tuyo, reemplazá el `action` del `<form>` y (opcional) agrega campos ocultos según tus reglas.

## 🛡️ CSP (Content-Security-Policy)
La política está embebida en `index.html`. Si agregás nuevas librerías:
- **script-src**: autorizar dominios de JS.
- **connect-src**: autorizar destinos de XHR/fetch/beacon.
- **img-src**: autorizar hosts de imágenes/pixel.

## 🧪 Desarrollo local
1. Cloná el repo  
   ```bash
   git clone <url>
   cd forma-fondo
