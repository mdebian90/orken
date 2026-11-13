const PORTFOLIO_ITEMS = [
  {
    id: "3d",
    nombre: "3D MODELING",
    paginaDestino: "3d.html",
    imagenMuestra: "img/3d/1-1.jpg",
    iconoSvg: `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round">
        <polygon points="32,8 54,20 54,44 32,56 10,44 10,20"/>
        <polyline points="10,20 32,32 54,20"/>
        <line x1="32" y1="32" x2="32" y2="56"/>
      </svg>`
  },
  {
    id: "videogames",
    nombre: "VIDEOGAMES",
    paginaDestino: "videogames.html",
    imagenMuestra: "img/videogame/1-1.jpg",
    iconoSvg: `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round">
        <path d="M14,22 H50 C55,22 58,27 57,33 L54,46 C53,50 49,52 45,50 L38,44 H26 L19,50 C15,52 11,50 10,46 L7,33 C6,27 9,22 14,22 Z"/>
        <line x1="20" y1="29" x2="20" y2="39"/>
        <line x1="15" y1="34" x2="25" y2="34"/>
        <circle cx="43" cy="31" r="2.5" fill="currentColor"/>
        <circle cx="48" cy="36" r="2.5" fill="currentColor"/>
      </svg>`
  },
  {
    id: "ui-ux",
    nombre: "UI/WEB/MOBILE",
    paginaDestino: "ui-ux.html",
    imagenMuestra: "img/ui/1-1.jpg",
    iconoSvg: `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round">
        <rect x="8" y="12" width="48" height="40" rx="4"/>
        <line x1="8" y1="22" x2="56" y2="22"/>
        <circle cx="14" cy="17" r="1.5" fill="currentColor"/>
        <circle cx="20" cy="17" r="1.5" fill="currentColor"/>
        <rect x="14" y="28" width="16" height="18" rx="2"/>
        <line x1="35" y1="30" x2="50" y2="30"/>
        <line x1="35" y1="37" x2="50" y2="37"/>
        <line x1="35" y1="44" x2="44" y2="44"/>
      </svg>`
  },
  {
    id: "photo-composition",
    nombre: "GRAPHIC COMPOSITION",
    paginaDestino: "photo-composition.html",
    imagenMuestra: "img/composition/1-1.jpg",
    iconoSvg: `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
        <rect x="8" y="10" width="34" height="34" rx="3"/>
        <path d="M42,20 H53 C54.7,20 56,21.3 56,23 V51 C56,52.7 54.7,54 53,54 H25 C23.3,54 22,52.7 22,51 V44"/>
        <circle cx="19" cy="21" r="3" fill="currentColor" stroke="none"/>
        <polyline points="10,38 20,28 28,35 34,30 42,38"/>
      </svg>`
  },
  {
    id: "illustration",
    nombre: "ILLUSTRATION",
    paginaDestino: "illustration.html",
    imagenMuestra: "img/illustration/1-1.jpg",
    iconoSvg: `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round">
        <path d="M32,8 L50,36 L40,52 H24 L14,36 Z"/>
        <line x1="32" y1="8" x2="32" y2="33"/>
        <circle cx="32" cy="36" r="4" fill="currentColor"/>
        <line x1="20" y1="56" x2="44" y2="56"/>
      </svg>`
  },
  {
    id: "video-creation",
    nombre: "VIDEO EDITING",
    paginaDestino: "video-creation.html",
    imagenMuestra: "img/video/1-1.jpg",
    iconoSvg: `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round">
        <rect x="8" y="14" width="48" height="36" rx="4"/>
        <line x1="16" y1="14" x2="16" y2="50"/>
        <line x1="48" y1="14" x2="48" y2="50"/>
        <polygon points="27,25 41,32 27,39" fill="currentColor"/>
      </svg>`
  },
  {
    id: "contact",
    nombre: "CONTACT",
    paginaDestino: "contact.html",
    imagenMuestra: "img/contact/1-1.jpg",
    iconoSvg: `
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round">
        <rect x="8" y="15" width="48" height="34" rx="4"/>
        <polyline points="10,17 32,35 54,17"/>
      </svg>`
  }
];

let currentIndex = 0;

const navLeftBtn = document.getElementById("navLeftBtn");
const navRightBtn = document.getElementById("navRightBtn");
const slotLeftSmall = document.getElementById("slotLeftSmall");
const slotLeftMedium = document.getElementById("slotLeftMedium");
const slotCenterLarge = document.getElementById("slotCenterLarge");
const slotRightMedium = document.getElementById("slotRightMedium");
const slotRightSmall = document.getElementById("slotRightSmall");
const activeOptionTitle = document.getElementById("activeOptionTitle");
const showcaseFrame = document.getElementById("showcaseFrame");
const showcasePreviewImg = document.getElementById("showcasePreviewImg");
const transitionCurtain = document.getElementById("transitionCurtain");

function actualizarImagenCentral(item, conAnimacion) {
  if (!conAnimacion) {
    showcasePreviewImg.src = item.imagenMuestra;
    showcasePreviewImg.alt = "" + item.nombre;
    return;
  }

  showcaseFrame.classList.add("is-switching");
  setTimeout(() => {
    showcasePreviewImg.src = item.imagenMuestra;
    showcasePreviewImg.alt = "" + item.nombre;
    showcaseFrame.classList.remove("is-switching");
  }, 170);
}

function configurarSlot(elementoBtn, itemIndex, esEnfocado) {
  if (itemIndex < 0 || itemIndex >= PORTFOLIO_ITEMS.length) {
    elementoBtn.classList.add("is-empty");
    elementoBtn.innerHTML = "";
    elementoBtn.onclick = null;
    elementoBtn.removeAttribute("aria-label");
    return;
  }

  const item = PORTFOLIO_ITEMS[itemIndex];
  elementoBtn.classList.remove("is-empty");
  elementoBtn.innerHTML = item.iconoSvg;

  if (esEnfocado) {
    elementoBtn.setAttribute("aria-label", "Open sección " + item.nombre);
    elementoBtn.title = "Open " + item.nombre;
    elementoBtn.onclick = () => abrirPaginaCategoria(item);
  } else {
    elementoBtn.setAttribute("aria-label", "Enfocar opción " + item.nombre);
    elementoBtn.title = "Select " + item.nombre;
    elementoBtn.onclick = () => cambiarEnfoque(itemIndex);
  }
}

function renderizarMenu(conAnimacion = true) {
  const total = PORTFOLIO_ITEMS.length;

  if (currentIndex <= 0) {
    navLeftBtn.classList.add("is-hidden");
  } else {
    navLeftBtn.classList.remove("is-hidden");
  }

  configurarSlot(slotLeftSmall, currentIndex - 2, false);
  configurarSlot(slotLeftMedium, currentIndex - 1, false);
  configurarSlot(slotCenterLarge, currentIndex, true);
  configurarSlot(slotRightMedium, currentIndex + 1, false);
  configurarSlot(slotRightSmall, currentIndex + 2, false);

  if (currentIndex >= total - 1) {
    navRightBtn.classList.add("is-hidden");
  } else {
    navRightBtn.classList.remove("is-hidden");
  }

  const itemActual = PORTFOLIO_ITEMS[currentIndex];
  activeOptionTitle.textContent = itemActual.nombre;
  actualizarImagenCentral(itemActual, conAnimacion);
}

function cambiarEnfoque(nuevoIndice) {
  if (nuevoIndice < 0 || nuevoIndice >= PORTFOLIO_ITEMS.length) return;
  if (nuevoIndice === currentIndex) return;
  currentIndex = nuevoIndice;
  renderizarMenu(true);
}

function abrirPaginaCategoria(item) {
  transitionCurtain.textContent = "LOADING " + item.nombre.toUpperCase() + "...";
  transitionCurtain.classList.add("is-active");
  setTimeout(() => {
    window.location.href = item.paginaDestino;
  }, 360);
}

navLeftBtn.addEventListener("click", () => {
  cambiarEnfoque(currentIndex - 1);
});

navRightBtn.addEventListener("click", () => {
  cambiarEnfoque(currentIndex + 1);
});

showcaseFrame.addEventListener("click", () => {
  abrirPaginaCategoria(PORTFOLIO_ITEMS[currentIndex]);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    cambiarEnfoque(currentIndex - 1);
  } else if (event.key === "ArrowRight") {
    cambiarEnfoque(currentIndex + 1);
  } else if (event.key === "Enter") {
    abrirPaginaCategoria(PORTFOLIO_ITEMS[currentIndex]);
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
renderizarMenu(false);