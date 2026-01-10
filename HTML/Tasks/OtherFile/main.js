// =====================================
// Demo JS – Preload vs Normal execution
// =====================================

(function () {
  function timeWithMs() {
    const now = new Date();
    return (
      String(now.getHours()).padStart(2, "0") + ":" +
      String(now.getMinutes()).padStart(2, "0") + ":" +
      String(now.getSeconds()).padStart(2, "0") + "." +
      String(now.getMilliseconds()).padStart(3, "0")
    );
  }

  // ✅ Runs as soon as JS executes (preloaded file benefit)
  const preloadTime = timeWithMs();

  window.addEventListener("DOMContentLoaded", function () {
    const preloadEl = document.getElementById("preload-time");
    const normalEl = document.getElementById("normal-time");

    if (preloadEl) {
      preloadEl.textContent = "Preload JS time: " + preloadTime;
    }

    if (normalEl) {
      normalEl.textContent =
        "Normal JS time:  " + timeWithMs();
    }
  });
})();
