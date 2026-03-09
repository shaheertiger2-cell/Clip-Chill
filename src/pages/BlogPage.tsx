import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SEO_ARTICLE_PATH = '/best-cheap-haircut-mississauga.md';

interface ArticleMeta {
  title: string;
  description: string;
  author: string;
  readTime: string;
}

function parseFrontmatter(text: string): { meta: ArticleMeta; content: string } {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  let meta: ArticleMeta = {
    title: '',
    description: '',
    author: 'Clip & Chill Barbershop',
    readTime: '',
  };

  if (match) {
    const frontmatter = match[1];
    const titleMatch = frontmatter.match(/title:\s*"(.+?)"/);
    const descMatch = frontmatter.match(/description:\s*"(.+?)"/);
    const authorMatch = frontmatter.match(/author:\s*"(.+?)"/);
    if (titleMatch) meta.title = titleMatch[1];
    if (descMatch) meta.description = descMatch[1];
    if (authorMatch) meta.author = authorMatch[1];
  }

  const content = text.replace(/^---[\s\S]*?---/, '').trim();

  // Estimate read time
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  meta.readTime = `${minutes} min read`;

  return { meta, content };
}

function extractHeadings(markdown: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = markdown.split('\n');
  for (const line of lines) {
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

export default function BlogPage() {
  const [content, setContent] = useState<string>('');
  const [meta, setMeta] = useState<ArticleMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(SEO_ARTICLE_PATH)
      .then(res => res.text())
      .then(text => {
        const { meta, content } = parseFrontmatter(text);
        setMeta(meta);
        setContent(content);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load article:', err);
        setIsLoading(false);
      });
  }, []);

  const headings = content ? extractHeadings(content) : [];

  // Track active section for TOC highlight
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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
      {/* Top navigation bar */}
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
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 hidden md:block">Barber's Journal</span>
            <a
              href="https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury !px-5 !py-2"
            >
              <span>Book Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Article Hero */}
      <header className="pt-28 pb-16 md:pt-36 md:pb-24 bg-dark relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gold">Blog</span>
          </nav>

          {/* Category tag */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/20 rounded-full">
              Grooming Guide
            </span>
          </div>

          {/* Title */}
          {meta && (
            <>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-8">
                {meta.title}
              </h1>

              {/* Description */}
              <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-3xl mb-10 font-light">
                {meta.description}
              </p>

              {/* Meta info */}
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
                  <span>2025</span>
                </div>
              </div>
            </>
          )}

          {/* Divider */}
          <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      </header>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24 md:pb-40">
        <div className="flex gap-12 lg:gap-16">
          {/* Sticky Table of Contents - desktop sidebar */}
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
              </div>
            </aside>
          )}

          {/* Article body */}
          <article className="flex-1 min-w-0">
            {isLoading ? (
              <div className="text-center text-white/40 py-20">Loading article...</div>
            ) : (
              <div className="prose prose-invert prose-lg max-w-none
                prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight
                prose-h1:text-4xl prose-h1:mb-8
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-white prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-4
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-white/90
                prose-p:text-white/50 prose-p:leading-[1.8] prose-p:text-base md:prose-p:text-lg prose-p:mb-6
                prose-strong:text-gold prose-strong:font-semibold
                prose-em:text-white/60 prose-em:italic
                prose-a:text-gold prose-a:no-underline prose-a:border-b prose-a:border-gold/30 hover:prose-a:border-gold prose-a:transition-colors
                prose-li:text-white/50 prose-li:leading-[1.8] prose-li:text-base md:prose-li:text-lg prose-li:marker:text-gold/40
                prose-ol:my-6 prose-ul:my-6
                prose-hr:border-white/5 prose-hr:my-12
              ">
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
                >{content}</ReactMarkdown>
              </div>
            )}

            {/* CTA Card at bottom */}
            <div className="mt-20 glass-panel rounded-2xl p-8 md:p-12 border-gold/10 text-center">
              <span className="sub-label">Ready?</span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">Book Your Next Haircut</h2>
              <p className="text-white/40 mb-8 max-w-lg mx-auto">
                Experience the best value in Mississauga. Premium cuts, affordable prices.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury px-10 py-4 inline-flex items-center justify-center"
                >
                  <span>Book Appointment</span>
                </a>
                <a
                  href="tel:9056062212"
                  className="text-sm text-white/40 hover:text-gold transition-colors"
                >
                  or call (905) 606-2212
                </a>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-white/30 hover:text-gold transition-colors text-sm"
              >
                <ArrowLeft size={14} />
                Back to Clip & Chill
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
