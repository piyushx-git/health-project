function renderPatientDashboard() {
    const dashboardContainer = document.getElementById('dashboard-container');
    dashboardContainer.innerHTML = `
        <div class="dashboard">
            <h2>My Medical Records</h2>
            <div class="upload-section mt-2">
                <input type="file" id="file-upload" class="hidden" multiple>
                <button class="btn" id="upload-btn">Upload New Record</button>
            </div>
            <div class="records-section mt-2">
                <h3>My Records</h3>
                <ul id="file-list" class="file-list">
                    <!-- Files will be dynamically loaded here -->
                </ul>
            </div>
            <div class="share-section mt-2">
                <h3>Share Records</h3>
                <div id="qr-code-container"></div>
                <button class="btn" id="generate-token-btn">Generate Sharing Token</button>
            </div>
        </div>
    `;

    // File upload handling
    const fileUpload = document.getElementById('file-upload');
    const uploadBtn = document.getElementById('upload-btn');

    uploadBtn.addEventListener('click', () => {
        fileUpload.click();
    });

    fileUpload.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        // Show loading overlay popup
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(overlay);

        try {
            for (const file of files) {
                await fileUtils.uploadFile(file);
            }
            await updateFileList();
        } catch (error) {
            alert('Upload failed: ' + error.message);
        } finally {
            // Hide loading overlay
            overlay.remove();
            // Reset input so same file can be re-selected later
            fileUpload.value = '';
        }
    });

    // Token generation
    document.getElementById('generate-token-btn').addEventListener('click', async () => {
        try {
            const token = await fileUtils.generateSharingToken();
            const qrContainer = document.getElementById('qr-code-container');
            // Generate and display QR code (you'll need a QR library for this)
            qrContainer.innerHTML = `<p>Sharing Token: ${token}</p>`;
        } catch (error) {
            alert('Failed to generate token: ' + error.message);
        }
    });

    // Initial file list load
    updateFileList();
}

async function updateFileList() {
    const fileList = document.getElementById('file-list');
    try {
        const files = await fileUtils.getUserFiles();
        fileList.innerHTML = files.map(file => `
            <li class="file-item">
                <span>${file.name}</span>
                <div class="file-actions">
                    <button class="btn" onclick="downloadFile('${file.id}')">Download</button>
                    <button class="btn" onclick="deleteFile('${file.id}')">Delete</button>
                </div>
            </li>
        `).join('');
    } catch (error) {
        fileList.innerHTML = '<li>Error loading files</li>';
    }
}

async function downloadFile(fileId) {
    try {
        await fileUtils.downloadFile(fileId);
    } catch (error) {
        alert('Download failed: ' + error.message);
    }
}

async function deleteFile(fileId) {
    if (confirm('Are you sure you want to delete this file?')) {
        try {
            await fileUtils.deleteFile(fileId);
            updateFileList();
        } catch (error) {
            alert('Delete failed: ' + error.message);
        }
    }
}
