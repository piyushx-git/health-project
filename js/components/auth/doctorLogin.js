function renderDoctorLoginForm() {
    const authContainer = document.getElementById('auth-container');
    authContainer.innerHTML = `
        <div class="form-container">
            <h2 class="text-center mb-2">Doctor Login</h2>
            <form id="doctor-login-form">
                <div class="form-group">
                    <label for="licenseNumber">License Number</label>
                    <input type="text" id="licenseNumber" name="licenseNumber" required>
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
                    <button type="submit" class="btn">Login</button>
                </div>
            </form>
            <div class="text-center mt-2">
                <p>Not a doctor? <a href="#" id="patient-login-link">Patient Login</a></p>
            </div>
        </div>
    `;

    // Add event listeners
    document.getElementById('doctor-login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const licenseNumber = document.getElementById('licenseNumber').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const user = await auth.loginDoctor(email, password, licenseNumber);
            Router.navigate('/doctor-dashboard');
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    });

    document.getElementById('patient-login-link').addEventListener('click', (e) => {
        e.preventDefault();
        Router.navigate('/');
    });
}
