// Contact Page JS – Saboo's Retreat

// Mobile navigation toggle logic is handled globally by auth.js.

// Scroll-up
function scrollWin(x, y) { window.scrollBy(x, y); }

// Scroll reveal
const revealEls = document.querySelectorAll('.fade-up, .fade-in');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        // Close all
        faqItems.forEach(fi => {
            fi.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            fi.querySelector('.faq-answer').classList.remove('open');
        });
        // Open clicked if was closed
        if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            answer.classList.add('open');
        }
    });
});

// ===== FORM VALIDATION =====
const form = document.getElementById('contact-form');
if (form) {
    // Set min date for check-in to today
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin-date');
    const checkoutInput = document.getElementById('checkout-date');
    if (checkinInput) checkinInput.setAttribute('min', today);

    checkinInput && checkinInput.addEventListener('change', () => {
        if (checkoutInput) {
            checkoutInput.setAttribute('min', checkinInput.value);
            if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
                checkoutInput.value = '';
            }
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Helper
        function validate(inputId, errorId, condition, msg) {
            const input = document.getElementById(inputId);
            const err = document.getElementById(errorId);
            if (!condition(input.value)) {
                err.textContent = msg;
                input.classList.add('error-field');
                valid = false;
            } else {
                err.textContent = '';
                input.classList.remove('error-field');
            }
        }

        validate('full-name', 'name-error',
            v => v.trim().length >= 2, 'Please enter your full name (min 2 characters).');

        validate('email-addr', 'email-error',
            v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email address.');

        validate('phone-num', 'phone-error',
            v => /^[+\d\s\-]{7,15}$/.test(v.trim()), 'Please enter a valid phone number.');

        validate('destination', 'dest-error',
            v => v !== '', 'Please select a destination.');

        validate('num-guests', 'guests-error',
            v => parseInt(v) >= 1, 'Please enter the number of guests.');

        validate('checkin-date', 'checkin-error',
            v => v !== '', 'Please select a check-in date.');

        validate('checkout-date', 'checkout-error',
            v => v !== '', 'Please select a check-out date.');

        if (valid) {
            const submitBtn = document.getElementById('send-inquiry-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';

            const fullName = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email-addr').value.trim();
            const phone = document.getElementById('phone-num').value.trim();
            const destination = document.getElementById('destination').value;
            const numGuests = document.getElementById('num-guests').value;
            const checkinDate = document.getElementById('checkin-date').value;
            const checkoutDate = document.getElementById('checkout-date').value;
            const message = document.getElementById('message').value.trim();

            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: fullName,
                    email,
                    phone,
                    destination,
                    num_guests: numGuests,
                    checkin_date: checkinDate,
                    checkout_date: checkoutDate,
                    message
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send inquiry.');
                }
                return response.json();
            })
            .then(data => {
                const successDiv = document.getElementById('form-success');
                successDiv.style.display = 'flex';
                form.reset();
                successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => { successDiv.style.display = 'none'; }, 6000);
            })
            .catch(err => {
                console.error('Inquiry error:', err);
                alert('Connection error. Please try again.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        }
    });
}
