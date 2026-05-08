import { StrictMode, Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import App from './App.tsx';
import BlogPage from './pages/BlogPage.tsx';
import ListiclePage from './pages/ListiclePage.tsx';
import ServicePage from './pages/ServicePage.tsx';
import LocationPage from './pages/LocationPage.tsx';
import { listicles } from './data/listicles.ts';
import { services } from './data/services.ts';
import { locations } from './data/locations.ts';
import './index.css';

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
  return <Navigate to="/" replace />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/:slug" element={<SlugRouter />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
