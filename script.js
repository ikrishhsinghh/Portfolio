document.addEventListener('DOMContentLoaded', function() {
    // --- THEME SWITCHER ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const applyTheme = (theme) => { htmlEl.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); };
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const currentTheme = savedTheme || (prefersLight ? 'light' : 'dark');
    applyTheme(currentTheme);
    themeToggle.addEventListener('click', () => { const isLight = htmlEl.getAttribute('data-theme') === 'light'; applyTheme(isLight ? 'dark' : 'light'); });

    // --- SCROLL ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } }); }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    
    // --- MOBILE NAVIGATION ---
    const navToggle = document.getElementById('nav-toggle');
    const closeNav = document.getElementById('close-nav');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    function openMobileNav() { mobileNav.classList.add('active'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeMobileNav() { mobileNav.classList.remove('active'); overlay.classList.remove('active'); document.body.style.overflow = ''; }
    navToggle.addEventListener('click', openMobileNav);
    closeNav.addEventListener('click', closeMobileNav);
    overlay.addEventListener('click', closeMobileNav);
    mobileNavLinks.forEach(link => { link.addEventListener('click', closeMobileNav); });
});