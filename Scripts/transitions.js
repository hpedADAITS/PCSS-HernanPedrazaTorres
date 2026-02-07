(function () {
  'use strict';

  const EXPO_OUT = [0.16, 1, 0.3, 1];
  const THRESHOLD = 0.15;

  function initRevealObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: THRESHOLD, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return observer;
  }

  function tagRevealElements() {
    document.querySelectorAll('.right > section').forEach((section) => {
      section.classList.add('reveal');
    });

    document.querySelectorAll('.left-section').forEach((section, i) => {
      section.classList.add('reveal', 'from-left', `stagger-${i + 1}`);
    });

    document.querySelectorAll('.divider').forEach((d) => {
      d.classList.add('reveal');
    });

    document.querySelectorAll('.section-sep').forEach((sep, i) => {
      sep.classList.add('reveal', `stagger-${i + 1}`);
    });

    document.querySelectorAll('.subtitle-group').forEach((g, i) => {
      g.classList.add('reveal', `stagger-${i + 1}`);
    });

    document.querySelectorAll('.funny-fact').forEach((el) => {
      el.classList.add('reveal', 'from-scale');
    });

    document.querySelectorAll('.lang-icon').forEach((icon, i) => {
      icon.classList.add('reveal', `stagger-${i + 1}`);
    });

    document.querySelectorAll('.contact-info p, .contact-info a').forEach((el, i) => {
      el.classList.add('reveal', `stagger-${i + 1}`);
    });

    document.querySelectorAll('.language-item').forEach((item, i) => {
      item.classList.add('reveal', `stagger-${i + 1}`);
    });
  }

  function animateLanguageBars() {
    const bars = document.querySelectorAll('.language-progress');
    bars.forEach((bar) => {
      const targetWidth = bar.style.width;
      bar.dataset.targetWidth = targetWidth;
      bar.style.width = '0%';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.language-progress');
            if (bar && bar.dataset.targetWidth) {
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

  function animateSkillListItems() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('li');
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

  function resetSectionAnimations(section) {
    section.querySelectorAll('.reveal').forEach((el) => el.classList.remove('visible'));
    if (section.classList.contains('reveal')) section.classList.remove('visible');

    section.querySelectorAll('.skill-list li').forEach((li) => {
      li.classList.remove('visible');
      li.style.transitionDelay = '';
    });

    section.querySelectorAll('.language-progress').forEach((bar) => {
      bar.style.width = '0%';
    });

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

  function playSectionAnimations(section) {
    requestAnimationFrame(() => {
      if (section.classList.contains('reveal')) section.classList.add('visible');
      section.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 60);
      });

      section.querySelectorAll('.language-progress').forEach((bar) => {
        if (bar.dataset.targetWidth) {
          requestAnimationFrame(() => { bar.style.width = bar.dataset.targetWidth; });
        }
      });

      section.querySelectorAll('.skill-list').forEach((list) => {
        list.querySelectorAll('li').forEach((li, i) => {
          li.style.transitionDelay = `${i * 0.06}s`;
          setTimeout(() => li.classList.add('visible'), 80);
        });
      });

      section.querySelectorAll('.divider').forEach((d) => {
        setTimeout(() => d.classList.add('visible'), 200);
      });

      section.querySelectorAll('.others-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), 250 + i * 100);
      });

      section.querySelectorAll('.others-contact-item').forEach((item, i) => {
        setTimeout(() => item.classList.add('visible'), 60 + i * 80);
      });

      section.querySelectorAll('.edu-langs-label').forEach((el) => {
        setTimeout(() => el.classList.add('visible'), 80);
      });
      section.querySelectorAll('.edu-langs-icons .lang-icon').forEach((icon, i) => {
        setTimeout(() => icon.classList.add('visible'), 200 + i * 150);
      });
    });
  }

  window.__cvTransitions = { resetSectionAnimations, playSectionAnimations };

  function enhanceNavTransitions() {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  function initOnLoad() {
    tagRevealElements();
    initRevealObserver();
    animateLanguageBars();
    animateSkillListItems();
    enhanceNavTransitions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOnLoad);
  } else {
    initOnLoad();
  }
})();
