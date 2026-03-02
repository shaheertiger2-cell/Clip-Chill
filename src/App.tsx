import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  Award,
  Users,
  ArrowRight,
  ExternalLink,
  ArrowUpRight,
  Play
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Team', href: '#team' },
    { name: 'About', href: '#about' },
  ];

  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2);

  const bookingUrl = "https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${isScrolled ? 'bg-dark/90 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between relative h-20">
        
        {/* Left Side (Desktop Links) */}
        <div className="hidden md:flex flex-1 items-center gap-12">
          {leftLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-gold transition-all duration-500"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Spacer (Left) */}
        <div className="md:hidden flex-1" />

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-50">
          <a href="#" className="flex items-center gap-4 group">
            <img 
              src="https://i.postimg.cc/gJWNVrk0/Company_logo_page_0001.jpg" 
              alt="Clip & Chill Logo" 
              className="h-20 md:h-28 w-auto object-contain brightness-110 rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* Right Side (Desktop Links + Button) */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-12">
          {rightLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-gold transition-all duration-500"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury"
          >
            <span>Book Now</span>
          </a>
        </div>

        {/* Mobile Toggle (Right) */}
        <div className="md:hidden flex-1 flex justify-end">
          <button className="text-white relative z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-dark/95 backdrop-blur-3xl z-50 md:hidden flex flex-col items-center justify-center p-12"
          >
            <button className="absolute top-8 right-8" onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-serif font-medium hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury mt-8"
              >
                <span>Book Appointment</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background Image */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
          alt="Atmospheric Barbershop" 
          className="w-full h-full object-cover opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/20 to-dark" />
      </motion.div>

      <div className="relative z-10 text-center px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="pt-52 md:pt-64"
        >
          <span className="sub-label mb-8">Established 2024</span>
          <h1 className="font-serif text-5xl md:text-9xl font-medium mb-10 leading-[1.1] tracking-tight text-glow">
            The Art of <br />
            <span className="italic text-white/40">Refinement.</span>
          </h1>
          
          <p className="text-white/50 text-lg md:text-xl mb-14 max-w-2xl mx-auto leading-relaxed font-light">
            Experience a masterclass in grooming. We blend heritage techniques with modern aesthetics to define your unique character.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a 
              href="https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury px-12 py-5 inline-flex items-center justify-center"
            >
              <span>Secure Your Seat</span>
            </a>
            <a 
              href="#services" 
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-gold transition-all"
            >
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 opacity-20"
      >
        <span className="text-[8px] uppercase tracking-[0.5em] font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};

const Services = () => {
  const categories = [
    {
      title: "The Cuts",
      items: [
        { name: "Standard Haircut", price: "$30", time: "30m" },
        { name: "Long Haircut", price: "$35", time: "45m" },
        { name: "Kid's Cut", price: "$25", time: "30m" },
        { name: "Senior Cut", price: "$25", time: "30m" },
      ]
    },
    {
      title: "The Grooming",
      items: [
        { name: "Haircut + Beard", price: "$50", time: "60m" },
        { name: "Beard Trim", price: "$25", time: "20m" },
        { name: "Hot Towel Shave", price: "$25", time: "30m" },
        { name: "Full Package", price: "$110", time: "90m" },
      ]
    }
  ];

  return (
    <section id="services" className="py-40 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <span className="sub-label">Our Menu</span>
            <h2 className="section-title">Crafted Services</h2>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              Every appointment begins with a professional consultation to ensure your style matches your lifestyle.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-32">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-[11px] uppercase tracking-[0.8em] text-gold/40 font-bold mb-16 flex items-center gap-6">
                {cat.title}
                <div className="h-px flex-grow bg-white/5" />
              </h3>
              <div className="space-y-16">
                {cat.items.map((item) => (
                  <div key={item.name} className="group relative">
                    <div className="flex justify-between items-baseline mb-4">
                      <h4 className="font-serif text-3xl font-medium group-hover:text-gold transition-colors duration-700">{item.name}</h4>
                      <span className="font-mono text-gold text-sm">{item.price}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">{item.time}</span>
                      <div className="h-px w-0 group-hover:w-16 bg-gold/30 transition-all duration-700" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <section id="gallery" className="py-40 bg-dark">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <span className="sub-label">The Showcase</span>
          <h2 className="section-title">Visual Identity</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="img-reveal aspect-[4/5] glass-panel"
            >
              <img 
                src={src} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const barbers = [
    { name: "Clark R.", role: "Master Artisan", rating: "5.0 ★ (4 Reviews)" },
    { name: "Ahmad F.", role: "Senior Barber", rating: "5.0 ★ (19 Reviews)" },
    { name: "Sido", role: "Specialist", rating: "Available Tomorrow" },
  ];

  return (
    <section id="team" className="py-40 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-24">
          <span className="sub-label">The Artisans</span>
          <h2 className="section-title">The Team</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {barbers.map((barber, i) => (
            <motion.div 
              key={barber.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-panel p-12 group hover:border-gold/30 transition-all duration-700"
            >
              <h3 className="font-serif text-4xl font-medium mb-4 group-hover:text-gold transition-colors duration-700">{barber.name}</h3>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold/60 font-bold mb-4">{barber.role}</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">{barber.rating}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark pt-40 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-32">
          <a href="#" className="mb-12">
            <img 
              src="https://i.postimg.cc/gJWNVrk0/Company_logo_page_0001.jpg" 
              alt="Clip & Chill Logo" 
              className="h-20 md:h-24 w-auto object-contain brightness-110 rounded-xl"
              referrerPolicy="no-referrer"
            />
          </a>
          <p className="text-white/40 text-sm leading-relaxed font-light max-w-xl mb-12">
            Redefining the modern grooming experience. We combine timeless techniques with contemporary aesthetics to define your character.
          </p>
          <div className="flex gap-8 mb-24">
            <a href="https://www.instagram.com/clip.and.chill/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href="https://www.facebook.com/profile.php?id=61571956989946" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-gold transition-colors"><Facebook size={20} /></a>
          </div>

          <div className="grid md:grid-cols-3 gap-24 w-full pt-24 border-t border-white/5">
            <div>
              <h4 className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-10">Visit</h4>
              <div className="space-y-6 text-sm text-white/40 font-light">
                <p>4099 Erin Mills Pkwy #4<br />Mississauga, ON L5L 3P9</p>
                <p>(905) 606-2212</p>
              </div>
            </div>
            <div>
              <h4 className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-10">Hours</h4>
              <div className="space-y-4 text-sm text-white/40 font-light">
                <p>Mon - Sat: 11:00 - 20:00</p>
                <p>Sunday: 11:00 - 20:00</p>
              </div>
            </div>
            <div>
              <h4 className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-10">Newsletter</h4>
              <p className="text-white/40 text-sm mb-8 font-light">Join our inner circle for grooming tips.</p>
              <div className="relative max-w-xs mx-auto">
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/5 px-6 py-4 outline-none focus:border-gold/30 text-sm font-light transition-all" />
                <button className="absolute right-2 top-2 bottom-2 bg-gold/10 text-gold px-6 font-bold uppercase text-[9px] tracking-widest hover:bg-gold hover:text-dark transition-all">Join</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold">
            © 2024 Clip & Chill Barbershop. All Rights Reserved.
          </p>
          <div className="flex gap-10 text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      
      <section id="about" className="py-40 bg-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="img-reveal glass-panel"
          >
            <img 
              src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1000" 
              alt="Craftsmanship" 
              className="w-full h-auto grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="sub-label">Our Story</span>
            <h2 className="section-title mb-10">Heritage Meets <br /><span className="italic text-white/40">Modernity.</span></h2>
            <p className="text-white/50 text-lg mb-8 leading-relaxed font-light">
              Clip & Chill was founded on a simple principle: every man deserves a sanctuary where he can recharge and leave looking his absolute best. 
            </p>
            <p className="text-white/30 mb-12 leading-relaxed font-light">
              We've combined the timeless atmosphere of a classic barbershop with the precision of modern grooming. Our master artisans don't just cut hair; they craft styles that reflect your character.
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <span className="text-4xl font-serif font-medium text-gold">5.0</span>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">Google Rating</p>
              </div>
              <div className="space-y-4">
                <span className="text-4xl font-serif font-medium text-gold">404</span>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">Total Reviews</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Services />
      <Gallery />
      <Team />
      
      {/* CTA Section */}
      <section className="py-40 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
            alt="CTA Background" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title mb-10">Ready for the <br />Experience?</h2>
            <p className="text-white/40 text-lg mb-16 font-light">Join the hundreds of gentlemen who trust us with their style.</p>
            <a 
              href="https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury px-16 py-6 inline-flex items-center justify-center"
            >
              <span>Book Your Appointment</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
