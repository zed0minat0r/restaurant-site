/* ============================================
   Ember & Oak — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- DOM Elements ---
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const menuTabs = document.querySelectorAll('.menu__tab');
  const menuPanels = document.querySelectorAll('.menu__panel');
  const reservationForm = document.getElementById('reservationForm');

  // --- Mobile Nav ---
  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside tap
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // --- Sticky Nav ---
  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = y;
  }, { passive: true });

  // --- Theme Toggle ---
  var savedTheme = localStorage.getItem('eo-theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('eo-theme', next);
  });

  // --- Menu Tabs ---
  menuTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('data-tab');

      menuTabs.forEach(function (t) { t.classList.remove('active'); });
      menuPanels.forEach(function (p) { p.classList.remove('active'); });

      this.classList.add('active');
      var panel = document.getElementById('tab-' + target);
      if (panel) {
        panel.classList.add('active');
        // Re-trigger animations for items in new panel
        panel.querySelectorAll('.anim-fade').forEach(function (el) {
          el.classList.remove('visible');
          void el.offsetWidth; // force reflow
          el.classList.add('visible');
        });
      }
    });
  });

  // --- Scroll Animations ---
  var animElements = document.querySelectorAll('.anim-fade');

  function checkVisible() {
    var windowHeight = window.innerHeight;
    animElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisible, { passive: true });
  window.addEventListener('resize', checkVisible, { passive: true });

  // Initial check
  checkVisible();

  // --- Reservation Form ---
  if (reservationForm) {
    // Set min date to today
    var dateInput = document.getElementById('resDate');
    if (dateInput) {
      var today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
      dateInput.value = today;
    }

    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var fields = reservationForm.querySelectorAll('[required]');
      var valid = true;
      fields.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#8B2635';
          setTimeout(function () {
            field.style.borderColor = '';
          }, 2000);
        }
      });

      if (!valid) return;

      // Show success state
      var formContainer = reservationForm.parentElement;
      var name = document.getElementById('resName').value.split(' ')[0];
      reservationForm.innerHTML =
        '<div class="reservation-form--success">' +
        '<h3>Table Requested</h3>' +
        '<p>Thank you, ' + name + '. We\'ll confirm your reservation shortly via phone.</p>' +
        '<p style="margin-top:1rem;"><a href="#menu" class="btn btn--outline btn--sm">View Our Menu</a></p>' +
        '</div>';
    });
  }

  // --- Smooth scroll for all anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
