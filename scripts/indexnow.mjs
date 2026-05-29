#!/usr/bin/env node
/**
 * IndexNow submitter for Clip & Chill (https://clipandchill.ca).
 *
 * Reads every <loc> from public/sitemap.xml and submits the full set to the
 * IndexNow API, which instantly notifies Bing, Yandex, and other participating
 * search engines that the URLs have been added/updated.
 *
 * Run after a deploy:   npm run indexnow
 *
 * The verification key is hosted at /<KEY>.txt at the site root (public/),
 * which IndexNow fetches to confirm domain ownership.
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const HOST = 'clipandchill.ca';
const KEY = '13e0964e5e644e0895c51e06f6869ca4';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = join(__dirname, '..', 'public', 'sitemap.xml');
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

async function getUrlsFromSitemap() {
  const xml = await readFile(SITEMAP_PATH, 'utf8');
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(locs)];
}

async function main() {
  const urlList = await getUrlsFromSitemap();
  if (urlList.length === 0) {
    console.error('No URLs found in sitemap.xml — nothing to submit.');
    process.exit(1);
  }

  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  console.log(`IndexNow responded: ${res.status} ${res.statusText}`);
  if (res.status === 200 || res.status === 202) {
    console.log('✓ URLs accepted by IndexNow.');
  } else {
    const text = await res.text().catch(() => '');
    console.error(`✗ IndexNow rejected the request. ${text}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('IndexNow submission failed:', err);
  process.exit(1);
});
