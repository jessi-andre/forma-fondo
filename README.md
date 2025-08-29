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


## 🛡️ CSP (Content-Security-Policy)
La política está embebida en `index.html`. Si agregás nuevas librerías:
- **script-src**: autorizar dominios de JS.
- **connect-src**: autorizar destinos de XHR/fetch/beacon.
- **img-src**: autorizar hosts de imágenes/pixel.


