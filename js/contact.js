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

const currentSectionId = document.body.getAttribute("data-section-id");
const currentSectionIndex = SECTIONS_ORDER.findIndex((sec) => sec.id === currentSectionId);

const prevSectionBtn = document.getElementById("prevSectionBtn");
const nextSectionBtn = document.getElementById("nextSectionBtn");
const prevSectionLabel = document.getElementById("prevSectionLabel");
const nextSectionLabel = document.getElementById("nextSectionLabel");
const transitionCurtain = document.getElementById("transitionCurtain");

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