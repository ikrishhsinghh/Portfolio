/**
 * KRISHNA KAMLESH SINGH — EDITORIAL MONOGRAPH & TACTILE STUDIO
 * Client-Side JavaScript Logic
 * Solid-Color System • Tactile Micro-Interactions • Zero-Config GitHub Pages Ready
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTheme();
  initViewSwitcher();
  initProjectFilters();
  initCareerFilters();
  initTypewriter();
  initCopyTriggers();
  initMobileDrawer();
  initCustomCursor();
  initTactileTilt();
  initAudioWaveInteractivity();
  initKeyboardShortcuts();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLE & PERSISTENCE
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeBtn = document.getElementById('theme-btn');
  const root = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('krishna-theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('krishna-theme', nextTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   2. BENTO VIEW SWITCHER TABS (TACTILE SOLID PILLS)
   -------------------------------------------------------------------------- */
const VIEW_IDS = ['overview', 'about', 'projects', 'career', 'skills', 'honors', 'contact'];

function initViewSwitcher() {
  const viewPanels = document.querySelectorAll('.view-panel');
  const viewTabs = document.querySelectorAll('.view-tab');
  const mobileTabBtns = document.querySelectorAll('.mobile-tab-btn');
  const dockBtns = document.querySelectorAll('.dock-btn[data-view]');
  const footerTabLinks = document.querySelectorAll('.footer-tab-link');
  const switchLinks = document.querySelectorAll('[data-switch]');

  function switchView(targetViewId) {
    if (!targetViewId) return;

    // Hide all view panels
    viewPanels.forEach(panel => {
      panel.classList.remove('active');
    });

    // Show target view panel
    const targetPanel = document.getElementById(`view-${targetViewId}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }

    // Update active state on desktop tabs
    viewTabs.forEach(tab => {
      if (tab.getAttribute('data-view') === targetViewId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update active state on mobile drawer tabs
    mobileTabBtns.forEach(btn => {
      if (btn.getAttribute('data-view') === targetViewId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update active state on dock buttons (Solid Accent, NO Gradients)
    dockBtns.forEach(btn => {
      if (btn.getAttribute('data-view') === targetViewId) {
        btn.classList.add('active');
        btn.style.color = '#FFFFFF';
        btn.style.backgroundColor = 'var(--solid-orange)';
        btn.style.borderColor = 'var(--solid-orange)';
      } else {
        btn.classList.remove('active');
        btn.style.color = '';
        btn.style.backgroundColor = '';
        btn.style.borderColor = '';
      }
    });

    // Scroll smoothly to hero or top if switching view
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const topOffset = heroSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
    }
  }

  // Desktop tabs click
  viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const view = tab.getAttribute('data-view');
      switchView(view);
    });
  });

  // Mobile drawer tabs click
  mobileTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
      closeMobileDrawer();
    });
  });

  // Floating dock click (Mobile & Desktop)
  dockBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
    });
  });

  // Footer tab links click
  footerTabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const view = link.getAttribute('data-view');
      switchView(view);
    });
  });

  // Back to top button click
  const backToTopBtn = document.getElementById('footer-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Internal tile switch triggers (e.g. "View All Skills →")
  switchLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-switch');
      switchView(target);
    });
  });

  // Expose globally for keyboard shortcut access
  window.krishnaSwitchView = switchView;
}

/* --------------------------------------------------------------------------
   3. PROJECT CATEGORY FILTERING
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterPills = document.querySelectorAll('[data-proj-filter]');
  const projectCards = document.querySelectorAll('.project-bento-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-proj-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-proj-cat') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. CAREER CATEGORY FILTERING
   -------------------------------------------------------------------------- */
function initCareerFilters() {
  const expPills = document.querySelectorAll('[data-exp-filter]');
  const expEntries = document.querySelectorAll('.career-entry');

  expPills.forEach(pill => {
    pill.addEventListener('click', () => {
      expPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-exp-filter');

      expEntries.forEach(entry => {
        const cat = entry.getAttribute('data-exp-cat') || '';
        if (filter === 'all' || cat.includes(filter)) {
          entry.classList.remove('hidden');
        } else {
          entry.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. TYPEWRITER EFFECT FOR HERO ROTATOR
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const rotatorElem = document.getElementById('rotator-text');
  if (!rotatorElem) return;

  const roles = [
    'Vibe Coding',
    'Camera-Based Web Apps',
    'Cloud Computing',
    'Keynote Anchoring & Podcasts',
    'UI/UX Architecture',
    'AI & Data Prototyping'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      rotatorElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      rotatorElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   6. ONE-TAP COPY WITH TACTILE TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initCopyTriggers() {
  const copyTriggers = document.querySelectorAll('.copy-trigger');
  const toast = document.getElementById('bento-toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyTriggers.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy') || 'i.krishnasinghh@gmail.com';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        showToast(`Copied ${textToCopy} to clipboard!`);
      } catch (err) {
        showToast(`Email: ${textToCopy}`);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
let mobileDrawerOpen = false;

function initMobileDrawer() {
  const trigger = document.getElementById('mobile-menu-trigger');
  const drawer = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('mobile-drawer-close-btn');

  if (!trigger || !drawer) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDrawerOpen = !mobileDrawerOpen;
    if (mobileDrawerOpen) {
      openMobileDrawer();
    } else {
      closeMobileDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileDrawer();
    });
  }

  // Close when clicking directly on overlay backdrop
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeMobileDrawer();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawerOpen) {
      closeMobileDrawer();
    }
  });
}

function openMobileDrawer() {
  const trigger = document.getElementById('mobile-menu-trigger');
  const drawer = document.getElementById('mobile-drawer-overlay');
  if (trigger) {
    trigger.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
  }
  if (drawer) {
    drawer.classList.add('open');
  }
  mobileDrawerOpen = true;
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  const trigger = document.getElementById('mobile-menu-trigger');
  const drawer = document.getElementById('mobile-drawer-overlay');
  if (trigger) {
    trigger.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
  }
  if (drawer) {
    drawer.classList.remove('open');
  }
  mobileDrawerOpen = false;
  document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE TACTILE CUSTOM CURSOR (TOUCH-SAFE & CLEAN INITIALIZATION)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  // On touch devices or coarse pointers, remove custom cursor completely
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    cursor.remove();
    return;
  }

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let hasMoved = false;

  window.addEventListener('mousemove', (e) => {
    if (!hasMoved) {
      hasMoved = true;
      cursor.classList.add('active');
    }
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (dot) {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }
  });

  // Instant kill on any touch interaction
  window.addEventListener('touchstart', () => {
    cursor.classList.remove('active');
    cursor.style.display = 'none';
  }, { passive: true });

  // Smooth spring loop for the ring
  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    if (ring && hasMoved) {
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderRing);
  }
  renderRing();

  // Hover state detection
  const interactiveTargets = 'a, button, [role="button"], .bento-tile, .dimension-card, .project-bento-card, .career-card, .honor-trophy-box, .cert-tile, .copy-trigger';
  document.querySelectorAll(interactiveTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // Dynamic attachment for newly toggled elements
  document.body.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveTargets)) {
      cursor.classList.add('hovering');
    } else {
      cursor.classList.remove('hovering');
    }
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
  document.addEventListener('mouseenter', () => {
    if (hasMoved) cursor.classList.add('active');
  });
}

/* --------------------------------------------------------------------------
   9. TACTILE 3D MICRO-TILT FOR BENTO TILES
   -------------------------------------------------------------------------- */
function initTactileTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltCards = document.querySelectorAll('.bento-tile, .project-bento-card, .dimension-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* --------------------------------------------------------------------------
   10. AUDIO WAVE DYNAMIC REACTIVITY
   -------------------------------------------------------------------------- */
function initAudioWaveInteractivity() {
  const kuhooTile = document.querySelector('.tile-kuhoo');
  const waveBars = document.querySelectorAll('.audio-wave-visualizer .wave-bar');

  if (!kuhooTile || waveBars.length === 0) return;

  kuhooTile.addEventListener('mouseenter', () => {
    waveBars.forEach((bar, index) => {
      bar.style.animationDuration = `${0.4 + (index * 0.1)}s`;
    });
  });

  kuhooTile.addEventListener('mouseleave', () => {
    waveBars.forEach(bar => {
      bar.style.animationDuration = '1.2s';
    });
  });
}

/* --------------------------------------------------------------------------
   11. ACCESSIBLE KEYBOARD SHORTCUTS
   -------------------------------------------------------------------------- */
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Only fire if not typing inside an input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    // Keys 1 to 7 switch view tabs
    const keyNum = parseInt(e.key, 10);
    if (!isNaN(keyNum) && keyNum >= 1 && keyNum <= VIEW_IDS.length) {
      const targetView = VIEW_IDS[keyNum - 1];
      if (window.krishnaSwitchView) {
        window.krishnaSwitchView(targetView);
      }
    }

    // Escape closes mobile drawer
    if (e.key === 'Escape' && mobileDrawerOpen) {
      closeMobileDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   12. WEBSITE OPENING ANIMATION (EXACT 2-SECOND CALIBRATED PRELOADER)
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('site-preloader');
  const bar = document.getElementById('preloader-bar');
  const counter = document.getElementById('preloader-counter');
  const status = document.getElementById('preloader-status');

  if (!preloader || !bar || !counter) return;

  const telemetrySteps = [
    { threshold: 22, label: 'INITIALIZING STUDIO CORE...' },
    { threshold: 48, label: 'LOADING EDITORIAL BENTO GRID...' },
    { threshold: 74, label: 'SYNCHRONIZING AUDIO & DATA BUILDS...' },
    { threshold: 96, label: 'CALIBRATING TACTILE PHYSICS...' },
    { threshold: 100, label: 'SYSTEM READY • WELCOME' }
  ];

  const TOTAL_COUNT_TIME = 1650; // ms to reach 100%
  const HOLD_TIME = 350;        // ms hold at 100% "SYSTEM READY"
  // Total delay = 1650 + 350 = 2000ms (EXACT 2 SECONDS)

  const startTime = performance.now();
  let completed = false;

  function dismissPreloader() {
    if (completed) return;
    completed = true;
    bar.style.width = '100%';
    counter.textContent = '100%';
    if (status) status.textContent = 'SYSTEM READY • WELCOME';

    preloader.classList.add('loaded');
    document.body.classList.add('page-revealed');

    // Trigger hero entrance stagger
    const heroElements = document.querySelectorAll('.hero-kicker-strip, .hero-full-name, .hero-rotator-line, .hero-summary-text, .hero-quick-actions');
    heroElements.forEach((el, idx) => {
      el.style.animation = `heroFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.08}s both`;
    });
  }

  function tick(currentTime) {
    if (completed) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(100, Math.round((elapsed / TOTAL_COUNT_TIME) * 100));

    bar.style.width = `${progress}%`;
    counter.textContent = `${progress}%`;

    // Update telemetry status label
    if (status) {
      const currentStep = telemetrySteps.find(step => progress <= step.threshold) || telemetrySteps[telemetrySteps.length - 1];
      status.textContent = currentStep.label;
    }

    if (elapsed < TOTAL_COUNT_TIME) {
      requestAnimationFrame(tick);
    } else {
      // Reached 100%, hold for exactly HOLD_TIME ms to make total delay 2000ms
      setTimeout(dismissPreloader, HOLD_TIME);
    }
  }

  requestAnimationFrame(tick);

  // Instant skip on click / tap
  preloader.addEventListener('click', dismissPreloader);
}
