const encryption = {
    // Generate a random encryption key
    generateKey() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    // Encrypt data
    async encrypt(data, key) {
        try {
            const encoder = new TextEncoder();
            const encodedData = encoder.encode(JSON.stringify(data));
            
            // Convert key to ArrayBuffer
            const keyBuffer = await crypto.subtle.importKey(
                'raw',
                this.hexToBuffer(key),
                { name: 'AES-GCM' },
                false,
                ['encrypt']
            );

            // Generate IV
            const iv = crypto.getRandomValues(new Uint8Array(12));
            
            // Encrypt
            const encryptedData = await crypto.subtle.encrypt(
                {
                    name: 'AES-GCM',
                    iv: iv
                },
                keyBuffer,
                encodedData
            );

            // Combine IV and encrypted data
            const combined = new Uint8Array(iv.length + encryptedData.byteLength);
            combined.set(iv);
            combined.set(new Uint8Array(encryptedData), iv.length);

            // Convert to base64 for storage/transmission
            return btoa(String.fromCharCode.apply(null, combined));
        } catch (error) {
            console.error('Encryption failed:', error);
            throw new Error('Encryption failed');
        }
    },

    // Decrypt data
    async decrypt(encryptedData, key) {
        try {
            // Convert from base64
            const combined = new Uint8Array(
                atob(encryptedData).split('').map(char => char.charCodeAt(0))
            );

            // Extract IV and data
            const iv = combined.slice(0, 12);
            const data = combined.slice(12);

            // Convert key to ArrayBuffer
            const keyBuffer = await crypto.subtle.importKey(
                'raw',
                this.hexToBuffer(key),
                { name: 'AES-GCM' },
                false,
                ['decrypt']
            );

            // Decrypt
            const decryptedData = await crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: iv
                },
                keyBuffer,
                data
            );

            // Convert back to object
            const decoder = new TextDecoder();
            return JSON.parse(decoder.decode(decryptedData));
        } catch (error) {
            console.error('Decryption failed:', error);
            throw new Error('Decryption failed');
        }
    },

    // Helper function to convert hex string to ArrayBuffer
    hexToBuffer(hexString) {
        const bytes = new Uint8Array(hexString.length / 2);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
        }
        return bytes.buffer;
    },

    // Generate a secure sharing token
    generateSharingToken() {
        const tokenBytes = new Uint8Array(32);
        crypto.getRandomValues(tokenBytes);
        return Array.from(tokenBytes, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    // Hash a password
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
    }
};
