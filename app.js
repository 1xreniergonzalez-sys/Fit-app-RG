const content = document.getElementById("content");

function go(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;
      if (page === "routine") loadRoutine();
    });
}

// PERFIL
function saveProfile() {
  const profile = {
    age: age.value,
    weight: weight.value,
    height: height.value,
    goal: goal.value
  };
  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Perfil guardado");
  go("routine");
}

// RUTINA
function loadRoutine() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (!profile) return;

  let routine = [];
  if (profile.goal === "volumen") {
    routine = ["Press banca 4x8", "Sentadilla 4x8"];
  }
  if (profile.goal === "definicion") {
    routine = ["Flexiones 4x15", "Plancha 3x30s"];
  }
  if (profile.goal === "cardio") {
    routine = ["Cinta 20min", "Saltos 3x30"];
  }

  const ul = document.getElementById("routineList");
  ul.innerHTML = "";
  routine.forEach(e => {
    const li = document.createElement("li");
    li.textContent = e;
    ul.appendChild(li);
  });
}

// CARGA INICIAL
go("home");
