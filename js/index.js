'use strict'

const track = document.querySelector(".js-marquee");
if (track) track.innerHTML += track.innerHTML;

// REDISEÑOS

(() => {
  // Slider 2 slides
  const track = document.getElementById("redesignsTrack");
  const prev = document.getElementById("redesignsPrev");
  const next = document.getElementById("redesignsNext");
  if (!track || !prev || !next) return;

  const total = track.children.length;
  let index = 0;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    prev.disabled = index === 0;
    next.disabled = index === total - 1;
  };

  prev.addEventListener("click", () => { index = Math.max(0, index - 1); update(); });
  next.addEventListener("click", () => { index = Math.min(total - 1, index + 1); update(); });

  // Tap/click: alterna before/after (solo útil en móvil; en desktop ya tienes hover)
  document.querySelectorAll("[data-shot]").forEach((shot) => {
    shot.addEventListener("click", () => {
      shot.classList.toggle("is-after");
    });
  });

  update();
})();

// DETECCION VIEWPORT FAST UI
const boxes = document.querySelectorAll(".box");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0,
  rootMargin: "0px 0px 0px 0px"
});

boxes.forEach(box => observer.observe(box));


// ---- FIX resize responsive ----
let resizeTimeout;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    boxes.forEach(box => {
      observer.unobserve(box);
      observer.observe(box);
    });
  }, 100);
});

// DRAG TO SCROLL - Galerías horizontales
document.querySelectorAll(".project-frame__track").forEach((track) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.classList.add("is-dragging");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("mouseleave", () => {
    isDown = false;
    track.classList.remove("is-dragging");
  });

  track.addEventListener("mouseup", () => {
    isDown = false;
    track.classList.remove("is-dragging");
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  }, { passive: false });
});