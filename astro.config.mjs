// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const { SITE_URL, BASE_PATH } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: SITE_URL || 'https://enjoyourlife.english',
  // Sub-path when hosted on GitHub Pages (set BASE_PATH=/Enjoyyourlife in the workflow)
  base: BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'ignore',

  build: {
    // Inline only tiny stylesheets; everything else ships as hashed files.
    inlineStylesheets: 'auto',
  },

  // Typed + validated environment variables (see .env.example)
  env: {
    schema: {
      PUBLIC_CALENDLY_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        url: true,
      }),
      PUBLIC_VSL_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        url: true,
      }),
    },
  },

  // Content-Security-Policy generated at build time. Astro hashes every
  // script/style it emits, so no 'unsafe-inline' is ever needed.
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "media-src 'self'",
        'frame-src https://calendly.com https://www.youtube-nocookie.com https://player.vimeo.com',
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "worker-src 'none'",
        "manifest-src 'self'",
      ],
    },
  },

  // No code blocks on this page; Shiki's inline styles would conflict with the CSP
  markdown: { syntaxHighlight: false },

  vite: {
    plugins: [tailwindcss()],
  },
});
