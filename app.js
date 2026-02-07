/* ===============================
   FIT·AI - APP PRINCIPAL
================================ */

// --------- UTILIDADES ----------
function $(id) {
  return document.getElementById(id);
}

// --------- PERFIL USUARIO ----------
function saveProfile() {
  const profile = {
    age: $("age").value,
    weight: $("weight").value,
    height: $("height").value,
    goal: $("goal").value
  };

  if (!profile.age || !profile.weight || !profile.height) {
    alert("Completa todos los campos");
    return;
  }

  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Perfil guardado correctamente");
}

// --------- RUTINAS IA ----------
const routines = {
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
      "Press banca 5x5",
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
  },
  cardio: {
    1: ["Caminata 30 min"],
    2: ["Bicicleta 40 min"],
    3: ["HIIT Cardio 30 min"]
  }
};

// --------- MOSTRAR RUTINA ----------
function showRoutine() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (!profile) {
    alert("Primero completa tu perfil");
    return;
  }

  const level = $("level").value;
  const goal = profile.goal;

  const routine = routines[goal]?.[level];
  const container = $("routineResult");
  container.innerHTML = "";

  if (!routine) {
    container.textContent = "No hay rutina disponible";
    return;
  }

  const ul = document.createElement("ul");
  routine.forEach((exercise, index) => {
    const li = document.createElement("li");
    li.textContent = exercise;
    li.onclick = () => completeExercise(index);
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

// --------- COMPLETAR EJERCICIO ----------
function completeExercise(index) {
  alert(`Ejercicio ${index + 1} completado`);
}

// --------- HISTORIAL ----------
function saveWorkout(day) {
  const history = JSON.parse(localStorage.getItem("history")) || {};
  history[day] = (history[day] || 0) + 1;
  localStorage.setItem("history", JSON.stringify(history));
}

// --------- ESTADÍSTICAS ----------
function showStats() {
  const history = JSON.parse(localStorage.getItem("history")) || {};
  let text = "Entrenamientos:\n";

  for (let day in history) {
    text += `${day}: ${history[day]}\n`;
  }

  alert(text || "Sin historial aún");
}

// --------- NOTIFICACIÓN ----------
function testNotification() {
  if (!("Notification" in window)) {
    alert("Notificaciones no soportadas");
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("FIT·AI", {
        body: "Hora de entrenar 💪"
      });
    }
  });
}

// --------- SERVICE WORKER ----------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
