document.addEventListener("DOMContentLoaded", () => {
  // === MENU HAMBURGUESA ===
  const toggleBtn = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
  }

  // === SCROLL SUAVE ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
    });
  });

  // === FADE-IN EN SCROLL ===
  const fadeElements = document.querySelectorAll(".fade-in");
  const obsFade = new IntersectionObserver(ents => {
    ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add("show"); obsFade.unobserve(en.target); }});
  }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });
  fadeElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "opacity 1s ease-out, transform 1s ease-out";
    obsFade.observe(el);
  });

  // === INTRO: al hacer click / wheel / touch / scroll => se desvanece y va a #inicio ===
  const logoIntro = document.getElementById("logoIntro");
  const barraIntro = document.getElementById("barraIntro"); // puede no existir (OK)

  if (logoIntro) {
    const hideIntroAndGoHome = () => {
      if (logoIntro.dataset.done === "1") return;
      logoIntro.dataset.done = "1";

      [logoIntro, barraIntro].forEach(el => {
        if (el) { el.classList.add("intro-hide"); el.setAttribute("aria-hidden","true"); }
      });

      const onEnd = () => {
        const home = document.querySelector("#inicio");
        if (home) home.scrollIntoView({ behavior: "smooth" });
        window.removeEventListener("click", hideIntroAndGoHome);
        window.removeEventListener("wheel", hideIntroAndGoHome);
        window.removeEventListener("touchstart", hideIntroAndGoHome);
        window.removeEventListener("scroll", hideIntroAndGoHome);
      };

      [logoIntro, barraIntro].forEach(el => el && el.addEventListener("transitionend", onEnd, { once:true }));
      setTimeout(onEnd, 600); // por si no dispara transitionend
    };

    setTimeout(() => {
      window.addEventListener("click", hideIntroAndGoHome);
      window.addEventListener("wheel", hideIntroAndGoHome, { passive:true });
      window.addEventListener("touchstart", hideIntroAndGoHome, { passive:true });
      window.addEventListener("scroll", hideIntroAndGoHome);
    }, 100);
  }

  // === MODO OSCURO ===
  const darkToggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("darkMode")==="enabled") {
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
  scrollBtn?.addEventListener("click", e => { e.preventDefault(); window.scrollTo({ top:0, behavior:"smooth" }); });

  // === FORMULARIO ===
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(form.action, { method: form.method, body: new FormData(form), headers: { "Accept":"application/json" }});
      if (res.ok) { if (status){ status.textContent="¡Mensaje enviado con éxito!"; status.style.color="green"; } form.reset(); }
      else throw new Error();
    } catch {
      if (status){ status.textContent="Hubo un error. Intentalo más tarde."; status.style.color="red"; }
    }
    status?.classList.add("visible"); setTimeout(()=>{ if(status) status.textContent=""; }, 4000);
  });

  // === EFECTO corazones botón contacto ===
  const sendButton = document.querySelector(".btn-contacto");
  sendButton?.addEventListener("click", () => {
    const r = sendButton.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    for (let i=0;i<12;i++){
      const s = document.createElement("span");
      s.classList.add("joy-particle");
      s.textContent = ["❤️","✨","💖","💕"][Math.floor(Math.random()*4)];
      const ox = (Math.random()-0.5)*30, oy=(Math.random()-0.5)*20;
      s.style.left = `${cx+ox}px`; s.style.top = `${cy+oy}px`;
      s.style.setProperty('--scale', (Math.random()*0.6+0.8).toFixed(2));
      document.body.appendChild(s); setTimeout(()=>s.remove(),2500);
    }
  });

  // === FOOTER: año + scroll suave ===
  const y = document.getElementById("ff-year");
  if (y) y.textContent = new Date().getFullYear();
  document.querySelectorAll('footer .ff-link, footer .btn-footer-cta, footer .footer-icons a[href^="#"]').forEach(a=>{
    const href=a.getAttribute("href"); if(!href?.startsWith("#")) return;
    a.addEventListener("click", e=>{ e.preventDefault(); document.querySelector(href)?.scrollIntoView({behavior:"smooth"}); });
  });
});

// arriba al recargar
window.onbeforeunload = () => window.scrollTo(0, 0);
