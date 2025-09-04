// Authentication utility functions
const auth = {
    // Login function (patient/general)
    async login(email, password) {
        try {
            // Here you would normally make an API call
            // For now, we'll simulate authentication
            const user = await this.validateCredentials(email, password);
            if (user) {
                localStorage.setItem('token', user.token);
                AppState.currentUser = user;
                AppState.isAuthenticated = true;
                AppState.userType = user.type;
                document.dispatchEvent(new Event('authStateChanged'));
                return user;
            }
            throw new Error('Invalid credentials');
        } catch (error) {
            throw error;
        }
    },

    // Doctor Login function
    async loginDoctor(email, password, licenseNumber) {
        // Simple mock validation for doctor login
        const MOCK_EMAIL = 'doctor@example.com';
        const MOCK_LICENSE = 'DOC123';
        const MOCK_PASSWORD = 'Doctor@123';

        return new Promise((resolve, reject) => {
            const isValid = (
                email === MOCK_EMAIL &&
                licenseNumber === MOCK_LICENSE &&
                password === MOCK_PASSWORD
            );

            if (!isValid) {
                reject(new Error('Invalid doctor credentials'));
                return;
            }

            const user = {
                id: 'doc-001',
                email: email,
                licenseNumber: licenseNumber,
                type: 'doctor',
                token: 'doctor-token-' + Math.random()
            };

            localStorage.setItem('token', user.token);
            AppState.currentUser = user;
            AppState.isAuthenticated = true;
            AppState.userType = user.type;
            document.dispatchEvent(new Event('authStateChanged'));
            resolve(user);
        });
    },

    // Register function
    async register(userData) {
        try {
            // Here you would normally make an API call
            // For now, we'll simulate registration
            const user = await this.createUser(userData);
            localStorage.setItem('token', user.token);
            AppState.currentUser = user;
            AppState.isAuthenticated = true;
            AppState.userType = 'patient';
            return user;
        } catch (error) {
            throw error;
        }
    },

    // Logout function
    logout() {
        localStorage.removeItem('token');
        AppState.currentUser = null;
        AppState.isAuthenticated = false;
        AppState.userType = null;
        document.dispatchEvent(new Event('authStateChanged'));
        Router.navigate('/');
    },

    // Validate token
    async validateToken(token) {
        // Here you would normally validate with your backend
        // For now, we'll simulate token validation
        return new Promise((resolve, reject) => {
            if (token) {
                resolve({
                    id: '123',
                    email: 'user@example.com',
                    type: 'patient',
                    token: token
                });
            } else {
                reject(new Error('Invalid token'));
            }
        });
    },

    // Helper functions
    async validateCredentials(email, password) {
        // Simulate API call
        return new Promise((resolve) => {
            // In a real app, you would verify against your backend
            resolve({
                id: '123',
                email: email,
                type: 'patient',
                token: 'dummy-token-' + Math.random()
            });
        });
    },

    async createUser(userData) {
        // Simulate API call
        return new Promise((resolve) => {
            resolve({
                id: '123',
                email: userData.email,
                type: 'patient',
                token: 'dummy-token-' + Math.random()
            });
        });
    }
};
