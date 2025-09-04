class RecordViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.activeRecord = null;
    }

    render(record) {
        this.activeRecord = record;
        this.container.innerHTML = `
            <div class="record-viewer">
                <div class="record-header">
                    <h3>${record.name}</h3>
                    <div class="record-metadata">
                        <span>Uploaded: ${new Date(record.uploadDate).toLocaleDateString()}</span>
                        <span>Type: ${record.type}</span>
                    </div>
                </div>
                <div class="record-content">
                    ${this.renderContent(record)}
                </div>
                <div class="record-actions">
                    <button class="btn" onclick="recordViewer.downloadRecord('${record.id}')">Download</button>
                    <button class="btn secondary" onclick="recordViewer.closeViewer()">Close</button>
                </div>
            </div>
        `;
    }

    renderContent(record) {
        // Handle different file types
        switch(record.type.toLowerCase()) {
            case 'pdf':
                return `<iframe src="${record.url}" width="100%" height="600px"></iframe>`;
            case 'image':
                return `<img src="${record.url}" alt="${record.name}" style="max-width: 100%;">`;
            case 'text':
                return `<pre>${record.content}</pre>`;
            default:
                return '<p>Preview not available for this file type</p>';
        }
    }

    async downloadRecord(recordId) {
        try {
            const response = await fileUtils.downloadFile(recordId);
            // Create a download link
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.activeRecord.name);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('Failed to download record: ' + error.message);
        }
    }

    closeViewer() {
        this.container.innerHTML = '';
        this.activeRecord = null;
    }

    showError(message) {
        this.container.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <button class="btn" onclick="recordViewer.closeViewer()">Close</button>
            </div>
        `;
    }
}
