import { motion } from 'motion/react';
import { t } from '@/lib/i18n';
import { useRef, useEffect, useState } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-dark">
      {/* Background video */}
      <div className="absolute inset-0">
        {/* Video element */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          src="/hero-video.mp4"
          poster="/hero-poster.jpg"
          muted
          loop
          playsInline
          autoPlay
          onLoadedData={() => setVideoLoaded(true)}
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/20 to-dark/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/30 via-transparent to-dark/30 z-10" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 z-10" style={{ boxShadow: 'inset 0 0 200px rgba(20,23,18,0.4)' }} />
      </div>

      {/* Logo reveal in center */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-32 left-0 right-0 z-20 text-center pointer-events-none"
      >
        <p className="font-display text-white/20 text-xs tracking-[0.5em] uppercase">
          Von Frauen. Für Frauen.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-white/40 font-body text-[10px] tracking-[0.4em] uppercase">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-white/50"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
