// === MENÚ TOGGLE ===
const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}



// === ANIMACIÓN DE SCROLL ===
const faders = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  }
);

faders.forEach(el => appearOnScroll.observe(el));

// === SCROLL SUAVE PARA ENLACES ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// === FEEDBACK FORMULARIO CON ANIMACIÓN ===
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const res = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      status.textContent = "¡Mensaje enviado con éxito!";
      status.style.color = "green";
      form.reset();
      status.classList.add("visible");
    } else {
      status.textContent = "Hubo un error. Intentalo más tarde.";
      status.style.color = "red";
      status.classList.add("visible");
    }

    setTimeout(() => status.textContent = "", 4000);
  });
}

// === OCULTAR / MOSTRAR HEADER AL SCROLL ===
let lastScrollTop = 0;
const header = document.getElementById("header");

if (header) {
  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      header.style.top = "-100px"; // Ocultar al bajar
    } else {
      header.style.top = "0"; // Mostrar al subir
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// === DETECCIÓN DE TEMA OSCURO ===
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  console.log("El usuario prefiere modo oscuro. Podés adaptar el estilo si querés.");
}

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".nosotros-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach((card) => {
    observer.observe(card);
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -150px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    fader.style.opacity = '0';
    fader.style.transform = 'translateY(100px)';
    fader.style.transition = 'opacity 2s ease-out, transform 2s ease-out';
    appearOnScroll.observe(fader);
  });
});


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};



document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('darkModeToggle');
  const prefersDark = localStorage.getItem('darkMode') === 'enabled';

  if (prefersDark) {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const darkEnabled = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkEnabled ? 'enabled' : 'disabled');
    toggleBtn.textContent = darkEnabled ? '☀️' : '🌙';
  });
});


const servicioCards = document.querySelectorAll('.card-servicio');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

servicioCards.forEach(card => observer.observe(card));


 const scrollBtn = document.querySelector('.scroll-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });