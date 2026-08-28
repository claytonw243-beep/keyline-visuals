const form = document.querySelector('[data-contact-form]');

if (form) {
  const done = document.querySelector('[data-form-done]');
  const banner = form.querySelector('[data-form-error]');
  const submit = form.querySelector('[data-form-submit]');
  const fields = [...form.querySelectorAll('[data-msg]')];
  let attempted = false;

  const problem = (input) => {
    const value = input.value.trim();
    if (!value) return input.dataset.msg;
    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      return input.dataset.msgFormat ?? input.dataset.msg;
    }
    if (input.type === 'tel' && value.replace(/\D/g, '').length < 10) {
      return 'That looks short for a phone number — include the area code.';
    }
    return null;
  };

  const mark = (input) => {
    const msg = problem(input);
    const box = input.closest('.field');
    const note = form.querySelector(`[data-msg-for="${input.id}"]`);
    if (msg) {
      box.setAttribute('data-invalid', '');
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', `msg-${input.id}`);
      if (note) {
        note.id = `msg-${input.id}`;
        note.textContent = msg;
        note.hidden = false;
      }
    } else {
      box.removeAttribute('data-invalid');
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      if (note) note.hidden = true;
    }
    return !msg;
  };

  fields.forEach((input) => {
    input.addEventListener('blur', () => {
      if (attempted || input.value.trim()) mark(input);
    });
    input.addEventListener('input', () => {
      if (attempted) mark(input);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    attempted = true;
    banner.hidden = true;

    const bad = fields.filter((input) => !mark(input));
    if (bad.length) {
      bad[0].focus();
      return;
    }

    // form.action falls back to the page URL when the attribute is absent,
    // so read the attribute directly or an unconfigured form posts to itself.
    const endpoint = form.getAttribute('action');
    if (!endpoint) {
      banner.textContent =
        'The form is not connected yet. Set PUBLIC_FORMSPREE_ID in .env, or use the phone number listed.';
      banner.hidden = false;
      return;
    }

    submit.setAttribute('aria-busy', 'true');
    submit.textContent = 'Sending…';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      done.hidden = false;
      done.setAttribute('tabindex', '-1');
      done.focus();
    } catch {
      banner.textContent =
        form.dataset.failMsg ??
        'That did not send. Check your connection and try again, or call and I will book it over the phone.';
      banner.hidden = false;
      banner.focus?.();
    } finally {
      submit.removeAttribute('aria-busy');
      submit.textContent = 'Send message';
    }
  });
}
