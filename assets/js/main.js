/* =====================================================
   MOMENTUM CREATIVE PRODUCTIONS — main.js
   ===================================================== */

/* ------------------------------------------------------
   CONFIGURATION DU FORMULAIRE DE CONTACT
   ------------------------------------------------------
   Option A (recommandée) — Google Apps Script relié à Gmail :
   1. Suivez les instructions de apps-script/INSTALLATION.md
   2. Collez ici l'URL de déploiement obtenue :
      ex. "https://script.google.com/macros/s/XXXX/exec"

   Option B (plan B) — Formspree :
   1. Créez un formulaire sur https://formspree.io
   2. Collez ici l'URL fournie : "https://formspree.io/f/xxxxxxx"
------------------------------------------------------ */
const FORM_ENDPOINT = ""; // ← À REMPLIR (voir ci-dessus)

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ---------- Header : fond plein au scroll ---------- */
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Menu mobile ---------- */
const toggle = document.querySelector(".nav-toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.querySelectorAll(".nav-links a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("nav-open"))
  );
}

/* ---------- Logos / images manquantes → fallback élégant ---------- */
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  img.addEventListener("error", () => img.classList.add("is-missing"));
  if (img.complete && img.naturalWidth === 0) img.classList.add("is-missing");
});

/* ---------- Timecode broadcast (25 i/s) ---------- */
const tc = document.getElementById("tc");
if (tc) {
  if (prefersReducedMotion) {
    tc.textContent = "00:00:00:00";
  } else {
    const start = performance.now();
    const pad = (n) => String(n).padStart(2, "0");
    const tick = (now) => {
      const elapsed = (now - start) / 1000;
      const h = Math.floor(elapsed / 3600);
      const m = Math.floor((elapsed % 3600) / 60);
      const s = Math.floor(elapsed % 60);
      const f = Math.floor((elapsed % 1) * 25);
      tc.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

/* ---------- Apparitions au scroll ---------- */
const reveals = document.querySelectorAll(".reveal");
if (reveals.length && "IntersectionObserver" in window && !prefersReducedMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

/* ---------- Filtres réalisations ---------- */
const filterBtns = document.querySelectorAll(".filter");
const works = document.querySelectorAll(".work[data-cat]");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    works.forEach((w) => {
      w.classList.toggle("hidden", f !== "all" && w.dataset.cat !== f);
    });
  });
});

/* ---------- Modale vidéo ---------- */
const modal = document.getElementById("video-modal");
if (modal) {
  const frame = modal.querySelector("iframe");
  document.querySelectorAll("[data-video]").forEach((el) => {
    el.addEventListener("click", (ev) => {
      const url = el.dataset.video;
      if (!url) return;
      ev.preventDefault();
      frame.src = url + (url.includes("?") ? "&" : "?") + "autoplay=1";
      modal.showModal();
    });
  });
  const close = () => {
    frame.src = "";
    modal.close();
  };
  modal.querySelector(".close").addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  modal.addEventListener("cancel", () => (frame.src = ""));
}

/* ---------- Formulaire de contact ---------- */
const form = document.getElementById("contact-form");
if (form) {
  const status = form.querySelector(".form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";

    if (!FORM_ENDPOINT) {
      status.textContent =
        "Le formulaire n'est pas encore configuré. Écrivez-nous directement à contact@momentumcreativeprod.com.";
      status.classList.add("err");
      return;
    }

    const data = new FormData(form);
    if (data.get("website")) return; // honeypot anti-spam

    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours…";

    try {
      if (FORM_ENDPOINT.includes("formspree")) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("formspree");
      } else {
        // Google Apps Script : réponse opaque (no-cors), l'envoi part quand même
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          body: new URLSearchParams(data),
        });
      }
      form.reset();
      status.textContent =
        "Message envoyé. Nous revenons vers vous sous 24 h ouvrées.";
      status.classList.add("ok");
    } catch (err) {
      status.textContent =
        "L'envoi a échoué. Réessayez ou écrivez-nous à contact@momentumcreativeprod.com.";
      status.classList.add("err");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer ma demande";
    }
  });
}
