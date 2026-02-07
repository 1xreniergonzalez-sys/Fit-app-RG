/* ===============================
   VARIABLES GLOBALES
================================ */
const content = document.getElementById("content");

/* ===============================
   NAVEGACIÓN ENTRE PÁGINAS
================================ */
function go(page) {
  fetch(`pages/${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error("Página no encontrada");
      return res.text();
    })
    .then(html => {
      content.innerHTML = html;

      if (page === "profile") loadProfile();
      if (page === "routine") loadRoutine();
      if (page === "stats") loadStats();
      if (page === "timer") resetTimer();
    })
    .catch(err => {
      content.innerHTML = `<p>Error cargando la página</p>`;
      console.error(err);
    });
}

/* ===============================
   PERFIL DE USUARIO
================================ */
function saveProfile() {
  const profile = {
    age: document.getElementById("age").value,
    weight: document.getElementById("weight").value,
    height: document.getElementById("height").value,
    goal: document.getElementById("goal").value
  };
  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Perfil guardado");
}

function loadProfile() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (!profile) return;

  document.getElementById("age").value = profile.age;
  document.getElementById("weight").value = profile.weight;
  document.getElementById("height").value = profile.height;
  document.getElementById("goal").value = profile.goal;
}

/* ===============================
   IA DE RUTINAS (AVANZADA LIGERA)
================================ */
function generateAIRoutine(profile, history) {
  let volume = 3;
  let fatigue = history.length % 4 === 0;

  if (profile.age < 25) volume++;
  if (profile.age > 40) volume--;
  if (fatigue) volume--;

  let focus = "fuerza";

  if (profile.goal === "definicion") focus = "resistencia";
  if (profile.goal === "cardio") focus = "cardio";

  return { focus, volume };
}

/* ===============================
   RUTINAS
================================ */
function loadRoutine() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (!profile) {
    content.innerHTML += `<p>Primero completa tu perfil</p>`;
    return;
  }

  const history = JSON.parse(localStorage.getItem("history")) || [];
  const ai = generateAIRoutine(profile, history);

  const routines = {
    fuerza: [
      `Press banca ${ai.volume}x8`,
      `Sentadilla ${ai.volume}x8`,
      `Peso muerto ${ai.volume}x6`
    ],
    resistencia: [
      `Flexiones ${ai.volume}x15`,
      `Zancadas ${ai.volume}x12`,
      `Plancha ${ai.volume}x40s`
    ],
    cardio: [
      "Cinta 30 min",
      "Bicicleta 25 min",
      "HIIT 15 min"
    ]
  };

  const list = document.createElement("ul");
  routines[ai.focus].forEach(ej => {
    const li = document.createElement("li");
    li.textContent = ej;
    list.appendChild(li);
  });

  content.appendChild(list);

  const btn = document.createElement("button");
  btn.textContent = "Marcar entrenamiento como realizado";
  btn.onclick = saveWorkout;
  content.appendChild(btn);
}

function saveWorkout() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(new Date().toISOString());
  localStorage.setItem("history", JSON.stringify(history));
  alert("Entrenamiento guardado 💪");
}

/* ===============================
   ESTADÍSTICAS
================================ */
function loadStats() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const statsEl = document.getElementById("stats");
  if (!statsEl) return;

  statsEl.textContent = `Entrenamientos realizados: ${history.length}`;
}

/* ===============================
   TEMPORIZADOR
================================ */
let timerInterval = null;
let seconds = 60;

function updateTime() {
  const timeEl = document.getElementById("time");
  if (timeEl) timeEl.textContent = seconds;
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      updateTime();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      notifyWorkout();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = 60;
  updateTime();
}

/* ===============================
   NOTIFICACIONES
================================ */
function askNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}

function notifyWorkout() {
  if (Notification.permission === "granted") {
    new Notification("FIT·AI 💪", {
      body: "Tiempo terminado, sigue con el próximo ejercicio",
      icon: "icons/icon-192.png"
    });
  }
}

/* ===============================
   INICIO
================================ */
document.addEventListener("DOMContentLoaded", () => {
  askNotificationPermission();
  go("home");
});
/* ===============================
   RUTINAS AVANZADAS
================================ */

const advancedRoutines = {
  volumen: {
    1: [
      "Press banca 3x10",
      "Sentadilla 3x10",
      "Curl bíceps 3x12"
    ],
    2: [
      "Press inclinado 4x8",
      "Peso muerto 4x6",
      "Fondos 3x10"
    ],
    3: [
      "Press banca pesado 5x5",
      "Sentadilla 5x5",
      "Dominadas lastradas 4x6"
    ]
  },
  definicion: {
    1: [
      "Flexiones 4x15",
      "Zancadas 3x20",
      "Plancha 3x40s"
    ],
    2: [
      "Circuito HIIT 20 min",
      "Abdominales 4x20"
    ],
    3: [
      "HIIT intenso 30 min",
      "Core avanzado"
    ]
  }
};

