/* ===============================
   FIT·AI - APP PRINCIPAL
================================ */

// --------- REFERENCIAS ---------
const loginSection = document.getElementById("loginSection");
const profileSection = document.getElementById("profileSection");
const routineSection = document.getElementById("routineSection");

const loginBtn = document.getElementById("loginBtn");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const routineBtn = document.getElementById("routineBtn");

const routineDiv = document.getElementById("routine");

// --------- LOGIN ---------
loginBtn.addEventListener("click", () => {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (!user || !pass) {
    alert("Completa usuario y contraseña");
    return;
  }

  localStorage.setItem("user", user);
  showApp();
});

function showApp() {
  loginSection.classList.add("hidden");
  profileSection.classList.remove("hidden");
  routineSection.classList.remove("hidden");
}

if (localStorage.getItem("user")) {
  showApp();
}

// --------- PERFIL ---------
saveProfileBtn.addEventListener("click", () => {
  const profile = {
    age: document.getElementById("age").value,
    weight: document.getElementById("weight").value,
    height: document.getElementById("height").value,
    goal: document.getElementById("goal").value
  };

  if (!profile.age || !profile.weight || !profile.height) {
    alert("Completa todos los datos del perfil");
    return;
  }

  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Perfil guardado correctamente");
});

// --------- GENERAR RUTINA (IA SIMPLE) ---------
routineBtn.addEventListener("click", generateRoutine);

function generateRoutine() {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (!profile) {
    alert("Primero guarda tu perfil");
    return;
  }

  const level = parseInt(document.getElementById("level").value);
  routineDiv.innerHTML = "";

  const routines = {
    volumen: [
      ["Press banca", "bench"],
      ["Sentadilla", "bench"],
      ["Remo", "bench"]
    ],
    definicion: [
      ["Flexiones", "bench"],
      ["Zancadas", "bench"],
      ["Plancha", "bench"]
    ],
    cardio: [
      ["Cardio básico", "bench"],
      ["Saltos", "bench"]
    ]
  };

  const selectedRoutine = routines[profile.goal];

  if (!selectedRoutine) {
    routineDiv.innerHTML = "<p>No hay rutina disponible</p>";
    return;
  }

  selectedRoutine.forEach(exercise => {
    const card = document.createElement("div");
    card.className = "exercise";
    card.innerHTML = `
      <img src="${IMAGES[exercise[1]]}" alt="${exercise[0]}">
      <div>
        <strong>${exercise[0]}</strong><br>
        ${level * 2} series
      </div>
    `;
    routineDiv.appendChild(card);
  });
}
