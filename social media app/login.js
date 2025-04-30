import AuthService from './api/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = loginForm.querySelector('.login-btn');

    // Password toggle functionality
    const togglePassword = document.querySelector('.toggle-password');
    togglePassword?.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.querySelector('i').classList.toggle('fa-eye');
        togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Simple form validation
    function validateForm() {
        const isValid = usernameInput.value.trim() !== '';
        loginBtn.disabled = !isValid;
        return isValid;
    }

    // Form submission handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            loginBtn.disabled = true;

            // Store user session
            const user = {
                username: usernameInput.value,
                isLoggedIn: true,
                timestamp: new Date().getTime(),
                returnUrl: sessionStorage.getItem('returnUrl') || 'index.html'
            };
            localStorage.setItem('userSession', JSON.stringify(user));
            
            // Show success and redirect
            loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            window.location.href = user.returnUrl;
            sessionStorage.removeItem('returnUrl');
        } catch (error) {
            showError('Login failed. Please try again.');
        }
    });

    // Input validation
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    // Error message handler
    function showError(message) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        loginBtn.parentElement.appendChild(errorMsg);
        setTimeout(() => errorMsg.remove(), 3000);
    }

    // Initial validation
    validateForm();
});

// Password toggle functionality
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Form validation
const emailInput = document.getElementById('email');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Email validation
    if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailInput.parentElement.classList.add('error');
        isValid = false;
    } else {
        emailInput.parentElement.classList.remove('error');
    }

    // Password validation
    if (passwordInput.value.length < 6) {
        passwordInput.parentElement.classList.add('error');
        isValid = false;
    } else {
        passwordInput.parentElement.classList.remove('error');
    }

    if (isValid) {
        // Add loading state
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        loginBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
});

// Input animations
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Add loading state for image
const sideImage = document.querySelector('.side-image');
sideImage.classList.add('loading');

sideImage.addEventListener('load', () => {
    sideImage.classList.remove('loading');
});

// Smooth form interactions
document.querySelectorAll('.input-group input').forEach(input => {
    // Add focused class if input has value
    if (input.value) {
        input.parentElement.classList.add('focused');
    }

    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // Add validation feedback
    input.addEventListener('input', () => {
        if (input.value) {
            input.parentElement.classList.remove('error');
        }
    });
});

// Enhanced form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Validate email
    if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailInput.parentElement.classList.add('error');
        isValid = false;
        emailInput.focus();
    }

    // Validate password
    if (passwordInput.value.length < 6) {
        passwordInput.parentElement.classList.add('error');
        isValid = false;
        if (!emailInput.parentElement.classList.contains('error')) {
            passwordInput.focus();
        }
    }

    if (isValid) {
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        loginBtn.disabled = true;
        loginBtn.classList.add('loading');

        // Simulate API call with smooth transition
        setTimeout(() => {
            loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        }, 1500);
    }
});

// Add password strength indicator
passwordInput.addEventListener('input', function() {
    const strength = this.value.length;
    const strengthBar = document.createElement('div');
    strengthBar.className = 'strength-bar';
    
    if (strength > 0) {
        let strengthClass = 'weak';
        if (strength > 8) strengthClass = 'strong';
        else if (strength > 6) strengthClass = 'medium';
        
        strengthBar.classList.add(strengthClass);
    }
});

// Add parallax effect to welcome text
document.addEventListener('mousemove', (e) => {
    const welcomeText = document.querySelector('.welcome-text');
    const speed = 5;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    
    welcomeText.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// Smooth form appearance
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    form.style.opacity = '0';
    form.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        form.style.transition = 'all 0.8s ease';
        form.style.opacity = '1';
        form.style.transform = 'translateX(0)';
    }, 100);
});

// Add input focus effects
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', () => {
        const icon = input.parentElement.querySelector('.input-icon');
        icon.style.transform = 'scale(1.2)';
        icon.style.color = '#0072ff';
    });

    input.addEventListener('blur', () => {
        const icon = input.parentElement.querySelector('.input-icon');
        icon.style.transform = 'scale(1)';
        icon.style.color = input.value ? '#0072ff' : '#8e8e8e';
    });
});

// Enhanced login button effect
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.02)';
});

loginBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

// Add image loading optimization
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, index) => {
        if (index === 0) {
            // Preload first image
            const img = new Image();
            img.src = slide.src;
            img.onload = () => {
                slide.classList.add('loaded');
            };
        }
    });
});

// Improve image loading
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let loadedImages = 0;

    function handleImageLoad() {
        loadedImages++;
        if (loadedImages === slides.length) {
            document.querySelector('.image-slider').classList.add('all-loaded');
        }
    }

    slides.forEach((slide, index) => {
        const img = new Image();
        img.src = slide.src;
        
        img.onload = handleImageLoad;
        img.onerror = () => {
            // Try loading from Unsplash if Picsum fails
            slide.src = `https://source.unsplash.com/800x1200/?technology,${index}`;
            handleImageLoad();
        };
    });
});

// Add mobile-specific optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Handle mobile viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // Improve input focus on mobile
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            // Scroll form into view when keyboard appears
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });

    // Add touch feedback
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.98)';
        });

        button.addEventListener('touchend', () => {
            button.style.transform = 'scale(1)';
        });
    });
});

// Handle mobile orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.style.height = window.innerHeight + 'px';
    }, 200);
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const loginBtn = form.querySelector('.login-btn');
    const inputs = form.querySelectorAll('input');

    // Enable/disable login button based on form validity
    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
        });
        loginBtn.disabled = !isValid;
    }

    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        loginBtn.disabled = true;

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
});

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const loginBtn = form.querySelector('.login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Single form validation function
    function validateForm() {
        const isUsernameValid = usernameInput.value.trim().length > 0;
        const isPasswordValid = passwordInput.value.length >= 6;
        const isValid = isUsernameValid && isPasswordValid;

        loginBtn.disabled = !isValid;
        loginBtn.classList.toggle('active', isValid);

        // Show/hide error messages
        usernameInput.parentElement.classList.toggle('error', !isUsernameValid);
        passwordInput.parentElement.classList.toggle('error', !isPasswordValid);

        return isValid;
    }

    // Input event listeners
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('blur', validateForm);
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        loginBtn.disabled = true;

        // Simulate login
        setTimeout(() => {
            const user = {
                username: usernameInput.value,
                isLoggedIn: true,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('userSession', JSON.stringify(user));
            window.location.href = 'index.html';
        }, 1500);
    });

    // Clean up any existing error states
    validateForm();
});

// Handle successful login
function handleSuccessfulLogin() {
    const user = {
        username: document.getElementById('username').value,
        isLoggedIn: true,
        timestamp: new Date().getTime()
    };
    localStorage.setItem('userSession', JSON.stringify(user));
    window.location.href = 'index.html';
}

// Update form submission handler
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
        window.location.href = 'index.html';
        return;
    }

    const form = document.getElementById('loginForm');
    const loginBtn = form.querySelector('.login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    function validateForm() {
        const isValid = usernameInput.value.trim().length > 0 && 
                       passwordInput.value.trim().length >= 6;
        loginBtn.disabled = !isValid;
        loginBtn.classList.toggle('active', isValid);
        return isValid;
    }

    // Input event listeners
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            validateForm();
            input.parentElement.classList.remove('error');
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            loginBtn.disabled = true;

            // Call login API
            const response = await AuthService.login(usernameInput.value, passwordInput.value);
            
            if (response.success) {
                // Store user session
                const user = {
                    username: usernameInput.value,
                    token: response.token,
                    isLoggedIn: true,
                    timestamp: new Date().getTime()
                };
                localStorage.setItem('userSession', JSON.stringify(user));
                
                // Show success and redirect
                loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                setTimeout(() => window.location.href = 'index.html', 500);
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error) {
            // Show error message
            loginBtn.innerHTML = 'Log In';
            loginBtn.disabled = false;
            
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = error.message;
            loginBtn.parentElement.appendChild(errorMsg);
            
            setTimeout(() => errorMsg.remove(), 3000);
        }
    });

    // Initial validation
    validateForm();
});

// Simplify login handling and fix redirection
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = loginForm.querySelector('.login-btn');
    const usernameInput = document.getElementById('username');

    // Simple validation
    function validateForm() {
        const isValid = usernameInput.value.trim() !== '';
        loginBtn.disabled = !isValid;
        return isValid;
    }

    // Handle login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            loginBtn.disabled = true;

            // Store user session
            const user = {
                username: usernameInput.value,
                isLoggedIn: true,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('userSession', JSON.stringify(user));

            // Success animation and redirect
            loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            window.location.href = 'index.html'; // Direct redirect
        } catch (error) {
            loginBtn.innerHTML = 'Log In';
            loginBtn.disabled = false;
            showError('Login failed. Please try again.');
        }
    });

    // Input listener for validation
    usernameInput.addEventListener('input', validateForm);

    // Remove other event listeners and duplicate code...
});

document.addEventListener('DOMContentLoaded', () => {
    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.querySelector('i').classList.toggle('fa-eye');
        togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Form handling
    const form = document.getElementById('loginForm');
    const loginBtn = form.querySelector('.login-btn');
    const usernameInput = document.getElementById('username');

    function validateForm() {
        const isValid = usernameInput.value.trim() !== '';
        loginBtn.disabled = !isValid;
        return isValid;
    }

    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            loginBtn.disabled = true;

            // Store user session
            const user = {
                username: usernameInput.value,
                isLoggedIn: true,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('userSession', JSON.stringify(user));
            
            loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            setTimeout(() => {
                window.location.replace('index.html');
            }, 500);
        } catch (error) {
            showError('Login failed. Please try again.');
        }
    });

    // Error handling
    function showError(message) {
        loginBtn.innerHTML = 'Log In';
        loginBtn.disabled = false;
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        loginBtn.parentElement.appendChild(errorMsg);
        
        setTimeout(() => errorMsg.remove(), 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = loginForm.querySelector('.login-btn');

    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Username validation
        if (!usernameInput.value.trim()) {
            usernameInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            usernameInput.parentElement.classList.remove('error');
        }

        // Optional password validation
        if (passwordInput.value.trim() && passwordInput.value.length < 6) {
            passwordInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            passwordInput.parentElement.classList.remove('error');
        }

        loginBtn.disabled = !isValid;
        return isValid;
    }

    // Form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            loginBtn.disabled = true;

            // Store user session
            const user = {
                username: usernameInput.value,
                isLoggedIn: true,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('userSession', JSON.stringify(user));
            
            // Show success and redirect
            loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            window.location.href = 'index.html';
        } catch (error) {
            loginBtn.innerHTML = 'Log In';
            loginBtn.disabled = false;
            showError('Login failed. Please try again.');
        }
    });

    // Input validation
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    // Initial validation
    validateForm();
});
