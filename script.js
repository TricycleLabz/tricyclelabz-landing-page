/* ============================================================
   Tricycle Labz — Script
   Editorial layout · May 2026
   ============================================================ */

(function () {
  'use strict';

  /* --- Scroll Reveal --- */
  function initReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(function (el, i) {
      el.style.transitionDelay = (i % 5) * 0.06 + 's';
      observer.observe(el);
    });
  }

  /* --- Mobile Nav Toggle --- */
  function initNavToggle() {
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Smooth Anchor Scrolling --- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* --- Ventures Carousel --- */
  function initCarousel() {
    var track = document.getElementById('v-track');
    var prev = document.getElementById('v-prev');
    var next = document.getElementById('v-next');
    if (!track) return;

    var scrollAmount = function () { return track.clientWidth * 0.7; };

    if (next) {
      next.addEventListener('click', function () {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });
    }
    if (prev) {
      prev.addEventListener('click', function () {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
    }

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      if (e.key === 'ArrowLeft') track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initNavToggle();
    initSmoothScroll();
    initCarousel();
  });
})();

/* --- Contact Form Submission (Google Sheets) --- */
window.handleContactSubmit = function handleContactSubmit(event) {
  event.preventDefault();

  // Honeypot check
  var honeypot = event.target.querySelector('[name="website"]');
  if (honeypot && honeypot.value !== '') {
    return false;
  }

  var formData = new FormData(event.target);
  var data = {
    name: formData.get('name'),
    email: formData.get('email'),
    interest: formData.get('interest'),
    message: formData.get('message') || '',
    source: 'tricyclelabz_landing',
    submitted_at: new Date().toISOString()
  };

  var submitBtn = document.getElementById('contact-submit');
  var originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  var SHEETS_URL = 'https://script.google.com/macros/s/AKfycbywGBlz68g5LIAY6t3cMad6toRZF1SO7kOYSneT4PrRwTg2VcQz9iDOD5ofInZT0sNlVw/exec';

  fetch(SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data)
  })
  .then(function () {
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  })
  .catch(function () {
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  })
  .finally(function () {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
};
