// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Lightbox for project photos and certificates
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('[data-full]').forEach(btn => btn.addEventListener('click', () => {
  lbImg.src = btn.dataset.full;
  lbImg.alt = btn.closest('figure')?.querySelector('figcaption')?.textContent || '';
  lb.showModal();
}));
lb.addEventListener('click', () => lb.close());

// Contact form: posts to FormSubmit, which emails sales@kanstetusa.net
const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', async e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach(el => {
    const bad = !el.value.trim() || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));
    el.classList.toggle('invalid', bad);
    if (bad) ok = false;
  });
  if (!ok) {
    status.className = 'form-status err';
    status.textContent = 'Please fill in your name, a valid email and a message.';
    return;
  }
  const btn = form.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  status.className = 'form-status';
  status.textContent = '';
  try {
    const res = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || String(data.success) === 'false') throw new Error(data.message || res.statusText);
    form.reset();
    status.className = 'form-status ok';
    status.textContent = "Thanks! Your inquiry is on its way to Dillon. We'll be in touch soon.";
  } catch (err) {
    status.className = 'form-status err';
    status.textContent = "Sorry, that didn't send. Please email sales@kanstetusa.net directly.";
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Inquiry';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
