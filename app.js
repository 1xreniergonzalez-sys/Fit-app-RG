// Registrar Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => {
      console.log("Service Worker registrado");
    });
}

// Notificaciones
const status = document.getElementById("status");
const btn = document.getElementById("testBtn");

btn.addEventListener("click", () => {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("FIT·AI", {
        body: "Notificación funcionando correctamente 💪"
      });
      status.textContent = "Notificación enviada ✅";
    } else {
      status.textContent = "Permiso denegado ❌";
    }
  });
});
