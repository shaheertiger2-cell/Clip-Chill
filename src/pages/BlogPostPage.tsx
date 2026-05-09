import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Analytics } from '@vercel/analytics/react';
import { trackBookingConversion } from '../analytics';
import { blogs } from '../data/blogs';

const BOOKING_URL = 'https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services';

const MONEY_PAGES = [
  { label: 'Barber Shop Mississauga', slug: 'barber-shop-mississauga' },
  { label: "Men's Haircut", slug: 'mens-haircut-mississauga' },
  { label: 'Skin Fade', slug: 'skin-fade-mississauga' },
  { label: 'Beard Trim', slug: 'beard-trim-mississauga' },
  { label: 'Barbershop Erin Mills', slug: 'barbershop-erin-mills' },
];

interface ArticleMeta {
  title: string;
  description: string;
  author: string;
  readTime: string;
}

function parseFrontmatter(text: string): { meta: ArticleMeta; content: string } {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  const meta: ArticleMeta = {
    title: '',
    description: '',
    author: 'Clip & Chill Barbershop',
    readTime: '',
  };

  if (match) {
    const fm = match[1];
    const titleMatch = fm.match(/title:\s*"(.+?)"/);
    const descMatch = fm.match(/description:\s*"(.+?)"/);
    const authorMatch = fm.match(/author:\s*"(.+?)"/);
    if (titleMatch) meta.title = titleMatch[1];
    if (descMatch) meta.description = descMatch[1];
    if (authorMatch) meta.author = authorMatch[1];
  }

  const content = text.replace(/^---[\s\S]*?---/, '').trim();
  const wordCount = content.split(/\s+/).length;
  meta.readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  return { meta, content };
}

function extractHeadings(markdown: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  for (const line of markdown.split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\*\*/g, '').replace(/"/g, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, text, level });
    }
  }
  return headings;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const blogMeta = slug ? blogs[slug] : null;

  const [content, setContent] = useState<string>('');
  const [meta, setMeta] = useState<ArticleMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  if (!blogMeta) return <Navigate to="/" replace />;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    document.title = `${blogMeta.title} | Clip & Chill Barbershop`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', blogMeta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://clipandchill.ca/${slug}`);
  }, [blogMeta, slug]);

  useEffect(() => {
    fetch(`/${slug}.md`)
      .then(res => res.text())
      .then(text => {
        const parsed = parseFrontmatter(text);
        setMeta(parsed.meta);
        setContent(parsed.content);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [slug]);

  const headings = content ? extractHeadings(content) : [];

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="min-h-screen bg-dark">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm font-medium tracking-wide"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">All Articles</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 hidden md:block">
              Clip &amp; Chill · {blogMeta.category}
            </span>
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
      </div>

      {/* Article hero */}
      <header className="pt-28 pb-16 md:pt-36 md:pb-24 bg-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blog" className="hover:text-gold transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-gold">{blogMeta.category}</span>
          </nav>

          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/20 rounded-full">
              {blogMeta.category}
            </span>
          </div>

          {meta && (
            <>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-8">
                {meta.title}
              </h1>
              <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-3xl mb-10 font-light">
                {meta.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/30">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gold/60" />
                  <span>{meta.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gold/60" />
                  <span>{meta.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gold/60" />
                  <span>{blogMeta.date}</span>
                </div>
              </div>
            </>
          )}

          <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24 md:pb-40">
        <div className="flex gap-12 lg:gap-16">
          {/* Sticky TOC */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-6">
                  In this article
                </h3>
                <nav className="flex flex-col gap-1">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`text-sm leading-relaxed py-1.5 border-l-2 transition-all duration-300 ${
                        h.level === 3 ? 'pl-6' : 'pl-4'
                      } ${
                        activeSection === h.id
                          ? 'border-gold text-gold'
                          : 'border-white/5 text-white/30 hover:text-white/60 hover:border-white/20'
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>

                {/* Sidebar money-page links */}
                <div className="mt-12 pt-8 border-t border-white/5">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-4">
                    Our Services
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {MONEY_PAGES.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to={`/${p.slug}`}
                          className="text-xs text-white/30 hover:text-gold transition-colors leading-relaxed"
                        >
                          → {p.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          )}

          {/* Article */}
          <article className="flex-1 min-w-0">
            {isLoading ? (
              <div className="text-center text-white/40 py-20">Loading article...</div>
            ) : (
              <div className="article-body prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: () => null,
                    h2: ({ children }) => {
                      const text = String(children).replace(/\*\*/g, '');
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return <h2 id={id}>{children}</h2>;
                    },
                    h3: ({ children }) => {
                      const text = String(children).replace(/\*\*/g, '');
                      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return <h3 id={id}>{children}</h3>;
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}

            {/* Related service pages */}
            <div className="mt-16 pt-10 border-t border-white/5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-4">
                Explore Our Service Pages
              </p>
              <div className="flex flex-wrap gap-3">
                {MONEY_PAGES.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/${p.slug}`}
                    className="px-4 py-2 border border-white/10 rounded-full text-xs text-white/40 hover:text-gold hover:border-gold/30 transition-all font-medium"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="mt-12 glass-panel rounded-2xl p-8 md:p-12 border-gold/10 text-center">
              <span className="sub-label">Ready?</span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
                Book Your Next Haircut
              </h2>
              <p className="text-white/40 mb-8 max-w-lg mx-auto">
                Walk-ins welcome daily at 4099 Erin Mills Pkwy #4, Mississauga. Or lock in your preferred barber online.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackBookingConversion}
                  className="btn-luxury px-10 py-4 inline-flex items-center justify-center"
                >
                  <span>Book Appointment</span>
                </a>
                <a href="tel:9056062212" className="text-sm text-white/40 hover:text-gold transition-colors">
                  or call (905) 606-2212
                </a>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/30 hover:text-gold transition-colors text-sm"
              >
                <ArrowLeft size={14} />
                Back to all articles
              </Link>
            </div>
          </article>
        </div>
      </div>
      <Analytics />
    </div>
  );
}
