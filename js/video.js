const SECTIONS_ORDER = [
  {
    id: "3d",
    nombre: "3D",
    pagina: "3d.html"
  },
  {
    id: "videogames",
    nombre: "Videogames",
    pagina: "videogames.html"
  },
  {
    id: "ui-ux",
    nombre: "UI/UX",
    pagina: "ui-ux.html"
  },
  {
    id: "photo-composition",
    nombre: "Photo Composition",
    pagina: "photo-composition.html"
  },
  {
    id: "illustration",
    nombre: "Illustration",
    pagina: "illustration.html"
  },
  {
    id: "video-creation",
    nombre: "Video Editing",
    pagina: "video-creation.html"
  },
  {
    id: "contact",
    nombre: "Contact",
    pagina: "contact.html"
  }
];

const VIDEO_ITEMS = [
  {
    thumbnail: "img/video/1.jpg",
    youtubeUrl: "https://youtube.com/shorts/JDZZLlekKeQ"
  },
  {
    thumbnail: "img/video/2.jpg",
    youtubeUrl: "https://youtube.com/shorts/B_vtI1FP9M4"
  },
  {
    thumbnail: "img/video/3.jpg",
    youtubeUrl: "https://youtube.com/shorts/q6UjoGH6Jo4"
  }
];

const currentSectionId = document.body.getAttribute("data-section-id");
const currentSectionIndex = SECTIONS_ORDER.findIndex((sec) => sec.id === currentSectionId);
const currentSection = SECTIONS_ORDER[currentSectionIndex] || SECTIONS_ORDER[5];

const prevSectionBtn = document.getElementById("prevSectionBtn");
const nextSectionBtn = document.getElementById("nextSectionBtn");
const prevSectionLabel = document.getElementById("prevSectionLabel");
const nextSectionLabel = document.getElementById("nextSectionLabel");
const videoGrid = document.getElementById("videoGrid");
const transitionCurtain = document.getElementById("transitionCurtain");

const lightboxOverlay = document.getElementById("lightboxOverlay");
const youtubePlayerIframe = document.getElementById("youtubePlayerIframe");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
const lightboxNextBtn = document.getElementById("lightboxNextBtn");

let activeVideoIndex = 0;

function configurarNavegacionSecciones() {
  if (currentSectionIndex <= 0) {
    prevSectionBtn.classList.add("is-hidden");
  } else {
    const anterior = SECTIONS_ORDER[currentSectionIndex - 1];
    prevSectionBtn.classList.remove("is-hidden");
    prevSectionLabel.textContent = "BACK";
    prevSectionBtn.title = "" + anterior.nombre;
    prevSectionBtn.onclick = () => navegarASeccion(anterior);
  }

  if (currentSectionIndex >= SECTIONS_ORDER.length - 1) {
    nextSectionBtn.classList.add("is-hidden");
  } else {
    const siguiente = SECTIONS_ORDER[currentSectionIndex + 1];
    nextSectionBtn.classList.remove("is-hidden");
    nextSectionLabel.textContent = "NEXT";
    nextSectionBtn.title = "" + siguiente.nombre;
    nextSectionBtn.onclick = () => navegarASeccion(siguiente);
  }
}

function navegarASeccion(seccion) {
  transitionCurtain.textContent = "LOADING " + seccion.nombre.toUpperCase() + "...";
  transitionCurtain.classList.add("is-active");
  setTimeout(() => {
    window.location.href = seccion.pagina;
  }, 340);
}

function obtenerUrlEmbedYouTube(urlOId) {
  const regexId = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const coincidencia = urlOId.match(regexId);
  const videoId = coincidencia ? coincidencia[1] : urlOId.trim();
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
}

function renderizarTarjetasVideo() {
  VIDEO_ITEMS.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "video-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Reproducir video ${index + 1} de Video Editing`);

    const img = document.createElement("img");
    img.className = "video-card-img";
    img.src = item.thumbnail;
    img.alt = `Video Editing - Proyecto ${index + 1}`;
    img.loading = "lazy";

    const playIndicator = document.createElement("div");
    playIndicator.className = "video-play-indicator";
    playIndicator.setAttribute("aria-hidden", "true");
    playIndicator.innerHTML = `
      <svg viewBox="0 0 24 24">
        <polygon points="6,4 20,12 6,20" />
      </svg>
    `;

    const badge = document.createElement("span");
    badge.className = "video-card-badge";
    badge.textContent = String(index + 1).padStart(2, "0");

    card.appendChild(img);
    card.appendChild(playIndicator);
    card.appendChild(badge);

    card.addEventListener("click", () => abrirVisorVideo(index));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        abrirVisorVideo(index);
      }
    });

    videoGrid.appendChild(card);
  });
}

function abrirVisorVideo(index) {
  if (VIDEO_ITEMS.length === 0) return;
  activeVideoIndex = index;
  actualizarReproductorVisor();

  lightboxOverlay.hidden = false;
  requestAnimationFrame(() => {
    lightboxOverlay.classList.add("is-open");
  });
}

function actualizarReproductorVisor() {
  const item = VIDEO_ITEMS[activeVideoIndex];
  if (!item) return;

  youtubePlayerIframe.src = obtenerUrlEmbedYouTube(item.youtubeUrl);

  const actualTxt = String(activeVideoIndex + 1).padStart(2, "0");
  const totalTxt = String(VIDEO_ITEMS.length).padStart(2, "0");
  lightboxCaption.textContent = `VIDEO EDITING  //  ${actualTxt} / ${totalTxt}`;

  const mostrarFlechas = VIDEO_ITEMS.length > 1;
  lightboxPrevBtn.style.display = mostrarFlechas ? "flex" : "none";
  lightboxNextBtn.style.display = mostrarFlechas ? "flex" : "none";
}

function cerrarVisorVideo() {
  lightboxOverlay.classList.remove("is-open");
  setTimeout(() => {
    lightboxOverlay.hidden = true;
    youtubePlayerIframe.src = "";
  }, 220);
}

function cambiarVideoVisor(delta) {
  if (VIDEO_ITEMS.length <= 1) return;
  activeVideoIndex = (activeVideoIndex + delta + VIDEO_ITEMS.length) % VIDEO_ITEMS.length;
  actualizarReproductorVisor();
}

lightboxCloseBtn.addEventListener("click", cerrarVisorVideo);
lightboxPrevBtn.addEventListener("click", () => cambiarVideoVisor(-1));
lightboxNextBtn.addEventListener("click", () => cambiarVideoVisor(1));

lightboxOverlay.addEventListener("click", (event) => {
  if (event.target === lightboxOverlay) {
    cerrarVisorVideo();
  }
});

document.addEventListener("keydown", (event) => {
  if (lightboxOverlay.hidden) return;

  if (event.key === "Escape") {
    cerrarVisorVideo();
  } else if (event.key === "ArrowLeft") {
    cambiarVideoVisor(-1);
  } else if (event.key === "ArrowRight") {
    cambiarVideoVisor(1);
  }
});

function generarParticulas() {
  const contenedor = document.getElementById("ambientParticles");
  const cantidad = 26;
  for (let i = 0; i < cantidad; i++) {
    const punto = document.createElement("span");
    punto.className = "particle";
    const size = Math.random() * 3.5 + 1.5;
    punto.style.width = size + "px";
    punto.style.height = size + "px";
    punto.style.left = Math.random() * 100 + "%";
    punto.style.top = (Math.random() * 65 + 20) + "%";
    punto.style.animationDuration = (Math.random() * 7 + 6) + "s";
    punto.style.animationDelay = (Math.random() * 6) + "s";
    contenedor.appendChild(punto);
  }
}

generarParticulas();
configurarNavegacionSecciones();
renderizarTarjetasVideo();