import AuthService from './api/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const inputs = form.querySelectorAll('input');
    const signupBtn = form.querySelector('.login-btn');

    // Password toggle
    const togglePassword = document.querySelector('.toggle-password');
    togglePassword?.addEventListener('click', () => {
        const passwordInput = document.getElementById('password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.querySelector('i').classList.toggle('fa-eye');
        togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) isValid = false;
        });
        signupBtn.disabled = !isValid;
        return isValid;
    }

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            signupBtn.disabled = true;

            const response = await AuthService.signup(
                form.email.value,
                form.fullname.value,
                form.username.value,
                form.password.value
            );

            if (response.success) {
                signupBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            }
        } catch (error) {
            signupBtn.innerHTML = 'Sign Up';
            signupBtn.disabled = false;
            showError(error.message);
        }
    });

    // Input validation
    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });
});

function showError(message) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    document.querySelector('.login-btn').parentElement.appendChild(errorMsg);
    setTimeout(() => errorMsg.remove(), 3000);
}
