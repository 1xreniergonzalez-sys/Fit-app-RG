/* =================================================
   FIT·AI — app.js ESTABLE Y SIN ERRORES
   Requisitos:
   - index.html con secciones #home #routines #stats
   - styles.css
   - images.js cargado ANTES de este archivo
================================================= */

/* ===============================
   NAVEGACIÓN ENTRE MENÚS
================================ */
function showScreen(screenId) {
  // Ocultar todas las pantallas
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  // Mostrar la pantalla solicitada
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
  }
}

/* ===============================
   DATOS DE RUTINAS
================================ */
const ROUTINES = [
  {
    name: "Rutina Full Body",
    exercises: [
      {
        name: "Flexiones",
        reps: "3 x 15",
        image: IMAGES.pushup
      },
      {
        name: "Sentadillas",
        reps: "3 x 20",
        image: IMAGES.squat
      }
    ]
  },
  {
    name: "Pecho y Tríceps",
    exercises: [
      {
        name: "Press banca",
        reps: "4 x 10",
        image: IMAGES.bench
      },
      {
        name: "Flexiones",
        reps: "3 x 15",
        image: IMAGES.pushup
      }
    ]
  }
];

/* ===============================
   CARGAR RUTINAS EN PANTALLA
================================ */
function loadRoutines() {
  const container = document.getElementById("routine-list");

  // Seguridad: si no existe, no hace nada
  if (!container) return;

  container.innerHTML = "";

  ROUTINES.forEach(routine => {
    // Título de la rutina
    const title = document.createElement("h3");
    title.textContent = routine.name;
    container.appendChild(title);

    // Ejercicios
    routine.exercises.forEach(exercise => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${exercise.image}" alt="${exercise.name}">
        <div>
          <strong>${exercise.name}</strong><br>
          ${exercise.reps}
        </div>
      `;

      container.appendChild(card);
    });
  });
}

/* ===============================
   INICIALIZACIÓN GENERAL
================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar inicio por defecto
  showScreen("home");

  // Cargar rutinas
  loadRoutines();
});
