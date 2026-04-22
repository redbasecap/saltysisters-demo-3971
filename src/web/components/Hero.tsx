import { motion } from 'motion/react';
import { t } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-dark">
      {/* Video placeholder — dark ambient background */}
      <div className="absolute inset-0">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/30 to-dark/80 z-10" />
        {/* Animated ambient organic shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[150%] h-[150%] -top-1/4 -left-1/4"
            style={{
              background: 'radial-gradient(ellipse at 30% 40%, rgba(143,169,78,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(107,127,59,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(224,112,50,0.08) 0%, transparent 40%)',
            }}
          />
          {/* Floating particles */}
          {mounted && Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 4,
                height: 2 + Math.random() * 4,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                background: `rgba(197, 214, 140, ${0.1 + Math.random() * 0.2})`,
              }}
              animate={{
                y: [0, -30 - Math.random() * 40, 0],
                x: [0, (Math.random() - 0.5) * 20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Placeholder — video indicator */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-white/20 flex items-center justify-center cursor-pointer backdrop-blur-sm bg-white/5 group"
              >
                <svg className="w-9 h-9 text-white/40 ml-1 group-hover:text-white/70 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
              <p className="text-white/30 font-body text-sm tracking-[0.35em] uppercase">Intro Video</p>
            </motion.div>
          </div>
        </div>
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
