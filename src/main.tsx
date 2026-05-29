import { StrictMode, Component, Suspense, lazy, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'motion/react';
import App from './App.tsx';
import { listicles } from './data/listicles.ts';
import { services } from './data/services.ts';
import { locations } from './data/locations.ts';
import { blogs } from './data/blogs.ts';
import './index.css';

// Homepage (App) stays eager for fast first paint / LCP. The secondary routes
// are code-split so their code — and heavier deps like react-markdown — stays
// out of the initial bundle.
const BlogPage = lazy(() => import('./pages/BlogPage.tsx'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage.tsx'));
const ListiclePage = lazy(() => import('./pages/ListiclePage.tsx'));
const ServicePage = lazy(() => import('./pages/ServicePage.tsx'));
const LocationPage = lazy(() => import('./pages/LocationPage.tsx'));

function RouteFallback() {
  return <div style={{ minHeight: '100vh', background: '#0a0a0a' }} aria-hidden="true" />;
}

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '16px', fontFamily: 'monospace', color: '#fff', background: '#0a0a0a', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.2rem', color: '#d4af37' }}>Something went wrong</h1>
          <pre style={{ fontSize: '0.75rem', color: '#ff6b6b', maxWidth: '90vw', overflowX: 'auto', whiteSpace: 'pre-wrap', background: '#1a1a1a', padding: '1rem', borderRadius: '8px' }}>
            {(this.state.error as Error)?.message}
            {'\n'}
            {(this.state.error as Error)?.stack?.split('\n').slice(0, 5).join('\n')}
          </pre>
          <a href="/" style={{ color: '#d4af37' }}>← Return home</a>
        </div>
      );
    }
    return this.props.children;
  }
}

function SlugRouter() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/" replace />;
  if (slug in listicles) return <ListiclePage />;
  if (slug in services) return <ServicePage />;
  if (slug in locations) return <LocationPage />;
  if (slug in blogs) return <BlogPostPage />;
  return <Navigate to="/" replace />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <LazyMotion features={domAnimation} strict>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/:slug" element={<SlugRouter />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LazyMotion>
    </ErrorBoundary>
  </StrictMode>,
);
