// Gallery Page JS – Saboo's Retreat

// Scroll-up
function scrollWin(x, y) { window.scrollBy(x, y); }

// Mobile navigation toggle logic is handled globally by auth.js.

// Scroll reveal
const revealEls = document.querySelectorAll('.fade-up');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hide');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                }, 30);
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// ===== CENTERED IMAGE POPUP =====
const popup = document.getElementById('img-popup');
const popupBg = document.getElementById('img-popup-bg');
const popupImg = document.getElementById('img-popup-img');
const popupCaption = document.getElementById('img-popup-caption');
const popupClose = document.getElementById('img-popup-close');

function openPopup(imgSrc, imgAlt, caption) {
    popupImg.src = imgSrc;
    popupImg.alt = imgAlt;
    popupCaption.textContent = caption;
    popupBg.classList.add('open');
    // Use requestAnimationFrame so the display:flex kicks in before we add 'open' (which triggers the scale transition)
    requestAnimationFrame(() => {
        popup.style.display = 'flex';
        requestAnimationFrame(() => popup.classList.add('open'));
    });
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    popup.classList.remove('open');
    popupBg.classList.remove('open');
    setTimeout(() => { popup.style.display = 'none'; }, 300);
    document.body.style.overflow = '';
}

galleryCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const tag = card.querySelector('.gallery-tag');
        const desc = card.querySelector('.gallery-card-overlay p');
        const caption = (tag ? tag.textContent.trim() + ' — ' : '') + (desc ? desc.textContent : '');
        openPopup(img.src, img.alt, caption);
    });
});

popupClose.addEventListener('click', closePopup);
popupBg.addEventListener('click', closePopup);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
});

// ===== VIDEO MODAL =====
const videoModal = document.getElementById('video-modal');
const videoBg = document.getElementById('video-bg');
const modalVideo = document.getElementById('modal-video');
const videoModalClose = document.getElementById('video-modal-close');

document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const videoSrc = btn.getAttribute('data-video');
        modalVideo.src = videoSrc;
        videoModal.classList.add('open');
        videoBg.classList.add('open');
        modalVideo.play();
        document.body.style.overflow = 'hidden';
    });
});

function closeVideoModal() {
    videoModal.classList.remove('open');
    videoBg.classList.remove('open');
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = '';
}

if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
if (videoBg) videoBg.addEventListener('click', closeVideoModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('open')) closeVideoModal();
});
