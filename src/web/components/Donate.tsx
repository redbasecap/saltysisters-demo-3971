import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { t } from '@/lib/i18n';

const donateOptions = [
  {
    titleKey: 'donate.once.title' as const,
    descKey: 'donate.once.desc' as const,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    accent: false,
  },
  {
    titleKey: 'donate.regular.title' as const,
    descKey: 'donate.regular.desc' as const,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    accent: true,
  },
  {
    titleKey: 'donate.partner.title' as const,
    descKey: 'donate.partner.desc' as const,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    accent: false,
  },
];

export default function Donate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section id="donate" className="relative bg-warm-white py-24 md:py-36 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-orange-light/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-olive-50/60 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display text-sm tracking-[0.3em] text-olive-500 uppercase mb-4"
          >
            {t('donate.tagline')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-dark leading-[0.85] tracking-tight whitespace-pre-line mb-6"
          >
            {t('donate.headline')}
          </motion.h2>
          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 w-24 bg-orange-accent rounded-full mb-6 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-dark-muted text-lg md:text-xl leading-relaxed"
          >
            {t('donate.desc')}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {donateOptions.map((option, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`group relative rounded-2xl p-8 md:p-10 transition-all duration-300 cursor-pointer overflow-hidden ${
                option.accent
                  ? 'bg-olive-700 text-white shadow-xl shadow-olive-700/20 hover:shadow-2xl hover:shadow-olive-700/30'
                  : 'bg-sand-100 hover:bg-sand-50 border border-sand-200 shadow-md hover:shadow-xl'
              }`}
            >
              {/* Hover shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className={`absolute -inset-full bg-gradient-to-r from-transparent ${
                  option.accent ? 'via-white/10' : 'via-white/60'
                } to-transparent skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000`} />
              </div>

              <div className={`mb-6 transition-transform duration-300 group-hover:scale-110 ${option.accent ? 'text-olive-200' : 'text-olive-500'}`}>
                {option.icon}
              </div>
              <h3
                className={`font-display text-2xl md:text-3xl font-bold tracking-wide mb-3 ${
                  option.accent ? 'text-white' : 'text-dark'
                }`}
              >
                {t(option.titleKey)}
              </h3>
              <p
                className={`font-body leading-relaxed mb-8 ${
                  option.accent ? 'text-white/80' : 'text-dark-muted'
                }`}
              >
                {t(option.descKey)}
              </p>
              <div
                className={`inline-flex items-center gap-2 font-display text-sm tracking-widest uppercase group-hover:gap-3 transition-all duration-300 ${
                  option.accent ? 'text-olive-200' : 'text-olive-600'
                }`}
              >
                <span>{t('donate.cta')}</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Where do donations go */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-dark-muted/60 mb-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-display text-xs tracking-[0.2em] uppercase">Wohin?</span>
          </div>
          <p className="font-body text-dark-muted text-sm md:text-base leading-relaxed">
            {t('donate.where')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
