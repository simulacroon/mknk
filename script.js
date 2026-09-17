/* =========================================
   ELEMENTOS PRINCIPALES
========================================= */

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
   ELEMENTOS DE LA SECCIÓN NODOS
========================================= */

const nodeButtons = [
  ...document.querySelectorAll(".node-point")
];

const nodeDetail = document.querySelector(".node-detail");


/* =========================================
   CONTENIDO DE LOS NODOS
========================================= */

const nodeContent = {
  reflejos: {
    code: "NODO 01 / MATERIAL + ÍNTIMO",
    title: "Reflejos invisibles",

    copy:
      "La luz, el reflejo y los dispositivos ópticos hacen visible aquello que normalmente queda fuera del campo perceptivo.",

    tags: [
      "luz",
      "percepción",
      "dispositivo"
    ],

    href: "#reflejos"
  },

  ritmo: {
    code: "NODO 02 / CUERPO + MÁQUINA",
    title: "Ritmo de corte",

    copy:
      "El cuerpo deja de acompañar a la máquina y entra en negociación con ella: activa fragmentos, dispara acordes y altera la escena en tiempo real.",

    tags: [
      "cuerpo",
      "ritmo",
      "interfaz"
    ],

    href: "#ritmo"
  },

  paso: {
    code: "NODO 03 / MATERIAL + COLECTIVO",
    title: "Dar el primer paso",

    copy:
      "Una guía coreográfica para activar sistemas de conciencia expandida mediante presencia, movimiento y cooperación.",

    tags: [
      "coreografía",
      "conciencia",
      "activación"
    ],

    href: "#primer-paso"
  },

  memorias: {
    code: "NODO 04 / DIGITAL + COLECTIVO",
    title: "Memorias futuras",

    copy:
      "Píxeles, televisores, archivos y cuerpos fragmentados construyen una memoria tecnológica que no pertenece a una sola autora ni a un único soporte.",

    tags: [
      "archivo",
      "píxel",
      "memoria"
    ],

    href: "#memorias"
  }
};


/* =========================================
   LIMITAR VALORES ENTRE 0 Y 1
========================================= */

function clamp(value, min = 0, max = 1) {
  return Math.min(
    Math.max(value, min),
    max
  );
}


/* =========================================
   TRANSICIÓN ENTRE LOS DOS VIDEOS
========================================= */

function updateVideoTransition() {
  if (
    !showcase ||
    !firstVideo ||
    !secondVideo
  ) {
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
    La transición comienza aproximadamente
    al llegar al 28 % del recorrido.

    El fundido se completa durante
    el siguiente 44 %.
  */

  const fade = clamp(
    (progress - 0.28) / 0.44
  );

  firstVideo.style.opacity =
    String(1 - fade);

  firstVideo.style.transform =
    `scale(${1 + progress * 0.035})`;

  secondVideo.style.opacity =
    String(fade);

  secondVideo.style.transform =
    `scale(${1.035 - fade * 0.035})`;

  if (videoCounter) {
    videoCounter.textContent =
      fade >= 0.5
        ? "02"
        : "01";
  }

  /*
    Inicia el segundo video cuando
    comienza a hacerse visible.
  */

  if (fade > 0.05) {
    secondVideo.play().catch(() => {
      /*
        Algunos navegadores pueden bloquear
        la reproducción automática.
      */
    });
  }
}


/* =========================================
   ACTUALIZAR LA SECCIÓN ACTIVA DEL MENÚ
========================================= */

function updateActiveMenu() {
  const marker =
    window.innerHeight * 0.48;

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
   SELECCIONAR UN NODO
========================================= */

function selectNode(nodeKey) {
  const selected = nodeContent[nodeKey];

  if (
    !selected ||
    !nodeDetail
  ) {
    return;
  }

  /*
    Actualiza el estado visual y accesible
    de los puntos del plano cartesiano.
  */

  nodeButtons.forEach((button) => {
    const isSelected =
      button.dataset.node === nodeKey;

    button.classList.toggle(
      "is-active",
      isSelected
    );

    button.setAttribute(
      "aria-pressed",
      String(isSelected)
    );
  });

  /*
    Actualiza la información situada
    junto al plano cartesiano.
  */

  nodeDetail.innerHTML = `
    <p class="node-detail-code">
      ${selected.code}
    </p>

    <h3>
      ${selected.title}
    </h3>

    <p class="node-detail-copy">
      ${selected.copy}
    </p>

    <div class="node-tags">
      ${selected.tags
        .map(
          (tag) =>
            `<span>${tag}</span>`
        )
        .join("")}
    </div>

    <a
      class="node-project-link"
      href="${selected.href}"
    >
      Ver proyecto ↓
    </a>
  `;
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

document.addEventListener(
  "mousemove",
  (event) => {
    const horizontalPosition =
      (
        event.clientX /
        window.innerWidth
      ) * 100;

    document.documentElement
      .style
      .setProperty(
        "--pointer-x",
        `${horizontalPosition}%`
      );
  }
);


/* =========================================
   INTERACCIÓN DE LOS NODOS
========================================= */

nodeButtons.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      selectNode(
        button.dataset.node
      );
    }
  );
});


/* =========================================
   EVENTOS DE LA VENTANA
========================================= */

window.addEventListener(
  "scroll",
  onScroll,
  {
    passive: true
  }
);

window.addEventListener(
  "resize",
  onScroll
);

window.addEventListener(
  "load",
  onScroll
);
