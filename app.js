/* ====== NAVEGACIÓN ====== */
function go(page) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.add("hidden")
  );
  document.getElementById(page).classList.remove("hidden");
}

/* ====== PERFIL ====== */
function saveProfile() {
  const profile = {
    age: age.value,
    weight: weight.value,
    height: height.value,
    goal: goal.value
  };

  localStorage.setItem("profile", JSON.stringify(profile));
  generateRoutine(profile);
  go("routine");
}

/* ====== IA SIMPLE ====== */
function generateRoutine(profile) {
  let routine = [];

  if (profile.goal === "volumen") {
    routine = [
      "Press banca – 4x8",
      "Sentadilla – 4x8",
      "Remo – 3x10",
      "Curl bíceps – 3x12"
    ];
  }

  if (profile.goal === "definicion") {
    routine = [
      "Flexiones – 4x15",
      "Zancadas – 3x12",
      "Plancha – 3x30s",
      "Burpees – 3x10"
    ];
  }

  if (profile.goal === "cardio") {
    routine = [
      "Cinta – 20 min",
      "Saltos – 3x30",
      "Mountain climbers – 3x20",
      "Abdominales – 3x15"
    ];
  }

  renderRoutine(routine);
}

/* ====== MOSTRAR RUTINA ====== */
function renderRoutine(list) {
  routineList.innerHTML = "";
  list.forEach(ex => {
    const li = document.createElement("li");
    li.textContent = ex;
    routineList.appendChild(li);
  });
}

/* ====== CARGAR PERFIL SI EXISTE ====== */
const saved = localStorage.getItem("profile");
if (saved) {
  generateRoutine(JSON.parse(saved));
  homeText.textContent = "Rutina cargada automáticamente";
}
