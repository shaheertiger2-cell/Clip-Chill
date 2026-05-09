import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  ChevronDown,
  Star,
  Calendar,
  ArrowRight,
  Navigation,
} from 'lucide-react';
import { motion } from 'motion/react';
import { locations, SERVICES_LIST } from '../data/locations';
import { trackBookingConversion } from '../analytics';

const BOOKING_URL = 'https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services';
const MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=4099+Erin+Mills+Pkwy+%234,+Mississauga,+ON+L5L+3P9';

const REVIEWS = [
  {
    name: 'Jordan M.',
    initials: 'JM',
    date: 'March 2025',
    text: "Best haircut I've ever had — bar none. The attention to detail is unreal. I drive 25 minutes to come here and it's 100% worth it.",
  },
  {
    name: 'P Jaswal',
    initials: 'PJ',
    date: '4 days ago',
    text: 'Got a great cut from Ahmad at a great price. The hours are great too as they work with my hectic schedule. Clean and modern. Will definitely be back.',
  },
  {
    name: 'Shaikh Nazeef',
    initials: 'SN',
    date: '3 days ago',
    text: 'Top notch customer service. Hands down the best barber shop in Mississauga!!',
  },
];

// ─── Structured data ─────────────────────────────────────────────────────────

function useLocationSchema(slug: string, h1: string, description: string, neighborhood: string) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://clipandchill.ca',
      name: 'Clip & Chill Barbershop',
      description,
      url: `https://clipandchill.ca/${slug}`,
      telephone: '+19056062212',
      priceRange: '$$',
      image: 'https://i.postimg.cc/gJWNVrk0/Company_logo_page_0001.jpg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4099 Erin Mills Pkwy #4',
        addressLocality: 'Mississauga',
        addressRegion: 'ON',
        postalCode: 'L5L 3P9',
        addressCountry: 'CA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.5352458,
        longitude: -79.6976644,
      },
      areaServed: {
        '@type': 'Place',
        name: neighborhood,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday'],
          opens: '11:00',
          closes: '19:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '406',
      },
    };

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://clipandchill.ca/' },
        { '@type': 'ListItem', position: 2, name: h1, item: `https://clipandchill.ca/${slug}` },
      ],
    };

    const schemas = [schema, breadcrumb];
    const ids = schemas.map((_, i) => `location-ld-${i}`);

    schemas.forEach((s, i) => {
      let el = document.getElementById(ids[i]) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.id = ids[i];
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(s);
    });

    return () => ids.forEach((id) => document.getElementById(id)?.remove());
  }, [slug, h1, description, neighborhood]);
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="text-sm md:text-base font-medium text-white/70 group-hover:text-white transition-colors pr-2">
          {question}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 mt-0.5 text-gold/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm md:text-base text-white/40 leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? locations[slug] : undefined;

  useEffect(() => {
    if (!data) return;
    document.title = data.metaTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', data.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://clipandchill.ca/${data.slug}`;
  }, [data]);

  useLocationSchema(
    data?.slug ?? '',
    data?.h1 ?? '',
    data?.metaDescription ?? '',
    data?.neighborhood ?? '',
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-dark">
      {/* ── Topbar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm font-medium tracking-wide"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackBookingConversion}
            className="btn-luxury !px-5 !py-2"
          >
            <span>Book Now</span>
          </a>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className="pt-28 pb-16 md:pt-36 md:pb-24 bg-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold/4 rounded-full blur-[180px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/25 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/40">Areas We Serve</span>
            <span>/</span>
            <span className="text-gold">{data.neighborhood}</span>
          </nav>

          {/* Location pill */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/20 rounded-full">
              <MapPin size={10} />
              Clip &amp; Chill · {data.neighborhood}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6">
            {data.h1}
          </h1>

          <p className="text-white/50 text-base md:text-xl leading-relaxed max-w-2xl mb-10 font-light">
            {data.tagline}
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-semibold">
              <Navigation size={13} />
              {data.driveTime}
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm">
              <MapPin size={13} />
              {data.distanceNote}
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm">
              <Star size={13} className="fill-gold text-gold" />
              5.0 · 406 reviews
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackBookingConversion}
              className="btn-luxury px-10 py-4 inline-flex items-center justify-center gap-3"
            >
              <Calendar size={16} />
              <span>Book an Appointment</span>
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/10 text-white/50 hover:text-gold hover:border-gold/30 transition-all text-sm font-medium tracking-wide"
            >
              <Navigation size={15} />
              Get Directions
            </a>
          </div>

          <div className="mt-14 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-5xl mx-auto px-6 md:px-8 pb-20">

        {/* Intro + local context */}
        <div className="grid md:grid-cols-2 gap-10 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="sub-label">About the Area</span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-5">
              Serving {data.neighborhood}
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed">
              {data.intro}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:pt-10"
          >
            <p className="text-white/35 text-sm md:text-base leading-relaxed">
              {data.localContext}
            </p>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
          aria-labelledby="highlights-heading"
        >
          <span className="sub-label">Why Clip &amp; Chill</span>
          <h2 id="highlights-heading" className="font-serif text-2xl md:text-3xl font-medium mb-8">
            Why {data.neighborhood} Clients Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <CheckCircle2 size={16} className="text-gold/70 mt-0.5 shrink-0" />
                <span className="text-sm text-white/60 leading-relaxed">{h}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Services & Pricing */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
          aria-labelledby="services-heading"
        >
          <span className="sub-label">Services &amp; Pricing</span>
          <h2 id="services-heading" className="font-serif text-2xl md:text-3xl font-medium mb-8">
            What We Offer
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_LIST.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/70">{service.name}</span>
                  <span className="font-mono text-gold text-sm font-bold">{service.price}</span>
                </div>
                <span className="text-[11px] text-white/25 uppercase tracking-[0.2em]">{service.duration}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-5 text-xs text-white/25">
            Full pricing and availability at{' '}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              getsquire.com
            </a>
          </p>
        </motion.section>

        {/* Directions */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
          aria-labelledby="directions-heading"
        >
          <span className="sub-label">Getting Here</span>
          <h2 id="directions-heading" className="font-serif text-2xl md:text-3xl font-medium mb-6">
            Directions from {data.neighborhood}
          </h2>
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <Navigation size={16} className="text-gold" />
              </div>
              <p className="text-sm md:text-base text-white/50 leading-relaxed pt-1.5">
                {data.directions}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 border border-white/10 rounded hover:border-white/20 hover:text-white/60 transition-all"
              >
                <Navigation size={12} />
                Open in Google Maps
                <ArrowRight size={10} />
              </a>
              <a
                href="tel:9056062212"
                className="inline-flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 border border-white/10 rounded hover:border-white/20 hover:text-white/60 transition-all"
              >
                <Phone size={12} />
                (905) 606-2212
              </a>
            </div>
          </div>

          {/* Info strip */}
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            {[
              { icon: MapPin, label: '4099 Erin Mills Pkwy #4, Mississauga' },
              { icon: Clock, label: 'Mon–Sat 10am–8pm · Sun 11am–7pm' },
              { icon: Phone, label: '(905) 606-2212' },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-white/30 p-3 rounded-lg bg-white/[0.015] border border-white/5">
                <Icon size={12} className="text-gold/40 shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Reviews */}
        <section className="mb-16 md:mb-24" aria-labelledby="reviews-heading">
          <span className="sub-label">Client Reviews</span>
          <h2 id="reviews-heading" className="font-serif text-2xl md:text-3xl font-medium mb-4">
            What Clients Say
          </h2>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" stroke="none" />
              ))}
            </div>
            <span className="text-gold font-bold">5.0</span>
            <span className="text-white/30 text-sm">406 Google reviews</span>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 flex flex-col"
              >
                <div className="flex text-gold mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="text-sm text-white/50 leading-relaxed italic flex-grow mb-4">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-[10px] font-bold shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/60">{review.name}</p>
                    <p className="text-[10px] text-white/25">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16 md:mb-24" aria-labelledby="faq-heading">
          <span className="sub-label">Common Questions</span>
          <h2 id="faq-heading" className="font-serif text-2xl md:text-3xl font-medium mb-8">
            {data.neighborhood} — Frequently Asked Questions
          </h2>
          <div className="rounded-2xl border border-white/5 px-6 md:px-8 py-2 bg-white/[0.015]">
            {data.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="glass-panel rounded-2xl p-8 md:p-12 border-gold/10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <span className="sub-label">Ready to Book?</span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-2">
              Clip &amp; Chill Barbershop
            </h2>
            <p className="text-white/30 text-sm mb-6">
              Your barber for {data.neighborhood} — and all of Mississauga.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackBookingConversion}
                className="btn-luxury px-10 py-4 inline-flex items-center gap-3"
              >
                <Calendar size={16} />
                <span>Book Your Appointment</span>
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-gold transition-colors"
              >
                <Navigation size={14} />
                Get Directions
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/30 hover:text-gold transition-colors text-sm"
          >
            <ArrowLeft size={14} />
            Back to Clip &amp; Chill
          </Link>
        </div>
      </main>
    </div>
  );
}
