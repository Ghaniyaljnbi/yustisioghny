/* ===== SPIDER EFFECTS: JAVASCRIPT ===== */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 1. PARTIKEL CAHAYA MERAH DAN BIRU
  const canvas = document.createElement("canvas");
  canvas.className = "spider-particles";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];
  let width = 0;
  let height = 0;
  let animationId;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(
      65,
      Math.max(18, Math.floor((width * height) / 18000))
    );

    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      color: Math.random() > 0.5 ? "#f3263e" : "#1675ff",
      alpha: Math.random() * 0.55 + 0.2
    }));

    if (reduceMotion) drawParticles(false);
  }

  function drawParticles(animate = true) {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      if (animate) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Garis halus yang menghubungkan partikel berdekatan
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 95) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = a.color;
          ctx.globalAlpha = (1 - distance / 95) * 0.15;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;

    if (animate) {
      animationId = requestAnimationFrame(() => drawParticles(true));
    }
  }

  resizeCanvas();

  if (!reduceMotion) {
    drawParticles(true);
  }

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationId);
    resizeCanvas();

    if (!reduceMotion) drawParticles(true);
  });

  // 2. KARTU PROFIL 3D MENGIKUTI GERAKAN MOUSE
  const profileCard = document.querySelector(".profile-card");
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (profileCard && finePointer && !reduceMotion) {
    profileCard.addEventListener("pointermove", (event) => {
      const rect = profileCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 14;
      const rotateX = (0.5 - y) * 14;

      profileCard.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) ` +
        `rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    profileCard.addEventListener("pointerleave", () => {
      profileCard.style.transform = "";
    });
  }

  // 3. ANIMASI MUNCUL SAAT SCROLL
  const revealElements = document.querySelectorAll(
    ".about, .projects, .contact-panel, " +
    ".project-card, .info-card"
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("scroll-reveal");
    });

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  // 4. EFEK NEON PADA TOMBOL
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("pointerdown", () => {
      button.style.setProperty("--click-glow", "1");
      button.style.filter = "brightness(1.18)";

      window.setTimeout(() => {
        button.style.removeProperty("--click-glow");
        button.style.filter = "";
      }, 180);
    });
  });
});
/* INTERAKSI CHIP SIRKUIT */
document.addEventListener("DOMContentLoaded", () => {
  const chip = document.getElementById("mainChip");
  const section = document.getElementById("circuit");
  const hint = document.getElementById("circuitHint");

  if (!chip || !section || !hint) return;

  chip.addEventListener("click", () => {
    const active = section.classList.toggle("is-active");

    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));

    hint.textContent = active
      ? "⚡ SYSTEM ONLINE — SIRKUIT AKTIF!"
      : "⚡ Klik chip untuk mengaktifkan sirkuit";
  });
});
// SPACE MUSIC PLAYER
const spaceAudio = document.getElementById("spaceAudio");
const musicToggle = document.getElementById("musicToggle");

if (spaceAudio && musicToggle) {
    musicToggle.addEventListener("click", async () => {
        if (spaceAudio.paused) {
            try {
                await spaceAudio.play();
                musicToggle.textContent = "Ⅱ";
            } catch (error) {
                alert("Musik belum bisa diputar. Periksa file MP3 kamu.");
                console.error(error);
            }
        } else {
            spaceAudio.pause();
            musicToggle.textContent = "▶";
        }
    });
}