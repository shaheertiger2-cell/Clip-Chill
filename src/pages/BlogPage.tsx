import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { trackBookingConversion } from '../analytics';
import { blogList } from '../data/blogs';
import { useSeo, useJsonLd } from '../lib/seo';
import { blogIndexSchemas } from '../lib/schema';

const BOOKING_URL = 'https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services';

const CATEGORY_COLORS: Record<string, string> = {
  'Local Guide': 'text-blue-400 border-blue-400/30',
  'Grooming Guide': 'text-gold border-gold/30',
  'Style Guide': 'text-emerald-400 border-emerald-400/30',
  'Pricing Guide': 'text-purple-400 border-purple-400/30',
};

function estimateReadTime(slug: string): string {
  // Rough estimates per article length
  const times: Record<string, string> = {
    'best-cheap-haircut-mississauga': '7 min read',
    'best-barber-shop-erin-mills': '5 min read',
    'skin-fade-vs-taper-fade': '5 min read',
    'how-often-should-men-get-a-haircut': '4 min read',
    'best-haircuts-for-men-mississauga': '5 min read',
    'beard-trim-guide': '5 min read',
    'barber-shop-near-erin-mills-town-centre': '4 min read',
    'mens-haircut-cost-mississauga': '5 min read',
  };
  return times[slug] ?? '5 min read';
}

export default function BlogPage() {
  const [featured, ...rest] = blogList;

  useSeo({
    title: 'Barbershop & Grooming Blog | Clip & Chill Mississauga',
    description:
      'Expert grooming guides, haircut advice, and local barbershop tips from Clip & Chill in Erin Mills, Mississauga — fades, beard care, pricing, and more.',
    path: '/blog',
  });

  useJsonLd('blog-index-ld', blogIndexSchemas(blogList));

  return (
    <div className="min-h-screen bg-dark">
      {/* Top bar */}
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

      {/* Hero */}
      <header className="pt-28 pb-16 md:pt-36 md:pb-24 bg-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 text-center">
          <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gold border border-gold/20 rounded-full mb-8">
            Barber's Journal
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-tight mb-6">
            Grooming Guides &amp; Local Advice
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
            Practical advice from our barbers — on fades, beards, haircut schedules, and finding the right shop in Mississauga.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24 md:pb-40">
        {/* Featured post */}
        {featured && (
          <Link
            to={`/${featured.slug}`}
            className="group block mb-16 glass-panel p-8 md:p-12 hover:border-gold/20 transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] border rounded-full px-3 py-1 ${CATEGORY_COLORS[featured.category] ?? 'text-white/40 border-white/10'}`}>
                    {featured.category}
                  </span>
                  <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">Featured</span>
                </div>
                <h2 className="font-serif text-2xl md:text-4xl font-medium tracking-tight mb-4 group-hover:text-gold transition-colors duration-500 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-white/40 leading-relaxed max-w-2xl font-light mb-6">
                  {featured.description}
                </p>
                <div className="flex items-center gap-5 text-xs text-white/25">
                  <span className="flex items-center gap-1.5"><Calendar size={11} />{featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={11} />{estimateReadTime(featured.slug)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 group-hover:text-gold transition-colors shrink-0 md:mt-2">
                Read Article
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to={`/${post.slug}`}
              className="group glass-panel p-7 flex flex-col hover:border-gold/20 transition-all duration-500"
            >
              <span className={`text-[9px] font-bold uppercase tracking-[0.2em] border rounded-full px-2.5 py-1 self-start mb-5 ${CATEGORY_COLORS[post.category] ?? 'text-white/40 border-white/10'}`}>
                {post.category}
              </span>
              <h2 className="font-serif text-xl font-medium tracking-tight mb-3 group-hover:text-gold transition-colors duration-500 leading-snug flex-1">
                {post.title}
              </h2>
              <p className="text-white/30 text-sm leading-relaxed font-light mb-6 line-clamp-3">
                {post.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                <div className="flex items-center gap-4 text-[10px] text-white/20">
                  <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{estimateReadTime(post.slug)}</span>
                </div>
                <ArrowRight size={12} className="text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="glass-panel p-10 md:p-16 max-w-2xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 mb-4">Ready to Book?</p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
              Walk-ins welcome. <br />
              <span className="italic text-white/40">Book online to lock in your barber.</span>
            </h2>
            <p className="text-white/30 text-sm mb-8 font-light">
              4099 Erin Mills Pkwy #4 · Mon–Sat 10am–8pm · Sun 11am–7pm
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackBookingConversion}
              className="btn-luxury px-12 py-5 inline-flex items-center justify-center"
            >
              <span>Book Appointment</span>
            </a>
          </div>
        </div>
      </div>
      <Analytics />
    </div>
  );
}
