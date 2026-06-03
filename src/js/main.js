/* Aerial Estates — Main JS */

// Sticky nav on scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form → Cloudflare Function
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    formStatus.textContent = 'Sending…';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
      });

      const data = await res.json();

      if (res.ok) {
        formStatus.textContent = data.message ?? 'Message sent — thank you!';
        contactForm.reset();
      } else {
        formStatus.textContent = data.error ?? 'Something went wrong. Please try again.';
      }
    } catch {
      formStatus.textContent = 'Network error. Please try again.';
    } finally {
      btn.disabled = false;
    }
  });
}
