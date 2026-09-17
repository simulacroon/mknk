const showcase = document.querySelector(".video-showcase");
const firstVideo = document.querySelector(".video-one");
const secondVideo = document.querySelector(".video-two");
const videoCounter = document.querySelector(".current-video");

const menuLinks = [
  ...document.querySelectorAll('.side-menu a[href^="#"]')
];

const sections = [
  ...document.querySelectorAll("main section[id], footer[id]")
];


/* =========================================
   FUNCIÓN PARA LIMITAR VALORES ENTRE 0 Y 1
========================================= */

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}


/* =========================================
   TRANSICIÓN ENTRE LOS DOS VIDEOS
========================================= */

function updateVideoTransition() {
  if (!showcase || !firstVideo || !secondVideo) {
    return;
  }

  const rect = showcase.getBoundingClientRect();

  const scrollableDistance =
    showcase.offsetHeight - window.innerHeight;

  const progress =
    scrollableDistance > 0
      ? clamp(-rect.top / scrollableDistance)
      : 0;

  /*
    El cambio comienza cuando el recorrido llega al 28 %
    y se completa durante el siguiente 44 %.

    Para hacer la transición más rápida:

    const fade = clamp((progress - 0.4) / 0.2);
  */

  const fade = clamp((progress - 0.28) / 0.44);

  firstVideo.style.opacity = String(1 - fade);

  firstVideo.style.transform =
    `scale(${1 + progress * 0.035})`;

  secondVideo.style.opacity = String(fade);

  secondVideo.style.transform =
    `scale(${1.035 - fade * 0.035})`;

  if (videoCounter) {
    videoCounter.textContent =
      fade >= 0.5 ? "02" : "01";
  }

  /*
    Inicia el segundo video cuando comienza
    a hacerse visible.
  */

  if (fade > 0.05) {
    secondVideo.play().catch(() => {
      /*
        El navegador puede bloquear la reproducción
        automática en ciertas condiciones.
      */
    });
  }
}


/* =========================================
   ACTUALIZAR SECCIÓN ACTIVA DEL MENÚ
========================================= */

function updateActiveMenu() {
  const marker = window.innerHeight * 0.48;
  let currentId = "inicio";

  sections.forEach((section) => {
    const sectionTop =
      section.getBoundingClientRect().top;

    if (sectionTop <= marker) {
      currentId = section.id;
    }
  });

  menuLinks.forEach((link) => {
    const destination =
      link.getAttribute("href");

    link.classList.toggle(
      "active",
      destination === `#${currentId}`
    );
  });
}


/* =========================================
   CONTROL OPTIMIZADO DEL SCROLL
========================================= */

let ticking = false;

function onScroll() {
  if (ticking) {
    return;
  }

  ticking = true;

  requestAnimationFrame(() => {
    updateVideoTransition();
    updateActiveMenu();

    ticking = false;
  });
}


/* =========================================
   FONDO REACTIVO AL MOVIMIENTO DEL CURSOR
========================================= */

document.addEventListener("mousemove", (event) => {
  const horizontalPosition =
    (event.clientX / window.innerWidth) * 100;

  document.documentElement.style.setProperty(
    "--pointer-x",
    `${horizontalPosition}%`
  );
});


/* =========================================
   EVENTOS
========================================= */

window.addEventListener(
  "scroll",
  onScroll,
  { passive: true }
);

window.addEventListener(
  "resize",
  onScroll
);

window.addEventListener(
  "load",
  onScroll
);
