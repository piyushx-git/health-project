class TokenAccess {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentToken = null;
        this.tokenExpiry = null;
    }

    render() {
        this.container.innerHTML = `
            <div class="token-access">
                <div class="token-generator">
                    <h3>Generate Access Token</h3>
                    <div class="form-group">
                        <label for="expiry">Token Expiry</label>
                        <select id="expiry" class="form-control">
                            <option value="1">1 hour</option>
                            <option value="4">4 hours</option>
                            <option value="24">24 hours</option>
                            <option value="168">7 days</option>
                        </select>
                    </div>
                    <button class="btn" onclick="tokenAccess.generateToken()">Generate Token</button>
                </div>
                <div id="token-display" class="token-display" style="display: none;">
                    <h4>Access Token</h4>
                    <div class="token-value"></div>
                    <div class="token-expiry"></div>
                    <div class="qr-code" id="token-qr"></div>
                    <button class="btn secondary" onclick="tokenAccess.copyToken()">Copy Token</button>
                </div>
            </div>
        `;
    }

    async generateToken() {
        try {
            const expiryHours = document.getElementById('expiry').value;
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + parseInt(expiryHours));

            // Generate token using encryption utility
            const token = await encryption.generateSharingToken();
            this.currentToken = token;
            this.tokenExpiry = expiryDate;

            // Display token
            const tokenDisplay = document.getElementById('token-display');
            tokenDisplay.style.display = 'block';
            tokenDisplay.querySelector('.token-value').textContent = token;
            tokenDisplay.querySelector('.token-expiry').textContent = 
                `Expires: ${expiryDate.toLocaleString()}`;

            // Generate QR code
            this.generateQRCode(token);

            // Store token in backend (simulated)
            await this.storeToken(token, expiryDate);
        } catch (error) {
            alert('Failed to generate token: ' + error.message);
        }
    }

    async storeToken(token, expiry) {
        // In a real app, this would make an API call to store the token
        localStorage.setItem('sharing_token', JSON.stringify({
            token,
            expiry: expiry.toISOString()
        }));
    }

    generateQRCode(token) {
        const qrContainer = document.getElementById('token-qr');
        // In a real app, you would use a QR code library here
        qrContainer.innerHTML = `
            <div class="qr-placeholder">
                <p>QR Code for: ${token}</p>
                <small>Install a QR code library to generate actual QR codes</small>
            </div>
        `;
    }

    copyToken() {
        if (this.currentToken) {
            navigator.clipboard.writeText(this.currentToken)
                .then(() => alert('Token copied to clipboard!'))
                .catch(err => alert('Failed to copy token: ' + err.message));
        }
    }

    static async verifyToken(token) {
        // In a real app, this would verify with the backend
        const stored = localStorage.getItem('sharing_token');
        if (!stored) return false;

        const { token: storedToken, expiry } = JSON.parse(stored);
        const expiryDate = new Date(expiry);

        if (token === storedToken && expiryDate > new Date()) {
            return true;
        }
        return false;
    }
}
