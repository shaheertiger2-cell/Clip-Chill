import { useEffect } from 'react';

/**
 * Centralised SEO helpers for the Clip & Chill SPA.
 *
 * Because the site is client-rendered, the document <head> has to be kept in
 * sync on every route change — not just the <title> and description, but also
 * the canonical, Open Graph, and Twitter tags so that shared links and social /
 * AI crawlers see the correct per-page metadata instead of the homepage's.
 */

export const SITE_URL = 'https://clipandchill.ca';
export const SITE_NAME = 'Clip & Chill Barbershop';
export const DEFAULT_OG_IMAGE = 'https://i.postimg.cc/gJWNVrk0/Company_logo_page_0001.jpg';

export interface SeoConfig {
  /** Document title (full, including brand suffix). */
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/skin-fade-mississauga" or "/". */
  path: string;
  image?: string;
  /** og:type — "website" for landing pages, "article" for blog posts. */
  type?: 'website' | 'article';
  /** When true, emits robots "noindex, follow". Defaults to indexable. */
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keep the <head> SEO tags in sync with the current page. Safe to call on every
 * route — it updates existing tags in place rather than duplicating them.
 */
export function useSeo({ title, description, path, image, type = 'website', noindex }: SeoConfig) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const ogImage = image ?? DEFAULT_OG_IMAGE;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setCanonical(url);

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', SITE_NAME);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
  }, [title, description, path, image, type, noindex]);
}

/**
 * Inject one or more JSON-LD structured-data blocks under a shared id prefix and
 * remove them on unmount. Pass the schema objects you want serialised.
 */
export function useJsonLd(idPrefix: string, schemas: Array<Record<string, unknown>>) {
  // Serialise once so the effect only re-runs when the data actually changes.
  const serialized = JSON.stringify(schemas);
  useEffect(() => {
    const parsed: Array<Record<string, unknown>> = JSON.parse(serialized);
    const ids = parsed.map((_, i) => `${idPrefix}-${i}`);

    parsed.forEach((schema, i) => {
      let el = document.getElementById(ids[i]) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.id = ids[i];
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    });

    return () => ids.forEach((id) => document.getElementById(id)?.remove());
  }, [idPrefix, serialized]);
}
