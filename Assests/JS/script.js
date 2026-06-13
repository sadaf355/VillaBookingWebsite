// Index Page JS – Saboo's Retreat

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && e.target !== menuBtn) {
            mobileNav.classList.remove('open');
        }
    });
}
