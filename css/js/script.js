document.addEventListener("DOMContentLoaded", () => {
  const fadeItems = document.querySelectorAll(".fade");

  if (fadeItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("on");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    fadeItems.forEach((item) => observer.observe(item));
  }

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (!isTouchDevice) {
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    let mx = -200, my = -200, rx = -200, ry = -200;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });

    (function animateRing() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animateRing);
    })();

    document.addEventListener("mouseleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
      dot.style.opacity = "";
      ring.style.opacity = "";
    });
  }

  const avatarWrap = document.getElementById("avatarWrap");
  const avatarMain = avatarWrap?.querySelector(".avatar-main");

  if (avatarWrap && avatarMain && !isTouchDevice) {
    avatarWrap.addEventListener("mousemove", (e) => {
      const rect = avatarWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      avatarMain.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`;
    });

    avatarWrap.addEventListener("mouseleave", () => {
      avatarMain.style.transform = "";
    });
  }
});