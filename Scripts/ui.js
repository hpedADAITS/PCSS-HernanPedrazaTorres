// View transitions and click handlers
function runTransition(mutate, x, y) {
  if (document.startViewTransition) {
    const root = document.documentElement;
    // Convert to percentages
    const xPct = (x / window.innerWidth) * 100;
    const yPct = (y / window.innerHeight) * 100;

    root.style.setProperty("--vt-x", xPct + "%");
    root.style.setProperty("--vt-y", yPct + "%");
    const transition = document.startViewTransition(mutate);

    transition.finished.then(() => {
      root.style.removeProperty("--vt-x");
      root.style.removeProperty("--vt-y");
    });
  } else {
    mutate();
  }
}

document.addEventListener("click", (e) => {
  const sobreMi = e.target.closest("[data-vt]");
  const themeToggle = e.target.closest(".theme-toggle");
  if (sobreMi || themeToggle) {
    runTransition(
      () => {
        document.documentElement.classList.toggle("dark");
      },
      e.clientX,
      e.clientY,
    );
    return;
  }

  const nameClick = e.target.closest(".clickable-name");
  if (nameClick && e.button === 0 && !isDragging) {
    document.startViewTransition(() => {
      document.documentElement.classList.toggle("fullwidth");
    });
  }

  // Transition to sections from navbar
  const navLink = e.target.closest(".nav-link");
  if (navLink && e.button === 0) {
    const href = navLink.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const rightPanel = document.querySelector(".right");
        const leftPanel = document.querySelector(".left");
        const logoBox = document.querySelector(".logo-box");
        const panel = document.querySelector(".panel");

        leftPanel.classList.add("fade-out");
        rightPanel.classList.add("shift-left");
        panel.classList.add("fill-space");
        document.querySelector(".navbar").classList.add("nav-active");

        logoBox.classList.add("nav-active");

        document.querySelectorAll(".btn, .btn-text").forEach((el) => {
          el.classList.add("compress");
        });

        const title = document.querySelector(".right h1");
        if (title) {
          title.textContent = navLink.textContent;
        }

        document.querySelectorAll(".right section").forEach((section) => {
          section.classList.add("hidden");
          if (window.__cvTransitions) {
            window.__cvTransitions.resetSectionAnimations(section);
          }
        });

        const currentH = rightPanel.offsetHeight;
        rightPanel.style.height = currentH + "px";

        setTimeout(() => {
          target.classList.remove("hidden");

          if (window.__cvTransitions) {
            window.__cvTransitions.resetSectionAnimations(target);
            requestAnimationFrame(() => {
              window.__cvTransitions.playSectionAnimations(target);
            });
          }

          requestAnimationFrame(() => {
            rightPanel.style.height = "auto";
            const targetH = rightPanel.offsetHeight;
            rightPanel.style.height = currentH + "px";
            requestAnimationFrame(() => {
              rightPanel.style.height = targetH + "px";

              const onEnd = () => {
                rightPanel.style.height = "auto";
                rightPanel.removeEventListener("transitionend", onEnd);
              };
              rightPanel.addEventListener("transitionend", onEnd);
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }, 100);
      }
    }
  }
});
