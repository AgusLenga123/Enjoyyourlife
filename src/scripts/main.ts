import { animate, inView, scroll, stagger } from 'motion';
import Lenis from 'lenis';

const EASE = [0.16, 1, 0.3, 1] as const;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel as string) as T | null;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel as string)) as T[];

/* ------------------------------------------------------------------ */
/* Smooth scrolling                                                    */
/* ------------------------------------------------------------------ */
if (!reducedMotion) {
  new Lenis({ autoRaf: true, anchors: { offset: -88 }, lerp: 0.11 });
}

/* ------------------------------------------------------------------ */
/* Header state + scroll progress                                      */
/* ------------------------------------------------------------------ */
const headerShell = $('[data-header-shell]');
const progress = $('[data-progress]');
if (progress) scroll(animate(progress, { scaleX: [0, 1] }, { ease: 'linear' }));

/* ------------------------------------------------------------------ */
/* Hero intro                                                          */
/* ------------------------------------------------------------------ */
if (reducedMotion) {
  // CSS only hides these when motion is allowed, nothing to do
} else {
  const badge = $('[data-hero-badge]');
  const sub = $('[data-hero-sub]');
  if (badge) animate(badge, { opacity: [0, 1], y: [16, 0], scale: [0.96, 1] }, { duration: 0.8, ease: EASE });
  animate('[data-word]', { y: ['110%', '0%'] }, { duration: 1, delay: stagger(0.055, { startDelay: 0.15 }), ease: EASE });
  if (sub) animate(sub, { opacity: [0, 1], y: [16, 0] }, { duration: 0.9, delay: 0.75, ease: EASE });
}

/* ------------------------------------------------------------------ */
/* Scroll reveals                                                      */
/* ------------------------------------------------------------------ */
if (!reducedMotion) {
  inView(
    '[data-reveal]',
    (el) => {
      const delay = Number((el as HTMLElement).dataset.revealDelay ?? 0);
      const isScale = (el as HTMLElement).dataset.reveal === 'scale';
      animate(
        el,
        isScale
          ? { opacity: [0, 1], scale: [0.94, 1], y: [40, 0] }
          : { opacity: [0, 1], y: [28, 0], filter: ['blur(6px)', 'blur(0px)'] },
        { duration: isScale ? 1.1 : 0.9, delay, ease: EASE },
      );
    },
    { amount: 0.15, margin: '0px 0px -5% 0px' },
  );

  inView('[data-line]', (el) => {
    animate(el, { scaleX: [0, 1] }, { duration: 1.2, ease: EASE });
  });

  // Subtle parallax inside testimonial media
  $$('[data-parallax]').forEach((el) => {
    scroll(animate(el, { y: [-30, 30] }, { ease: 'linear' }), {
      target: el.parentElement ?? el,
      offset: ['start end', 'end start'],
    });
  });
}

/* ------------------------------------------------------------------ */
/* Spotlight cards (mouse-follow glow)                                 */
/* ------------------------------------------------------------------ */
if (window.matchMedia('(hover: hover)').matches) {
  $$('.spotlight').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Sticky CTA popup (appears while reading the testimonials)           */
/* ------------------------------------------------------------------ */
const sticky = $('#sticky-cta');
const trigger = $('[data-sticky-cta-trigger]');
const hideZones = $$('[data-sticky-cta-hide]');
let stickyDismissed = false;
try {
  stickyDismissed = sessionStorage.getItem('eyl:sticky-dismissed') === '1';
} catch {
  /* storage unavailable (private mode) */
}

function setSticky(visible: boolean) {
  if (!sticky) return;
  if ((sticky.dataset.visible === 'true') === visible) return;
  sticky.dataset.visible = String(visible);
  sticky.toggleAttribute('inert', !visible);
  sticky.setAttribute('aria-hidden', String(!visible));
}

function onScroll() {
  const vh = window.innerHeight;
  headerShell?.setAttribute('data-scrolled', String(window.scrollY > 24));

  if (!sticky || !trigger) return;
  const reachedTestimonials = trigger.getBoundingClientRect().top < vh * 0.55;
  const nearBooking = hideZones.some((z) => {
    const r = z.getBoundingClientRect();
    return r.top < vh * 0.9 && r.bottom > 0;
  });
  const pastBooking = hideZones.length > 0 && hideZones[0].getBoundingClientRect().top < 0;
  setSticky(reachedTestimonials && !nearBooking && !pastBooking && !stickyDismissed);
}

let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  },
  { passive: true },
);
window.addEventListener('resize', onScroll, { passive: true });
onScroll();

$('[data-sticky-close]')?.addEventListener('click', () => {
  stickyDismissed = true;
  try {
    sessionStorage.setItem('eyl:sticky-dismissed', '1');
  } catch {
    /* ignore */
  }
  setSticky(false);
});

/* ------------------------------------------------------------------ */
/* Videos (VSL + testimonials): click-to-load facade                   */
/* No third-party requests until the visitor presses play.             */
/* ------------------------------------------------------------------ */
const facades = new Map<HTMLElement, Node[]>();

function stopVideos() {
  facades.forEach((nodes, box) => {
    if (box.querySelector('iframe, video')) box.replaceChildren(...nodes);
  });
}

$$('[data-video]').forEach((box) => {
  const { src, provider, title = '' } = box.dataset; // src is allow-listed and normalised at build time
  if (!src) return;
  facades.set(box, Array.from(box.childNodes));

  $('[data-video-play]', box)?.addEventListener('click', () => {
    stopVideos(); // only one video plays at a time

    let player: HTMLIFrameElement | HTMLVideoElement;
    if (provider === 'file') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'metadata';
      player = video;
    } else {
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation allow-popups');
      player = iframe;
    }
    player.title = title;
    player.className = 'absolute inset-0 h-full w-full bg-black';
    box.replaceChildren(player);
  });
});

/* ------------------------------------------------------------------ */
/* Calendly: lazy inline iframe (no third-party script on our origin)  */
/* ------------------------------------------------------------------ */
const CALENDLY_ORIGIN = 'https://calendly.com';
const calendly = $('[data-calendly]');
const calendlyMount = $('[data-calendly-mount]');
const calendlySrc = calendly?.dataset.src;

if (calendly && calendlyMount && calendlySrc) {
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const iframe = document.createElement('iframe');
      iframe.src = calendlySrc;
      iframe.title = 'Agendá tu llamada de consultoría (Calendly)';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allow = 'payment';
      iframe.setAttribute(
        'sandbox',
        'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-storage-access-by-user-activation',
      );
      iframe.className = 'block h-full w-full border-0';
      iframe.addEventListener('load', () => {
        const sk = $('[data-calendly-skeleton]', calendly);
        if (!sk) return;
        sk.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => sk.remove(), 600);
      });
      calendlyMount.replaceChildren(iframe);
    },
    { rootMargin: '800px 0px' },
  );
  io.observe(calendly);

  // Only trust messages that really come from Calendly
  window.addEventListener('message', (e: MessageEvent) => {
    if (e.origin !== CALENDLY_ORIGIN) return;
    const data = e.data as { event?: unknown; payload?: { height?: unknown } } | null;
    if (!data || typeof data.event !== 'string' || !data.event.startsWith('calendly.')) return;

    if (data.event === 'calendly.page_height' && typeof data.payload?.height === 'string') {
      const h = parseInt(data.payload.height, 10);
      if (Number.isFinite(h) && h >= 500 && h <= 2000) calendlyMount.style.height = `${h}px`;
    }

    if (data.event === 'calendly.event_scheduled') {
      const done = $('[data-booked]');
      if (done) {
        done.hidden = false;
        if (!reducedMotion) animate(done, { opacity: [0, 1], y: [12, 0] }, { duration: 0.6, ease: EASE });
      }
      stickyDismissed = true;
      setSticky(false);
    }
  });
}
