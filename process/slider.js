// slider.js
document.addEventListener('DOMContentLoaded', () => {
  const star     = document.querySelector('#slider .star');
  const slider   = document.getElementById('slider');
  const steps    = Array.from(document.querySelectorAll('.step'));
  const root     = getComputedStyle(document.documentElement);
  const offset   = parseFloat(root.fontSize) * 5; // 5rem in px
  const vh       = window.innerHeight;

  function onScroll() {
    const rect   = slider.getBoundingClientRect();
    const center = vh / 2;

    // --- STAR SPIN + MARGIN INTERPOLATION ---
    const start    = rect.top + offset;
    const end      = rect.bottom - (offset / 1.5);
    let progress   = (center - start) / (end - start);
    progress       = Math.min(Math.max(progress, 0), 1);

    star.style.transform   = `rotate(${progress * 180}deg)`;
    star.style.marginLeft  = `${-2 + progress * 4}px`;

    // --- STEP FOCUS HANDLING ---
    // find the step whose center is closest to viewport center
    let bestStep    = null;
    let bestDistance = Infinity;

    steps.forEach(step => {
      const r        = step.getBoundingClientRect();
      const stepMid  = r.top + r.height / 2;
      const distance = Math.abs(stepMid - center);

      if (distance < bestDistance) {
        bestDistance  = distance;
        bestStep      = step;
      }
    });

    // add 'focus' only to that bestStep
    steps.forEach(s => s.classList.toggle('focus', s === bestStep));
  }

  // wire it up
  window.addEventListener('scroll', onScroll);
  // also run once in case you start mid-page
  onScroll();
});
