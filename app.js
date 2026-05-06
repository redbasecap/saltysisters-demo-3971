(function () {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const topicSelect = document.querySelector("[data-topic-select]");
  const contactForm = document.querySelector("[data-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");
  const heroVideo = document.querySelector("[data-hero-video]");
  const photoStrip = document.querySelector("[data-photo-strip]");
  const mapElement = document.querySelector("[data-leaflet-map]");
  const mapLoading = document.querySelector("[data-map-loading]");
  const groupCard = document.querySelector("[data-group-card]");
  const groupClose = document.querySelector("[data-group-close]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const communityGroups = [
    { name: "Zürich", leader: "Anna M.", lat: 47.3769, lng: 8.5417, members: 8 },
    { name: "Bern", leader: "Sarah K.", lat: 46.948, lng: 7.4474, members: 6 },
    { name: "Basel", leader: "Miriam L.", lat: 47.5596, lng: 7.5886, members: 5 },
    { name: "München", leader: "Lisa W.", lat: 48.1351, lng: 11.582, members: 10 },
    { name: "Berlin", leader: "Hannah F.", lat: 52.52, lng: 13.405, members: 12 },
    { name: "Hamburg", leader: "Lea S.", lat: 53.5511, lng: 9.9937, members: 7 },
    { name: "Wien", leader: "Rebecca T.", lat: 48.2082, lng: 16.3738, members: 9 },
    { name: "Luzern", leader: "Ruth B.", lat: 47.0502, lng: 8.3093, members: 4 },
    { name: "Stuttgart", leader: "Sophia H.", lat: 48.7758, lng: 9.1829, members: 6 },
    { name: "Köln", leader: "Maria G.", lat: 50.9375, lng: 6.9603, members: 8 },
    { name: "Frankfurt", leader: "Jana R.", lat: 50.1109, lng: 8.6821, members: 5 },
    { name: "Innsbruck", leader: "Nina P.", lat: 47.2692, lng: 11.4041, members: 4 },
  ];

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 72);
  }

  function closeMenu() {
    if (!menuToggle || !mobileMenu) return;
    document.body.classList.remove("menu-open");
    header?.classList.remove("menu-active");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menü öffnen");
  }

  function openMenu() {
    if (!menuToggle || !mobileMenu) return;
    document.body.classList.add("menu-open");
    header?.classList.add("menu-active");
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Menü schliessen");
  }

  function scrollToTarget(target) {
    const element = document.querySelector(target);
    if (!element) return;
    element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }

  function applyTopic(topic) {
    if (!topic || !topicSelect) return;
    const option = Array.from(topicSelect.options).find((item) => item.value === topic || item.textContent === topic);
    if (option) topicSelect.value = option.value;
  }

  function updateActiveNav() {
    const sectionIds = ["worship", "podcast", "community", "about", "donate"];
    let activeId = "";

    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (!section) continue;
      const rect = section.getBoundingClientRect();
      if (rect.top <= 140 && rect.bottom > 140) {
        activeId = id;
        break;
      }
    }

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });
  }

  function updatePhotoMotion() {
    if (!photoStrip || prefersReducedMotion) return;
    const parent = photoStrip.parentElement;
    const rect = parent.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
    photoStrip.style.setProperty("--strip-x", `${progress * -90}px`);
  }

  function updateGroupCard(group) {
    if (!groupCard) return;
    document.querySelector("[data-group-city]").textContent = group.name;
    document.querySelector("[data-group-leader]").textContent = group.leader;
    document.querySelector("[data-group-members]").textContent = String(group.members);
    groupCard.hidden = false;
  }

  function initCommunityMap() {
    if (!mapElement) return;

    if (!window.L) {
      if (mapLoading) {
        mapLoading.innerHTML = "<p>Karte konnte nicht geladen werden.</p>";
      }
      return;
    }

    const L = window.L;
    const map = L.map(mapElement, {
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView([48.5, 10.5], 5);

    L.control.zoom({ position: "topright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    const markerIcon = L.divIcon({
      html: '<span class="marker-pulse"><span class="marker-dot"></span></span>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      className: "salty-map-marker",
    });

    communityGroups.forEach((group) => {
      const marker = L.marker([group.lat, group.lng], { icon: markerIcon }).addTo(map);
      marker.on("click", () => {
        updateGroupCard(group);
        map.flyTo([group.lat, group.lng], 8, { duration: prefersReducedMotion ? 0 : 0.8 });
      });
    });

    map.whenReady(() => {
      mapLoading?.classList.add("is-hidden");
      setTimeout(() => map.invalidateSize(), 120);
    });
  }

  document.addEventListener("click", (event) => {
    const scrollLink = event.target.closest("[data-scroll]");
    const topicButton = event.target.closest("[data-topic], [data-scroll-target]");

    if (topicButton) {
      applyTopic(topicButton.dataset.topic);
    }

    if (topicButton?.dataset.scrollTarget) {
      event.preventDefault();
      scrollToTarget(topicButton.dataset.scrollTarget);
      return;
    }

    if (!scrollLink) return;
    const href = scrollLink.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    event.preventDefault();
    closeMenu();
    scrollToTarget(href);
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -30px 0px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  groupClose?.addEventListener("click", () => {
    if (groupCard) groupCard.hidden = true;
  });

  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!formStatus) return;

    const submitButton = contactForm.querySelector("button[type='submit']");
    const formData = new FormData(contactForm);

    formStatus.classList.remove("is-error");
    formStatus.textContent = "Nachricht wird gesendet...";
    submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || payload.ok !== true) {
        throw new Error(payload.message || "Die Nachricht konnte nicht gesendet werden.");
      }

      contactForm.reset();
      formStatus.textContent = payload.message || "Danke, deine Nachricht wurde gesendet.";
    } catch (error) {
      formStatus.classList.add("is-error");
      formStatus.textContent =
        error.message || "Die Nachricht konnte nicht gesendet werden. Bitte schreibe direkt an info@saltysisters.eu.";
    } finally {
      submitButton.disabled = false;
    }
  });

  if (heroVideo) {
    heroVideo.play?.().catch(() => {});
  }

  setHeaderState();
  updateActiveNav();
  updatePhotoMotion();
  initCommunityMap();
  window.addEventListener("scroll", () => {
    setHeaderState();
    updateActiveNav();
    updatePhotoMotion();
  }, { passive: true });
})();
