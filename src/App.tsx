import React, { useState, useEffect } from 'react';
import {
  Instagram,
  Facebook,
  Menu,
  X,
  Star,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Team', href: '#team' },
    { name: 'About', href: '#about' },
  ];

  const mobileNavLinks = [
    { name: 'Home', href: '#' },
    ...navLinks,
  ];

  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2);

  const bookingUrl = "https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-dark/95 md:bg-dark/90 md:backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between relative h-20">
        
        {/* Left Side (Desktop Links) */}
        <div className="hidden md:flex flex-1 items-center gap-12">
          {leftLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-gold transition-all duration-500"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Spacer (Left) */}
        <div className="md:hidden flex-1" />

        {/* Center Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-50"
        >
          <a href="#" className="flex items-center gap-4 group">
            <img 
              src="https://i.postimg.cc/gJWNVrk0/Company_logo_page_0001.jpg" 
              alt="Clip & Chill Logo" 
              className="h-20 md:h-28 w-auto object-contain brightness-110 rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </a>
        </motion.div>

        {/* Right Side (Desktop Links + Button) */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-12">
          {rightLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-gold transition-all duration-500"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a 
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="btn-luxury"
          >
            <span>Book Now</span>
          </motion.a>
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
            className="fixed inset-0 bg-dark/98 z-[200] md:hidden flex flex-col items-center justify-center p-12"
          >
            <button className="absolute top-8 right-8 text-white p-2" onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            <div className="flex flex-col items-center gap-10">
              {mobileNavLinks.map((link) => (
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
                <span>Book a Haircut</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const Hero = () => {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, isMobile ? 0 : 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, isMobile ? 1 : 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden bg-dark">
      {/* Background Image */}
      <motion.div style={isMobile ? undefined : { y, opacity }} className="absolute inset-0 z-0">
        <img
          src="https://i.postimg.cc/wMfhtjbn/DSC04689.jpg"
          alt="Clip & Chill Barbershop interior in Mississauga"
          className="w-full h-full object-cover opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/20 to-dark" />
      </motion.div>

      <div className="relative z-10 text-center px-8 max-w-5xl">
        <div className="py-20 md:py-0 pb-32 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="sub-label mb-8 block">Established 2024</span>
            <h1 className="font-serif text-4xl md:text-8xl lg:text-9xl font-medium mb-6 md:mb-10 leading-[1.1] tracking-tight text-glow">
              Modern Haircuts & <br />
              <span className="italic text-white/40">Classic Shaves.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 text-base md:text-xl mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Get a professional haircut in a relaxed atmosphere. We combine classic techniques with modern styles to keep you looking your best.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <a 
              href="https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury px-12 py-5 inline-flex items-center justify-center"
            >
              <span>Book a Haircut</span>
            </a>
            <a 
              href="#services" 
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-gold transition-all"
            >
              See Haircuts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </div>
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
  const services = [
    { name: "Haircut", price: "$30", time: "30min", description: "A clean, professional cut that fits your style." },
    { name: "Beard Trim", price: "$25", time: "15min", description: "Keep your beard looking sharp and well-maintained." },
    { name: "Haircut and Beard", price: "$50", time: "45min", description: "A fresh haircut combined with a professional beard trim." },
    { name: "Long Haircut", price: "$35", time: "30min", description: "For longer hair or more detailed styles." },
    { name: "Kid's Cut (Under 10 Years)", price: "$25", time: "30min", description: "A great haircut experience for kids." },
    { name: "Senior Haircut", price: "$25", time: "30min", description: "Traditional haircuts for seniors." },
    { name: "Hot Towel Shave", price: "$25", time: "30min", description: "A classic straight-razor shave with a relaxing hot towel." },
    { name: "Face Wax", price: "$10", time: "15min", description: "Complete face, ear, and nose waxing for a clean, polished look." },
    { name: "Clip & Chill Package", price: "$110", time: "1h 30min", description: "The full experience: haircut, beard trim, hot towel shave, skin care, facial, shoulder massage, face wax, face threading, and hair wash & styling." },
  ];

  const renderServiceItem = (item: typeof services[0], idx: number) => (
    <motion.div
      key={item.name}
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: idx * 0.05
          }
        }
      }}
      whileHover={{ x: 10 }}
      className="group relative cursor-default"
    >
      <div className="flex justify-between items-baseline mb-2">
        <h4 className="font-serif text-3xl font-medium group-hover:text-gold transition-all duration-700 flex items-center gap-4">
          <motion.span
            variants={{
              hidden: { width: 0 },
              visible: { width: '2rem', transition: { delay: 0.5 + idx * 0.1, duration: 0.8 } }
            }}
            className="h-px bg-gold group-hover:w-12 transition-all duration-700"
          />
          {item.name}
        </h4>
        <motion.span
          variants={{
            hidden: { opacity: 0, x: 10 },
            visible: { opacity: 0.6, x: 0, transition: { delay: 0.8 + idx * 0.1 } }
          }}
          className="font-mono text-gold text-sm group-hover:opacity-100 transition-opacity duration-700"
        >
          {item.price}
        </motion.span>
      </div>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.6 + idx * 0.1 } }
        }}
        className="text-white/30 text-xs mb-4 font-light leading-relaxed max-w-sm group-hover:text-white/60 transition-colors duration-700 pl-12"
      >
        {item.description}
      </motion.p>

      <div className="flex items-center gap-4 pl-12">
        <motion.span
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.9 + idx * 0.1 } }
          }}
          className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold group-hover:text-gold/40 transition-colors duration-700"
        >
          {item.time}
        </motion.span>
        <motion.div
          variants={{
            hidden: { width: 0 },
            visible: { width: '6rem', transition: { delay: 1 + idx * 0.1, duration: 1 } }
          }}
          className="h-px bg-gradient-to-r from-gold/40 to-transparent transition-all duration-1000 group-hover:w-32"
        />
      </div>
    </motion.div>
  );

  return (
    <section id="services" className="py-24 md:py-40 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-32 gap-12">
          <div className="max-w-2xl">
            <span className="sub-label">What We Offer</span>
            <h2 className="section-title">Services & Pricing</h2>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              We take the time to understand exactly how you want your hair to look before we start.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            <div className="space-y-16">
              {services.slice(0, 5).map((item, idx) => renderServiceItem(item, idx))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            <div className="space-y-16">
              {services.slice(5).map((item, idx) => renderServiceItem(item, idx))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://i.postimg.cc/PrCTsKZW/0b56f814_0303_4bd9_9946_66768e49f495.jpg",
    "https://i.postimg.cc/5ND1xvqL/213b9583_0fc3_4c76_bcf1_63b6e74bddbe.jpg",
    "https://i.postimg.cc/658tJzRV/25563b0a_a068_4adb_ae17_de88b11e9a41.jpg",
    "https://i.postimg.cc/SNnkFV8C/7a5159e7_3675_43b8_bbcb_6d9b5d031314.jpg",
    "https://i.postimg.cc/fT1ZwXj9/b380c194_9ed1_470a_8b51_d9ba39318eac.jpg",
    "https://i.postimg.cc/sDbyVS9G/d234214d_eae2_4220_be5e_1a625047ff5d.jpg",
    "https://i.postimg.cc/c4v0yTYf/D23B18A6_E7F2_425B_BEC3_40F071CC7364.jpg",
  ];

  return (
    <section id="gallery" className="py-24 md:py-40 bg-dark">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16 md:mb-24">
          <span className="sub-label">The Showcase</span>
          <h2 className="section-title">Our Work</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {images.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 1, 
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="img-reveal aspect-[4/5] glass-panel"
            >
              <img
                src={src}
                alt={`Clip & Chill Barbershop customer haircut ${i + 1}`}
                className="w-full h-full object-cover md:opacity-60 md:hover:opacity-100 md:grayscale md:hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                decoding="async"
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
    { 
      name: "Clark R.", 
      role: "Senior Barber", 
      image: "https://i.postimg.cc/Hs0mC8FD/Clark-R.jpg"
    },
    { 
      name: "Ahmad F.", 
      role: "Senior Barber", 
      image: "https://i.postimg.cc/y8vzD4VG/Ahmad_F.jpg"
    },
    { 
      name: "Sido", 
      role: "Senior Barber", 
      image: "https://i.postimg.cc/D0LT0SZG/Sido.jpg"
    },
  ];

  return (
    <section id="team" className="py-24 md:py-40 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16 md:mb-24">
          <span className="sub-label">The Experts</span>
          <h2 className="section-title">Our Barbers</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {barbers.map((barber, i) => (
            <motion.div 
              key={barber.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.2, 
                delay: i * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="glass-panel group hover:border-gold/30 transition-all duration-700 overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/5] overflow-hidden md:grayscale md:group-hover:grayscale-0 transition-all duration-1000">
                <img
                  src={barber.image}
                  alt={`${barber.name} - ${barber.role} at Clip & Chill Barbershop`}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.5 }
                  }
                }}
                className="p-12"
              >
                <motion.h3 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="font-serif text-4xl font-medium mb-4 group-hover:text-gold transition-colors duration-700"
                >
                  {barber.name}
                </motion.h3>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-[10px] uppercase tracking-[0.4em] text-gold/60 font-bold"
                >
                  {barber.role}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  return (
    <section id="location" className="py-24 md:py-40 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16 md:mb-24">
          <span className="sub-label">Find Us</span>
          <h2 className="section-title">The Location</h2>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel overflow-hidden aspect-[16/9] md:aspect-[21/9] relative group"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.42239634568!2d-79.6976644!3d43.5352458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b439506666667%3A0x6666666666666666!2s4099%20Erin%20Mills%20Pkwy%20%234%2C%20Mississauga%2C%20ON%20L5L%203P9!5e0!3m2!1sen!2sca!4v1710000000000!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 pointer-events-none border border-white/5" />
        </motion.div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    {
      name: "Arjun Talwar",
      initials: "AT",
      date: "3 hours ago",
      rating: 5,
      text: "Amazing saloon!!!!!"
    },
    {
      name: "ali mohamad",
      initials: "AM",
      date: "5 hours ago",
      rating: 5,
      text: "Amazing barber shop very nice service and very professional"
    },
    {
      name: "Shaikh Nazeef",
      initials: "SN",
      date: "3 days ago",
      rating: 5,
      text: "Top notch customer service, Hands down the best barber shop in Mississauga !!"
    },
    {
      name: "P Jaswal",
      initials: "PJ",
      date: "4 days ago",
      rating: 5,
      text: "Got a great cut from Ahmad at a great price. The hours are Great too as they work with my hectic schedule. Can't ask for more. On top of that, the place is clean and modern. Will definitely be back soon."
    },
  ];

  return (
    <section id="reviews" className="py-24 md:py-40 bg-[#f8f8f8] text-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-6 uppercase"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark/60 max-w-2xl mx-auto font-light"
          >
            Hear from clients who've experienced the luxury, precision, and service that make Clip & Chill a top choice in Mississauga.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="text-5xl md:text-6xl font-serif font-medium">5.00</div>
            <div>
              <div className="flex text-gold mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" stroke="none" />)}
              </div>
              <div className="text-[10px] text-dark/40 uppercase tracking-[0.3em] font-bold">406 reviews</div>
            </div>
          </div>
          <a 
            href="https://www.google.com/search?q=clip+and+chill+barbershop+mississauga+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-dark text-white px-10 py-5 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-gold hover:text-dark transition-all shadow-xl"
          >
            Write a review
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 shadow-sm border border-black/5 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gold text-lg">5</span>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" stroke="none" />)}
                    </div>
                  </div>
                  <span className="text-[10px] text-dark/30 font-medium">{review.date}</span>
                </div>
              </div>
              
              <p className="text-dark/70 text-sm font-light leading-relaxed mb-8 flex-grow">
                {review.text}
                {review.text.length > 100 && (
                  <button className="text-gold font-medium ml-1 hover:underline">More</button>
                )}
              </p>

              <div className="flex justify-between items-center mt-auto pt-6 border-t border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-dark/5 flex items-center justify-center text-dark/40 font-bold text-xs">
                    {review.initials}
                  </div>
                  <span className="text-xs font-bold text-dark/60">{review.name}</span>
                </div>
                <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-60" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button className="text-[10px] font-bold uppercase tracking-[0.4em] text-dark/30 hover:text-dark transition-colors mb-20">Load More</button>
          <div className="pt-12 border-t border-black/5">
            <a 
              href="https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark text-white px-16 py-6 font-bold uppercase text-[11px] tracking-[0.4em] hover:bg-gold hover:text-dark transition-all inline-block shadow-2xl"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark pt-24 md:pt-40 pb-24 md:pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-32">
          <a href="#" className="mb-12">
            <img
              src="https://i.postimg.cc/gJWNVrk0/Company_logo_page_0001.jpg"
              alt="Clip & Chill Logo"
              className="h-20 md:h-24 w-auto object-contain brightness-110 rounded-xl"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </a>
          <p className="text-white/40 text-sm leading-relaxed font-light max-w-xl mb-12">
            A modern barbershop focused on quality haircuts and classic service. We help you look your best every day.
          </p>
          <div className="flex gap-8 mb-12 md:mb-24">
            <a href="https://www.instagram.com/clip.and.chill/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href="https://www.facebook.com/profile.php?id=61571956989946" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-gold transition-colors"><Facebook size={20} /></a>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24 w-full pt-24 border-t border-white/5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h4 className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-10">Visit</h4>
              <div className="space-y-6 text-sm text-white/40 font-light">
                <p>4099 Erin Mills Pkwy #4<br />Mississauga, ON L5L 3P9</p>
                <p>(905) 606-2212</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h4 className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-10">Hours</h4>
              <div className="space-y-4 text-sm text-white/40 font-light">
                <p>Mon - Sat: 10:00 - 20:00</p>
                <p>Sunday: 11:00 - 19:00</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold">
            © 2024–2026 Clip & Chill Barbershop. All Rights Reserved.
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

const MobileStickyBook = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-6 pointer-events-none">
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark to-transparent opacity-90" />
      <div className="pointer-events-auto relative z-10">
        <a
          href="https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-sticky-btn w-full bg-gold py-5 flex items-center justify-center gap-3 relative overflow-hidden active:scale-95 transition-transform"
        >
          <span className="font-bold uppercase tracking-[0.3em] text-[11px] text-dark relative z-10">Book a Haircut</span>
          <ArrowRight size={14} className="text-dark relative z-10" />
        </a>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      <Services />

      <section id="about" className="py-24 md:py-40 bg-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel overflow-hidden"
          >
            <div className="aspect-[9/16] w-full">
              <iframe
                src="https://www.youtube.com/embed/xmD6GAVkI54?modestbranding=1&showinfo=0&rel=0&controls=1"
                title="Clip & Chill Barbershop - Our Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="sub-label"
            >
              Our Story
            </motion.span>
            <motion.h2 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="section-title mb-10"
            >
              Classic Style, <br /><span className="italic text-white/40">Modern Cuts.</span>
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-white/50 text-lg mb-8 leading-relaxed font-light"
            >
              Clip & Chill was built for one reason: to give you a great place to relax and get a high-quality haircut.
            </motion.p>
            <motion.p 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-white/30 mb-12 leading-relaxed font-light"
            >
              We offer the feel of a traditional barbershop with the skill of modern styling. Our barbers focus on giving you a look that fits you perfectly.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Gallery />
      <Team />
      <Reviews />
      
      {/* CTA Section */}
      <section className="py-24 md:py-40 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000"
            alt="CTA Background"
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="section-title mb-10"
            >
              Ready for a <br />Fresh Cut?
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-white/40 text-lg mb-16 font-light"
            >
              Join the many clients who trust us for their regular haircuts.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <a 
                href="https://getsquire.com/discover/barbershop/clip-and-chill-mississauga#services"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury px-16 py-6 inline-flex items-center justify-center"
              >
                <span>Book Your Appointment</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <MapSection />

      <Footer />
      <MobileStickyBook />
    </div>
  );
}
