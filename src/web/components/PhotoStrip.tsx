import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { t } from '@/lib/i18n';

const photos = [
  { id: 1, src: '/photos/036A9165.jpg', alt: 'Celina & Sonja am See' },
  { id: 2, src: '/photos/036A9509.jpg', alt: 'MT 5:13 Varsity Jackets' },
  { id: 3, src: '/photos/036A8925.jpg', alt: 'Celina & Sonja unter der Weide' },
  { id: 4, src: '/photos/036A9109.jpg', alt: 'Am See — Schwesternschaft' },
  { id: 5, src: '/photos/036A9526.jpg', alt: 'Looking up — Hoffnung' },
  { id: 6, src: '/photos/036A9364.jpg', alt: 'Am Seeufer' },
  { id: 7, src: '/photos/036A8966.jpg', alt: 'Celina & Sonja Portrait' },
];

export default function PhotoStrip() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const stripX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section ref={sectionRef} className="relative bg-sand-100 py-16 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-400/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        style={{ x: stripX }}
        className="photo-strip-scroll overflow-x-auto flex gap-4 md:gap-5 px-6 md:px-10 pb-4"
      >
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
            className="flex-shrink-0 w-[240px] md:w-[300px] h-[320px] md:h-[400px] rounded-xl overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-center mt-12 md:mt-16"
      >
        <motion.a
          href="#about"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 bg-orange-accent hover:bg-orange-hover text-white font-display text-base md:text-lg tracking-widest uppercase px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-orange-accent/20 hover:shadow-xl hover:shadow-orange-accent/30"
        >
          {t('photos.cta')}
          <motion.svg
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
          >
            <path d="M19 12H5M12 5l7 7-7 7" />
          </motion.svg>
        </motion.a>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-400/40 to-transparent" />
    </section>
  );
}
