// Responsive layout scaling
(function () {
  const DESIGN_W = 1414;
  const DESIGN_H = 2000;

  const viewport = document.querySelector('.viewport');
  const stage = document.querySelector('.stage');
  if (!viewport || !stage) return;

  function layout() {
    const w = viewport.clientWidth;
    const s = Math.min(1, w / DESIGN_W);
    stage.style.setProperty('--s', String(s));
    viewport.style.height = DESIGN_H * s + 'px';
  }

  const ZOOM_SCALE = 1;
  stage.style.transition = 'transform 0.6s ease-out';
  stage.style.transform = `scale(${ZOOM_SCALE})`;

  addEventListener('resize', layout, { passive: true });
  layout();
})();
