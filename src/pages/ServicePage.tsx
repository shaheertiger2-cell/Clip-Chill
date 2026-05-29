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
} from 'lucide-react';
import { m } from 'motion/react';
import { services } from '../data/services';
import { trackBookingConversion } from '../analytics';
import { useSeo, useJsonLd, type SeoConfig } from '../lib/seo';
import { serviceSchemas } from '../lib/schema';

const BOOKING_URL = 'https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services';

const GALLERY = [
  'https://i.postimg.cc/PrCTsKZW/0b56f814_0303_4bd9_9946_66768e49f495.jpg',
  'https://i.postimg.cc/5ND1xvqL/213b9583_0fc3_4c76_bcf1_63b6e74bddbe.jpg',
  'https://i.postimg.cc/658tJzRV/25563b0a_a068_4adb_ae17_de88b11e9a41.jpg',
  'https://i.postimg.cc/SNnkFV8C/7a5159e7_3675_43b8_bbcb_6d9b5d031314.jpg',
];

const REVIEWS = [
  {
    name: 'Jordan M.',
    initials: 'JM',
    date: 'March 2025',
    text: "Best haircut I've ever had — bar none. The attention to detail is unreal. My barber spent 45 minutes making sure every line was perfect. I drive 25 minutes to come here and it's 100% worth it.",
  },
  {
    name: 'Shaikh Nazeef',
    initials: 'SN',
    date: '3 days ago',
    text: 'Top notch customer service. Hands down the best barber shop in Mississauga!!',
  },
  {
    name: 'P Jaswal',
    initials: 'PJ',
    date: '4 days ago',
    text: 'Got a great cut from Ahmad at a great price. The hours are great too as they work with my hectic schedule. The place is clean and modern. Will definitely be back.',
  },
];

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

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? services[slug] : undefined;

  const seoConfig: SeoConfig = {
    title: data?.metaTitle ?? 'Clip & Chill Barbershop | Mississauga',
    description: data?.metaDescription ?? 'Premium haircuts and grooming in Mississauga.',
    path: data ? `/${data.slug}` : '/',
  };
  useSeo(seoConfig);
  useJsonLd('service-ld', data ? serviceSchemas(data) : []);

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
            <span className="text-white/40 truncate">{data.h1}</span>
          </nav>

          {/* Category pill */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/20 rounded-full">
              Clip & Chill · Mississauga
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6">
            {data.h1}
          </h1>

          <p className="text-white/50 text-base md:text-xl leading-relaxed max-w-2xl mb-10 font-light">
            {data.tagline}
          </p>

          {/* Price + duration pills */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold font-mono text-sm font-bold">
              {data.price}
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm">
              <Clock size={13} />
              {data.duration}
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
              href="tel:9056062212"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/10 text-white/50 hover:text-gold hover:border-gold/30 transition-all text-sm font-medium tracking-wide"
            >
              <Phone size={15} />
              (905) 606-2212
            </a>
          </div>

          <div className="mt-14 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-5xl mx-auto px-6 md:px-8 pb-20">

        {/* Intro */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl">
            {data.intro}
          </p>
        </m.div>

        {/* Key Features */}
        <m.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
          aria-labelledby="features-heading"
        >
          <span className="sub-label">What You Get</span>
          <h2 id="features-heading" className="font-serif text-2xl md:text-3xl font-medium mb-8">
            What's Included
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.keyFeatures.map((feature, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <CheckCircle2 size={16} className="text-gold/70 mt-0.5 shrink-0" />
                <span className="text-sm text-white/60 leading-relaxed">{feature}</span>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* Gallery */}
        <section className="mb-16 md:mb-24" aria-labelledby="gallery-heading">
          <span className="sub-label">Our Work</span>
          <h2 id="gallery-heading" className="font-serif text-2xl md:text-3xl font-medium mb-8">
            The Cuts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((src, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[4/5] overflow-hidden rounded-xl border border-white/5"
              >
                <img
                  src={src}
                  alt={`Clip & Chill Barbershop — ${data.h1} example ${i + 1}`}
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </m.div>
            ))}
          </div>
        </section>

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
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
              </m.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16 md:mb-24" aria-labelledby="faq-heading">
          <span className="sub-label">Common Questions</span>
          <h2 id="faq-heading" className="font-serif text-2xl md:text-3xl font-medium mb-8">
            Frequently Asked Questions
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
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
              Clip & Chill Barbershop
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/40 mb-8">
              <span className="flex items-center gap-2">
                <MapPin size={13} className="text-gold/60" />
                4099 Erin Mills Pkwy #4, Mississauga
              </span>
              <span className="hidden sm:block text-white/20">·</span>
              <span className="flex items-center gap-2">
                <Clock size={13} className="text-gold/60" />
                Mon–Sat 10am–8pm · Sun 11am–7pm
              </span>
              <span className="hidden sm:block text-white/20">·</span>
              <a href="tel:9056062212" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone size={13} className="text-gold/60" />
                (905) 606-2212
              </a>
            </div>

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
                href="https://www.google.com/maps/dir/?api=1&destination=4099+Erin+Mills+Pkwy+%234,+Mississauga,+ON+L5L+3P9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-gold transition-colors"
              >
                <MapPin size={14} />
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
