import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.tsx';
import BlogPage from './pages/BlogPage.tsx';
import ListiclePage from './pages/ListiclePage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/:slug" element={<ListiclePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
