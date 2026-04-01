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
  var tabOrder = ['starters', 'mains', 'desserts', 'drinks'];

  function switchToTab(tabName, direction) {
    menuTabs.forEach(function (t) {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });

    // Animate panel transition
    var currentPanel = document.querySelector('.menu__panel.active');
    var nextPanel = document.getElementById('tab-' + tabName);
    var matchingTab = document.querySelector('.menu__tab[data-tab="' + tabName + '"]');

    if (matchingTab) {
      matchingTab.classList.add('active');
      matchingTab.setAttribute('aria-selected', 'true');
      matchingTab.setAttribute('tabindex', '0');
    }

    if (currentPanel && nextPanel && currentPanel !== nextPanel && direction) {
      // Slide out current panel
      currentPanel.classList.add('menu__panel--exit-' + (direction === 'left' ? 'left' : 'right'));
      currentPanel.classList.remove('active');

      // Slide in next panel
      nextPanel.classList.add('menu__panel--enter-' + (direction === 'left' ? 'right' : 'left'));
      nextPanel.classList.add('active');

      // Clean up classes after transition
      setTimeout(function () {
        currentPanel.classList.remove('menu__panel--exit-left', 'menu__panel--exit-right');
        nextPanel.classList.remove('menu__panel--enter-left', 'menu__panel--enter-right');
        nextPanel.classList.add('menu__panel--settled');
        setTimeout(function () { nextPanel.classList.remove('menu__panel--settled'); }, 50);
      }, 250);
    } else {
      menuPanels.forEach(function (p) { p.classList.remove('active'); });
      if (nextPanel) nextPanel.classList.add('active');
    }

    if (nextPanel) {
      // Re-trigger animations for items in new panel
      nextPanel.querySelectorAll('.anim-fade').forEach(function (el) {
        el.classList.remove('visible');
        void el.offsetWidth; // force reflow
        el.classList.add('visible');
      });
    }

    // Scroll active tab into view on mobile
    if (matchingTab) {
      matchingTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function getActiveTabIndex() {
    for (var i = 0; i < menuTabs.length; i++) {
      if (menuTabs[i].classList.contains('active')) return i;
    }
    return 0;
  }

  menuTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('data-tab');
      var currentIndex = getActiveTabIndex();
      var targetIndex = tabOrder.indexOf(target);
      var direction = targetIndex > currentIndex ? 'left' : (targetIndex < currentIndex ? 'right' : null);
      switchToTab(target, direction);
    });

    // Keyboard arrow navigation for ARIA tablist
    tab.addEventListener('keydown', function (e) {
      var currentIndex = getActiveTabIndex();
      var newIndex = currentIndex;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabOrder.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabOrder.length - 1;
      } else {
        return;
      }

      var direction = newIndex > currentIndex ? 'left' : 'right';
      switchToTab(tabOrder[newIndex], direction);
      menuTabs[newIndex].focus();
    });
  });

  // --- Swipe Gestures for Menu (Mobile) ---
  var menuSection = document.querySelector('.menu');
  if (menuSection) {
    var touchStartX = 0;
    var touchStartY = 0;
    var isSwiping = false;

    menuSection.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
      isSwiping = true;
    }, { passive: true });

    menuSection.addEventListener('touchend', function (e) {
      if (!isSwiping) return;
      isSwiping = false;

      var touchEndX = e.changedTouches[0].clientX;
      var touchEndY = e.changedTouches[0].clientY;
      var diffX = touchEndX - touchStartX;
      var diffY = touchEndY - touchStartY;

      // Only trigger if horizontal swipe is dominant and threshold met
      if (Math.abs(diffX) < 50 || Math.abs(diffY) > Math.abs(diffX) * 0.7) return;

      var currentIndex = getActiveTabIndex();

      if (diffX < 0 && currentIndex < tabOrder.length - 1) {
        // Swipe left -> next tab
        switchToTab(tabOrder[currentIndex + 1], 'left');
      } else if (diffX > 0 && currentIndex > 0) {
        // Swipe right -> previous tab
        switchToTab(tabOrder[currentIndex - 1], 'right');
      }
    }, { passive: true });
  }

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

      // Basic validation with accessible error feedback
      var fields = reservationForm.querySelectorAll('[required]');
      var valid = true;
      fields.forEach(function (field) {
        // Remove previous error state
        field.removeAttribute('aria-invalid');
        var prevError = field.parentElement.querySelector('.form-error');
        if (prevError) prevError.remove();

        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#8B2635';
          field.setAttribute('aria-invalid', 'true');

          var errorMsg = document.createElement('span');
          errorMsg.className = 'form-error';
          errorMsg.setAttribute('role', 'alert');
          errorMsg.textContent = 'This field is required';
          field.parentElement.appendChild(errorMsg);

          setTimeout(function () {
            field.style.borderColor = '';
            field.removeAttribute('aria-invalid');
            var err = field.parentElement.querySelector('.form-error');
            if (err) err.remove();
          }, 3000);
        }
      });

      if (!valid) return;

      // Show success state
      var formContainer = reservationForm.parentElement;
      var name = document.getElementById('resName').value.split(' ')[0];
      // Sanitize user input to prevent XSS
      var safeName = document.createElement('span');
      safeName.textContent = name;

      var successDiv = document.createElement('div');
      successDiv.className = 'reservation-form--success';
      successDiv.setAttribute('role', 'status');
      successDiv.setAttribute('aria-live', 'polite');

      var heading = document.createElement('h3');
      heading.textContent = 'Table Requested';
      successDiv.appendChild(heading);

      var msg = document.createElement('p');
      msg.textContent = 'Thank you, ' + safeName.textContent + '. We\u2019ll confirm your reservation shortly via phone.';
      successDiv.appendChild(msg);

      var linkWrap = document.createElement('p');
      linkWrap.style.marginTop = '1rem';
      var menuLink = document.createElement('a');
      menuLink.href = '#menu';
      menuLink.className = 'btn btn--outline btn--sm';
      menuLink.textContent = 'View Our Menu';
      linkWrap.appendChild(menuLink);
      successDiv.appendChild(linkWrap);

      reservationForm.innerHTML = '';
      reservationForm.appendChild(successDiv);
    });
  }

  // --- Live Open/Closed Status ---
  (function updateHoursStatus() {
    var statusEl = document.getElementById('hoursStatus');
    var textEl = document.getElementById('hoursStatusText');
    if (!statusEl || !textEl) return;

    // Schedule: Mon=closed, Tue-Thu 17-22, Fri-Sat 17-23, Sun 16-21
    // getDay(): 0=Sun,1=Mon,2=Tue...6=Sat
    var now = new Date();
    var day = now.getDay();
    var hour = now.getHours();
    var min = now.getMinutes();
    var time = hour + min / 60; // decimal hours

    var schedule = {
      0: { open: 16, close: 21, label: 'Sunday' },       // Sun
      1: null,                                              // Mon closed
      2: { open: 17, close: 22, label: 'Tue–Thu' },
      3: { open: 17, close: 22, label: 'Tue–Thu' },
      4: { open: 17, close: 22, label: 'Tue–Thu' },
      5: { open: 17, close: 23, label: 'Fri–Sat' },
      6: { open: 17, close: 23, label: 'Fri–Sat' }
    };

    var today = schedule[day];
    var isOpen = today && time >= today.open && time < today.close;

    if (isOpen) {
      statusEl.classList.add('is-open');
      var closeHour = today.close > 12 ? (today.close - 12) : today.close;
      textEl.textContent = 'Open now — until ' + closeHour + ':00 PM';
    } else {
      statusEl.classList.remove('is-open');
      // Find next opening
      var nextDay = day;
      var nextInfo = null;
      for (var i = 0; i < 7; i++) {
        var checkDay = (day + i) % 7;
        var s = schedule[checkDay];
        if (s) {
          if (i === 0 && time < s.open) {
            // Opens later today
            var openHour = s.open > 12 ? (s.open - 12) : s.open;
            textEl.textContent = 'Closed — opens today at ' + openHour + ':00 PM';
            return;
          } else if (i > 0) {
            nextInfo = s;
            break;
          }
        }
      }
      if (nextInfo) {
        var openH = nextInfo.open > 12 ? (nextInfo.open - 12) : nextInfo.open;
        textEl.textContent = 'Closed — opens ' + nextInfo.label + ' at ' + openH + ':00 PM';
      } else {
        textEl.textContent = 'Currently closed';
      }
    }
  })();

  // --- Smooth scroll for all anchor links (respects fixed nav height) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navHeight = nav.offsetHeight || 70;
        var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

})();
