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
    age: document.getElementById("age").value,
    weight: document.getElementById("weight").value,
    height: document.getElementById("height").value,
    goal: document.getElementById("goal").value
  };

  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Perfil guardado");
  go("routine");
}

/* ===== RUTINA ===== */
function loadRoutine() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const list = document.getElementById("routineList");

  if (!profile) {
    list.innerHTML = "<li>Configura tu perfil primero</li>";
    return;
  }

  let routine = [];

  if (profile.goal === "volumen") {
    routine = [
      "Press banca 4x8",
      "Sentadilla 4x8",
      "Dominadas 3x6"
    ];
  }

  if (profile.goal === "definicion") {
    routine = [
      "Flexiones 4x15",
      "Zancadas 3x12",
      "Plancha 3x30s"
    ];
  }

  if (profile.goal === "cardio") {
    routine = [
      "Cinta 20 min",
      "Saltos 3x40",
      "Bicicleta 15 min"
    ];
  }

  list.innerHTML = "";
  routine.forEach(ex => {
    const li = document.createElement("li");
    li.textContent = ex;
    list.appendChild(li);
  });
}

/* ===== CARGA INICIAL ===== */
go("home");
