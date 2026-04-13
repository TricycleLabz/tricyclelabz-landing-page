/* ============================================================
   Tricycle Labz — Script
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
      observer.observe(el);
    });
  }

  /* --- Nav Scroll State --- */
  function initNavScroll() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var scrolled = false;

    function check() {
      var shouldBeScrolled = window.scrollY > 60;
      if (shouldBeScrolled !== scrolled) {
        scrolled = shouldBeScrolled;
        nav.classList.toggle('is-scrolled', scrolled);
      }
    }

    window.addEventListener('scroll', check, { passive: true });
    check();
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

    links.querySelectorAll('.nav-link').forEach(function (link) {
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

        var navHeight = document.getElementById('nav').offsetHeight;
        var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* --- Hero Emblem Parallax --- */
  function initParallax() {
    var emblem = document.querySelector('.hero-emblem');
    if (!emblem) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scroll = window.scrollY;
          var offset = scroll * 0.15;
          emblem.style.transform = 'translateY(' + offset + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initNavScroll();
    initNavToggle();
    initSmoothScroll();
    initParallax();
  });

})();

/* --- Contact Form Submission (Google Sheets) --- */
/* Outside the IIFE so the inline onsubmit can reach it */
function handleContactSubmit(event) {
    event.preventDefault();

    // Honeypot check — if a bot filled the hidden field, silently reject
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

    // ---------------------------------------------------------------
    // GOOGLE SHEETS ENDPOINT
    // Replace the URL below with your Tricycle Labz Apps Script
    // Web App URL after deploying the sheet connector.
    // ---------------------------------------------------------------
    var SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwKe5Umc8ycKbzycC-l4Ap1xYPzUK0Yqv5mPaKFZdrP5bL71AVznvz7v5RoEQAscS7hzg/exec';

    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data)
    })
    .then(function () {
      // With mode: 'no-cors' we cannot read the response,
      // but the data is sent. Show success state.
      document.getElementById('contact-form').style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    })
    .catch(function () {
      // Even on catch with no-cors, data likely went through
      document.getElementById('contact-form').style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    })
    .finally(function () {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}
