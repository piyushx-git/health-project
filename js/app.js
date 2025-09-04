// Global state management
const AppState = {
    currentUser: null,
    isAuthenticated: false,
    userType: null, // 'patient' or 'doctor'
};

// Router functionality
const Router = {
    routes: {
        '/': showLoginPage,
        '/register': showRegisterPage,
        '/doctor-login': showDoctorLoginPage,
        '/patient-dashboard': showPatientDashboard,
        '/doctor-dashboard': showDoctorDashboard
    },

    navigate(path) {
        const handler = this.routes[path];
        if (handler) {
            handler();
            window.history.pushState({}, '', path);
        }
    }
};

// Page handlers
function showLoginPage() {
    hideAllContainers();
    document.getElementById('auth-container').style.display = 'block';
    renderLoginForm();
}

function showRegisterPage() {
    hideAllContainers();
    document.getElementById('auth-container').style.display = 'block';
    renderRegisterForm();
}

function showDoctorLoginPage() {
    hideAllContainers();
    document.getElementById('auth-container').style.display = 'block';
    renderDoctorLoginForm();
}

function showPatientDashboard() {
    if (!AppState.isAuthenticated || AppState.userType !== 'patient') {
        Router.navigate('/');
        return;
    }
    hideAllContainers();
    document.getElementById('dashboard-container').style.display = 'block';
    renderPatientDashboard();
}

function showDoctorDashboard() {
    if (!AppState.isAuthenticated || AppState.userType !== 'doctor') {
        Router.navigate('/doctor-login');
        return;
    }
    hideAllContainers();
    document.getElementById('doctor-container').style.display = 'block';
    renderDoctorDashboard();
}

// Utility functions
function hideAllContainers() {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => container.style.display = 'none');
}

// Event listeners
window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    const handler = Router.routes[path];
    if (handler) handler();
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        // Validate token and set up user session
        auth.validateToken(token)
            .then(user => {
                AppState.currentUser = user;
                AppState.isAuthenticated = true;
                AppState.userType = user.type;
                document.dispatchEvent(new Event('authStateChanged'));
                if (user.type === 'patient') {
                    Router.navigate('/patient-dashboard');
                } else {
                    Router.navigate('/doctor-dashboard');
                }
            })
            .catch(() => {
                localStorage.removeItem('token');
                Router.navigate('/');
            });
    } else {
        Router.navigate('/');
        // Fallback: if for any reason routing didn't render, force-render login
        const authContainer = document.getElementById('auth-container');
        if (authContainer && !authContainer.innerHTML.trim()) {
            authContainer.style.display = 'block';
            renderLoginForm();
        }
    }
});
