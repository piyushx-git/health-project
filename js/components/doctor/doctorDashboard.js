function renderDoctorDashboard() {
    const doctorContainer = document.getElementById('doctor-container');
    doctorContainer.innerHTML = `
        <div class="dashboard">
            <div class="dashboard-header">
                <h1 class="dashboard-title">Welcome, ${AppState.currentUser?.email || 'Doctor'}!</h1>
                <p class="dashboard-subtitle">Healthcare Provider Dashboard - Secure Patient Record Access</p>
            </div>
            
            <div class="dashboard-info-grid">
                <!-- Today's Activity Card -->
                <div class="info-card">
                    <h3>📊 Today's Activity</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-number">2</span>
                            <span class="stat-label">Records Accessed</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">1</span>
                            <span class="stat-label">Pending Requests</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">5</span>
                            <span class="stat-label">Active Sessions</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Access Card -->
                <div class="info-card">
                    <h3>🔍 Quick Access</h3>
                    <div class="quick-access-grid">
                        <div class="quick-access-item" onclick="Router.navigate('/qr-scanner')">
                            <div class="icon">📱</div>
                            <h4>Scan QR Code</h4>
                            <p>Scan patient QR code to access records</p>
                        </div>
                        <div class="quick-access-item" onclick="showTokenAccess()">
                            <div class="icon">🔑</div>
                            <h4>Enter Token</h4>
                            <p>Manual enter access token</p>
                        </div>
                    </div>
                </div>

                <!-- Recent Patient Access Card -->
                <div class="info-card">
                    <h3>👥 Recent Patient Access</h3>
                    <ul class="patient-list">
                        <li class="patient-item">
                            <div class="patient-info">
                                <div class="patient-name">John Doe</div>
                                <div class="patient-details">Blood Test Report</div>
                                <div class="patient-time">2024-01-22 • 10:30 AM</div>
                            </div>
                            <div class="patient-actions">
                                <button class="btn btn-primary">View</button>
                            </div>
                        </li>
                        <li class="patient-item">
                            <div class="patient-info">
                                <div class="patient-name">Jane Smith</div>
                                <div class="patient-details">X-Ray Image</div>
                                <div class="patient-time">2024-01-22 • 09:15 AM</div>
                            </div>
                            <div class="patient-actions">
                                <button class="btn btn-primary">View</button>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Pending Requests Card -->
                <div class="info-card">
                    <h3>⏰ Pending Requests</h3>
                    <ul class="patient-list">
                        <li class="patient-item">
                            <div class="patient-info">
                                <div class="patient-name">Mike Johnson</div>
                                <div class="patient-details">Lab Results</div>
                                <div class="patient-time">2024-01-22 • 11:00 AM</div>
                            </div>
                            <div class="patient-actions">
                                <span class="priority-tag priority-high">HIGH</span>
                                <button class="btn btn-primary">Review</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- QR Scanner Section (hidden by default) -->
            <div id="qr-scanner-section" class="qr-scanner-container" style="display: none;">
                <button class="btn" id="scan-btn">Start Scanner</button>
                <div class="qr-scanner-frame">
                    <video id="qr-video" style="display: none;"></video>
                </div>
            </div>

            <!-- Token Access Section (hidden by default) -->
            <div id="token-access-section" class="form-container" style="display: none;">
                <h2>Enter Access Token</h2>
                <div class="form-group">
                    <input type="text" id="access-token" placeholder="Enter patient's sharing token">
                    <button class="btn btn-primary" id="access-btn">Access Records</button>
                </div>
            </div>

            <!-- Patient Records Section -->
            <div id="patient-records" class="records-section mt-2" style="display: none;">
                <h3>Patient Records</h3>
                <ul id="patient-file-list" class="file-list">
                    <!-- Patient files will be loaded here -->
                </ul>
            </div>
        </div>
    `;

    // Access token handling
    document.getElementById('access-btn').addEventListener('click', async () => {
        const token = document.getElementById('access-token').value;
        try {
            const isValid = await fileUtils.verifySharingToken(token);
            if (isValid) {
                showPatientRecords();
            } else {
                alert('Invalid access token');
            }
        } catch (error) {
            alert('Access failed: ' + error.message);
        }
    });

    // QR Scanner handling
    const scanBtn = document.getElementById('scan-btn');
    const video = document.getElementById('qr-video');

    scanBtn.addEventListener('click', () => {
        if (video.style.display === 'none') {
            startQRScanner();
            scanBtn.textContent = 'Stop Scanner';
        } else {
            stopQRScanner();
            scanBtn.textContent = 'Start Scanner';
        }
    });
}

// Helper functions
function showTokenAccess() {
    document.getElementById('token-access-section').style.display = 'block';
    document.getElementById('qr-scanner-section').style.display = 'none';
}

function showQRScanner() {
    document.getElementById('qr-scanner-section').style.display = 'block';
    document.getElementById('token-access-section').style.display = 'none';
}

async function startQRScanner() {
    const video = document.getElementById('qr-video');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        video.style.display = 'block';
        video.play();
        // In a real app, you would implement QR code detection here
    } catch (error) {
        alert('Failed to start camera: ' + error.message);
    }
}

function stopQRScanner() {
    const video = document.getElementById('qr-video');
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.style.display = 'none';
}

async function showPatientRecords() {
    const recordsSection = document.getElementById('patient-records');
    const fileList = document.getElementById('patient-file-list');
    recordsSection.style.display = 'block';

    try {
        const files = await fileUtils.getUserFiles(); // In real app, this would use the access token
        fileList.innerHTML = files.map(file => `
            <li class="file-item">
                <span>${file.name}</span>
                <button class="btn" onclick="viewFile('${file.id}')">View</button>
            </li>
        `).join('');
    } catch (error) {
        fileList.innerHTML = '<li>Error loading patient files</li>';
    }
}

function viewFile(fileId) {
    // In a real app, this would open the file in a viewer
    alert('Opening file: ' + fileId);
}
