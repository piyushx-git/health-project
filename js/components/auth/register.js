function renderRegisterForm() {
    const authContainer = document.getElementById('auth-container');
    authContainer.innerHTML = `
        <div class="form-container">
            <h2 class="text-center mb-2">Register</h2>
            <form id="register-form">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn">Register</button>
                </div>
            </form>
            <div class="text-center mt-2">
                <p>Already have an account? <a href="#" id="login-link">Login here</a></p>
            </div>
        </div>
    `;

    // Add event listeners
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const user = await auth.register({ name, email, password });
            Router.navigate('/patient-dashboard');
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }
    });

    document.getElementById('login-link').addEventListener('click', (e) => {
        e.preventDefault();
        Router.navigate('/');
    });
}
