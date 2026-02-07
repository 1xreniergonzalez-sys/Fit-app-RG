/* =========================================
   FIT·AI — app.js ESTABLE + LOGIN
========================================= */

/* ---------- Utilidades ---------- */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const screen = document.getElementById(id);
  if (screen) screen.classList.add("active");
}

/* ---------- LOGIN ---------- */
function register() {
  const user = document.getElementById("register-user").value;
  const pass = document.getElementById("register-pass").value;

  if (!user || !pass) {
    showMsg("Completa todos los campos");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ user, pass }));
  showMsg("Cuenta creada. Ahora inicia sesión.");
}

function login() {
  const userInput = document.getElementById("login-user").value;
  const passInput = document.getElementById("login-pass").value;

  const saved = JSON.parse(localStorage.getItem("user"));

  if (!saved || saved.user !== userInput || saved.pass !== passInput) {
    showMsg("Usuario o contraseña incorrectos");
    return;
  }

  localStorage.setItem("logged", "true");
  initApp();
}

function logout() {
  localStorage.removeItem("logged");
  location.reload();
}

function showMsg(msg) {
  document.getElementById("login-msg").textContent = msg;
}

/* ---------- NAV ---------- */
function initNav() {
  document.getElementById("btn-home").onclick = () => showScreen("home");
  document.getElementById("btn-routines").onclick = () => showScreen("routines");
  document.getElementById("btn-stats").onclick = () => showScreen("stats");
  document.getElementById("btn-logout").onclick = logout;
}

/* ---------- RUTINAS ---------- */
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

function loadRoutines() {
  const container = document.getElementById("routine-list");
  container.innerHTML = "";

  ROUTINES.forEach(r => {
    const h3 = document.createElement("h3");
    h3.textContent = r.name;
    container.appendChild(h3);

    r.exercises.forEach(e => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${e.image}">
        <div>
          <strong>${e.name}</strong><br>${e.reps}
        </div>
      `;
      container.appendChild(card);
    });
  });
}

/* ---------- INIT ---------- */
function initApp() {
  document.getElementById("login").style.display = "none";
  document.getElementById("main-nav").style.display = "flex";

  showScreen("home");
  initNav();
  loadRoutines();
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("logged") === "true") {
    initApp();
  } else {
    showScreen("login");
  }
});
