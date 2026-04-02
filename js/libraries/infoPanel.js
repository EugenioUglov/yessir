class InfoPanel {
    constructor() {

    }

    showPanel(message, duration = 3000) {
        const panel = document.getElementById('info-panel');
        const messageElement = document.getElementById('info-message');
        
        messageElement.innerText = message;
        panel.classList.add('show');

        // Автоматическое скрытие через указанное время
        setTimeout(() => {
            this.hidePanel();
        }, duration);
    }

    hidePanel() {
        document.getElementById('info-panel').classList.remove('show');
    }
}