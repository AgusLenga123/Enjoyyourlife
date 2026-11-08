# Enjoyourlife.English — Landing

Landing page estática para **Enjoyourlife.English** (inglés profesional para Developers).

## Stack

- **Astro 7** (salida 100% estática: sin servidor ni base de datos que atacar)
- **Tailwind CSS v4**
- **Motion** (animaciones de entrada, parallax, barra de progreso)
- **Lenis** (scroll suave, se desactiva con `prefers-reduced-motion`)
- Fuentes self-hosted (Open Sauce One + Open Sans) e íconos Lucide inline

## Desarrollo

```bash
cp .env.example .env   # completar las variables
npm install
npm run dev            # http://localhost:4321
npm run build          # genera dist/
npm run preview
```

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `SITE_URL` | Dominio final (canonical, Open Graph y `embed_domain` de Calendly) |
| `PUBLIC_CALENDLY_URL` | Opcional. Pisa el link de Calendly de `src/data/content.ts`. Solo se aceptan URLs `https://calendly.com/...` |
| `PUBLIC_VSL_URL` | Opcional. Pisa el video VSL de `src/data/content.ts` (YouTube o Vimeo) |

## Dónde editar

- **Textos**: `src/data/content.ts` (todo el copy está ahí).
- **Links (Calendly, VSL) y WhatsApp**: `links` y `contact` en `src/data/content.ts`.
- **Videos de casos de éxito**: completar `video` en cada testimonio de `src/data/content.ts`. Acepta un link de YouTube/Vimeo o un archivo propio en `public/videos/` (`'/videos/caso-1.mp4'`). Vacío = placeholder "próximamente".
- **Popup "Agendá tu llamada"**: `src/components/StickyCta.astro` + lógica en `src/scripts/main.ts`. Aparece al llegar a los testimonios y se oculta al llegar a la agenda.

## Seguridad

- CSP estricta generada por Astro con hashes SHA-256 (sin `unsafe-inline`), `frame-src` limitado a Calendly, YouTube (nocookie) y Vimeo.
- Headers HTTP en `public/_headers` (Netlify / Cloudflare Pages) y `vercel.json` (Vercel): HSTS, `frame-ancestors 'none'`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP.
- Calendly se embebe como iframe con `sandbox` (no se carga `widget.js` en nuestro origen) y los `postMessage` solo se aceptan si vienen de `https://calendly.com`.
- Las URLs de Calendly y del video se validan contra una lista de hosts permitidos al compilar.
- El video se carga recién al hacer click (sin requests a terceros hasta entonces).
