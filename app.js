const content = document.getElementById("content");

/* ===== NAVEGACIÓN ===== */
function go(page) {
  fetch(`pages/${page}.html`)
    .then(r => r.text())
    .then(html => {
      content.innerHTML = html;
      if (page === "routine") loadRoutine();
      if (page === "stats") loadStats();
      if (page === "timer") resetTimer();
    });
}

/* ===== PERFIL ===== */
function saveProfile() {
  const profile = {
    age: Number(age.value),
    weight: Number(weight.value),
    height: Number(height.value),
    goal: goal.value
  };
  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Perfil guardado");
  go("routine");
}

/* ===== IA ===== */
function generateAIRoutine(profile, history) {
  let volume = 3;
  if (profile.age < 25) volume = 4;
  if (profile.age >= 35) volume = 2;
  if (history.length >= 5) volume++;

  let focus = "fuerza";
  if (profile.goal === "definicion") focus = "resistencia";
  if (profile.goal === "cardio") focus = "cardio";

  return { focus, volume };
}

/* ===== RUTINA ===== */
function loadRoutine() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const list = document.getElementById("routineList");

  if (!profile) {
    list.innerHTML = "<li>Configura tu perfil primero</li>";
    return;
  }

  const history = JSON.parse(localStorage.getItem("history")) || [];
  const ai = generateAIRoutine(profile, history);

  const routines = {
    fuerza: [
      `Press banca ${ai.volume}x8`,
      `Sentadilla ${ai.volume}x8`,
      `Remo ${ai.volume}x10`
    ],
    resistencia: [
      `Flexiones ${ai.volume}x15`,
      `Zancadas ${ai.volume}x12`,
      `Plancha ${ai.volume}x30s`
    ],
    cardio: [
      "Cinta 25 min",
      "Bicicleta 20 min",
      "Saltos 4x40"
    ]
  };

  list.innerHTML = "";
  routines[ai.focus].forEach(ex => {
    const li = document.createElement("li");
    li.textContent = ex;
    list.appendChild(li);
  });

  const btn = document.createElement("button");
  btn.textContent = "Marcar entrenamiento realizado";
  btn.onclick = saveWorkoutDone;
  list.appendChild(btn);
}

/* ===== HISTORIAL ===== */
function saveWorkoutDone() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(new Date().toLocaleDateString());
  localStorage.setItem("history", JSON.stringify(history));
  alert("Entrenamiento guardado 💪");
}

/* ===== TIMER ===== */
let timer;
let seconds = 60;

function updateTimer() {
  document.getElementById("time").textContent = seconds;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      updateTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  seconds = 60;
  updateTimer();
}

/* ===== NOTIFICACIONES ===== */
function askNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}

function notifyWorkout() {
  if (Notification.permission === "granted") {
    new Notification("FIT·AI 💪", {
      body: "Es momento de entrenar",
      icon: "icons/icon-192.png"
    });
  }
}


/* ===== STATS ===== */
function loadStats() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  document.getElementById("stats").textContent =
    `Entrenamientos realizados: ${history.length}`;
}

/* ===== INICIO ===== */
go("home");
