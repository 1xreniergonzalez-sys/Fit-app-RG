const content = document.getElementById("content");

/* ===== NAVEGACIÓN ===== */
function go(page) {
  fetch(`pages/${page}.html`)
    .then(r => r.text())
    .then(html => {
      content.innerHTML = html;
      if (page === "routine") loadRoutine();
    })
    .catch(() => {
      content.innerHTML = "<p>Error cargando página</p>";
    });
}

/* ===== PERFIL ===== */
function saveProfile() {
  const profile = {
    age: Number(document.getElementById("age").value),
    weight: Number(document.getElementById("weight").value),
    height: Number(document.getElementById("height").value),
    goal: document.getElementById("goal").value
  };

  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Perfil guardado");
  go("routine");
}

/* ===== IA PROGRESIVA ===== */
function generateAIRoutine(profile, history = []) {
  let volume = 3;

  if (profile.age < 25) volume = 4;
  if (profile.age >= 35) volume = 2;
  if (history.length >= 5) volume++;

  let focus = "fuerza";
  if (profile.goal === "definicion") focus = "resistencia";
  if (profile.goal === "cardio") focus = "cardio";

  return {
    focus,
    volume,
    recommendation:
      volume >= 4
        ? "Excelente progreso, subimos intensidad 💪"
        : "Vamos progresivo, prioriza técnica 👍"
  };
}

/* ===== HISTORIAL ===== */
function saveWorkoutDone() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  history.push({
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem("history", JSON.stringify(history));
  alert("Entrenamiento guardado");
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

  let routine = [];

  if (ai.focus === "fuerza") {
    routine = [
      `Press banca ${ai.volume}x8`,
      `Sentadilla ${ai.volume}x8`,
      `Remo ${ai.volume}x10`
    ];
  }

  if (ai.focus === "resistencia") {
    routine = [
      `Flexiones ${ai.volume}x15`,
      `Zancadas ${ai.volume}x12`,
      `Plancha ${ai.volume}x30s`
    ];
  }

  if (ai.focus === "cardio") {
    routine = [
      "Cinta 25 min",
      "Bicicleta 20 min",
      "Saltos 4x40"
    ];
  }

  list.innerHTML = `<li><strong>IA:</strong> ${ai.recommendation}</li>`;

  routine.forEach(ex => {
    const li = document.createElement("li");
    li.textContent = ex;
    list.appendChild(li);
  });

  const btn = document.createElement("button");
  btn.textContent = "Marcar entrenamiento realizado";
  btn.onclick = saveWorkoutDone;
  list.appendChild(btn);
}

/* ===== CARGA INICIAL ===== */
go("home");
