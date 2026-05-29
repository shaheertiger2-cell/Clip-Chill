import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { listicles, type Barbershop } from '../data/listicles';
import { trackBookingConversion } from '../analytics';
import { useSeo, useJsonLd, type SeoConfig } from '../lib/seo';
import { listicleSchemas } from '../lib/schema';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'fill-gold text-gold' : 'text-white/10'}
        />
      ))}
    </span>
  );
}

function PriceTag({ price }: { price: '$' | '$$' | '$$$' }) {
  return (
    <span className="text-xs text-white/40 font-mono">
      {['$', '$$', '$$$'].map((p, i) => (
        <span key={i} className={p.length <= price.length ? 'text-gold' : ''}>
          {'$'}
        </span>
      ))}
    </span>
  );
}

// ─── ShopCard ────────────────────────────────────────────────────────────────

function ShopCard({ shop, rank }: { shop: Barbershop; rank: number }) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? shop.reviews : shop.reviews.slice(0, 2);

  return (
    <article
      id={`rank-${rank}`}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
        shop.featured
          ? 'border border-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.06)]'
          : 'border border-white/5'
      }`}
    >
      {/* Featured badge */}
      {shop.featured && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
      )}

      <div className="p-6 md:p-8 bg-dark-surface">
        {/* Header row */}
        <div className="flex items-start gap-4 mb-6">
          {/* Rank badge */}
          <div
            className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-serif font-medium text-xl ${
              rank === 1
                ? 'bg-gold/10 text-gold border border-gold/30'
                : 'bg-white/5 text-white/40 border border-white/10'
            }`}
          >
            #{rank}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="font-serif text-xl md:text-2xl font-medium text-white">{shop.name}</h2>
              {shop.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] bg-gold/10 text-gold border border-gold/20 rounded-full">
                  Editor's Pick
                </span>
              )}
            </div>

            {/* Rating row */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <StarRating rating={shop.rating} />
              <span className="font-bold text-gold">{shop.rating.toFixed(1)}</span>
              <span className="text-white/30">({shop.reviewCount.toLocaleString()} reviews)</span>
              <PriceTag price={shop.priceRange} />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6">{shop.description}</p>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-start gap-2 text-sm text-white/40">
            <MapPin size={14} className="text-gold/60 mt-0.5 shrink-0" />
            <span>{shop.address}</span>
          </div>
          {shop.phone && (
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Phone size={14} className="text-gold/60 shrink-0" />
              <a href={`tel:${shop.phone.replace(/\D/g, '')}`} className="hover:text-gold transition-colors">
                {shop.phone}
              </a>
            </div>
          )}
          <div className="flex items-start gap-2 text-sm text-white/40 sm:col-span-2">
            <Clock size={14} className="text-gold/60 mt-0.5 shrink-0" />
            <span>{shop.hours}</span>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-6">
          {shop.specialties.map((s) => (
            <span key={s} className="px-3 py-1 text-[11px] font-medium text-white/50 border border-white/8 rounded-full">
              {s}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
          {shop.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2 text-sm text-white/40">
              <CheckCircle2 size={14} className="text-gold/60 mt-0.5 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Reviews */}
        <div className="mb-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-4">
            Customer Reviews
          </h3>
          <div className="flex flex-col gap-4">
            {visibleReviews.map((review, i) => (
              <div key={i} className="rounded-xl bg-white/[0.02] border border-white/5 p-4 md:p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-sm font-medium text-white/70">{review.author}</span>
                    <span className="text-xs text-white/25 ml-2">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <StarRating rating={review.rating} size={11} />
                    <span className="text-xs text-white/25 font-mono">{review.source}</span>
                  </div>
                </div>
                <p className="text-sm text-white/40 leading-relaxed italic">"{review.text}"</p>
              </div>
            ))}
          </div>

          {shop.reviews.length > 2 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="mt-3 text-xs text-gold/60 hover:text-gold transition-colors flex items-center gap-1"
            >
              {showAllReviews ? 'Show fewer' : `Show all ${shop.reviews.length} reviews`}
              <ChevronDown size={12} className={`transition-transform ${showAllReviews ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          {shop.featured && shop.bookingUrl ? (
            <a
              href={shop.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackBookingConversion}
              className="btn-luxury !px-6 !py-3 inline-flex items-center gap-2"
            >
              <span>Book Appointment</span>
            </a>
          ) : null}
          {shop.mapsUrl && (
            <a
              href={shop.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 border border-white/10 rounded hover:border-white/20 hover:text-white/60 transition-all"
            >
              <MapPin size={12} />
              <span>Get Directions</span>
              <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
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

// ─── Quick Nav ───────────────────────────────────────────────────────────────

function QuickNav({ shops }: { shops: Barbershop[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {shops.map((shop) => (
        <a
          key={shop.rank}
          href={`#rank-${shop.rank}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 border border-white/8 rounded-full hover:border-gold/30 hover:text-gold/70 transition-all"
        >
          <span className="text-white/20">#{shop.rank}</span>
          <span>{shop.name}</span>
        </a>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ListiclePage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? listicles[slug] : undefined;

  const seoConfig: SeoConfig = {
    title: data?.metaTitle ?? 'Clip & Chill Barbershop | Mississauga',
    description: data?.metaDescription ?? 'Premium haircuts and grooming in Mississauga.',
    path: data ? `/${data.slug}` : '/',
    type: 'article',
  };
  useSeo(seoConfig);

  useJsonLd('listicle-ld', data ? listicleSchemas(data) : []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return <Navigate to="/" replace />;

  const featuredShop = data.shops.find((s) => s.featured);

  return (
    <div className="min-h-screen bg-dark">
      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm font-medium tracking-wide"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 hidden md:block">
              Local Guide
            </span>
            {featuredShop?.bookingUrl && (
              <a
                href={featuredShop.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackBookingConversion}
                className="btn-luxury !px-5 !py-2"
              >
                <span>Book Now</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="pt-28 pb-14 md:pt-36 md:pb-20 bg-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/4 rounded-full blur-[160px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/25 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/40">Guides</span>
            <ChevronRight size={12} />
            <span className="text-gold truncate max-w-[200px]">{data.neighborhood}</span>
          </nav>

          {/* Category tag */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/20 rounded-full">
              {data.category} Guide · {data.city}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
            {data.h1}
          </h1>

          <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-3xl mb-8 font-light">
            {data.intro}
          </p>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/25 mb-10">
            <span>Updated {new Date(data.updatedDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long' })}</span>
            <span>·</span>
            <span>{data.shops.length} barbershops reviewed</span>
            <span>·</span>
            <span>Ranked by Google reviews</span>
          </div>

          {/* Quick nav */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-3 font-bold">Jump to</p>
            <QuickNav shops={data.shops} />
          </div>

          <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      </header>

      {/* Rankings */}
      <main className="max-w-4xl mx-auto px-6 md:px-8 pb-20">
        {/* Methodology note */}
        <div className="mb-10 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5">
          <p className="text-xs text-white/30 leading-relaxed">
            <span className="text-white/50 font-medium">How we ranked: </span>
            {data.methodology}
          </p>
        </div>

        {/* Shop list */}
        <div className="flex flex-col gap-8 mb-20">
          {data.shops.map((shop) => (
            <ShopCard key={shop.rank} shop={shop} rank={shop.rank} />
          ))}
        </div>

        {/* FAQ Section */}
        <section className="mb-20" aria-labelledby="faq-heading">
          <div className="mb-8">
            <span className="sub-label">Common Questions</span>
            <h2 id="faq-heading" className="font-serif text-2xl md:text-3xl font-medium">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="rounded-2xl border border-white/5 px-6 md:px-8 py-2 bg-dark-surface">
            {data.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        {featuredShop && (
          <div className="glass-panel rounded-2xl p-8 md:p-12 border-gold/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative">
              <span className="sub-label">Our Top Pick</span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3">
                {featuredShop.name}
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <StarRating rating={featuredShop.rating} size={16} />
                <span className="text-gold font-bold">{featuredShop.rating.toFixed(1)}</span>
                <span className="text-white/30 text-sm">({featuredShop.reviewCount.toLocaleString()} reviews)</span>
              </div>
              <p className="text-white/40 mb-8 max-w-lg mx-auto text-sm md:text-base">
                {featuredShop.address}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {featuredShop.bookingUrl && (
                  <a
                    href={featuredShop.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackBookingConversion}
                    className="btn-luxury px-10 py-4 inline-flex items-center justify-center"
                  >
                    <span>Book Appointment</span>
                  </a>
                )}
                {featuredShop.phone && (
                  <a
                    href={`tel:${featuredShop.phone.replace(/\D/g, '')}`}
                    className="text-sm text-white/40 hover:text-gold transition-colors"
                  >
                    or call {featuredShop.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

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

