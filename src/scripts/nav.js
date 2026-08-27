const header = document.querySelector('[data-nav]');
const toggle = document.querySelector('[data-nav-toggle]');
const panel = document.querySelector('[data-nav-panel]');

if (header) {
  const onScroll = () => {
    if (window.scrollY > 8) header.setAttribute('data-scrolled', '');
    else header.removeAttribute('data-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

if (toggle && panel) {
  const close = () => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    panel.hidden = open;
    toggle.setAttribute('aria-expanded', String(!open));
  });

  panel.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      close();
      toggle.focus();
    }
  });

  const desktop = window.matchMedia('(min-width: 900px)');
  desktop.addEventListener('change', (e) => {
    if (e.matches) close();
  });
}
