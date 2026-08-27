/* Twilight slider — divider position is a single 0–100 number.
   0 = all blue hour, 100 = all midday. Ships at 40 so 60% of the frame
   is already twilight and the lit windows read before anyone touches it. */

const START = 40;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

function setup(root) {
  const frame = root.querySelector('[data-tw-frame]');
  const handle = root.querySelector('[data-tw-handle]');
  if (!frame || !handle) return;

  let pos = START;
  let dragging = false;

  const paint = () => {
    root.style.setProperty('--pos', `${pos}%`);
    handle.setAttribute('aria-valuenow', String(Math.round(pos)));
    handle.setAttribute(
      'aria-valuetext',
      `Divider at ${Math.round(pos)} percent. Midday to the left, blue hour to the right.`
    );
  };

  const setPos = (next) => {
    pos = Math.min(100, Math.max(0, next));
    paint();
  };

  const fromEvent = (e) => {
    const rect = frame.getBoundingClientRect();
    if (!rect.width) return;
    setPos(((e.clientX - rect.left) / rect.width) * 100);
  };

  frame.addEventListener('pointerdown', (e) => {
    dragging = true;
    root.classList.add('is-dragging');
    frame.setPointerCapture(e.pointerId);
    fromEvent(e);
  });

  frame.addEventListener('pointermove', (e) => {
    if (dragging) fromEvent(e);
  });

  const end = (e) => {
    if (!dragging) return;
    dragging = false;
    root.classList.remove('is-dragging');
    if (frame.hasPointerCapture(e.pointerId)) frame.releasePointerCapture(e.pointerId);
  };
  frame.addEventListener('pointerup', end);
  frame.addEventListener('pointercancel', end);

  // Dragging the frame should not start a native image drag.
  frame.addEventListener('dragstart', (e) => e.preventDefault());

  handle.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 10 : 2;
    let handled = true;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        setPos(pos - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        setPos(pos + step);
        break;
      case 'PageDown':
        setPos(pos - 10);
        break;
      case 'PageUp':
        setPos(pos + 10);
        break;
      case 'Home':
        setPos(0);
        break;
      case 'End':
        setPos(100);
        break;
      default:
        handled = false;
    }
    if (handled) e.preventDefault();
  });

  paint();

  /* One nudge after the hero settles, so the handle is understood as draggable. */
  if (!reduced.matches) {
    const nudge = () => {
      const from = START;
      const to = START + 4;
      const dur = 520;
      let t0 = null;
      const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
      const step = (ts) => {
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / dur);
        // out and back
        const swing = Math.sin(p * Math.PI);
        if (!dragging) setPos(from + (to - from) * ease(swing));
        if (p < 1) requestAnimationFrame(step);
        else if (!dragging) setPos(START);
      };
      requestAnimationFrame(step);
    };
    window.setTimeout(nudge, 800);
  }
}

document.querySelectorAll('[data-twilight]').forEach(setup);
