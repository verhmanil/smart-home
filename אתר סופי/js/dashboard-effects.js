// ==================== אפקטי DASHBOARD - חיישנים עם אישיות ====================

// איפוס disco mode מדף קודם אם נשאר
function resetDiscoMode() {
    document.body.classList.remove('disco-mode');
}

// 1. יצירת חלקיקי נתונים מרחפים (מייצגים זרימת מידע)
function createDataParticles() {
    const container = document.getElementById('data-particles');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'data-bit';
        particle.textContent = Math.random() > 0.5 ? '1' : '0';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.fontSize = (Math.random() * 10 + 8) + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(particle);
    }
}

// 2. אנימציית גלים לכל חיישן (כל חיישן עם "דופק" משלו)
function initSensorWaves() {
    const sensors = document.querySelectorAll('.sensor-card');
    
    sensors.forEach((sensor, index) => {
        const wave = sensor.querySelector('.sensor-wave');
        if (!wave) return;
        
        // כל חיישן מקבל צבע וקצב ייחודי
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf'];
        const speeds = [2, 2.5, 1.8, 2.2];
        
        wave.style.background = `radial-gradient(circle, ${colors[index]}33, transparent)`;
        wave.style.animationDuration = speeds[index] + 's';
        
        // "נשימה" של החיישן
        sensor.addEventListener('mouseenter', () => {
            sensor.style.transform = 'scale(1.05) translateY(-10px)';
            wave.style.animationPlayState = 'running';
            wave.style.opacity = '1';
        });
        
        sensor.addEventListener('mouseleave', () => {
            sensor.style.transform = '';
            wave.style.opacity = '0.5';
        });
    });
}

// 3. אפקט "עדכון נתונים" - מהבהב כשהערך משתנה
function animateValueChange(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.classList.add('value-update');
    const card = element.closest('.sensor-card');
    
    if (card) {
        card.classList.add('data-received');
        
        // אפקט דפדוף
        const ripple = document.createElement('div');
        ripple.className = 'data-ripple';
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            card.classList.remove('data-received');
        }, 1000);
    }
    
    setTimeout(() => {
        element.classList.remove('value-update');
    }, 600);
}

// 4. מעקב אחרי שינויים בערכים ויצירת אנימציה
function watchSensorValues() {
    const sensors = ['temp', 'humidity', 'light', 'door'];
    const oldValues = {};
    
    sensors.forEach(sensor => {
        const element = document.getElementById(sensor);
        if (!element) return;
        
        oldValues[sensor] = element.textContent;
        
        // בודק שינויים כל 500ms
        setInterval(() => {
            const newValue = element.textContent;
            if (newValue !== oldValues[sensor] && newValue !== '--') {
                animateValueChange(sensor);
                oldValues[sensor] = newValue;
            }
        }, 500);
    });
}

// 5. אנימציה ייחודית לכל סוג חיישן
function initSensorPersonalities() {
    // טמפרטורה - חם/קר
    const tempCard = document.querySelector('.temperature-card');
    if (tempCard) {
        const tempValue = document.getElementById('temp');
        setInterval(() => {
            const value = parseFloat(tempValue?.textContent);
            if (!isNaN(value)) {
                if (value > 28) {
                    tempCard.classList.add('hot');
                    tempCard.classList.remove('cold');
                } else if (value < 18) {
                    tempCard.classList.add('cold');
                    tempCard.classList.remove('hot');
                } else {
                    tempCard.classList.remove('hot', 'cold');
                }
            }
        }, 1000);
    }
    
    // לחות - טיפות מים
    const humidityCard = document.querySelector('.humidity-card');
    if (humidityCard) {
        setInterval(() => {
            const drop = document.createElement('div');
            drop.className = 'water-drop';
            drop.style.left = Math.random() * 100 + '%';
            humidityCard.appendChild(drop);
            
            setTimeout(() => drop.remove(), 2000);
        }, 3000);
    }
    
    // אור - מהבהב
    const lightCard = document.querySelector('.light-card');
    if (lightCard) {
        const lightIcon = lightCard.querySelector('.sensor-icon');
        setInterval(() => {
            if (lightIcon) {
                lightIcon.style.animation = 'none';
                setTimeout(() => {
                    lightIcon.style.animation = 'bulb-flicker 0.5s ease';
                }, 10);
            }
        }, 5000);
    }
    
    // דלת - פתוח/סגור עם אנימציה
    const doorCard = document.querySelector('.door-card');
    if (doorCard) {
        const doorValue = document.getElementById('door');
        setInterval(() => {
            const status = doorValue?.textContent.trim();
            if (status.includes('פתוח') || status.includes('Open')) {
                doorCard.classList.add('door-open');
            } else {
                doorCard.classList.remove('door-open');
            }
        }, 500);
    }
}

// 6. אפקט Glitch על הכותרת
function initDataGlitch() {
    const title = document.querySelector('.data-glitch');
    if (!title) return;
    
    setInterval(() => {
        title.classList.add('glitching');
        setTimeout(() => {
            title.classList.remove('glitching');
        }, 200);
    }, 8000);
}

// 7. אפקט מסך נתונים דינמי
function createDataMatrix() {
    // אפקט בלחיצה בלי zoom
    const cards = document.querySelectorAll('.sensor-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('card-selected');
            
            setTimeout(() => {
                this.classList.remove('card-selected');
            }, 300);
        });
    });
}

// 8. רקע דינמי שמשתנה לפי הנתונים
function dynamicBackground() {
    setInterval(() => {
        const temp = parseFloat(document.getElementById('temp')?.textContent);
        const humidity = parseFloat(document.getElementById('humidity')?.textContent);
        
        if (!isNaN(temp) && !isNaN(humidity)) {
            const hue = Math.min(temp * 2, 240); // 0-240 (כחול לאדום)
            const saturation = Math.min(humidity, 100);
            
            document.body.style.background = `
                linear-gradient(135deg, 
                    hsl(${hue}, ${saturation}%, 10%) 0%, 
                    #1a1f2e 50%, 
                    #0f1419 100%
                )
            `;
        }
    }, 5000);
}

// הוספת CSS דינמי
const style = document.createElement('style');
style.textContent = `
    /* חלקיקי נתונים */
    .data-particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    }
    
    .data-bit {
        position: absolute;
        color: #00d4ff;
        font-family: 'Courier New', monospace;
        font-weight: bold;
        animation: float-data 15s infinite linear;
        text-shadow: 0 0 5px #00d4ff;
    }
    
    @keyframes float-data {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.8;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* גלי חיישן */
    .sensor-wave {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        opacity: 0.5;
        animation: pulse-wave 2s infinite ease-in-out;
        pointer-events: none;
    }
    
    @keyframes pulse-wave {
        0%, 100% {
            transform: scale(1);
            opacity: 0.3;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.6;
        }
    }
    
    /* עדכון ערך */
    .value-update {
        animation: value-flash 0.6s ease;
    }
    
    @keyframes value-flash {
        0%, 100% {
            transform: scale(1);
            color: var(--color-text-primary);
        }
        50% {
            transform: scale(1.2);
            color: #00ff88;
            text-shadow: 0 0 20px #00ff88;
        }
    }
    
    .data-received {
        animation: card-pulse 1s ease;
    }
    
    @keyframes card-pulse {
        0%, 100% {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        50% {
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.8);
        }
    }
    
    .data-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border: 2px solid #00d4ff;
        border-radius: 12px;
        transform: translate(-50%, -50%);
        animation: ripple-expand 1s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-expand {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    /* אישיות חיישנים */
    .sensor-icon {
        font-size: 48px;
        margin-bottom: 10px;
        display: block;
        text-align: center;
        filter: drop-shadow(0 0 10px currentColor);
        transition: all 0.3s ease;
    }
    
    .sensor-card:hover .sensor-icon {
        transform: scale(1.2) rotate(5deg);
        filter: drop-shadow(0 0 20px currentColor);
    }
    
    /* טמפרטורה */
    .temperature-card.hot {
        border-color: #ff6b6b;
        background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(36, 45, 61, 0.4) 100%);
    }
    
    .temperature-card.cold {
        border-color: #4ecdc4;
        background: linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(36, 45, 61, 0.4) 100%);
    }
    
    /* לחות - טיפות */
    .water-drop {
        position: absolute;
        width: 8px;
        height: 8px;
        background: #4ecdc4;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        animation: drop-fall 2s ease-in;
        opacity: 0.7;
        box-shadow: 0 0 5px #4ecdc4;
    }
    
    @keyframes drop-fall {
        0% {
            top: 0;
            opacity: 1;
        }
        100% {
            top: 100%;
            opacity: 0;
        }
    }
    
    /* אור */
    @keyframes bulb-flicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    /* דלת */
    .door-card.door-open {
        border-color: #00ff88;
        box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
    }
    
    .door-card.door-open .sensor-icon {
        animation: door-swing 1s ease;
    }
    
    @keyframes door-swing {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(15deg); }
    }
    
    /* Glitch */
    .data-glitch.glitching {
        animation: glitch-effect 0.3s;
    }
    
    @keyframes glitch-effect {
        0%, 100% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(2px, -2px);
        }
        60% {
            transform: translate(-1px, 1px);
        }
        80% {
            transform: translate(1px, -1px);
        }
    }
    
    /* אפקט גבול זוהר מסתובב */
    @keyframes rotating-border {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// הפעלת כל האפקטים
document.addEventListener('DOMContentLoaded', () => {
    resetDiscoMode();
    createDataParticles();
    initSensorWaves();
    watchSensorValues();
    initSensorPersonalities();
    initDataGlitch();
    createDataMatrix();
    dynamicBackground();
    
    console.log('📊 אפקטי Dashboard עם אישיות הופעלו!');
});
