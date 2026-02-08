// Gestionar transiciones View Transitions API y handlers de clicks
// View Transitions API: animación suave de cambios en DOM (requiere navegador moderno)

// Ejecutar transición con centro de radiación en posición del mouse
function runTransition(mutate, x, y) {
  // Comprobar soporte de View Transitions (fallback si no disponible)
  if (document.startViewTransition) {
    const root = document.documentElement;
    
    // Convertir coordenadas píxeles → porcentaje para positioning circular
    const xPct = (x / window.innerWidth) * 100;
    const yPct = (y / window.innerHeight) * 100;

    // Guardar coordenadas en variables CSS (usadas en keyframes)
    root.style.setProperty("--vt-x", xPct + "%");
    root.style.setProperty("--vt-y", yPct + "%");
    
    // Iniciar transición de vista: aplica cambios DOM mientras anima
    const transition = document.startViewTransition(mutate);

    // Cleanup: remover propiedades CSS cuando transición termina
    transition.finished.then(() => {
      root.style.removeProperty("--vt-x");
      root.style.removeProperty("--vt-y");
    });
  } else {
    // Fallback: ejecutar cambio sin animación
    mutate();
  }
}

// Manejador global de clicks
document.addEventListener("click", (e) => {
  // Toggle tema oscuro: elemento con data-vt o botón de tema
  const sobreMi = e.target.closest("[data-vt]");
  const themeToggle = e.target.closest(".theme-toggle");
  if (sobreMi || themeToggle) {
    runTransition(
      () => {
        // Togglear clase dark en root → CSS aplica color scheme
        document.documentElement.classList.toggle("dark");
      },
      e.clientX, // Centro de radiación en posición del click
      e.clientY,
    );
    return;
  }

  // Toggle modo fullwidth: hacer nombre clickeable para expandir
  const nameClick = e.target.closest(".clickable-name");
  if (nameClick && e.button === 0 && !isDragging) { // button=0: click izquierdo
    document.startViewTransition(() => {
      document.documentElement.classList.toggle("fullwidth");
    });
  }

  // Navegar a secciones desde navbar: click en link de navegación
  const navLink = e.target.closest(".nav-link");
  if (navLink && e.button === 0) {
    const href = navLink.getAttribute("href");
    
    // Validar que es hash (#section)
    if (href?.startsWith("#")) {
      e.preventDefault(); // Prevenir scroll automático
      const target = document.querySelector(href);
      
      if (target) {
        // Obtener referencias de paneles
        const rightPanel = document.querySelector(".right");
        const leftPanel = document.querySelector(".left");
        const logoBox = document.querySelector(".logo-box");
        const panel = document.querySelector(".panel");

        // === FASE 1: Aplicar transformaciones visuales ===
        leftPanel.classList.add("fade-out"); // Desvanecerse panel izquierdo
        rightPanel.classList.add("shift-left"); // Mover derecho a la izquierda
        panel.classList.add("fill-space"); // Expandir panel fondo
        document.querySelector(".navbar").classList.add("nav-active"); // Activar navbar
        logoBox.classList.add("nav-active"); // Transformar logo (circular, arriba)
        
        // Comprimir botones decorativos
        document.querySelectorAll(".btn, .btn-text").forEach((el) => {
          el.classList.add("compress");
        });

        // Actualizar título h1 con texto del link clickeado
        const title = document.querySelector(".right h1");
        if (title) {
          title.textContent = navLink.textContent;
        }

        // === FASE 2: Ocultar todas las secciones + resetear animaciones ===
        document.querySelectorAll(".right section").forEach((section) => {
          section.classList.add("hidden");
          // Exponer funciones de transición desde transitions.js
          if (window.__cvTransitions) {
            window.__cvTransitions.resetSectionAnimations(section);
          }
        });

        // Capturar altura actual para animación de redimensionamiento suave
        const currentH = rightPanel.offsetHeight;
        rightPanel.style.height = currentH + "px";

        // === FASE 3: Cambiar contenido y animar altura ===
        setTimeout(() => {
          // Mostrar sección objetivo
          target.classList.remove("hidden");

          // Reproducir animaciones de entrada
          if (window.__cvTransitions) {
            window.__cvTransitions.resetSectionAnimations(target);
            requestAnimationFrame(() => {
              window.__cvTransitions.playSectionAnimations(target);
            });
          }

          // Animar altura del panel: medición de flujo
          requestAnimationFrame(() => {
            // 1. Permitir altura automática para obtener altura real
            rightPanel.style.height = "auto";
            const targetH = rightPanel.offsetHeight; // Fuerza reflow
            
            // 2. Volver a altura anterior para animar
            rightPanel.style.height = currentH + "px";
            
            requestAnimationFrame(() => {
              // 3. Animar a nueva altura (CSS transition actúa)
              rightPanel.style.height = targetH + "px";

              // 4. Evento: cuando transition termina, remover height para responsividad
              const onEnd = () => {
                rightPanel.style.height = "auto";
                rightPanel.removeEventListener("transitionend", onEnd);
              };
              rightPanel.addEventListener("transitionend", onEnd);
            });

            // Scroll suave al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }, 100); // Delay para permitir que CSS transitions se preparen
      }
    }
  }
});
