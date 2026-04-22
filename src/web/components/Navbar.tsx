import { useState, useEffect } from 'react';
import { t } from '@/lib/i18n';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Track active section
      const sections = ['donate', 'community', 'about', 'podcast', 'worship'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) setActiveSection('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { label: t('nav.worship'), href: '#worship', id: 'worship' },
    { label: t('nav.podcast'), href: '#podcast', id: 'podcast' },
    { label: t('nav.community'), href: '#community', id: 'community' },
    { label: t('nav.about'), href: '#about', id: 'about' },
    { label: t('nav.donate'), href: '#donate', id: 'donate' },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-warm-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="relative z-10"
          >
            <span
              className={`font-display text-xl md:text-2xl font-bold tracking-[0.15em] transition-colors duration-500 ${
                scrolled ? 'text-dark' : 'text-white'
              }`}
            >
              SALTY SISTERS
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`relative font-display text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 py-1 ${
                  scrolled
                    ? activeSection === item.id ? 'text-olive-700' : 'text-dark-muted hover:text-dark'
                    : activeSection === item.id ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="navIndicator"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${scrolled ? 'bg-olive-500' : 'bg-white'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-10 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[4px] bg-dark' : scrolled ? 'bg-dark' : 'bg-white'
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[4px] bg-dark' : scrolled ? 'bg-dark' : 'bg-white'
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-warm-white flex flex-col items-center justify-center gap-6"
          >
            {/* Background decoration */}
            <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-olive-50 blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-sand-200 blur-3xl opacity-60 pointer-events-none" />

            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => scrollTo(item.href)}
                className="font-display text-4xl font-bold tracking-widest uppercase text-dark hover:text-orange-accent transition-colors relative"
              >
                {item.label}
              </motion.button>
            ))}

            {/* Social links in mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex gap-4"
            >
              {['Instagram', 'TikTok', 'YouTube'].map((s) => (
                <span key={s} className="font-body text-xs text-dark-muted/50 tracking-wider uppercase">{s}</span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
