// ==================== אפקטי CCTV - אבטחה וניטור עם אישיות ====================

// איפוס disco mode מדף קודם אם נשאר
function resetDiscoMode() {
    document.body.classList.remove('disco-mode');
}

// 1. סורק אבטחה מסתובב
function createSecurityScanner() {
    const scanner = document.getElementById('security-scanner');
    if (!scanner) return;
    
    const line = document.createElement('div');
    line.className = 'scan-line';
    scanner.appendChild(line);
    
    // סורק מסתובב
    let angle = 0;
    setInterval(() => {
        angle = (angle + 2) % 360;
        line.style.transform = `rotate(${angle}deg)`;
    }, 50);
}

// 2. קווי סריקה על המסך
function initScanLines() {
    const scanContainer = document.querySelector('.scan-lines');
    if (!scanContainer) return;
    
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'horizontal-scan';
        line.style.animationDelay = (i * 0.3) + 's';
        scanContainer.appendChild(line);
    }
}

// 3. אינדיקטור LIVE מהבהב
function initLiveIndicator() {
    const liveIndicator = document.querySelector('.live-indicator');
    if (!liveIndicator) return;
    
    setInterval(() => {
        liveIndicator.style.opacity = liveIndicator.style.opacity === '0.5' ? '1' : '0.5';
    }, 500);
}

// 4. אזעקה עם אנימציה דרמטית
function initAlarmAnimation() {
    const alarmPanel = document.querySelector('.alarm-panel');
    const alarmIndicator = document.getElementById('alarm-indicator');
    
    if (!alarmPanel || !alarmIndicator) return;
    
    // בדיקת מצב אזעקה
    const alarmStatus = document.getElementById('alarm-status');
    
    const observer = new MutationObserver(() => {
        const status = alarmStatus?.textContent.trim();
        
        if (status.includes('אזעקה') || status.includes('alarm') || status.includes('פריצה')) {
            activateAlarmMode();
        } else {
            deactivateAlarmMode();
        }
    });
    
    if (alarmStatus) {
        observer.observe(alarmStatus, { 
            childList: true, 
            characterData: true, 
            subtree: true 
        });
    }
}

// 5. הפעלת מצב אזעקה מלא
function activateAlarmMode() {
    document.body.classList.add('alarm-active');
    
    const alarmPanel = document.querySelector('.alarm-panel');
    if (alarmPanel) {
        alarmPanel.classList.add('alarm-triggered');
        
        // סירנה ויזואלית
        createAlarmSiren();
    }
}

// 6. כיבוי מצב אזעקה
function deactivateAlarmMode() {
    document.body.classList.remove('alarm-active');
    
    const alarmPanel = document.querySelector('.alarm-panel');
    if (alarmPanel) {
        alarmPanel.classList.remove('alarm-triggered');
    }
}

// 7. סירנה ויזואלית
function createAlarmSiren() {
    const siren = document.createElement('div');
    siren.className = 'alarm-siren';
    document.body.appendChild(siren);
    
    setTimeout(() => {
        siren.remove();
    }, 5000);
}

// 8. אפקט סטטי על המצלמה
function initCameraStatic() {
    const streamWrapper = document.querySelector('.stream-wrapper');
    if (!streamWrapper) return;
    
    // אפקט סטטי קל
    setInterval(() => {
        const static = document.createElement('div');
        static.className = 'camera-static';
        static.style.top = Math.random() * 100 + '%';
        static.style.height = Math.random() * 5 + 1 + 'px';
        streamWrapper.appendChild(static);
        
        setTimeout(() => static.remove(), 100);
    }, 3000);
}

// 9. אפקט Glitch על הכותרת
function initSecurityScan() {
    const title = document.querySelector('.security-scan');
    if (!title) return;
    
    setInterval(() => {
        title.classList.add('scanning');
        setTimeout(() => {
            title.classList.remove('scanning');
        }, 300);
    }, 5000);
}

// 10. זיהוי תנועה - מוכן לשימוש עתידי
function initMotionDetection() {
    // ניתן להפעיל דרך קריאה חיצונית או Firebase
    // לדוגמה: showMotionAlert() כשיש אירוע אמיתי
}

// פונקציה להצגת התראת תנועה (ניתן לקרוא מבחוץ)
function showMotionAlert() {
    const cameraCard = document.querySelector('.camera-card');
    if (!cameraCard) return;
    
    const motionAlert = document.createElement('div');
    motionAlert.className = 'motion-alert';
    motionAlert.textContent = '⚠️ תנועה זוהתה';
    cameraCard.appendChild(motionAlert);
    
    setTimeout(() => motionAlert.remove(), 2000);
}

// 11. מסגרת ניטור מתקדמת
function initMonitoringFrame() {
    const streamWrapper = document.querySelector('.stream-wrapper');
    if (!streamWrapper) return;
    
    // פינות מסגרת
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    corners.forEach(corner => {
        const div = document.createElement('div');
        div.className = `frame-corner ${corner}`;
        streamWrapper.appendChild(div);
    });
    
    // רשת סריקה
    const grid = document.createElement('div');
    grid.className = 'scan-grid';
    streamWrapper.appendChild(grid);
}

// 12. טיימסטמפ חי
function updateTimestamp() {
    const timestamp = document.getElementById('timestamp');
    if (!timestamp) return;
    
    setInterval(() => {
        const now = new Date();
        const time = now.toLocaleTimeString('he-IL');
        timestamp.textContent = time;
    }, 1000);
}

// 13. אפקט על כפתור צילום
function initCaptureButton() {
    const captureBtn = document.querySelector('button[onclick*="captureImage"]');
    if (!captureBtn) return;
    
    captureBtn.addEventListener('click', function() {
        // פלאש
        const flash = document.createElement('div');
        flash.className = 'camera-flash';
        document.body.appendChild(flash);
        
        setTimeout(() => flash.remove(), 300);
        
        // אפקט כפתור
        this.classList.add('capturing');
        setTimeout(() => this.classList.remove('capturing'), 500);
    });
}

// 14. רקע דינמי למצב אבטחה
function initSecurityBackground() {
    const body = document.body;
    
    setInterval(() => {
        if (body.classList.contains('alarm-active')) {
            const hue = Math.random() * 60; // אדום-כתום
            body.style.background = `
                linear-gradient(135deg, 
                    hsl(${hue}, 80%, 10%) 0%, 
                    #1a1f2e 50%, 
                    #0f1419 100%
                )
            `;
        } else {
            body.style.background = '';
        }
    }, 500);
}

// הוספת CSS דינמי
const style = document.createElement('style');
style.textContent = `
    /* סורק אבטחה */
    .security-scanner {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 300px;
        height: 300px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 0;
    }
    
    .scan-line {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 150px;
        background: linear-gradient(to bottom, transparent, #00ff88, transparent);
        transform-origin: top center;
        box-shadow: 0 0 10px #00ff88;
        animation: scan-rotate 4s linear infinite;
    }
    
    @keyframes scan-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* קווי סריקה אופקיים */
    .scan-lines {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    }
    
    .horizontal-scan {
        position: absolute;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, transparent, #00d4ff, transparent);
        animation: scan-move 4s linear infinite;
        opacity: 0.3;
    }
    
    @keyframes scan-move {
        0% { top: -10%; }
        100% { top: 110%; }
    }
    
    /* אינדיקטור LIVE */
    .live-indicator {
        animation: live-blink 1s infinite;
    }
    
    @keyframes live-blink {
        0%, 50%, 100% { opacity: 1; }
        25%, 75% { opacity: 0.5; }
    }
    
    /* מצב אזעקה */
    .alarm-active {
        animation: alarm-flash 0.5s infinite;
    }
    
    @keyframes alarm-flash {
        0%, 100% { filter: hue-rotate(0deg) brightness(1); }
        50% { filter: hue-rotate(0deg) brightness(1.3); }
    }
    
    .alarm-triggered {
        animation: alarm-shake 0.5s infinite, alarm-glow 1s infinite;
        border-color: #ff0000 !important;
    }
    
    @keyframes alarm-shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes alarm-glow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        }
        50% {
            box-shadow: 0 0 40px rgba(255, 0, 0, 1);
        }
    }
    
    /* סירנה */
    .alarm-siren {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        animation: siren-flash 0.5s infinite;
    }
    
    @keyframes siren-flash {
        0%, 100% {
            background: radial-gradient(circle, rgba(255, 0, 0, 0.3), transparent);
        }
        50% {
            background: radial-gradient(circle, rgba(255, 0, 0, 0), transparent);
        }
    }
    
    /* סטטי מצלמה */
    .camera-static {
        position: absolute;
        width: 100%;
        left: 0;
        background: rgba(255, 255, 255, 0.1);
        animation: static-flicker 0.1s;
    }
    
    @keyframes static-flicker {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    
    /* Glitch סריקה */
    .security-scan.scanning {
        animation: scan-glitch 0.3s;
    }
    
    @keyframes scan-glitch {
        0%, 100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
        }
        33% {
            transform: translate(-3px, 2px);
            filter: hue-rotate(90deg);
        }
        66% {
            transform: translate(3px, -2px);
            filter: hue-rotate(180deg);
        }
    }
    
    /* התראת תנועה */
    .motion-alert {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 10px 20px;
        background: rgba(255, 107, 107, 0.9);
        border: 2px solid #ff0000;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        animation: motion-pulse 1s ease-out;
        z-index: 100;
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
    }
    
    @keyframes motion-pulse {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    /* פינות מסגרת */
    .frame-corner {
        position: absolute;
        width: 30px;
        height: 30px;
        border: 2px solid #00ff88;
        z-index: 10;
    }
    
    .frame-corner.top-left {
        top: 10px;
        left: 10px;
        border-bottom: none;
        border-right: none;
    }
    
    .frame-corner.top-right {
        top: 10px;
        right: 10px;
        border-bottom: none;
        border-left: none;
    }
    
    .frame-corner.bottom-left {
        bottom: 10px;
        left: 10px;
        border-top: none;
        border-right: none;
    }
    
    .frame-corner.bottom-right {
        bottom: 10px;
        right: 10px;
        border-top: none;
        border-left: none;
    }
    
    /* רשת סריקה */
    .scan-grid {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0, 255, 136, 0.1) 20px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0, 255, 136, 0.1) 20px);
        pointer-events: none;
        opacity: 0.3;
        z-index: 5;
    }
    
    /* פלאש מצלמה */
    .camera-flash {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        pointer-events: none;
        z-index: 9999;
        animation: flash-fade 0.3s ease-out;
    }
    
    @keyframes flash-fade {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    /* כפתור צילום */
    button.capturing {
        animation: capture-click 0.5s ease;
    }
    
    @keyframes capture-click {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.9);
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.8);
        }
    }
    
    /* אפקט מסך אבטחה */
    .stream-wrapper {
        position: relative;
        overflow: hidden;
    }
    
    .stream-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 3px
        );
        pointer-events: none;
        z-index: 2;
        animation: scanline 8s linear infinite;
    }
    
    @keyframes scanline {
        0% { transform: translateY(0); }
        100% { transform: translateY(100%); }
    }
`;
document.head.appendChild(style);

// הפעלת כל האפקטים
document.addEventListener('DOMContentLoaded', () => {
    resetDiscoMode();
    createSecurityScanner();
    initScanLines();
    initLiveIndicator();
    initAlarmAnimation();
    initCameraStatic();
    initSecurityScan();
    initMotionDetection();
    initMonitoringFrame();
    updateTimestamp();
    initCaptureButton();
    initSecurityBackground();
    
    console.log('📹 אפקטי CCTV עם אישיות הופעלו!');
});
