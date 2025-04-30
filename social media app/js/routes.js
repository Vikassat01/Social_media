export const routes = {
    login: '/login.html',
    signup: '/signup.html',
    forgotPassword: '/forgot-password.html',
    index: '/index.html'
};

export function navigate(route) {
    window.location.href = routes[route];
}

export function checkAuth() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (!userSession || !userSession.isLoggedIn) {
        navigate('login');
        return false;
    }
    return true;
}
