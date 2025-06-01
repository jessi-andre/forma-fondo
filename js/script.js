document.addEventListener("DOMContentLoaded", () => {
  // === TOGGLE MENÚ RESPONSIVE ===
  const toggleBtn = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // === SCROLL SUAVE ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // === ANIMACIÓN AL HACER SCROLL ===
  const fadeElements = document.querySelectorAll(".fade-in");
  const observerFade = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  });

  fadeElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "opacity 1s ease-out, transform 1s ease-out";
    observerFade.observe(el);
  });

  // === LOGO INTRO ===

  const logoIntro = document.getElementById("logoIntro");
  const barraIntro = document.getElementById("barraIntro");

  let introActive = true;
  let canDismiss = false;

  function hideLogoIntro() {
    if (!introActive || !canDismiss) return;
    barraIntro.classList.add("fade-out");
    logoIntro.classList.add("fade-out");
    document.body.classList.add("loaded");
    introActive = false;
  }

  // Permitir que desaparezca solo después de 2s
  setTimeout(() => {
    canDismiss = true;
  }, 1000);

  window.addEventListener("scroll", hideLogoIntro);
  window.addEventListener("click", hideLogoIntro);



  // === ANIMACIÓN CARDS NOSOTROS ===
  const nosotrosCards = document.querySelectorAll(".nosotros-card");
  const observerNosotros = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observerNosotros.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  nosotrosCards.forEach(card => observerNosotros.observe(card));

  // === ANIMACIÓN CARDS SERVICIOS ===
  const servicioCards = document.querySelectorAll(".card-servicio");
  const observerServicios = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observerServicios.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  servicioCards.forEach(card => observerServicios.observe(card));

  // === MODO OSCURO ===
  const darkToggle = document.getElementById("darkModeToggle");
  const darkModePref = localStorage.getItem("darkMode") === "enabled";

  if (darkModePref) {
    document.body.classList.add("dark-mode");
    darkToggle.textContent = "☀️";
  }

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    darkToggle.textContent = isDark ? "☀️" : "🌙";
  });

  // === BOTÓN SCROLL TO TOP ===
  const scrollBtn = document.querySelector(".scroll-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // === FORMULARIO DE CONTACTO ===
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { "Accept": "application/json" }
        });

        if (res.ok) {
          status.textContent = "¡Mensaje enviado con éxito!";
          status.style.color = "green";
          form.reset();
        } else {
          throw new Error();
        }
      } catch {
        status.textContent = "Hubo un error. Intentalo más tarde.";
        status.style.color = "red";
      }

      status.classList.add("visible");
      setTimeout(() => status.textContent = "", 4000);
    });
  }
});

// === SIEMPRE ARRIBA AL CARGAR ===
window.onbeforeunload = () => window.scrollTo(0, 0);


document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.querySelector(".btn-contacto");

  if (sendButton) {
    sendButton.addEventListener("click", () => {
      const rect = sendButton.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < 12; i++) {
        const particle = document.createElement("span");
        particle.classList.add("joy-particle");

        const emojis = ["❤️", "✨", "💖", "💕"];
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 20;

        const scale = (Math.random() * 0.6 + 0.8).toFixed(2);

        particle.style.left = `${centerX + offsetX}px`;
        particle.style.top = `${centerY + offsetY}px`;
        particle.style.setProperty('--scale', scale);

        document.body.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 2500);
      }
    });
  }
});


