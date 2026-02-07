/* =========================================
   FIT·AI — app.js DEFINITIVO
========================================= */

/* ---------- Navegación ---------- */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
  }
}

/* ---------- Eventos de menú ---------- */
document.getElementById("btn-home").addEventListener("click", () => {
  showScreen("home");
});

document.getElementById("btn-routines").addEventListener("click", () => {
  showScreen("routines");
});

document.getElementById("btn-stats").addEventListener("click", () => {
  showScreen("stats");
});

/* ---------- Datos de rutinas ---------- */
const ROUTINES = [
  {
    name: "Full Body",
    exercises: [
      { name: "Flexiones", reps: "3 x 15", image: IMAGES.pushup },
      { name: "Sentadillas", reps: "3 x 20", image: IMAGES.squat }
    ]
  },
  {
    name: "Pecho",
    exercises: [
      { name: "Press Banca", reps: "4 x 10", image: IMAGES.bench },
      { name: "Flexiones", reps: "3 x 15", image: IMAGES.pushup }
    ]
  }
];

/* ---------- Cargar rutinas ---------- */
function loadRoutines() {
  const container = document.getElementById("routine-list");
  container.innerHTML = "";

  ROUTINES.forEach(routine => {
    const title = document.createElement("h3");
    title.textContent = routine.name;
    container.appendChild(title);

    routine.exercises.forEach(ex => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${ex.image}" alt="${ex.name}">
        <div>
          <strong>${ex.name}</strong><br>
          ${ex.reps}
        </div>
      `;

      container.appendChild(card);
    });
  });
}

/* ---------- Inicialización ---------- */
document.addEventListener("DOMContentLoaded", () => {
  showScreen("home");
  loadRoutines();
});
