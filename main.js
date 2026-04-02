/* ============================================
   Ember & Oak — Main JavaScript
   ============================================ */

/* Shared restaurant schedule — single source of truth
   Mon=closed, Tue-Thu 17-22, Fri-Sat 17-23, Sun 16-21
   getDay(): 0=Sun, 1=Mon, 2=Tue ... 6=Sat            */
var EMBER_SCHEDULE = {
  0: { open: 16, close: 21, label: 'Sunday' },
  1: null,
  2: { open: 17, close: 22, label: 'Tue\u2013Thu' },
  3: { open: 17, close: 22, label: 'Tue\u2013Thu' },
  4: { open: 17, close: 22, label: 'Tue\u2013Thu' },
  5: { open: 17, close: 23, label: 'Fri\u2013Sat' },
  6: { open: 17, close: 23, label: 'Fri\u2013Sat' }
};

(function () {
  'use strict';

  // --- DOM Elements (defensive null checks) ---
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const navOverlay = document.getElementById('navOverlay');
  const html = document.documentElement;
  const menuTabs = document.querySelectorAll('.menu__tab');
  const menuPanels = document.querySelectorAll('.menu__panel');
  const reservationForm = document.getElementById('reservationForm');

  if (!nav || !hamburger || !navLinks || !themeToggle) return;

  function closeNav() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (navOverlay) navOverlay.classList.remove('active');
  }

  // --- Mobile Nav ---
  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (navOverlay) navOverlay.classList.toggle('active', isOpen);
  });

  // Close nav on overlay tap
  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Close nav on outside tap
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeNav();
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
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
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
      // Mark items as visible immediately — no re-trigger to avoid jitter
      nextPanel.querySelectorAll('.anim-fade').forEach(function (el) {
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

      // Dismiss swipe hint after first successful swipe
      var swipeHint = document.getElementById('swipeHint');
      if (swipeHint) swipeHint.style.display = 'none';

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

    // Monday (closed day) validation on date change
    if (dateInput) {
      dateInput.addEventListener('change', function () {
        var selected = new Date(this.value + 'T12:00:00');
        var prevWarning = this.parentElement.querySelector('.form-error--monday');
        if (prevWarning) prevWarning.remove();
        if (selected.getDay() === 1) {
          this.setAttribute('aria-invalid', 'true');
          this.style.borderColor = '#8B2635';
          var warn = document.createElement('span');
          warn.className = 'form-error form-error--monday';
          warn.setAttribute('role', 'alert');
          warn.textContent = 'We\u2019re closed Mondays. Please choose another day.';
          this.parentElement.appendChild(warn);
        } else {
          this.removeAttribute('aria-invalid');
          this.style.borderColor = '';
        }
      });
      // Check initial value (today) for Monday
      var initialDate = new Date(dateInput.value + 'T12:00:00');
      if (initialDate.getDay() === 1) {
        dateInput.dispatchEvent(new Event('change'));
      }
    }

    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Block Monday reservations (restaurant closed)
      var selectedDate = new Date(document.getElementById('resDate').value + 'T12:00:00');
      if (selectedDate.getDay() === 1) {
        var dateField = document.getElementById('resDate');
        dateField.setAttribute('aria-invalid', 'true');
        dateField.style.borderColor = '#8B2635';
        var prevMondayErr = dateField.parentElement.querySelector('.form-error--monday');
        if (!prevMondayErr) {
          var mondayErr = document.createElement('span');
          mondayErr.className = 'form-error form-error--monday';
          mondayErr.setAttribute('role', 'alert');
          mondayErr.textContent = 'We\u2019re closed Mondays. Please choose another day.';
          dateField.parentElement.appendChild(mondayErr);
        }
        dateField.focus();
        return;
      }

      // Basic validation with accessible error feedback
      var fields = reservationForm.querySelectorAll('[required]');
      var valid = true;
      fields.forEach(function (field) {
        // Remove previous error state
        field.removeAttribute('aria-invalid');
        var prevError = field.parentElement.querySelector('.form-error');
        if (prevError) prevError.remove();

        var isEmpty = !field.value.trim();
        var isInvalidPhone = field.type === 'tel' && field.value.trim() && !/[\d]{7,}/.test(field.value.replace(/[\s\(\)\-\+\.]/g, ''));
        if (isEmpty || isInvalidPhone) {
          valid = false;
          field.style.borderColor = '#8B2635';
          field.setAttribute('aria-invalid', 'true');

          var errorMsg = document.createElement('span');
          errorMsg.className = 'form-error';
          errorMsg.setAttribute('role', 'alert');
          errorMsg.textContent = isInvalidPhone ? 'Please enter a valid phone number' : 'This field is required';
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

      // Show submitting state on button
      var submitBtn = document.getElementById('resSubmitBtn');
      if (submitBtn) {
        submitBtn.textContent = 'Submitting...';
        submitBtn.classList.add('btn--submitting');
      }

      // Simulate brief network delay, then show success
      setTimeout(function () {

      // Show rich success state
      var formContainer = reservationForm.parentElement;
      var name = document.getElementById('resName').value.split(' ')[0];
      var dateVal = document.getElementById('resDate').value;
      var timeSelect = document.getElementById('resTime');
      var timeText = timeSelect.options[timeSelect.selectedIndex].text;
      var partySelect = document.getElementById('resParty');
      var partyText = partySelect.options[partySelect.selectedIndex].text;

      // Sanitize user input to prevent XSS
      var safeName = document.createElement('span');
      safeName.textContent = name;

      // Generate mock confirmation number
      var confNum = 'EO-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      // Format date nicely
      var dateParts = dateVal.split('-');
      var dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      var formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

      var successDiv = document.createElement('div');
      successDiv.className = 'reservation-form--success';
      successDiv.setAttribute('role', 'status');
      successDiv.setAttribute('aria-live', 'polite');

      var checkIcon = document.createElement('div');
      checkIcon.className = 'success__icon';
      checkIcon.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';
      successDiv.appendChild(checkIcon);

      var heading = document.createElement('h3');
      heading.textContent = 'Table Requested!';
      successDiv.appendChild(heading);

      var confP = document.createElement('p');
      confP.className = 'success__conf';
      confP.textContent = 'Confirmation: ' + confNum;
      successDiv.appendChild(confP);

      var details = document.createElement('div');
      details.className = 'success__details';
      details.innerHTML = '<p><strong>' + formattedDate + '</strong> at <strong>' + timeText + '</strong></p><p>' + partyText + ' \u2022 ' + safeName.textContent + '</p>';
      successDiv.appendChild(details);

      var msg = document.createElement('p');
      msg.className = 'success__msg';
      msg.textContent = 'We\u2019ll confirm your reservation via phone or email within the hour. A calendar invite will follow once confirmed.';
      successDiv.appendChild(msg);

      var actions = document.createElement('div');
      actions.className = 'success__actions';
      var menuLink = document.createElement('a');
      menuLink.href = '#menu';
      menuLink.className = 'btn btn--outline btn--sm';
      menuLink.textContent = 'View Our Menu';
      var callLink = document.createElement('a');
      callLink.href = 'tel:+12155550142';
      callLink.className = 'btn btn--outline btn--sm';
      callLink.textContent = 'Call to Confirm';
      actions.appendChild(menuLink);
      actions.appendChild(callLink);
      successDiv.appendChild(actions);

      reservationForm.innerHTML = '';
      reservationForm.appendChild(successDiv);

      }, 800); // end setTimeout for submit state
    });
  }

  // --- Live Open/Closed Status ---
  (function updateHoursStatus() {
    var statusEl = document.getElementById('hoursStatus');
    var textEl = document.getElementById('hoursStatusText');
    if (!statusEl || !textEl) return;

    var now = new Date();
    var day = now.getDay();
    var hour = now.getHours();
    var min = now.getMinutes();
    var time = hour + min / 60; // decimal hours

    var schedule = EMBER_SCHEDULE;
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

/* ============================================
   Mobile Sticky Bottom Bar — show after hero
   ============================================ */
(function () {
  'use strict';

  var mobileBar = document.getElementById('mobileBar');
  var hero = document.getElementById('hero');
  if (!mobileBar || !hero) return;

  // Show bar once user scrolls past 60% of the hero
  function checkMobileBar() {
    var heroBottom = hero.offsetTop + hero.offsetHeight * 0.6;
    if (window.scrollY > heroBottom) {
      mobileBar.classList.add('visible');
    } else {
      mobileBar.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkMobileBar, { passive: true });
  checkMobileBar();

  // Smooth scroll for the Reserve button in the bar
  mobileBar.querySelector('.mobile-bar__btn--reserve').addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      var navHeight = document.getElementById('nav').offsetHeight || 70;
      var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
})();

/* ============================================
   Reservation Urgency — dynamic messaging
   ============================================ */
(function () {
  'use strict';

  var urgencyEl = document.getElementById('reservationUrgency');
  var urgencyText = document.getElementById('urgencyText');
  if (!urgencyEl || !urgencyText) return;

  var now = new Date();
  var day = now.getDay();
  var hour = now.getHours();
  var time = hour + now.getMinutes() / 60;

  var schedule = EMBER_SCHEDULE;
  var today = schedule[day];
  var isOpen = today && time >= today.open && time < today.close;

  // Generate urgency based on context (seeded random for consistency within a session)
  var seed = now.getDate() + now.getMonth() * 31;
  var tablesLeft = (seed % 5) + 2; // 2-6 tables

  if (isOpen) {
    urgencyText.textContent = 'Only ' + tablesLeft + ' tables left tonight \u2014 reserve yours now';
  } else if (today && time < today.open) {
    urgencyText.textContent = 'Tonight is filling up fast \u2014 ' + tablesLeft + ' tables remaining';
  } else if (day === 1) {
    // Monday — closed all day, show planning message
    urgencyText.textContent = 'Planning ahead? We reopen Tuesday at 5 PM \u2014 secure your table now';
    urgencyEl.style.background = 'rgba(201, 163, 78, 0.06)';
    urgencyEl.style.borderColor = 'rgba(201, 163, 78, 0.12)';
    urgencyEl.style.color = 'var(--text-secondary)';
  } else if (day === 5 || day === 6) {
    urgencyText.textContent = 'Weekend tables go fast \u2014 book ahead to secure your spot';
  } else {
    urgencyText.textContent = 'Planning your week? Reserve early for the best tables';
    urgencyEl.style.background = 'rgba(201, 163, 78, 0.06)';
    urgencyEl.style.borderColor = 'rgba(201, 163, 78, 0.12)';
    urgencyEl.style.color = 'var(--text-secondary)';
  }
})();

/* ============================================
   Hours — highlight today's row
   ============================================ */
(function () {
  'use strict';

  var dayRows = document.querySelectorAll('.hours__day');
  if (!dayRows.length) return;

  var now = new Date();
  var jsDay = now.getDay(); // 0=Sun, 1=Mon, ...

  // Map JS day index to the row index in the hours schedule
  // Row 0 = Monday, Row 1 = Tue-Thu, Row 2 = Fri-Sat, Row 3 = Sunday
  var dayToRow = { 1: 0, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 0: 3 };
  var todayRow = dayToRow[jsDay];

  if (todayRow !== undefined && dayRows[todayRow]) {
    dayRows[todayRow].classList.add('is-today');
  }
})();

/* ============================================
   Back to Top Button
   ============================================ */
(function () {
  'use strict';

  var btn = document.getElementById('backToTop');
  if (!btn) return;

  function checkScroll() {
    if (window.scrollY > 800) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================
   The Hearth — Live Kitchen Pulse
   Time-aware rotating messages from the kitchen
   ============================================ */
(function () {
  'use strict';

  var msgEl = document.getElementById('hearthMessage');
  if (!msgEl) return;

  var now = new Date();
  var hour = now.getHours();
  var day = now.getDay();

  var schedule = EMBER_SCHEDULE;
  var today = schedule[day];
  var time = hour + now.getMinutes() / 60;
  var isOpen = today && time >= today.open && time < today.close;

  // Context-specific message pools
  var preServiceMessages = [
    'Chef Marcus selecting tonight\u2019s cuts from the dry-age locker',
    'Cherrywood logs loaded into the hearth \u2014 first flames catching',
    'Prep team breaking down whole fish for tonight\u2019s feature',
    'House-made pasta sheets drying on the rack',
    'Tonight\u2019s specials board going up now',
    'Truffle compound butter tempered and ready',
    'Cocktail syrups strained, ice carved \u2014 bar is set',
    'Oak embers building to 650\u00b0 for the evening sear'
  ];

  var activeServiceMessages = [
    'Tomahawk ribeye resting on the board \u2014 table 7 is going to be happy',
    'Two risottos fired, one wagyu tataki plating now',
    'Sommelier Elena just opened a 2018 Barolo for the corner table',
    'Cherrywood embers at perfect searing temperature',
    'Dessert course firing for a party of six',
    'Ember Old Fashioneds going out three at a time tonight',
    'The open kitchen is putting on a show right now',
    'Fresh bread just pulled from the wood oven'
  ];

  var closedMessages = [
    'Kitchen resting. Embers banked. Back tomorrow with fresh fire.',
    'Hearth cooling down. We\u2019ll have it roaring again tomorrow.',
    'Last plates cleared. See you next service.',
    'Kitchen dark. The oak is seasoning overnight.'
  ];

  var mondayMessages = [
    'Monday \u2014 our day off. The hearth rests so we can bring the heat Tuesday.',
    'Dark kitchen tonight. Chef Marcus is probably at a farm.',
    'Closed Mondays. We\u2019ll be back with fresh fire tomorrow at 5 PM.'
  ];

  // Pick message pool based on context
  var pool;
  if (day === 1) {
    pool = mondayMessages;
  } else if (isOpen) {
    pool = activeServiceMessages;
  } else if (today && time < today.open && time >= today.open - 3) {
    pool = preServiceMessages;
  } else {
    pool = closedMessages;
  }

  // Seeded shuffle for session consistency
  var seed = now.getDate() + now.getMonth() * 31 + now.getHours();
  function seededRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  // Shuffle array
  var shuffled = pool.slice();
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(seededRandom() * (i + 1));
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  var msgIndex = 0;
  msgEl.textContent = shuffled[0];

  // Rotate messages every 6 seconds
  setInterval(function () {
    msgEl.classList.add('fade-out');
    setTimeout(function () {
      msgIndex = (msgIndex + 1) % shuffled.length;
      msgEl.textContent = shuffled[msgIndex];
      msgEl.classList.remove('fade-out');
    }, 400);
  }, 6000);
})();

/* ============================================
   Swipe Hint — dismiss after first swipe
   and only show on touch devices
   ============================================ */
(function () {
  'use strict';

  var hint = document.getElementById('swipeHint');
  if (!hint) return;

  // Only show on touch devices
  if (!('ontouchstart' in window)) {
    hint.style.display = 'none';
    return;
  }

  var menuSection = document.querySelector('.menu');
  if (!menuSection) return;

  menuSection.addEventListener('touchend', function dismissHint() {
    hint.style.opacity = '0';
    setTimeout(function () {
      hint.style.display = 'none';
    }, 300);
    menuSection.removeEventListener('touchend', dismissHint);
  }, { passive: true });
})();

/* ============================================
   Newsletter Form — rich success state
   ============================================ */
(function () {
  'use strict';

  var form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var emailInput = form.querySelector('input[type="email"]');
    if (!emailInput || !emailInput.value.trim() || !emailInput.value.includes('@')) return;

    var parent = form.closest('.footer__newsletter');
    if (!parent) return;

    var successEl = document.createElement('div');
    successEl.className = 'newsletter-success';
    successEl.setAttribute('role', 'status');
    successEl.setAttribute('aria-live', 'polite');

    successEl.innerHTML =
      '<div class="newsletter-success__icon">' +
        '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>' +
      '</div>' +
      '<p class="newsletter-success__heading">You\u2019re in. Welcome to the inner circle.</p>' +
      '<p class="newsletter-success__expect">We send one email per menu change\u2014never more.</p>' +
      '<a href="#menu" class="btn btn--outline btn--sm newsletter-success__cta">Browse the Menu</a>';

    // Replace heading, sub, and form with success state
    parent.innerHTML = '';
    parent.appendChild(successEl);
  });
})();
