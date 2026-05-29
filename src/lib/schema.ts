/**
 * Pure JSON-LD structured-data builders.
 *
 * No React, no DOM — so these run both in the browser (via useJsonLd) and in
 * the Node build-time prerender script, guaranteeing the static HTML and the
 * client-hydrated head emit identical structured data.
 */

import { SITE_URL } from './seo';

type Json = Record<string, unknown>;
interface FAQ { question: string; answer: string; }

const LOGO = 'https://i.postimg.cc/gJWNVrk0/Company_logo_page_0001.jpg';

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '4099 Erin Mills Pkwy #4',
  addressLocality: 'Mississauga',
  addressRegion: 'ON',
  postalCode: 'L5L 3P9',
  addressCountry: 'CA',
};

const GEO = { '@type': 'GeoCoordinates', latitude: 43.5352458, longitude: -79.6976644 };

const OPENING_HOURS = [
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '20:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '11:00', closes: '19:00' },
];

const AGGREGATE_RATING = { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '406' };

export function localBusinessSchema(opts: {
  slug: string;
  description: string;
  type?: string;
  areaServed?: string;
  extra?: Json;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type ?? 'LocalBusiness',
    '@id': SITE_URL,
    name: 'Clip & Chill Barbershop',
    description: opts.description,
    url: `${SITE_URL}/${opts.slug}`,
    telephone: '+19056062212',
    priceRange: '$$',
    image: LOGO,
    address: ADDRESS,
    geo: GEO,
    openingHoursSpecification: OPENING_HOURS,
    aggregateRating: AGGREGATE_RATING,
    ...(opts.areaServed ? { areaServed: { '@type': 'Place', name: opts.areaServed } } : {}),
    ...(opts.extra ?? {}),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; slug: string }>): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.slug}`,
    })),
  };
}

export function faqPageSchema(faqs: FAQ[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function serviceSchemas(data: {
  slug: string; h1: string; metaDescription: string; faqs: FAQ[];
}): Json[] {
  const schemas: Json[] = [
    localBusinessSchema({
      slug: data.slug,
      description: data.metaDescription,
      extra: { hasOfferCatalog: { '@type': 'OfferCatalog', name: data.h1 } },
    }),
    breadcrumbSchema([
      { name: 'Home', slug: '/' },
      { name: data.h1, slug: `/${data.slug}` },
    ]),
  ];
  if (data.faqs.length) schemas.push(faqPageSchema(data.faqs));
  return schemas;
}

export function locationSchemas(data: {
  slug: string; h1: string; metaDescription: string; neighborhood: string; faqs: FAQ[];
}): Json[] {
  const schemas: Json[] = [
    localBusinessSchema({
      slug: data.slug,
      description: data.metaDescription,
      areaServed: data.neighborhood,
    }),
    breadcrumbSchema([
      { name: 'Home', slug: '/' },
      { name: data.h1, slug: `/${data.slug}` },
    ]),
  ];
  if (data.faqs.length) schemas.push(faqPageSchema(data.faqs));
  return schemas;
}

export function listicleSchemas(data: {
  slug: string; h1: string; metaDescription: string; city: string;
  faqs: FAQ[];
  shops: Array<{
    name: string; address: string; phone?: string; rating: number;
    reviewCount: number; priceRange: string;
  }>;
}): Json[] {
  const itemList: Json = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.h1,
    description: data.metaDescription,
    numberOfItems: data.shops.length,
    itemListElement: data.shops.map((shop, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: shop.name,
      item: {
        '@type': 'LocalBusiness',
        name: shop.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: shop.address.split(',')[0],
          addressLocality: data.city,
          addressRegion: 'ON',
          addressCountry: 'CA',
        },
        ...(shop.phone ? { telephone: shop.phone } : {}),
        aggregateRating: { '@type': 'AggregateRating', ratingValue: shop.rating, reviewCount: shop.reviewCount },
        priceRange: shop.priceRange,
      },
    })),
  };
  return [
    itemList,
    faqPageSchema(data.faqs),
    breadcrumbSchema([
      { name: 'Home', slug: '/' },
      { name: data.h1, slug: `/${data.slug}` },
    ]),
  ];
}

export function blogPostingSchemas(meta: {
  slug: string; title: string; description: string; category: string; date: string;
}): Json[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: meta.title,
      description: meta.description,
      image: LOGO,
      datePublished: meta.date,
      dateModified: meta.date,
      articleSection: meta.category,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${meta.slug}` },
      author: { '@type': 'Organization', name: 'Clip & Chill Barbershop', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'Clip & Chill Barbershop',
        logo: { '@type': 'ImageObject', url: LOGO },
      },
    },
    breadcrumbSchema([
      { name: 'Home', slug: '/' },
      { name: 'Blog', slug: '/blog' },
      { name: meta.title, slug: `/${meta.slug}` },
    ]),
  ];
}

export function blogIndexSchemas(posts: Array<{
  slug: string; title: string; description: string; category: string; date: string;
}>): Json[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Clip & Chill Barbershop Blog',
      url: `${SITE_URL}/blog`,
      publisher: { '@type': 'Organization', name: 'Clip & Chill Barbershop', url: SITE_URL },
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        articleSection: post.category,
        url: `${SITE_URL}/${post.slug}`,
      })),
    },
    breadcrumbSchema([
      { name: 'Home', slug: '/' },
      { name: 'Blog', slug: '/blog' },
    ]),
  ];
}
