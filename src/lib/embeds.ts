// Turns env-provided URLs into safe, allow-listed embed URLs.
// Anything that is not an https URL on a known host is rejected, so a typo or a
// malicious value can never inject an arbitrary iframe into the page.

const CALENDLY_HOST = 'calendly.com';

export function calendlyEmbedUrl(raw: string | undefined, embedDomain: string): string | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' || url.hostname !== CALENDLY_HOST || url.pathname.length < 2) {
    console.warn(`[calendly] Ignoring PUBLIC_CALENDLY_URL: must be https://${CALENDLY_HOST}/<usuario>/<evento>`);
    return null;
  }
  url.search = '';
  url.hash = '';
  url.searchParams.set('embed_domain', embedDomain);
  url.searchParams.set('embed_type', 'Inline');
  url.searchParams.set('hide_gdpr_banner', '1');
  // Brand colors (applied on Calendly paid plans, ignored otherwise)
  url.searchParams.set('primary_color', 'd8bc8a');
  return url.toString();
}

export type VideoEmbed = { provider: 'youtube' | 'vimeo' | 'file'; src: string };

// Self-hosted files must live in /public and be plain paths like /videos/caso-1.mp4
const LOCAL_VIDEO = /^\/[\w\-./]+\.(mp4|webm)$/i;

export function videoEmbed(raw: string | undefined): VideoEmbed | null {
  if (!raw) return null;
  if (LOCAL_VIDEO.test(raw) && !raw.includes('..')) return { provider: 'file', src: raw };
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') return null;
  const host = url.hostname.replace(/^www\./, '').replace(/^m\./, '');

  let ytId: string | null = null;
  if (host === 'youtu.be') ytId = url.pathname.slice(1);
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    ytId =
      url.searchParams.get('v') ??
      url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ??
      null;
  }
  if (ytId && /^[\w-]{11}$/.test(ytId)) {
    return {
      provider: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
    };
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = url.pathname.match(/(\d{6,})/)?.[1];
    if (id) {
      const h = url.searchParams.get('h') ?? url.pathname.match(/\d{6,}\/([\da-f]+)/)?.[1];
      const hash = h && /^[\da-f]+$/.test(h) ? `&h=${h}` : '';
      return {
        provider: 'vimeo',
        src: `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0${hash}`,
      };
    }
  }

  console.warn('[vsl] Ignoring PUBLIC_VSL_URL: only YouTube or Vimeo links are supported');
  return null;
}
