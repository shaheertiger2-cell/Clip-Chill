/**
 * Build-time prerenderer for the Clip & Chill SPA.
 *
 * Vite emits a single dist/index.html whose <head> describes the homepage. For
 * every content route we clone that file and bake in the route's real <title>,
 * meta description, canonical, Open Graph / Twitter tags, and JSON-LD — so
 * crawlers, social unfurlers, and AI answer engines receive correct metadata in
 * the raw HTML response without having to execute JavaScript.
 *
 * Vercel serves these files from the filesystem (cleanUrls) before falling back
 * to the SPA rewrite, and React hydrates the body on top as usual.
 *
 * Run automatically as part of `npm run build` (vite build && tsx scripts/prerender.ts).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { services } from '../src/data/services';
import { locations } from '../src/data/locations';
import { listicles } from '../src/data/listicles';
import { blogs, blogList } from '../src/data/blogs';
import {
  serviceSchemas,
  locationSchemas,
  listicleSchemas,
  blogPostingSchemas,
  blogIndexSchemas,
} from '../src/lib/schema';
import { SITE_URL } from '../src/lib/seo';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

interface Route {
  /** Output file relative to dist, e.g. "skin-fade-mississauga.html". */
  file: string;
  /** Canonical path beginning with "/". */
  path: string;
  title: string;
  description: string;
  type: 'website' | 'article';
  /** Must match the idPrefix passed to useJsonLd on the matching page so that
   *  hydration updates these tags in place instead of duplicating them. */
  ldPrefix: string;
  schemas: Array<Record<string, unknown>>;
}

// ─── HTML helpers ──────────────────────────────────────────────────────────

function escAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceTitle(html: string, title: string): string {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escAttr(title)}</title>`);
}

function replaceMeta(html: string, attr: 'name' | 'property', key: string, content: string): string {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[\\s\\S]*?(" ?/?>)`, '');
  const value = escAttr(content);
  if (re.test(html)) return html.replace(re, `$1${value}$2`);
  // Tag not present in base — inject before </head>.
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${value}" />\n  </head>`);
}

function replaceCanonical(html: string, href: string): string {
  return html.replace(
    /(<link rel="canonical" href=")[\s\S]*?(" ?\/?>)/,
    `$1${escAttr(href)}$2`,
  );
}

function stripJsonLd(html: string): string {
  return html.replace(
    /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
    '',
  );
}

function jsonLdBlock(prefix: string, schemas: Array<Record<string, unknown>>): string {
  return schemas
    .map((s, i) => {
      // Escape "<" so a "</script>" inside any string can't break out of the tag.
      const json = JSON.stringify(s).replace(/</g, '\\u003c');
      // The id matches useJsonLd's `${prefix}-${i}` so hydration reuses the tag.
      return `    <script type="application/ld+json" id="${prefix}-${i}">${json}</script>`;
    })
    .join('\n');
}

function renderRoute(base: string, route: Route): string {
  const url = `${SITE_URL}${route.path}`;
  let html = base;
  html = replaceTitle(html, route.title);
  html = replaceMeta(html, 'name', 'description', route.description);
  html = replaceMeta(html, 'property', 'og:title', route.title);
  html = replaceMeta(html, 'property', 'og:description', route.description);
  html = replaceMeta(html, 'property', 'og:url', url);
  html = replaceMeta(html, 'property', 'og:type', route.type);
  html = replaceMeta(html, 'name', 'twitter:title', route.title);
  html = replaceMeta(html, 'name', 'twitter:description', route.description);
  html = replaceCanonical(html, url);
  // The hero image is only rendered on the homepage; drop its preload here so
  // sub-pages don't fetch an image they never display (avoids "unused preload").
  html = html.replace(
    /\s*<link\s+rel="preload"\s+as="image"[\s\S]*?\/>/,
    '',
  );
  // Replace the homepage's BarberShop JSON-LD with this route's structured data.
  html = stripJsonLd(html);
  html = html.replace('</head>', `${jsonLdBlock(route.ldPrefix, route.schemas)}\n  </head>`);
  return html;
}

// ─── Route collection ────────────────────────────────────────────────────────

function collectRoutes(): Route[] {
  const routes: Route[] = [];

  for (const data of Object.values(services)) {
    routes.push({
      file: `${data.slug}.html`,
      path: `/${data.slug}`,
      title: data.metaTitle,
      description: data.metaDescription,
      type: 'website',
      ldPrefix: 'service-ld',
      schemas: serviceSchemas(data),
    });
  }

  for (const data of Object.values(locations)) {
    routes.push({
      file: `${data.slug}.html`,
      path: `/${data.slug}`,
      title: data.metaTitle,
      description: data.metaDescription,
      type: 'website',
      ldPrefix: 'location-ld',
      schemas: locationSchemas(data),
    });
  }

  for (const data of Object.values(listicles)) {
    routes.push({
      file: `${data.slug}.html`,
      path: `/${data.slug}`,
      title: data.metaTitle,
      description: data.metaDescription,
      type: 'article',
      ldPrefix: 'listicle-ld',
      schemas: listicleSchemas(data),
    });
  }

  for (const meta of Object.values(blogs)) {
    routes.push({
      file: `${meta.slug}.html`,
      path: `/${meta.slug}`,
      title: `${meta.title} | Clip & Chill Barbershop`,
      description: meta.description,
      type: 'article',
      ldPrefix: 'blog-ld',
      schemas: blogPostingSchemas(meta),
    });
  }

  routes.push({
    file: 'blog.html',
    path: '/blog',
    title: 'Barbershop & Grooming Blog | Clip & Chill Mississauga',
    description:
      'Expert grooming guides, haircut advice, and local barbershop tips from Clip & Chill in Erin Mills, Mississauga — fades, beard care, pricing, and more.',
    type: 'website',
    ldPrefix: 'blog-index-ld',
    schemas: blogIndexSchemas(blogList),
  });

  return routes;
}

// ─── Main ──────────────────────────────────────────────────────────────────

function main() {
  const base = readFileSync(join(DIST, 'index.html'), 'utf8');
  const routes = collectRoutes();

  for (const route of routes) {
    writeFileSync(join(DIST, route.file), renderRoute(base, route), 'utf8');
  }

  console.log(`Prerendered ${routes.length} routes into dist/ (+ index.html homepage).`);
}

main();
