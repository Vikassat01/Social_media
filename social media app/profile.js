document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (!userSession || !userSession.isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    // Update profile information
    const username = document.querySelector('.username');
    username.textContent = userSession.username;

    // Edit profile button handler
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    editProfileBtn.addEventListener('click', () => {
        window.location.href = 'settings.html';
    });

    // Back button handler
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    document.body.insertBefore(backBtn, document.body.firstChild);

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
