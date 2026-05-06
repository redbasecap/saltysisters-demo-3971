import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { t } from '@/lib/i18n';

const cards = [
  {
    id: 'worship',
    titleKey: 'entry.worship.title' as const,
    descKey: 'entry.worship.desc' as const,
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 4v40M12 16c0-6.627 5.373-12 12-12s12 5.373 12 12v8c0 6.627-5.373 12-12 12s-12-5.373-12-12v-8z" />
        <path d="M8 24h4M36 24h4" />
      </svg>
    ),
    gradient: 'from-sage-700 to-sage-900',
    bgImage: 'radial-gradient(ellipse at 30% 20%, rgba(144,170,125,0.4) 0%, transparent 60%)',
  },
  {
    id: 'podcast',
    titleKey: 'entry.podcast.title' as const,
    descKey: 'entry.podcast.desc' as const,
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="20" r="8" />
        <path d="M12 28c0-2 4-6 12-6s12 4 12 6" />
        <path d="M16 44V32M32 44V32" />
        <path d="M24 28v16" />
      </svg>
    ),
    gradient: 'from-sage-600 to-sage-800',
    bgImage: 'radial-gradient(ellipse at 70% 30%, rgba(110,133,96,0.4) 0%, transparent 60%)',
  },
  {
    id: 'community-card',
    titleKey: 'entry.community.title' as const,
    descKey: 'entry.community.desc' as const,
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="14" r="6" />
        <circle cx="10" cy="20" r="5" />
        <circle cx="38" cy="20" r="5" />
        <path d="M6 36c0-4 3-8 10-8 2 0 4 .5 5.5 1.5M42 36c0-4-3-8-10-8-2 0-4 .5-5.5 1.5M14 40c0-5 4-10 10-10s10 5 10 10" />
      </svg>
    ),
    gradient: 'from-sage-500 to-sage-700',
    bgImage: 'radial-gradient(ellipse at 50% 50%, rgba(192,201,166,0.35) 0%, transparent 60%)',
  },
];

export default function EntryPoints() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section className="relative bg-warm-white py-24 md:py-36 px-6 md:px-10">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.a
              key={card.id}
              id={card.id === 'community-card' ? undefined : card.id}
              href={card.id === 'community-card' ? '#community' : `#${card.id}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-8 md:p-10 min-h-[340px] md:min-h-[420px] flex flex-col justify-end cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500`}
            >
              {/* Background decoration */}
              <div
                className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: card.bgImage }}
              />

              {/* Animated shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>

              {/* Icon */}
              <motion.div
                className="relative text-white/60 mb-auto group-hover:text-white/90 transition-colors duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {card.icon}
              </motion.div>

              {/* Content */}
              <div className="relative mt-auto">
                <h3 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider mb-3">
                  {t(card.titleKey)}
                </h3>
                <p className="font-body text-white/70 text-sm md:text-base leading-relaxed mb-5 max-w-[280px] group-hover:text-white/85 transition-colors duration-300">
                  {t(card.descKey)}
                </p>
                <div className="inline-flex items-center gap-2 text-white font-display text-sm tracking-widest uppercase group-hover:gap-4 transition-all duration-300">
                  <span>{t('entry.cta')}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
