import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { t } from '@/lib/i18n';

// Sample community groups in DACH region
const sampleGroups = [
  { id: 1, name: 'Zürich', leader: 'Anna M.', lat: 47.3769, lng: 8.5417, members: 8 },
  { id: 2, name: 'Bern', leader: 'Sarah K.', lat: 46.9480, lng: 7.4474, members: 6 },
  { id: 3, name: 'Basel', leader: 'Miriam L.', lat: 47.5596, lng: 7.5886, members: 5 },
  { id: 4, name: 'München', leader: 'Lisa W.', lat: 48.1351, lng: 11.5820, members: 10 },
  { id: 5, name: 'Berlin', leader: 'Hannah F.', lat: 52.5200, lng: 13.4050, members: 12 },
  { id: 6, name: 'Hamburg', leader: 'Lea S.', lat: 53.5511, lng: 9.9937, members: 7 },
  { id: 7, name: 'Wien', leader: 'Rebecca T.', lat: 48.2082, lng: 16.3738, members: 9 },
  { id: 8, name: 'Luzern', leader: 'Ruth B.', lat: 47.0502, lng: 8.3093, members: 4 },
  { id: 9, name: 'Stuttgart', leader: 'Sophia H.', lat: 48.7758, lng: 9.1829, members: 6 },
  { id: 10, name: 'Köln', leader: 'Maria G.', lat: 50.9375, lng: 6.9603, members: 8 },
  { id: 11, name: 'Frankfurt', leader: 'Jana R.', lat: 50.1109, lng: 8.6821, members: 5 },
  { id: 12, name: 'Innsbruck', leader: 'Nina P.', lat: 47.2692, lng: 11.4041, members: 4 },
];

function LeafletMap() {
  const [mapReady, setMapReady] = useState(false);
  const [activeGroup, setActiveGroup] = useState<typeof sampleGroups[0] | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = async () => {
      const L = (await import('leaflet')).default;

      // @ts-expect-error - leaflet internal
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current || mapRef.current.querySelector('.leaflet-container')) return;

      const map = L.map(mapRef.current, {
        scrollWheelZoom: false,
        zoomControl: false,
      }).setView([48.5, 10.5], 5);

      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Pulsing marker with olive color
      const markerIcon = L.divIcon({
        html: `<div style="position:relative;width:32px;height:32px;">
          <div style="position:absolute;inset:0;background:rgba(74,93,35,0.2);border-radius:50%;animation:mapPulse 2s ease-out infinite;"></div>
          <div style="position:absolute;top:4px;left:4px;width:24px;height:24px;background:#4A5D23;border:3px solid #FEFDFB;border-radius:50%;box-shadow:0 2px 10px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;">
            <div style="width:6px;height:6px;background:#C5D68C;border-radius:50%;"></div>
          </div>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        className: '',
      });

      sampleGroups.forEach((group) => {
        const marker = L.marker([group.lat, group.lng], { icon: markerIcon }).addTo(map);
        marker.on('click', () => {
          setActiveGroup(group);
          map.flyTo([group.lat, group.lng], 8, { duration: 0.8 });
        });
      });

      // Add pulse animation CSS
      if (!document.getElementById('mapPulseStyle')) {
        const style = document.createElement('style');
        style.id = 'mapPulseStyle';
        style.textContent = `@keyframes mapPulse { 0% { transform:scale(0.8); opacity:1; } 100% { transform:scale(2); opacity:0; } }`;
        document.head.appendChild(style);
      }

      setMapReady(true);
    };

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    setTimeout(loadMap, 100);
  }, []);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full h-[300px] sm:h-[380px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg"
        style={{ background: '#F5F0E8' }}
      />

      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-sand-100">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-olive-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="font-body text-sm text-olive-500">Karte wird geladen...</p>
          </div>
        </div>
      )}

      {/* Active group popup */}
      {activeGroup && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 bg-warm-white rounded-xl p-5 shadow-2xl border border-sand-200"
        >
          <button
            onClick={() => setActiveGroup(null)}
            className="absolute top-3 right-3 text-dark-muted hover:text-dark transition-colors w-7 h-7 rounded-full hover:bg-sand-100 flex items-center justify-center"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full bg-olive-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-olive-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-dark">{activeGroup.name}</h4>
              <p className="font-body text-sm text-dark-muted">{activeGroup.members} Schwestern</p>
            </div>
          </div>
          <p className="font-body text-sm text-dark-muted mb-4">
            Gruppenleiterin: <span className="text-olive-700 font-medium">{activeGroup.leader}</span>
          </p>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`mailto:group@saltysisters.eu?subject=Community ${activeGroup.name}`}
            className="inline-flex items-center gap-2 bg-olive-700 hover:bg-olive-800 text-white font-display text-sm tracking-wider uppercase px-5 py-2.5 rounded-full transition-colors w-full justify-center"
          >
            Kontakt aufnehmen
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.a>
        </motion.div>
      )}
    </div>
  );
}

export default function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const howRef = useRef(null);
  const howInView = useInView(howRef, { once: true, margin: '0px' });

  return (
    <section id="community" className="relative bg-sand-50 overflow-hidden">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-24 md:pb-36 relative z-10">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-14 md:mb-20 relative">
          {/* Decorative marquee — behind content, clipped to this block */}
          <div className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none select-none -z-10 opacity-40">
            <motion.p
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="font-display text-[3rem] sm:text-[4rem] md:text-[5rem] font-bold text-sand-300 tracking-wider whitespace-nowrap leading-none"
            >
              COMMUNITY · SCHWESTERNSCHAFT · COMMUNITY · SCHWESTERNSCHAFT ·&nbsp;
            </motion.p>
          </div>
          <div className="relative">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-display text-sm tracking-[0.3em] text-olive-500 uppercase mb-4"
            >
              {t('community.tagline')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-dark leading-[0.85] tracking-tight"
            >
              {t('community.headline')}
            </motion.h2>
            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 w-24 bg-olive-400 rounded-full mt-6 origin-left"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-dark-muted text-lg md:text-xl leading-relaxed"
          >
            {t('community.desc')}
          </motion.p>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <LeafletMap />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="mailto:group@saltysisters.eu?subject=Community finden"
            className="inline-flex items-center justify-center gap-2 bg-olive-700 hover:bg-olive-800 text-white font-display text-sm md:text-base tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-olive-700/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t('community.find')}
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="mailto:group@saltysisters.eu?subject=Eigene Gruppe starten"
            className="inline-flex items-center justify-center gap-2 border-2 border-olive-700 text-olive-700 hover:bg-olive-700 hover:text-white font-display text-sm md:text-base tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M12 4v16m8-8H4" />
            </svg>
            {t('community.start')}
          </motion.a>
        </motion.div>
      </div>

      {/* How it works section */}
      <div ref={howRef} className="max-w-[1400px] mx-auto px-6 md:px-10 mt-20 md:mt-32 relative">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* WhatsApp-style mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={howInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-warm-white rounded-2xl p-6 md:p-8 shadow-xl border border-sand-200 relative overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-olive-400 via-olive-500 to-olive-300" />
            
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-sand-200">
              <div className="w-10 h-10 rounded-full bg-olive-400 flex items-center justify-center shadow-sm">
                <span className="text-white font-display font-bold text-xs tracking-wider">SS</span>
              </div>
              <div>
                <p className="font-display text-sm font-bold text-dark">Salty Sisters Zürich</p>
                <p className="text-xs text-dark-muted font-body">8 Mitglieder · Aktiv</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-olive-400 animate-pulse" />
            </div>
            {/* Chat bubbles */}
            <div className="space-y-3">
              {[
                { from: 'Anna', text: 'Hey Mädels, nächsten Dienstag bei mir? 🏡', self: false },
                { from: 'Sarah', text: 'Bin dabei! Wer bringt Snacks? 😄', self: false },
                { from: null, text: 'Ich komme und bringe Kuchen mit! 🙌', self: true },
                { from: 'Miriam', text: 'So schön. Freue mich auf Worship und Gebet zusammen 💚', self: false },
              ].map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, x: msg.self ? 10 : -10 }}
                  animate={howInView ? { opacity: 1, y: 0, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                  className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`rounded-2xl px-4 py-2.5 max-w-[80%] ${
                    msg.self
                      ? 'bg-olive-200 rounded-br-sm'
                      : 'bg-olive-50 rounded-bl-sm'
                  }`}>
                    {msg.from && (
                      <p className="text-xs text-olive-600 font-medium mb-0.5 font-body">{msg.from}</p>
                    )}
                    <p className="text-sm text-dark font-body">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How it works text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={howInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold text-dark tracking-wide mb-6">
              {t('community.how.title')}
            </h3>
            <p className="font-body text-dark-muted text-lg leading-relaxed mb-8">
              {t('community.how.text')}
            </p>

            {/* Features */}
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4 text-olive-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  ),
                  text: t('community.whatsapp'),
                },
                {
                  icon: (
                    <svg className="w-4 h-4 text-olive-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ),
                  text: t('community.nobarrier'),
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={howInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-olive-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-olive-200 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <p className="font-body text-dark-muted">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
