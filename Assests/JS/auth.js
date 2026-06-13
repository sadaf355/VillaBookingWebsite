// =========================================
// Auth Modal (Login + Register)
// Saboo's Retreat – shared across all pages
// =========================================

(function () {
    'use strict';

    // ── 1. Inject modal HTML ──────────────────────────────────────────────────
    const modalHTML = `
<div class="auth-overlay" id="auth-overlay" role="dialog" aria-modal="true" aria-label="Authentication">
    <div class="auth-modal">
        <div class="auth-modal-accent"></div>
        <button class="auth-close" id="auth-close" aria-label="Close">&times;</button>

        <div class="auth-panels" id="auth-panels">

            <!-- ── LOGIN PANEL ── -->
            <div class="auth-panel auth-panel--login" id="panel-login">
                <div class="auth-panel-header">
                    <h2 class="auth-heading">Welcome Back</h2>
                    <p class="auth-subheading">Sign in to manage your bookings &amp; preferences.</p>
                </div>

                <div class="auth-success" id="login-success">
                    <i class="fas fa-check-circle"></i>
                    <span>Logged in successfully!</span>
                </div>

                <form id="login-form" novalidate>
                    <div class="auth-form-group">
                        <label for="login-email">Email Address</label>
                        <div class="auth-input-wrap">
                            <input type="email" id="login-email" class="auth-input"
                                placeholder="you@email.com" autocomplete="email" required>
                            <i class="fas fa-envelope"></i>
                        </div>
                        <span class="auth-error-msg" id="login-email-err"></span>
                    </div>

                    <div class="auth-form-group">
                        <label for="login-password">Password</label>
                        <div class="auth-input-wrap">
                            <input type="password" id="login-password" class="auth-input"
                                placeholder="••••••••" autocomplete="current-password" required>
                            <i class="fas fa-lock"></i>
                            <button type="button" class="auth-pw-toggle" data-target="login-password" aria-label="Show/hide password">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                        <span class="auth-error-msg" id="login-password-err"></span>
                    </div>

                    <div class="auth-options">
                        <label class="auth-remember">
                            <input type="checkbox" id="login-remember"> Remember me
                        </label>
                        <a href="#" class="auth-forgot" id="forgot-link">Forgot password?</a>
                    </div>

                    <button type="submit" class="auth-submit-btn" id="login-submit-btn">
                        <i class="fas fa-sign-in-alt"></i> Sign In
                    </button>
                </form>

                <div class="auth-divider">or continue with</div>
                <div class="auth-social">
                    <button class="auth-social-btn" type="button">
                        <i class="fab fa-google"></i> Google
                    </button>
                    <button class="auth-social-btn" type="button">
                        <i class="fab fa-facebook-f"></i> Facebook
                    </button>
                </div>

                <p class="auth-switch">
                    Don't have an account?
                    <a href="#" id="goto-register">Create one</a>
                </p>
            </div>
            <!-- ── END LOGIN PANEL ── -->

            <!-- ── REGISTER PANEL ── -->
            <div class="auth-panel auth-panel--register" id="panel-register">
                <div class="auth-panel-header">
                    <h2 class="auth-heading">Create Account</h2>
                    <p class="auth-subheading">Join us and start booking your dream villa.</p>
                </div>

                <div class="auth-success" id="reg-success">
                    <i class="fas fa-check-circle"></i>
                    <span>Account created! Welcome aboard.</span>
                </div>

                <form id="register-form" novalidate>
                    <div class="auth-form-row">
                        <div class="auth-form-group">
                            <label for="reg-fname">First Name</label>
                            <div class="auth-input-wrap">
                                <input type="text" id="reg-fname" class="auth-input"
                                    placeholder="First name" autocomplete="given-name" required>
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="auth-error-msg" id="reg-fname-err"></span>
                        </div>
                        <div class="auth-form-group">
                            <label for="reg-lname">Last Name</label>
                            <div class="auth-input-wrap">
                                <input type="text" id="reg-lname" class="auth-input"
                                    placeholder="Last name" autocomplete="family-name" required>
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="auth-error-msg" id="reg-lname-err"></span>
                        </div>
                    </div>

                    <div class="auth-form-group">
                        <label for="reg-email">Email Address</label>
                        <div class="auth-input-wrap">
                            <input type="email" id="reg-email" class="auth-input"
                                placeholder="you@email.com" autocomplete="email" required>
                            <i class="fas fa-envelope"></i>
                        </div>
                        <span class="auth-error-msg" id="reg-email-err"></span>
                    </div>

                    <div class="auth-form-group">
                        <label for="reg-phone">Phone Number</label>
                        <div class="auth-input-wrap">
                            <input type="tel" id="reg-phone" class="auth-input"
                                placeholder="+91 XXXXX XXXXX" autocomplete="tel" required>
                            <i class="fas fa-phone"></i>
                        </div>
                        <span class="auth-error-msg" id="reg-phone-err"></span>
                    </div>

                    <div class="auth-form-group">
                        <label for="reg-password">Password</label>
                        <div class="auth-input-wrap">
                            <input type="password" id="reg-password" class="auth-input"
                                placeholder="Min 8 characters" autocomplete="new-password" required>
                            <i class="fas fa-lock"></i>
                            <button type="button" class="auth-pw-toggle" data-target="reg-password" aria-label="Show/hide password">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                        <div class="pw-strength" aria-hidden="true">
                            <div class="pw-strength-bar" id="pw-strength-bar"></div>
                        </div>
                        <span class="auth-error-msg" id="reg-password-err"></span>
                    </div>

                    <div class="auth-form-group">
                        <label for="reg-confirm">Confirm Password</label>
                        <div class="auth-input-wrap">
                            <input type="password" id="reg-confirm" class="auth-input"
                                placeholder="Re-enter password" autocomplete="new-password" required>
                            <i class="fas fa-lock"></i>
                            <button type="button" class="auth-pw-toggle" data-target="reg-confirm" aria-label="Show/hide password">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                        <span class="auth-error-msg" id="reg-confirm-err"></span>
                    </div>

                    <p class="auth-terms">
                        By registering you agree to our
                        <a href="#">Terms of Service</a> &amp;
                        <a href="#">Privacy Policy</a>.
                    </p>

                    <button type="submit" class="auth-submit-btn" id="reg-submit-btn">
                        <i class="fas fa-user-plus"></i> Create Account
                    </button>
                </form>

                <div class="auth-divider">or sign up with</div>
                <div class="auth-social">
                    <button class="auth-social-btn" type="button">
                        <i class="fab fa-google"></i> Google
                    </button>
                    <button class="auth-social-btn" type="button">
                        <i class="fab fa-facebook-f"></i> Facebook
                    </button>
                </div>

                <p class="auth-switch">
                    Already have an account?
                    <a href="#" id="goto-login">Sign in</a>
                </p>
            </div>
            <!-- ── END REGISTER PANEL ── -->

        </div><!-- /auth-panels -->
    </div><!-- /auth-modal -->
</div><!-- /auth-overlay -->
`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // ── 2. Element references ─────────────────────────────────────────────────
    const overlay      = document.getElementById('auth-overlay');
    const closeBtn     = document.getElementById('auth-close');
    const panelLogin   = document.getElementById('panel-login');
    const panelReg     = document.getElementById('panel-register');
    const panels       = document.getElementById('auth-panels');
    const loginForm    = document.getElementById('login-form');
    const regForm      = document.getElementById('register-form');
    const gotoRegister = document.getElementById('goto-register');
    const gotoLogin    = document.getElementById('goto-login');
    const loginSuccess = document.getElementById('login-success');
    const regSuccess   = document.getElementById('reg-success');
    const pwBar        = document.getElementById('pw-strength-bar');
    const regPw        = document.getElementById('reg-password');

    // ── 3. Open / Close ───────────────────────────────────────────────────────
    function openModal(panel) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (panel === 'register') showRegister(false);
        else showLogin(false);
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        // reset after animation
        setTimeout(() => {
            loginForm.reset();
            regForm.reset();
            clearAllErrors();
            loginSuccess.style.display = 'none';
            regSuccess.style.display = 'none';
            panels.style.minHeight = '';
            // Reset to login panel
            showLogin(false);
            if (pwBar) { pwBar.style.width = '0'; pwBar.style.background = '#eee'; }
        }, 350);
    }

    // ── 4. Panel switching ────────────────────────────────────────────────────
    function showLogin(animate) {
        panelLogin.classList.remove('slide-out');
        panelReg.classList.remove('slide-in');
        panelReg.style.position = '';
        if (animate) {
            // smoothly update the panel height
            const loginH = panelLogin.scrollHeight;
            panels.style.minHeight = loginH + 'px';
            setTimeout(() => {
                if (!panelLogin.classList.contains('slide-out')) {
                    panels.style.minHeight = '';
                }
            }, 400);
        } else {
            panels.style.minHeight = '';
        }
    }

    function showRegister(animate) {
        panelLogin.classList.add('slide-out');
        panelReg.classList.add('slide-in');
        panelReg.style.position = '';
        if (animate) {
            const regH = panelReg.scrollHeight;
            panels.style.minHeight = regH + 'px';
            setTimeout(() => {
                if (panelReg.classList.contains('slide-in')) {
                    panels.style.minHeight = '';
                }
            }, 400);
        } else {
            panels.style.minHeight = '';
        }
    }

    gotoRegister.addEventListener('click', (e) => {
        e.preventDefault();
        clearAllErrors();
        showRegister(true);
    });

    gotoLogin.addEventListener('click', (e) => {
        e.preventDefault();
        clearAllErrors();
        showLogin(true);
    });

    // ── 5. Wire all user-icon buttons on this page ────────────────────────────
    function wireLoginButtons() {
        // #login-btn is the primary id used on all pages
        const loginBtns = document.querySelectorAll('#login-btn');
        loginBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal('login');
            });
        });
    }
    wireLoginButtons();

    // ── 6. Close actions ──────────────────────────────────────────────────────
    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });

    // ── 7. Password visibility toggles ───────────────────────────────────────
    document.querySelectorAll('.auth-pw-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon  = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // ── 8. Password strength meter ────────────────────────────────────────────
    if (regPw && pwBar) {
        regPw.addEventListener('input', () => {
            const val = regPw.value;
            let score = 0;
            if (val.length >= 8)  score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            const widths = ['0%', '25%', '50%', '75%', '100%'];
            const colors = ['#eee', '#e74c3c', '#f39c12', '#2ecc71', '#1bcbe2'];
            pwBar.style.width  = widths[score];
            pwBar.style.background = colors[score];
        });
    }

    // ── 9. Validation helpers ─────────────────────────────────────────────────
    function setError(inputId, errId, msg) {
        const inp = document.getElementById(inputId);
        const err = document.getElementById(errId);
        if (!inp || !err) return;
        inp.classList.add('error');
        err.textContent = msg;
    }

    function clearError(inputId, errId) {
        const inp = document.getElementById(inputId);
        const err = document.getElementById(errId);
        if (!inp || !err) return;
        inp.classList.remove('error');
        err.textContent = '';
    }

    function clearAllErrors() {
        const pairs = [
            ['login-email', 'login-email-err'],
            ['login-password', 'login-password-err'],
            ['reg-fname', 'reg-fname-err'],
            ['reg-lname', 'reg-lname-err'],
            ['reg-email', 'reg-email-err'],
            ['reg-phone', 'reg-phone-err'],
            ['reg-password', 'reg-password-err'],
            ['reg-confirm', 'reg-confirm-err'],
        ];
        pairs.forEach(([i, e]) => clearError(i, e));
    }

    function isEmail(v)  { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function isPhone(v)  { return /^[+\d\s\-]{7,15}$/.test(v.trim()); }

    // ── 10. Login form submission ─────────────────────────────────────────────
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAllErrors();
        let valid = true;

        const email = document.getElementById('login-email').value.trim();
        const pw    = document.getElementById('login-password').value;

        if (!isEmail(email)) {
            setError('login-email', 'login-email-err', 'Please enter a valid email address.');
            valid = false;
        }
        if (pw.length < 6) {
            setError('login-password', 'login-password-err', 'Password must be at least 6 characters.');
            valid = false;
        }

        if (valid) {
            const btn = document.getElementById('login-submit-btn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in…';

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password: pw })
                });

                const data = await response.json();

                if (!response.ok) {
                    setError('login-email', 'login-email-err', data.error || 'Invalid credentials.');
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                    return;
                }

                // Successful login
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                loginSuccess.style.display = 'flex';
                loginForm.reset();
                
                // Update UI in header
                window.updateHeaderAuthUI();

                setTimeout(() => {
                    loginSuccess.style.display = 'none';
                    closeModal();
                }, 2000);
            } catch (err) {
                console.error('Login error:', err);
                setError('login-email', 'login-email-err', 'Connection error. Please try again.');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
            }
        }
    });

    // ── 11. Register form submission ──────────────────────────────────────────
    regForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAllErrors();
        let valid = true;

        const fname   = document.getElementById('reg-fname').value.trim();
        const lname   = document.getElementById('reg-lname').value.trim();
        const email   = document.getElementById('reg-email').value.trim();
        const phone   = document.getElementById('reg-phone').value.trim();
        const pw      = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;

        if (fname.length < 2) {
            setError('reg-fname', 'reg-fname-err', 'Enter your first name (min 2 chars).');
            valid = false;
        }
        if (lname.length < 2) {
            setError('reg-lname', 'reg-lname-err', 'Enter your last name (min 2 chars).');
            valid = false;
        }
        if (!isEmail(email)) {
            setError('reg-email', 'reg-email-err', 'Please enter a valid email address.');
            valid = false;
        }
        if (!isPhone(phone)) {
            setError('reg-phone', 'reg-phone-err', 'Please enter a valid phone number.');
            valid = false;
        }
        if (pw.length < 8) {
            setError('reg-password', 'reg-password-err', 'Password must be at least 8 characters.');
            valid = false;
        }
        if (pw !== confirm) {
            setError('reg-confirm', 'reg-confirm-err', 'Passwords do not match.');
            valid = false;
        }

        if (valid) {
            const btn = document.getElementById('reg-submit-btn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account…';

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        first_name: fname,
                        last_name: lname,
                        email,
                        phone,
                        password: pw
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    setError('reg-email', 'reg-email-err', data.error || 'Registration failed.');
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
                    return;
                }

                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
                regSuccess.style.display = 'flex';
                regForm.reset();
                if (pwBar) { pwBar.style.width = '0'; }
                
                setTimeout(() => {
                    regSuccess.style.display = 'none';
                    // Switch to login tab in the modal automatically
                    showLogin(true);
                }, 2000);
            } catch (err) {
                console.error('Registration error:', err);
                setError('reg-email', 'reg-email-err', 'Connection error. Please try again.');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
            }
        }
    });

    // ── 12. Forgot password (placeholder) ────────────────────────────────────
    document.getElementById('forgot-link').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password reset link will be sent to your registered email address.');
    });

    // ── 13. Expose Auth functions globally ────────────────────────────────────
    window.isLoggedIn = function () {
        return !!localStorage.getItem('token');
    };

    window.getAuthToken = function () {
        return localStorage.getItem('token');
    };

    window.getCurrentUser = function () {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    };

    window.openLoginModal = function () {
        openModal('login');
    };

    window.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    window.updateHeaderAuthUI = function () {
        const user = window.getCurrentUser();
        const rightContainers = document.querySelectorAll('header .right, section.home header .right');
        
        rightContainers.forEach(container => {
            if (window.isLoggedIn() && user) {
                // User is logged in: show name and log out dropdown
                container.innerHTML = `
                    <i class="fas fa-bars hamburger" id="menu-btn"></i>
                    <div class="user-profile-menu">
                        <button class="profile-display-btn" id="profile-display-btn">
                            <i class="fas fa-user-circle"></i> <span>Hi, ${user.first_name}</span> <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="profile-dropdown" id="profile-dropdown">
                            <a href="#" id="logout-menu-item"><i class="fas fa-sign-out-alt"></i> Logout</a>
                        </div>
                    </div>
                `;
                
                // Wire logout event listener
                const logoutItem = container.querySelector('#logout-menu-item');
                if (logoutItem) {
                    logoutItem.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.logout();
                    });
                }
                
                // Wire dropdown toggle
                const profileBtn = container.querySelector('#profile-display-btn');
                const dropdown = container.querySelector('#profile-dropdown');
                if (profileBtn && dropdown) {
                    profileBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                    });
                }
            } else {
                // User is NOT logged in: show original login button
                container.innerHTML = `
                    <i class="fas fa-bars hamburger" id="menu-btn"></i>
                    <i class="fas fa-user" id="login-btn"></i>
                `;
                // Re-wire click events to open login modal
                const loginBtn = container.querySelector('#login-btn');
                if (loginBtn) {
                    loginBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openModal('login');
                    });
                }
            }
            
            // Re-wire mobile menu btn just in case we replaced the container content
            const menuBtn = container.querySelector('#menu-btn');
            const mobileNav = document.getElementById('mobile-nav');
            if (menuBtn && mobileNav) {
                menuBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    mobileNav.classList.toggle('open');
                });
            }
        });
    };

    // Close dropdown click outside
    document.addEventListener('click', () => {
        const dropdowns = document.querySelectorAll('.profile-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // Run header init
    window.updateHeaderAuthUI();

})();
