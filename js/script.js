window.onbeforeunload = () => window.scrollTo(0, 0);
document.addEventListener("DOMContentLoaded", () => {
  // === MENU HAMBURGUESA ===
  const toggleBtn = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      document.documentElement.classList.toggle("lock-scroll", isOpen);
    });
  }
  // Cerrar menú al tocar un enlace (mobile)
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        document.documentElement.classList.remove("lock-scroll");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // === SCROLL SUAVE con offset del header fijo ===
  const header = document.getElementById("header");
  const getOffset = () => (header?.offsetHeight || 72) + 12;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const hash = a.getAttribute("href");
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();

      const y = target.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // === FADE-IN EN SCROLL ===
  const fadeElements = document.querySelectorAll(".fade-in");
  const obsFade = new IntersectionObserver(ents => {
    ents.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("show");
        obsFade.unobserve(en.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });
  fadeElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "opacity 1s ease-out, transform 1s ease-out";
    obsFade.observe(el);
  });

  // === INTRO ocultar y scroll al inicio ===
  const logoIntro = document.getElementById("logoIntro");
  if (logoIntro) {
    const hideIntroAndGoHome = () => {
      if (logoIntro.dataset.done === "1") return;
      logoIntro.dataset.done = "1";
      logoIntro.classList.add("intro-hide");
      logoIntro.setAttribute("aria-hidden", "true");
      const onEnd = () => {
        document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" });
        ["click", "wheel", "touchstart", "scroll"].forEach(ev => window.removeEventListener(ev, hideIntroAndGoHome));
      };
      logoIntro.addEventListener("transitionend", onEnd, { once: true });
      setTimeout(onEnd, 600);
    };
    setTimeout(() => {
      window.addEventListener("click", hideIntroAndGoHome);
      window.addEventListener("wheel", hideIntroAndGoHome, { passive: true });
      window.addEventListener("touchstart", hideIntroAndGoHome, { passive: true });
      window.addEventListener("scroll", hideIntroAndGoHome);
    }, 100);
  }

  // === MODO OSCURO ===
  const darkToggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    if (darkToggle) darkToggle.textContent = "☀️";
  }
  darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    if (darkToggle) darkToggle.textContent = isDark ? "☀️" : "🌙";
  });

  // === SCROLL TO TOP ===
  const scrollBtn = document.querySelector(".scroll-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) scrollBtn?.classList.add("visible");
    else scrollBtn?.classList.remove("visible");
  });
  scrollBtn?.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // === FORMULARIO ===
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitBtn = form?.querySelector('button[type="submit"]');

  form?.addEventListener("submit", async (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }
    // Válido
    e.preventDefault();

    // UX: deshabilitar botón mientras envía
    submitBtn?.setAttribute("disabled", "disabled");
    if (status) { status.textContent = "Enviando..."; status.style.color = ""; }

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        if (status) { status.textContent = "¡Mensaje enviado con éxito!"; status.style.color = "green"; }
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      if (status) { status.textContent = "Hubo un error. Intentalo más tarde."; status.style.color = "red"; }
    } finally {
      submitBtn?.removeAttribute("disabled");
      setTimeout(() => { if (status) status.textContent = ""; }, 4000);
    }
  });

  // === EFECTO corazones botón contacto ===
  const sendButton = document.querySelector(".btn-contacto");
  sendButton?.addEventListener("click", () => {
    const r = sendButton.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("span");
      s.classList.add("joy-particle");
      s.textContent = ["❤️", "✨", "💖", "💕"][Math.floor(Math.random() * 4)];
      const ox = (Math.random() - 0.5) * 30, oy = (Math.random() - 0.5) * 20;
      s.style.left = `${cx + ox}px`; s.style.top = `${cy + oy}px`;
      s.style.setProperty('--scale', (Math.random() * 0.6 + 0.8).toFixed(2));
      document.body.appendChild(s); setTimeout(() => s.remove(), 2500);
    }
  });

  // === AÑO FOOTER ===
  const y = document.getElementById("ff-year");
  if (y) y.textContent = new Date().getFullYear();

  // === TESTIMONIOS (carrusel) ===
  (() => {
    const section = document.querySelector('#testimonios');
    if (!section) return;

    const viewport = section.querySelector('.testi-viewport');
    const track = section.querySelector('.testi-track');
    const prevBtn = section.querySelector('.testi-prev');
    const nextBtn = section.querySelector('.testi-next');
    const dotsBox = section.querySelector('.testi-dots');

    const gap = 16;
    const slideW = () => (track.querySelector('.testi-card')?.getBoundingClientRect().width || 300) + gap;

    const originals = Array.from(track.querySelectorAll('.testi-card'));
    originals.forEach(card => track.appendChild(card.cloneNode(true)));

    dotsBox.innerHTML = '';
    originals.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'testi-dot' + (i === 0 ? ' is-active' : '');
      b.setAttribute('role', 'tab');
      b.addEventListener('click', () => goTo(i));
      dotsBox.appendChild(b);
    });
    const dots = Array.from(section.querySelectorAll('.testi-dot'));

    let index = 0;
    function goTo(i, smooth = true) {
      index = (i + originals.length) % originals.length;
      const x = i * slideW();
      track.scrollTo({ left: x, behavior: smooth ? 'smooth' : 'auto' });
      dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
    }

    prevBtn?.addEventListener('click', () => {
      const approx = Math.round(track.scrollLeft / slideW());
      goTo(approx - 1);
    });
    nextBtn?.addEventListener('click', () => {
      const approx = Math.round(track.scrollLeft / slideW());
      goTo(approx + 1);
    });

    track.addEventListener('scroll', () => {
      const approx = Math.round(track.scrollLeft / slideW());
      const logical = ((approx % originals.length) + originals.length) % originals.length;
      dots.forEach((d, di) => d.classList.toggle('is-active', di === logical));
    });

    // Autoplay
    let autoplay = setInterval(() => nextBtn?.click(), 5000);
    const stop = () => { clearInterval(autoplay); autoplay = null; };
    const start = () => { if (!autoplay) autoplay = setInterval(() => nextBtn?.click(), 5000); };
    viewport.addEventListener('mouseenter', stop);
    viewport.addEventListener('mouseleave', start);
    viewport.addEventListener('touchstart', stop, { passive: true });
    viewport.addEventListener('touchend', start);

    // Accesibilidad teclado
    viewport.tabIndex = 0;
    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextBtn?.click();
      if (e.key === 'ArrowLeft') prevBtn?.click();
    });

    // Avatares: fallback inicial
    section.querySelectorAll('.testi-avatar').forEach(av => {
      const img = av.querySelector('img');
      const ini = av.querySelector('.initial');
      if (!img) return;
      const showImg = () => { if (ini) ini.style.display = 'none'; };
      const hideImg = () => { img.hidden = true; if (ini) ini.style.display = 'grid'; };

      if (img.complete) {
        (img.naturalWidth > 0 ? showImg : hideImg)();
      } else {
        img.addEventListener('load', showImg, { once: true });
        img.addEventListener('error', hideImg, { once: true });
      }
    });
  })();

  // === ANIMACIÓN de números en .stat span ===
  function animateValue(el, end, duration = 1500) {
    let start = 0;
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const stats = document.querySelectorAll(".stat span");
  if (stats.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stats.forEach(span => {
            const target = parseInt(span.textContent.replace(/\D/g, "")) || 0;
            animateValue(span, target);
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(stats[0].parentElement);
  }

  // === MODALES LEGALES ===
  document.querySelectorAll('.legal-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const modal = document.getElementById(id);
      if (!modal) return;
      modal.classList.add('is-open');
      document.documentElement.classList.add('lock-scroll');
      const closeBtn = modal.querySelector('.ff-modal__close');
      closeBtn?.focus();
    });
  });
  document.querySelectorAll('.ff-modal [data-close-modal], .ff-modal__backdrop').forEach(el => {
    el.addEventListener('click', (e) => {
      const modal = e.target.closest('.ff-modal') || document.querySelector('.ff-modal.is-open');
      if (!modal) return;
      modal.classList.remove('is-open');
      document.documentElement.classList.remove('lock-scroll');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.ff-modal.is-open').forEach(m => m.classList.remove('is-open'));
      document.documentElement.classList.remove('lock-scroll');
    }
  });

  // === SERVICIOS: colapso con botón ===
  const grid = document.getElementById('servicesGrid');
  const btn  = document.getElementById('toggleServicios');
  if (grid && btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      const open = grid.classList.toggle('expanded');
      btn.textContent = open ? 'Ver menos' : 'Ver más servicios';
      btn.setAttribute('aria-expanded', String(open));
    });
  }
});



(function () {
  var navToggle = document.querySelector('.nav-toggle');   // botón ☰
  var navLinks  = document.querySelector('.nav-links');    // <ul> del menú
  var darkBtn   = document.getElementById('darkModeToggle');

  if (!navToggle || !navLinks) return;

  function isOpen() { return document.body.classList.contains('menu-open'); }
  function openMenu()  { document.body.classList.add('menu-open');  navLinks.classList.add('open');  navToggle.setAttribute('aria-expanded','true'); }
  function closeMenu() { document.body.classList.remove('menu-open'); navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
  function toggleMenu() { isOpen() ? closeMenu() : openMenu(); }

  // Abrir/cerrar con el hamburguesa
  navToggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });

  // Cerrar al tocar el botón de modo oscuro
  if (darkBtn) {
    darkBtn.addEventListener('click', function () {
      if (isOpen()) closeMenu();
      // no tocamos tu lógica de dark-mode (si la tenés en otro lado)
    });
  }

  // Cerrar al elegir un link del menú
  navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Cerrar al tocar fuera del menú/botón
  document.addEventListener('click', function (e) {
    if (!isOpen()) return;
    var dentro = e.target.closest('.nav-links') || e.target.closest('.nav-toggle') || (darkBtn && e.target.closest('#darkModeToggle'));
    if (!dentro) closeMenu();
  });

  // Cerrar con ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) closeMenu();
  });

  // Al pasar a desktop, aseguramos cerrado
  var mq = window.matchMedia('(min-width:1025px)');
  function handleMQ(ev){ if (ev.matches) closeMenu(); }
  if (mq.addEventListener) mq.addEventListener('change', handleMQ);
  else mq.addListener(handleMQ); // Safari viejo
})();
