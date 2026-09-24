/* ============================================================
   GUSTAVO BEN ABRAHAM — PORTFOLIO
   script.js

   Funcionalidades:
   1. Menu mobile
   2. Navbar ao rolar
   3. Scroll reveal
   4. Animação do terminal
   5. Acessibilidade / reduced motion
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ==========================================================
     1. ELEMENTOS
     ========================================================== */

  const header = document.querySelector(".site-header");
  const hamburger = document.querySelector(".nav-hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  const revealElements = document.querySelectorAll(".reveal");

  const terminalLines = document.querySelectorAll(".terminal-line");

  const scrollIndicator = document.querySelector(".scroll-indicator");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ==========================================================
     1. MATRIX RAIN (HERO)
     ========================================================== */

  const hero = document.querySelector(".hero");

  if (hero && !prefersReducedMotion) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: true });

    if (context) {
      canvas.className = "matrix-rain";
      canvas.setAttribute("aria-hidden", "true");
      hero.prepend(canvas);

      const fontSize = 13;
      const columnWidth = 28;
      const characters = "01{}<>/[];:+=";
      let drops = [];

      function resizeMatrix() {
        const bounds = hero.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(bounds.width));
        canvas.height = Math.max(1, Math.floor(bounds.height));

        const columnCount = Math.ceil(canvas.width / columnWidth);
        drops = Array.from({ length: columnCount }, () => ({
          y: Math.random() * canvas.height,
          speed: 7 + Math.random() * 8
        }));
      }

      function drawMatrix() {
        if (document.hidden) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = `${fontSize}px "JetBrains Mono", monospace`;
        context.textAlign = "center";

        drops.forEach((drop, column) => {
          const x = column * columnWidth + columnWidth / 2;

          for (let trail = 4; trail >= 0; trail -= 1) {
            const y = drop.y - trail * fontSize;
            if (y < 0 || y > canvas.height) continue;

            const alpha = trail === 0 ? 0.46 : 0.06 + (4 - trail) * 0.025;
            const color = column % 6 === 0 ? "63, 185, 80" : "88, 166, 255";
            context.fillStyle = `rgba(${color}, ${alpha})`;
            context.fillText(
              characters[Math.floor(Math.random() * characters.length)],
              x,
              y
            );
          }

          drop.y += drop.speed;
          if (drop.y - fontSize * 4 > canvas.height) {
            drop.y = -Math.random() * canvas.height * 0.35;
            drop.speed = 7 + Math.random() * 8;
          }
        });
      }

      resizeMatrix();
      drawMatrix();
      window.setInterval(drawMatrix, 100);
      window.addEventListener("resize", resizeMatrix, { passive: true });
    }
  }


  /* ==========================================================
     2. NAVBAR
     ========================================================== */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* ==========================================================
     3. MENU MOBILE
     ========================================================== */

  function openMobileMenu() {
    if (!hamburger || !mobileMenu) return;

    hamburger.setAttribute("aria-expanded", "true");
    mobileMenu.hidden = false;
    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;

    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
  }

  function toggleMobileMenu() {
    if (!hamburger || !mobileMenu) return;

    const isOpen = hamburger.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", toggleMobileMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu =
        mobileMenu.contains(event.target);

      const clickedHamburger =
        hamburger.contains(event.target);

      const isOpen =
        hamburger.getAttribute("aria-expanded") === "true";

      if (
        isOpen &&
        !clickedInsideMenu &&
        !clickedHamburger
      ) {
        closeMobileMenu();
      }
    });
  }


  /* ==========================================================
     4. SCROLL INDICATOR
     ========================================================== */

  if (scrollIndicator) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 100) {
          scrollIndicator.style.opacity = "0";
          scrollIndicator.style.pointerEvents = "none";
        } else {
          scrollIndicator.style.opacity = "";
          scrollIndicator.style.pointerEvents = "";
        }
      },
      { passive: true }
    );
  }


  /* ==========================================================
     5. SCROLL REVEAL
     ========================================================== */

  function revealImmediately() {
    revealElements.forEach((element) => {
      element.classList.add("revealed");
    });
  }

  if (prefersReducedMotion) {
    revealImmediately();
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("revealed");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealImmediately();
  }


  /* ==========================================================
     6. TERMINAL
     ========================================================== */

  function showTerminalLines() {
    terminalLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("visible");
      }, index * 180);
    });
  }

  if (terminalLines.length > 0) {
    if (prefersReducedMotion) {
      terminalLines.forEach((line) => {
        line.classList.add("visible");
      });
    } else if ("IntersectionObserver" in window) {
      const terminalObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            showTerminalLines();

            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.25
        }
      );

      const terminalBlock =
        document.querySelector(".terminal-block");

      if (terminalBlock) {
        terminalObserver.observe(terminalBlock);
      }
    } else {
      showTerminalLines();
    }
  }


  /* ==========================================================
     7. FECHAR MENU AO REDIMENSIONAR
     ========================================================== */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });


  /* ==========================================================
     8. ANCHOR LINKS
     ========================================================== */

  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerHeight =
        header?.offsetHeight || 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion
          ? "auto"
          : "smooth"
      });

      history.replaceState(
        null,
        "",
        targetId
      );

      closeMobileMenu();
    });
  });


  /* ==========================================================
     9. STATUS DO SITE
     ========================================================== */

  console.log(
    "%cGustavo Ben Abraham%c",
    "color:#58a6ff;font-size:18px;font-weight:bold;",
    "color:#8b949e;font-size:14px;"
  );

  console.log(
    "Portfólio carregado com sucesso."
  );

});
