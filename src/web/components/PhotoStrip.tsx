import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { t } from '@/lib/i18n';

const placeholderPhotos = [
  { id: 1, color: '#8FA94E', label: 'Community' },
  { id: 2, color: '#6B7F3B', label: 'Worship' },
  { id: 3, color: '#C5D68C', label: 'Friendship' },
  { id: 4, color: '#4A5D23', label: 'Nature' },
  { id: 5, color: '#A8BF6E', label: 'Together' },
  { id: 6, color: '#5A6F2E', label: 'Prayer' },
  { id: 7, color: '#E2EBCC', label: 'Joy' },
];

export default function PhotoStrip() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px' });
  
  // Parallax scroll for the strip
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const stripX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section ref={sectionRef} className="relative bg-sand-100 py-16 md:py-28 overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-400/40 to-transparent" />

      {/* Photo strip with parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        style={{ x: stripX }}
        className="photo-strip-scroll overflow-x-auto flex gap-4 md:gap-5 px-6 md:px-10 pb-4"
      >
        {placeholderPhotos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
            className="flex-shrink-0 w-[240px] md:w-[300px] h-[320px] md:h-[400px] rounded-xl overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
            style={{
              background: `linear-gradient(145deg, ${photo.color}35 0%, ${photo.color}15 100%)`,
            }}
          >
            {/* Placeholder content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center transform group-hover:scale-105 transition-transform duration-500">
                <div
                  className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${photo.color}25` }}
                >
                  <svg className="w-6 h-6 opacity-60" style={{ color: photo.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <span className="font-body text-sm tracking-wider opacity-60" style={{ color: photo.color }}>
                  {photo.label}
                </span>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/5 transition-colors duration-300" />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
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

      {/* Subtle bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-400/40 to-transparent" />
    </section>
  );
}
