// About Page JS – Saboo's Retreat

// Scroll-up button
function scrollWin(x, y) {
    window.scrollBy(x, y);
}

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

// Scroll reveal animation
const revealEls = document.querySelectorAll('.fade-up, .fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Counter animation
const counters = document.querySelectorAll('.counter-num');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = target === 49 ? '.0' : '+';
                const increment = target / 80;
                let current = 0;
                const update = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target === 49 ? '4.9' : target + '+';
                    }
                };
                update();
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats-section');
if (statsSection) counterObserver.observe(statsSection);
