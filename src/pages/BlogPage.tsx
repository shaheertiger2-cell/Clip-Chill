import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SEO_ARTICLE_PATH = '/best-cheap-haircut-mississauga.md';

export default function BlogPage() {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(SEO_ARTICLE_PATH)
      .then(res => res.text())
      .then(text => {
        const cleanContent = text.replace(/^---[\s\S]*?---/, '');
        setContent(cleanContent);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load article:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      {/* Back navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm font-medium tracking-wide"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <a
            href="https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 border border-gold/30 rounded-full text-gold text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold/10 transition-all"
          >
            Book Now
          </a>
        </div>
      </div>

      {/* Blog content */}
      <section className="pt-24 pb-24 md:pt-32 md:pb-40 bg-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-8">
          <div className="mb-16 md:mb-24 text-center">
            <span className="sub-label">Insights</span>
            <h1 className="section-title">Barber's Journal</h1>
          </div>

          {isLoading ? (
            <div className="text-center text-white/40">Loading...</div>
          ) : (
            <div className="glass-panel p-8 md:p-16 rounded-2xl border-gold/10 hover:border-gold/20 transition-all duration-700">
              <article className="prose prose-invert prose-gold max-w-none prose-headings:font-serif prose-headings:font-medium prose-p:text-white/60 prose-p:leading-relaxed prose-strong:text-gold prose-a:text-gold prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown>{content}</ReactMarkdown>
              </article>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
