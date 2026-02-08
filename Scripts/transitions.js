// IIFE: Gestionar animaciones de reveal, transiciones y entrada de contenido
(function () {
  'use strict';

  // Curva de animación (cubic-bezier equivalente: suave salida)
  const EXPO_OUT = [0.16, 1, 0.3, 1];
  
  // Umbral de visibilidad: 15% del elemento debe estar en viewport
  const THRESHOLD = 0.15;

  // Observer patrón: trigger clase 'visible' cuando elemento entra en viewport
  function initRevealObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Cuando elemento es visible, agregar clase y dejar de observar
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Optimización: evitar checks repetidos
          }
        });
      },
      { threshold: THRESHOLD, rootMargin: '0px 0px -40px 0px' } // 40px offset inferior
    );

    // Aplicar observer a todos los elementos con clase .reveal
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return observer;
  }

  // Taggear elementos con clases para controlador de animaciones
  function tagRevealElements() {
    // Secciones del panel derecho
    document.querySelectorAll('.right > section').forEach((section) => {
      section.classList.add('reveal');
    });

    // Panel izquierdo: reveal desde izquierda + stagger (desfase temporal)
    document.querySelectorAll('.left-section').forEach((section, i) => {
      section.classList.add('reveal', 'from-left', `stagger-${i + 1}`);
    });

    document.querySelectorAll('.divider').forEach((d) => {
      d.classList.add('reveal');
    });

    // Separadores de secciones con desfase
    document.querySelectorAll('.section-sep').forEach((sep, i) => {
      sep.classList.add('reveal', `stagger-${i + 1}`);
    });

    // Grupos de subtítulos con stagger
    document.querySelectorAll('.subtitle-group').forEach((g, i) => {
      g.classList.add('reveal', `stagger-${i + 1}`);
    });

    // Elemento de dato curioso: reveal con efecto escala
    document.querySelectorAll('.funny-fact').forEach((el) => {
      el.classList.add('reveal', 'from-scale');
    });

    // Iconos de lenguajes con desfase
    document.querySelectorAll('.lang-icon').forEach((icon, i) => {
      icon.classList.add('reveal', `stagger-${i + 1}`);
    });

    // Info de contacto con desfase
    document.querySelectorAll('.contact-info p, .contact-info a').forEach((el, i) => {
      el.classList.add('reveal', `stagger-${i + 1}`);
    });

    // Items de idiomas con desfase
    document.querySelectorAll('.language-item').forEach((item, i) => {
      item.classList.add('reveal', `stagger-${i + 1}`);
    });
  }

  // Animar barras de progreso de idiomas: inicio 0% → ancho real al entrar en viewport
  function animateLanguageBars() {
    // Preparar: guardar ancho final y resetear a 0%
    const bars = document.querySelectorAll('.language-progress');
    bars.forEach((bar) => {
      const targetWidth = bar.style.width;
      bar.dataset.targetWidth = targetWidth; // Almacenar en data attribute
      bar.style.width = '0%'; // Resetear visualmente
    });

    // Observer: animar al entrar en viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.language-progress');
            if (bar && bar.dataset.targetWidth) {
              // requestAnimationFrame: sincronizar con vsync del navegador
              requestAnimationFrame(() => {
                bar.style.width = bar.dataset.targetWidth;
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.language-item').forEach((item) => observer.observe(item));
  }

  // Animar items de listas de skills: stagger con transitionDelay
  function animateSkillListItems() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('li');
            // Cada <li> obtiene delay = índice * 0.06s (efecto onda)
            items.forEach((li, i) => {
              li.style.transitionDelay = `${i * 0.06}s`;
              requestAnimationFrame(() => li.classList.add('visible'));
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.skill-list').forEach((list) => observer.observe(list));
  }

  // Resetear animaciones: remover clases y estilos para reiniciar secuencia
  function resetSectionAnimations(section) {
    // Remover clase visible de todos los reveals
    section.querySelectorAll('.reveal').forEach((el) => el.classList.remove('visible'));
    if (section.classList.contains('reveal')) section.classList.remove('visible');

    // Resetear skills: remover visible y delay
    section.querySelectorAll('.skill-list li').forEach((li) => {
      li.classList.remove('visible');
      li.style.transitionDelay = '';
    });

    // Resetear barras: back to 0%
    section.querySelectorAll('.language-progress').forEach((bar) => {
      bar.style.width = '0%';
    });

    // Remover visibilidad de otros elementos
    section.querySelectorAll('.divider').forEach((d) => d.classList.remove('visible'));
    section.querySelectorAll('.others-card').forEach((card) => {
      card.classList.remove('visible');
    });
    section.querySelectorAll('.others-contact-item').forEach((item) => {
      item.classList.remove('visible');
    });
    section.querySelectorAll('.edu-langs-label').forEach((el) => {
      el.classList.remove('visible');
    });
    section.querySelectorAll('.edu-langs-icons .lang-icon').forEach((el) => {
      el.classList.remove('visible');
    });
  }

  // Reproducir animaciones: staggered setTimeout para control granular de timing
  function playSectionAnimations(section) {
    requestAnimationFrame(() => {
      // Animar la sección misma si tiene .reveal
      if (section.classList.contains('reveal')) section.classList.add('visible');
      
      // Stagger: cada reveal con delay = índice * 60ms
      section.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 60);
      });

      // Animar barras de idiomas
      section.querySelectorAll('.language-progress').forEach((bar) => {
        if (bar.dataset.targetWidth) {
          requestAnimationFrame(() => { bar.style.width = bar.dataset.targetWidth; });
        }
      });

      // Animar skills con stagger interno
      section.querySelectorAll('.skill-list').forEach((list) => {
        list.querySelectorAll('li').forEach((li, i) => {
          li.style.transitionDelay = `${i * 0.06}s`;
          setTimeout(() => li.classList.add('visible'), 80);
        });
      });

      // Animar dividers con delay
      section.querySelectorAll('.divider').forEach((d) => {
        setTimeout(() => d.classList.add('visible'), 200);
      });

      // Animar tarjetas con stagger
      section.querySelectorAll('.others-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), 250 + i * 100);
      });

      // Animar items de contacto
      section.querySelectorAll('.others-contact-item').forEach((item, i) => {
        setTimeout(() => item.classList.add('visible'), 60 + i * 80);
      });

      // Animar etiquetas de educación e iconos
      section.querySelectorAll('.edu-langs-label').forEach((el) => {
        setTimeout(() => el.classList.add('visible'), 80);
      });
      section.querySelectorAll('.edu-langs-icons .lang-icon').forEach((icon, i) => {
        setTimeout(() => icon.classList.add('visible'), 200 + i * 150);
      });
    });
  }

  // Exponer funciones de reset/play globalmente para uso desde ui.js
  window.__cvTransitions = { resetSectionAnimations, playSectionAnimations };

  // Gestionar estado activo del navbar: marcar link clickeado
  function enhanceNavTransitions() {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        // Remover clase activa de todos
        document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
        // Agregar al link clickeado
        link.classList.add('active');
      });
    });
  }

  // Inicializador: ejecutar todas las funciones de setup
  function initOnLoad() {
    tagRevealElements();
    initRevealObserver();
    animateLanguageBars();
    animateSkillListItems();
    enhanceNavTransitions();
  }

  // Ejecutar en DOMContentLoaded o inmediato si ya está cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOnLoad);
  } else {
    initOnLoad();
  }
})();
