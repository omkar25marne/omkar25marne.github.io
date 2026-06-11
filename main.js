/**
 * js/main.js
 * ----------
 * All interactive behaviour for the portfolio site.
 *
 * Sections
 *   1. Footer year — keeps copyright current automatically
 *   2. Sticky navbar — adds a frosted-glass style when scrolled
 *   3. Hamburger menu — toggles mobile nav with animated icon morph
 *   4. Scroll-reveal — fades + slides elements in as they enter the viewport
 *   5. Contact form — client-side validation → mailto fallback
 */


/* ═══════════════════════════════════════════════════════════════════════
   1. Footer year
   Automatically keeps the copyright year in sync with the current year.
   ═══════════════════════════════════════════════════════════════════════ */
document.getElementById('year').textContent = new Date().getFullYear();


/* ═══════════════════════════════════════════════════════════════════════
   2. Sticky navbar
   Adds the `.scrolled` CSS class (frosted glass + violet underline glow)
   once the user scrolls more than 20 px from the top.
   ═══════════════════════════════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });   // passive: true → browser won't wait for JS before scrolling


/* ═══════════════════════════════════════════════════════════════════════
   3. Hamburger / mobile menu
   Toggles the #mobile-menu panel and morphs the three-bar icon into an ✕.
   ═══════════════════════════════════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const lines      = hamburger.querySelectorAll('.hamburger-line');

/** Open / close the mobile menu and animate the icon. */
function toggleMenu(forceClose = false) {
  const isOpen = forceClose ? false : mobileMenu.classList.toggle('open');

  if (forceClose) mobileMenu.classList.remove('open');

  // Update ARIA attribute for screen readers
  hamburger.setAttribute('aria-expanded', String(isOpen));

  // Morph bars → ✕  (or back to ☰)
  lines[0].style.transform = isOpen ? 'translateY(8px) rotate(45deg)'  : '';
  lines[1].style.opacity   = isOpen ? '0'                              : '1';
  lines[2].style.transform = isOpen ? 'translateY(-8px) rotate(-45deg)': '';
}

hamburger.addEventListener('click', () => toggleMenu());

// Close the menu automatically when any nav link is tapped on mobile
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(true));
});


/* ═══════════════════════════════════════════════════════════════════════
   4. Scroll-reveal
   Uses IntersectionObserver to add `.visible` to any `.reveal` element
   when it enters the viewport, triggering the CSS fade-up transition.
   A small staggered delay (80 ms × index) prevents all items firing at once.
   ═══════════════════════════════════════════════════════════════════════ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;

    // Stagger siblings by their position in the NodeList
    const delay = index * 80;   // milliseconds
    setTimeout(() => entry.target.classList.add('visible'), delay);

    // Once revealed, stop observing to save resources
    revealObserver.unobserve(entry.target);
  });
}, {
  threshold:  0.1,            // trigger when 10 % of the element is visible
  rootMargin: '0px 0px -40px 0px',  // reveal slightly before it fully enters
});

revealElements.forEach(el => revealObserver.observe(el));


/* ═══════════════════════════════════════════════════════════════════════
   5. Contact form — validation + mailto fallback
   GitHub Pages has no server-side code, so the form builds a mailto: URI
   and opens the user's native mail client.
   ═══════════════════════════════════════════════════════════════════════ */
const contactForm = document.getElementById('contact-form');
const feedback    = document.getElementById('form-feedback');
const submitBtn   = document.getElementById('submit-btn');

/** Show a feedback message beneath the form. */
function showFeedback(text, colorClass) {
  feedback.textContent = text;
  feedback.className   = `text-sm ${colorClass} block mt-2`;
}

/** Reset the submit button back to its default state. */
function resetButton() {
  submitBtn.disabled = false;
  submitBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
    Send Message
  `;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Read field values
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // ── Validation ──────────────────────────────────────────────────────
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    showFeedback('Please fill in all fields.', 'text-red-400');
    return;
  }

  if (!emailPattern.test(email)) {
    showFeedback('Please enter a valid email address.', 'text-red-400');
    return;
  }

  // ── Build mailto URI ─────────────────────────────────────────────────
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href =
    `mailto:marneomkar25@gmail.com?subject=${subject}&body=${body}`;

  // ── Optimistic UI feedback ───────────────────────────────────────────
  showFeedback('✓ Opening your mail client…', 'text-violet-400');
  submitBtn.disabled   = true;
  submitBtn.textContent = 'Sent!';

  // Reset the form after 3 seconds
  setTimeout(() => {
    resetButton();
    feedback.className = 'text-sm hidden';
    contactForm.reset();
  }, 3000);
});
