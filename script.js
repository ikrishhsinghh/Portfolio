/**
 * KRISHNA KAMLESH SINGH — INTERACTIVE BENTO STUDIO
 * Client-Side JavaScript Logic
 * Zero-Config GitHub Pages Ready
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initViewSwitcher();
  initProjectFilters();
  initCareerFilters();
  initTypewriter();
  initCopyTriggers();
  initMobileDrawer();
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
   2. BENTO VIEW SWITCHER TABS
   -------------------------------------------------------------------------- */
function initViewSwitcher() {
  const viewPanels = document.querySelectorAll('.view-panel');
  const viewTabs = document.querySelectorAll('.view-tab');
  const mobileTabBtns = document.querySelectorAll('.mobile-tab-btn');
  const dockBtns = document.querySelectorAll('.dock-btn[data-view]');
  const footerTabLinks = document.querySelectorAll('.footer-tab-link');
  const switchLinks = document.querySelectorAll('[data-switch]');

  function switchView(targetViewId) {
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

    // Update active state on dock buttons
    dockBtns.forEach(btn => {
      if (btn.getAttribute('data-view') === targetViewId) {
        btn.style.color = '#FFFFFF';
        btn.style.background = 'var(--grad-primary)';
      } else {
        btn.style.color = '';
        btn.style.background = '';
      }
    });

    // Scroll smoothly to top of main or hero if switching view
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

  // Floating dock click
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

  // Internal tile switch triggers (e.g. "View All Skills →")
  switchLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-switch');
      switchView(target);
    });
  });
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
      typingSpeed = 40;
    } else {
      rotatorElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   6. ONE-TAP COPY WITH TOAST NOTIFICATION
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
          // Fallback for older browser contexts
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

  if (!trigger || !drawer) return;

  trigger.addEventListener('click', () => {
    mobileDrawerOpen = !mobileDrawerOpen;
    if (mobileDrawerOpen) {
      openMobileDrawer();
    } else {
      closeMobileDrawer();
    }
  });

  // Close when clicking directly on overlay backdrop
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
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
