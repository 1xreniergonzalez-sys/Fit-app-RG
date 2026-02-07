// ---------- LOGIN ----------
function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (!user || !pass) {
    alert("Completa usuario y contraseña");
    return;
  }

  localStorage.setItem("user", user);
  showApp();
}

function logout() {
  localStorage.clear();
  location.reload();
}

function showApp() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("profileSection").classList.remove("hidden");
  document.getElementById("routineSection").classList.remove("hidden");
  document.getElementById("statsSection").classList.remove("hidden");
  document.querySelector(".logout").classList.remove("hidden");
}

if (localStorage.getItem("user")) showApp();

// ---------- PERFIL ----------
function saveProfile() {
  const profile = {
    age: age.value,
    weight: weight.value,
    height: height.value,
    goal: goal.value
  };
  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Perfil guardado");
}

// ---------- IA DE RUTINAS ----------
function generateRoutine() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (!profile) return alert("Guarda tu perfil");

  const level = levelSelect = document.getElementById("level").value;
  const routineDiv = document.getElementById("routine");
  routineDiv.innerHTML = "";

  const base = {
    volumen: ["Press banca", "Sentadilla", "Remo", "Fondos"],
    definicion: ["Flexiones", "Zancadas", "Plancha", "Burpees"],
    cardio: ["Correr", "Bicicleta", "Saltar cuerda"]
  };

  const intensity = level * 2;

  base[profile.goal].forEach(ex => {
    const d = document.createElement("div");
    d.textContent = `${ex} - ${intensity} series`;
    routineDiv.appendChild(d);
  });

  saveStats();
  drawChart();
}

// ---------- ESTADÍSTICAS ----------
function saveStats() {
  const stats = JSON.parse(localStorage.getItem("stats")) || [];
  stats.push(new Date().toLocaleDateString());
  localStorage.setItem("stats", JSON.stringify(stats));
}

function drawChart() {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  const stats = JSON.parse(localStorage.getItem("stats")) || [];

  ctx.clearRect(0,0,300,200);
  ctx.fillStyle = "#22c55e";

  stats.forEach((_, i) => {
    ctx.fillRect(i * 25, 200 - (i+1)*20, 20, (i+1)*20);
  });
}
