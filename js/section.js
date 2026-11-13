const SECTIONS_ORDER = [
  {
    id: "3d",
    nombre: "3D MODELING",
    pagina: "3d.html",
    carpeta: "img/3d"
  },
  {
    id: "videogames",
    nombre: "VIDEOGAMES",
    pagina: "videogames.html",
    carpeta: "img/videogame"
  },
  {
    id: "ui-ux",
    nombre: "UI/WEB/MOBILE",
    pagina: "ui-ux.html",
    carpeta: "img/ui"
  },
  {
    id: "photo-composition",
    nombre: "GRAPHIC COMPOSITION",
    pagina: "photo-composition.html",
    carpeta: "img/composition"
  },
  {
    id: "illustration",
    nombre: "ILLUSTRATION",
    pagina: "illustration.html",
    carpeta: "img/illustration"
  },
  {
    id: "video-creation",
    nombre: "VIDEO EDITING",
    pagina: "video-creation.html",
    carpeta: "img/video"
  },
  {
    id: "contact",
    nombre: "CONTACT",
    pagina: "contact.html",
    carpeta: "img/contact"
  }
];

const currentSectionId = document.body.getAttribute("data-section-id");
const currentSectionIndex = SECTIONS_ORDER.findIndex((sec) => sec.id === currentSectionId);
const currentSection = SECTIONS_ORDER[currentSectionIndex] || SECTIONS_ORDER[0];

const prevSectionBtn = document.getElementById("prevSectionBtn");
const nextSectionBtn = document.getElementById("nextSectionBtn");
const prevSectionLabel = document.getElementById("prevSectionLabel");
const nextSectionLabel = document.getElementById("nextSectionLabel");
const galleryGrid = document.getElementById("galleryGrid");
const galleryEmptyMsg = document.getElementById("galleryEmptyMsg");
const transitionCurtain = document.getElementById("transitionCurtain");

const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxFrame = document.getElementById("lightboxFrame");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
const lightboxNextBtn = document.getElementById("lightboxNextBtn");

let detectedImages = [];
let activeLightboxIndex = 0;

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

function verificarArchivoImagen(ruta) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        src: ruta,
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = ruta;
  });
}

async function cargarGaleriaDinamica() {
  const extensiones = ["png", "jpg"];
  const limiteMaximo = 100;
  let numero = 1;

  while (numero <= limiteMaximo) {
    let imagenEncontrada = null;

    for (const ext of extensiones) {
      const rutaCandidata = `${currentSection.carpeta}/${numero}.${ext}`;
      const resultado = await verificarArchivoImagen(rutaCandidata);
      if (resultado) {
        imagenEncontrada = resultado;
        break;
      }
    }

    if (!imagenEncontrada) {
      break;
    }

    const indiceActual = detectedImages.length;
    detectedImages.push(imagenEncontrada);
    crearContenedorCuadrado(imagenEncontrada, indiceActual);
    numero++;
  }

  if (detectedImages.length === 0) {
    galleryEmptyMsg.hidden = false;
  }
}

function crearContenedorCuadrado(datosImagen, index) {
  const card = document.createElement("article");
  card.className = "gallery-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Ver proyecto ${index + 1} de ${currentSection.nombre}`);

  const img = document.createElement("img");
  img.className = "gallery-card-img";
  img.src = datosImagen.src;
  img.alt = `${currentSection.nombre} - Proyecto ${index + 1}`;
  img.loading = "lazy";

  const badge = document.createElement("span");
  badge.className = "gallery-card-badge";
  badge.textContent = String(index + 1).padStart(2, "0");

  card.appendChild(img);
  card.appendChild(badge);

  card.addEventListener("click", () => abrirVisor(index));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      abrirVisor(index);
    }
  });

  galleryGrid.appendChild(card);
}

function ajustarMarcoVisorPorAspecto(datosImagen) {
  const maxAnchoViewport = window.innerWidth * 0.84;
  const maxAltoViewport = window.innerHeight * 0.80;
  const ratio = datosImagen.width / datosImagen.height;

  let anchoFinal;
  let altoFinal;

  if (datosImagen.height > datosImagen.width) {
    altoFinal = maxAltoViewport;
    anchoFinal = altoFinal * ratio;

    if (anchoFinal > maxAnchoViewport) {
      anchoFinal = maxAnchoViewport;
      altoFinal = anchoFinal / ratio;
    }
  } else {
    anchoFinal = maxAnchoViewport;
    altoFinal = anchoFinal / ratio;

    if (altoFinal > maxAltoViewport) {
      altoFinal = maxAltoViewport;
      anchoFinal = altoFinal * ratio;
    }
  }

  lightboxFrame.style.width = `${Math.round(anchoFinal)}px`;
  lightboxFrame.style.height = `${Math.round(altoFinal)}px`;
}

function abrirVisor(index) {
  if (detectedImages.length === 0) return;
  activeLightboxIndex = index;
  actualizarContenidoVisor();

  lightboxOverlay.hidden = false;
  requestAnimationFrame(() => {
    lightboxOverlay.classList.add("is-open");
  });
}

function actualizarContenidoVisor() {
  const datosImagen = detectedImages[activeLightboxIndex];
  if (!datosImagen) return;

  ajustarMarcoVisorPorAspecto(datosImagen);
  lightboxImg.src = datosImagen.src;
  lightboxImg.alt = `${currentSection.nombre} - Proyecto ${activeLightboxIndex + 1}`;

  const actualTxt = String(activeLightboxIndex + 1).padStart(2, "0");
  const totalTxt = String(detectedImages.length).padStart(2, "0");
  lightboxCaption.textContent = `${currentSection.nombre.toUpperCase()}  //  ${actualTxt} / ${totalTxt}`;

  const mostrarFlechas = detectedImages.length > 1;
  lightboxPrevBtn.style.display = mostrarFlechas ? "flex" : "none";
  lightboxNextBtn.style.display = mostrarFlechas ? "flex" : "none";
}

function cerrarVisor() {
  lightboxOverlay.classList.remove("is-open");
  setTimeout(() => {
    lightboxOverlay.hidden = true;
    lightboxImg.src = "";
  }, 220);
}

function cambiarImagenVisor(delta) {
  if (detectedImages.length <= 1) return;
  activeLightboxIndex = (activeLightboxIndex + delta + detectedImages.length) % detectedImages.length;
  actualizarContenidoVisor();
}

lightboxCloseBtn.addEventListener("click", cerrarVisor);
lightboxPrevBtn.addEventListener("click", () => cambiarImagenVisor(-1));
lightboxNextBtn.addEventListener("click", () => cambiarImagenVisor(1));

lightboxOverlay.addEventListener("click", (event) => {
  if (event.target === lightboxOverlay) {
    cerrarVisor();
  }
});

window.addEventListener("resize", () => {
  if (!lightboxOverlay.hidden && detectedImages[activeLightboxIndex]) {
    ajustarMarcoVisorPorAspecto(detectedImages[activeLightboxIndex]);
  }
});

document.addEventListener("keydown", (event) => {
  if (lightboxOverlay.hidden) return;

  if (event.key === "Escape") {
    cerrarVisor();
  } else if (event.key === "ArrowLeft") {
    cambiarImagenVisor(-1);
  } else if (event.key === "ArrowRight") {
    cambiarImagenVisor(1);
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
cargarGaleriaDinamica();