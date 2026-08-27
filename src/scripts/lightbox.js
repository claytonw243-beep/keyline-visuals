const grid = document.querySelector('[data-work-grid]');
const dialog = document.querySelector('[data-lightbox]');

if (grid) {
  const items = [...grid.querySelectorAll('[data-lb]')];
  const buttons = [...document.querySelectorAll('[data-filter-btn]')];
  const count = document.querySelector('[data-work-count]');
  const empty = document.querySelector('[data-work-empty]');

  const applyFilter = (key) => {
    let shown = 0;
    for (const item of items) {
      const match = key === 'all' || item.dataset.filter === key;
      item.hidden = !match;
      if (match) shown += 1;
    }
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filterBtn === key)));
    if (count) count.textContent = `Showing ${shown} of ${items.length}`;
    if (empty) empty.hidden = shown > 0;
  };

  buttons.forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filterBtn)));

  if (dialog) {
    const img = dialog.querySelector('[data-lb-img]');
    const meta = dialog.querySelector('[data-lb-meta]');
    const text = dialog.querySelector('[data-lb-text]');
    let index = 0;
    let opener = null;

    const visible = () => items.filter((i) => !i.hidden);

    const show = (item) => {
      index = visible().indexOf(item);
      img.src = item.dataset.lbSrc;
      img.alt = item.dataset.lbCaption;
      meta.textContent = item.dataset.lbMeta;
      text.textContent = item.dataset.lbCaption;
    };

    const step = (delta) => {
      const list = visible();
      if (!list.length) return;
      show(list[(index + delta + list.length) % list.length]);
    };

    items.forEach((item) =>
      item.addEventListener('click', () => {
        opener = item;
        show(item);
        dialog.showModal();
      })
    );

    dialog.querySelector('[data-lb-prev]').addEventListener('click', () => step(-1));
    dialog.querySelector('[data-lb-next]').addEventListener('click', () => step(1));
    dialog.querySelector('[data-lb-close]').addEventListener('click', () => dialog.close());

    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });

    // Click outside the panel closes it.
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', () => opener?.focus());
  }
}
