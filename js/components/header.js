function updateHeader() {
    const header = document.getElementById('main-header');
    
    if (AppState.isAuthenticated) {
        header.innerHTML = `
            <nav class="nav-menu">
                <div class="nav-brand">
                    <h1>HealthLock</h1>
                </div>
                <div class="nav-items">
                    <span>Welcome, ${AppState.currentUser.email}</span>
                    <button class="btn" id="logout-btn">Logout</button>
                </div>
            </nav>
        `;
        
        document.getElementById('logout-btn').addEventListener('click', () => {
            auth.logout();
        });
    } else {
        header.innerHTML = `
            <nav class="nav-menu">
                <div class="nav-brand">
                    <h1>HealthLock</h1>
                </div>
            </nav>
        `;
    }
}

// Update header whenever authentication state changes
document.addEventListener('DOMContentLoaded', updateHeader);

// Create a custom event for auth state changes
const authStateChanged = new CustomEvent('authStateChanged');

// Listen for auth state changes
document.addEventListener('authStateChanged', updateHeader);
