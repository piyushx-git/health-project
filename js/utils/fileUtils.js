const fileUtils = {
    // Internal helpers for localStorage-backed files
    _key: 'user_files',
    _getFilesFromStorage() {
        const raw = localStorage.getItem(this._key);
        if (raw) {
            try { return JSON.parse(raw); } catch { /* fallthrough */ }
        }
        const seed = [
            { id: '1', name: 'medical_report_2025.pdf' },
            { id: '2', name: 'blood_test_results.pdf' },
            { id: '3', name: 'prescription.pdf' }
        ];
        localStorage.setItem(this._key, JSON.stringify(seed));
        return seed;
    },
    _saveFilesToStorage(files) {
        localStorage.setItem(this._key, JSON.stringify(files));
    },

    // Get user's files
    async getUserFiles() {
        return new Promise((resolve) => {
            const files = this._getFilesFromStorage();
            resolve(files);
        });
    },

    // Upload file
    async uploadFile(file) {
        // In a real app, this would upload to a server
        return new Promise((resolve) => {
            setTimeout(() => {
                const newFile = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: file.name
                };
                const files = this._getFilesFromStorage();
                files.unshift(newFile);
                this._saveFilesToStorage(files);
                resolve(newFile);
            }, 1000);
        });
    },

    // Download file
    async downloadFile(fileId) {
        // In a real app, this would download from a server
        return new Promise((resolve) => {
            // Simulate download
            alert('File download started...');
            resolve();
        });
    },

    // Delete file
    async deleteFile(fileId) {
        return new Promise((resolve) => {
            const files = this._getFilesFromStorage();
            const next = files.filter(f => f.id !== fileId);
            this._saveFilesToStorage(next);
            resolve();
        });
    },

    // Generate sharing token
    async generateSharingToken() {
        // In a real app, this would generate a secure token from the server
        return new Promise((resolve) => {
            const token = 'SHARE-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            resolve(token);
        });
    },

    // Verify sharing token
    async verifySharingToken(token) {
        // In a real app, this would verify the token with the server
        return new Promise((resolve) => {
            // Simulate token verification
            if (token.startsWith('SHARE-')) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }
};
