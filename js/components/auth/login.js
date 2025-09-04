function renderLoginForm() {
    const authContainer = document.getElementById('auth-container');
    authContainer.innerHTML = `
        <div class="form-container">
            <h2 class="text-center mb-2">Login</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn">Login</button>
                </div>
            </form>
            <div class="text-center mt-2">
                <p>Don't have an account? <a href="#" id="register-link">Register here</a></p>
                <p>Are you a doctor? <a href="#" id="doctor-login-link">Login here</a></p>
            </div>
        </div>
    `;

    // Add event listeners
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const user = await auth.login(email, password);
            if (user.type === 'patient') {
                Router.navigate('/patient-dashboard');
            } else {
                Router.navigate('/doctor-dashboard');
            }
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    });

    document.getElementById('register-link').addEventListener('click', (e) => {
        e.preventDefault();
        Router.navigate('/register');
    });

    document.getElementById('doctor-login-link').addEventListener('click', (e) => {
        e.preventDefault();
        Router.navigate('/doctor-login');
    });
}
