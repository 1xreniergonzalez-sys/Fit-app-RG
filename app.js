/* ===============================
   FIT·AI - APP PRINCIPAL
================================ */

// ---------- LOGIN ----------
function login() {
  if (!user.value || !pass.value) {
    alert("Completa los datos");
    return;
  }
  localStorage.setItem("user", user.value);
  showApp();
}

function showApp() {
  loginSection.classList.add("hidden");
  profileSection.classList.remove("hidden");
  routineSection.classList.remove("hidden");
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
function exerciseCard(name, imgKey, series) {
  return `
    <div class="exercise">
      <img src="${IMAGES[imgKey]}" alt="${name}">
      <div>
        <strong>${name}</strong><br>
        ${series} series
      </div>
    </div>
  `;
}

function generateRoutine() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (!profile) return alert("Guarda tu perfil");

  const lvl = parseInt(level.value);
  routine.innerHTML = "";

  const routines = {
    volumen: [
      ["Press banca", "bench"],
      ["Sentadilla", "squat"],
      ["Remo", "row"]
    ],
    definicion: [
      ["Flexiones", "pushup"],
      ["Zancadas", "lunge"],
      ["Plancha", "plank"]
    ],
    cardio: [
      ["Flexiones", "pushup"],
      ["Plancha", "plank"]
    ]
  };

  routines[profile.goal].forEach(ex => {
    routine.innerHTML += exerciseCard(
      ex[0],
      ex[1],
      lvl * 2
    );
  });
}
