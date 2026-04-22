import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { t } from '@/lib/i18n';

function CountUpNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {value}{suffix}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const manifestoRef = useRef(null);
  const manifestoInView = useInView(manifestoRef, { once: true, margin: '0px' });

  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: '0px' });

  // Parallax for the headline
  const headlineRef = useRef(null);
  const { scrollYProgress: headlineScroll } = useScroll({
    target: headlineRef,
    offset: ['start end', 'end start'],
  });
  const headlineY = useTransform(headlineScroll, [0, 1], [40, -40]);

  return (
    <section id="about" className="relative bg-warm-white overflow-hidden">
      {/* Main About */}
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36">
        {/* Tagline + Headline */}
        <div ref={headlineRef} className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display text-sm tracking-[0.3em] text-olive-500 uppercase mb-4"
          >
            {t('about.tagline')}
          </motion.p>
          <motion.h2
            style={{ y: headlineY }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-dark leading-[0.85] tracking-tight whitespace-pre-line"
          >
            {t('about.headline')}
          </motion.h2>
          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 w-24 bg-orange-accent rounded-full mt-8 origin-left"
          />
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-16 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-olive-100 flex items-center justify-center group-hover:bg-olive-200 transition-colors duration-300">
                <svg className="w-4 h-4 text-olive-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-display text-lg tracking-[0.2em] text-olive-600 uppercase">
                {t('about.vision.title')}
              </h3>
            </div>
            <p className="font-body text-dark-muted text-lg md:text-xl leading-relaxed">
              {t('about.vision.text')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="group"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-olive-100 flex items-center justify-center group-hover:bg-olive-200 transition-colors duration-300">
                <svg className="w-4 h-4 text-olive-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-display text-lg tracking-[0.2em] text-olive-600 uppercase">
                {t('about.mission.title')}
              </h3>
            </div>
            <p className="font-body text-dark-muted text-lg md:text-xl leading-relaxed">
              {t('about.mission.text')}
            </p>
          </motion.div>
        </div>

        {/* Core values pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-3 mt-14"
        >
          {['Jesus', 'Gemeinschaft', 'Jüngerschaft', 'Mutterschaft', 'Multiplikation'].map((v, i) => (
            <motion.span
              key={v}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
              className="font-display text-xs tracking-[0.2em] uppercase text-olive-600 border border-olive-200 px-5 py-2.5 rounded-full hover:bg-olive-50 transition-colors duration-300 cursor-default"
            >
              {v}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Culture Manifesto Band */}
      <div ref={manifestoRef} className="relative bg-olive-800 py-20 md:py-28 px-6 md:px-10 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-olive-400 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-orange-accent blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-[900px] mx-auto text-center relative">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={manifestoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display text-sm tracking-[0.3em] text-olive-300 uppercase mb-8"
          >
            {t('manifesto.title')}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={manifestoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-body text-xl md:text-2xl text-white/90 leading-relaxed mb-12"
          >
            {t('manifesto.text')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={manifestoInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-display text-2xl md:text-4xl font-bold text-orange-accent tracking-wide italic leading-snug">
              {t('manifesto.cta')}
            </p>
            {/* Decorative line below */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={manifestoInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="h-0.5 w-16 bg-orange-accent/40 rounded-full mx-auto mt-6 origin-center"
            />
          </motion.div>
        </div>
      </div>

      {/* Founders */}
      <div ref={teamRef} className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Celina */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            {/* Photo placeholder */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
              className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-olive-100 to-sand-200 relative shadow-md group-hover:shadow-xl transition-shadow duration-500"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-olive-200/50 flex items-center justify-center">
                    <svg className="w-10 h-10 text-olive-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-olive-400">Foto Celina</span>
                </div>
              </div>
              {/* Hover tint */}
              <div className="absolute inset-0 bg-olive-700/0 group-hover:bg-olive-700/5 transition-colors duration-500" />
            </motion.div>
            <h4 className="font-display text-2xl md:text-3xl font-bold text-dark tracking-wide">
              {t('about.celina.name')}
            </h4>
            <p className="font-body text-olive-600 text-sm mt-1 mb-4 tracking-wide">
              {t('about.celina.role')}
            </p>
            <p className="font-body text-dark-muted leading-relaxed">
              {t('about.celina.bio')}
            </p>
          </motion.div>

          {/* Sonja — offset down */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group md:mt-20"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
              className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-sand-200 to-olive-100 relative shadow-md group-hover:shadow-xl transition-shadow duration-500"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-sand-300/50 flex items-center justify-center">
                    <svg className="w-10 h-10 text-sand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-sand-600">Foto Sonja</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-sand-500/0 group-hover:bg-sand-500/5 transition-colors duration-500" />
            </motion.div>
            <h4 className="font-display text-2xl md:text-3xl font-bold text-dark tracking-wide">
              {t('about.sonja.name')}
            </h4>
            <p className="font-body text-olive-600 text-sm mt-1 mb-4 tracking-wide">
              {t('about.sonja.role')}
            </p>
            <p className="font-body text-dark-muted leading-relaxed">
              {t('about.sonja.bio')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
