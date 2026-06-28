const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const waitlistForm = document.querySelector('#waitlist-form');
const formNote = document.querySelector('#form-note');

if (waitlistForm && formNote) {
  waitlistForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(waitlistForm);
    const email = String(formData.get('email') || '').trim();

    if (!email) {
      formNote.textContent = 'Please add your email address.';
      return;
    }

    const saved = JSON.parse(localStorage.getItem('helloHoneyBunnyWaitlist') || '[]');
    saved.push({ email, submittedAt: new Date().toISOString() });
    localStorage.setItem('helloHoneyBunnyWaitlist', JSON.stringify(saved));

    waitlistForm.reset();
    formNote.textContent = 'Thank you! Your form has been submitted.';
  });
}

document.querySelectorAll('[data-accordion] .faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const wasOpen = item.classList.contains('open');

    document.querySelectorAll('[data-accordion] .faq-item').forEach(other => {
      other.classList.remove('open');
    });

    if (!wasOpen) item.classList.add('open');
  });
});
