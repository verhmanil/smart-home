// ==================== אפקטי CONTROL - כפתורים עם אישיות ====================

// 1. יצירת חלקיקי אנרגיה חשמלית
function createEnergyParticles() {
    const container = document.getElementById('energy-particles');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'energy-spark';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        container.appendChild(particle);
    }
}

// 2. כפתורים חיים - כל כפתור עם תגובה ייחודית
function initButtonPersonalities() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        // אפקט חשמל בהובר
        button.addEventListener('mouseenter', function() {
            this.classList.add('energized');
            createSparkEffect(this);
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('energized');
        });
        
        // אפקט לחיצה חזק
        button.addEventListener('mousedown', function() {
            this.classList.add('pressed');
            createShockwave(this);
        });
        
        button.addEventListener('mouseup', function() {
            this.classList.remove('pressed');
        });
        
        // תגובה ספציפית לפי סוג הכפתור
        const val = button.dataset.val;
        if (val === '1' || val === '65' || val === '129' || val === '194') {
            button.classList.add('btn-power-on');
        } else if (val === '0' || val === '64' || val === '128' || val === '192') {
            button.classList.add('btn-power-off');
        } else if (val === '66') {
            button.classList.add('btn-disco');
            initDiscoButton(button);
        }
    });
}

// 3. אפקט ניצוצות
function createSparkEffect(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = rect.left + Math.random() * rect.width + 'px';
        spark.style.top = rect.top + Math.random() * rect.height + 'px';
        document.body.appendChild(spark);
        
        setTimeout(() => spark.remove(), 500);
    }
}

// 4. גל הלם מהכפתור
function createShockwave(element) {
    const rect = element.getBoundingClientRect();
    const wave = document.createElement('div');
    wave.className = 'shockwave';
    wave.style.left = rect.left + rect.width / 2 + 'px';
    wave.style.top = rect.top + rect.height / 2 + 'px';
    document.body.appendChild(wave);
    
    setTimeout(() => wave.remove(), 800);
}

// 5. כפתור דיסקו מיוחד
function initDiscoButton(button) {
    setInterval(() => {
        const hue = Math.floor(Math.random() * 360);
        button.style.background = `linear-gradient(135deg, 
            hsl(${hue}, 100%, 50%), 
            hsl(${(hue + 60) % 360}, 100%, 50%)
        )`;
    }, 500);
}

// 6. סליידר עם אפקט זוהר - DISABLED (bugged)
function initBrightnessSlider() {
    const slider = document.getElementById('brightness');
    if (!slider) return;
    
    // Basic slider functionality without visual effects
    slider.addEventListener('input', function() {
        const value = this.value;
        const percentage = (value / 100) * 100;
        
        // Simple background gradient without effects
        this.style.background = `linear-gradient(to left, 
            #ffc107 ${percentage}%, 
            #333 ${percentage}%
        )`;
    });
}

// 7. אנימציית Pulse על הכותרת
function initControlPulse() {
    const title = document.querySelector('.control-pulse');
    if (!title) return;
    
    setInterval(() => {
        title.style.textShadow = `
            0 0 20px rgba(0, 212, 255, 1),
            0 0 40px rgba(0, 212, 255, 0.5),
            0 0 60px rgba(0, 212, 255, 0.3)
        `;
        
        setTimeout(() => {
            title.style.textShadow = '0 0 10px rgba(51, 229, 255, 0.2)';
        }, 200);
    }, 2000);
}

// 8. מעקב אחרי שינויי מצב
function trackControlStates() {
    const buttons = document.querySelectorAll('.manual-btn, .neo-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const val = this.dataset.val;
            
            // אפקט ויזואלי לפי הפעולה
            if (val === '1' || val === '65' || val === '129' || val === '194') {
                createActivationEffect(this, '#00ff88');
            } else if (val === '0' || val === '64' || val === '128' || val === '192') {
                createActivationEffect(this, '#ff6b6b');
            } else if (val === '66') {
                activateDiscoMode();
            }
            
            // רטט קל של הכרטיס
            const card = this.closest('.card');
            if (card) {
                card.classList.add('card-activate');
                setTimeout(() => card.classList.remove('card-activate'), 300);
            }
        });
    });
}

// 9. אפקט הפעלה
function createActivationEffect(button, color) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'activation-particle';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.background = color;
        
        const angle = (Math.PI * 2 * i) / 10;
        const tx = Math.cos(angle) * 100;
        const ty = Math.sin(angle) * 100;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

// 10. מצב דיסקו מיוחד
function activateDiscoMode() {
    document.body.classList.add('party-mode');
    
    // יצירת אורות דיסקו
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const light = document.createElement('div');
            light.className = 'disco-light';
            light.style.left = Math.random() * 100 + '%';
            light.style.top = Math.random() * 100 + '%';
            light.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(light);
            
            setTimeout(() => light.remove(), 2000);
        }, i * 100);
    }
}

// 11. אפקטי רקע דינמיים
function initDynamicBackground() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            this.style.background = `
                radial-gradient(circle at ${x}% ${y}%, 
                    rgba(0, 212, 255, 0.15) 0%, 
                    rgba(26, 31, 46, 0.6) 50%,
                    rgba(36, 45, 61, 0.4) 100%
                )
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
}

// הוספת CSS דינמי
const style = document.createElement('style');
style.textContent = `
    /* חלקיקי אנרגיה */
    .energy-particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    }
    
    .energy-spark {
        position: absolute;
        width: 3px;
        height: 3px;
        background: #ffeb3b;
        border-radius: 50%;
        box-shadow: 0 0 10px #ffeb3b, 0 0 20px #ffeb3b;
        animation: spark-fly 3s infinite ease-in-out;
    }
    
    @keyframes spark-fly {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        50% {
            transform: translate(var(--tx, 50px), var(--ty, -50px)) scale(1.5);
            opacity: 1;
        }
    }
    
    /* כפתורים מאנרגטים */
    button.energized {
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.8) !important;
        transform: translateY(-3px) scale(1.05);
    }
    
    button.pressed {
        transform: translateY(0) scale(0.95) !important;
    }
    
    .btn-power-on:hover {
        background: linear-gradient(135deg, #00ff88, #00cc66) !important;
        box-shadow: 0 0 30px rgba(0, 255, 136, 0.6);
    }
    
    .btn-power-off:hover {
        background: linear-gradient(135deg, #ff6b6b, #cc5555) !important;
        box-shadow: 0 0 30px rgba(255, 107, 107, 0.6);
    }
    
    .btn-disco {
        animation: rainbow-pulse 2s infinite;
    }
    
    @keyframes rainbow-pulse {
        0%, 100% { filter: hue-rotate(0deg) brightness(1); }
        50% { filter: hue-rotate(180deg) brightness(1.3); }
    }
    
    /* ניצוצות */
    .spark {
        position: fixed;
        width: 4px;
        height: 4px;
        background: #ffeb3b;
        border-radius: 50%;
        pointer-events: none;
        animation: spark-fade 0.5s ease-out;
        box-shadow: 0 0 10px #ffeb3b;
        z-index: 9999;
    }
    
    @keyframes spark-fade {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx, 20px), var(--ty, -20px)) scale(0);
            opacity: 0;
        }
    }
    
    /* גל הלם */
    .shockwave {
        position: fixed;
        width: 0;
        height: 0;
        border: 2px solid #00d4ff;
        border-radius: 50%;
        pointer-events: none;
        animation: shockwave-expand 0.8s ease-out;
        z-index: 9999;
        transform: translate(-50%, -50%);
    }
    
    @keyframes shockwave-expand {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    /* חלקיקי הפעלה */
    .activation-particle {
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        pointer-events: none;
        animation: particle-burst 1s ease-out;
        z-index: 9999;
        box-shadow: 0 0 10px currentColor;
    }
    
    @keyframes particle-burst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
    
    /* זוהר סליידר */
    .slider-glow {
        position: absolute;
        top: 50%;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #ffeb3b, transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: glow-fade 0.3s ease-out;
    }
    
    @keyframes glow-fade {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    /* הפעלת כרטיס */
    .card-activate {
        animation: card-shake 0.3s ease;
    }
    
    @keyframes card-shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px) rotate(-1deg); }
        75% { transform: translateX(5px) rotate(1deg); }
    }
    
    /* מצב מסיבה */
    body.party-mode {
        animation: party-bg 0.5s infinite;
    }
    
    @keyframes party-bg {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(180deg); }
    }
    
    .disco-light {
        position: fixed;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        filter: blur(40px);
        opacity: 0.5;
        animation: disco-float 2s ease-out;
        pointer-events: none;
        z-index: 0;
    }
    
    @keyframes disco-float {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            opacity: 0.7;
        }
        100% {
            transform: scale(2) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* פולס על כותרת */
    .control-pulse {
        animation: title-pulse 3s infinite ease-in-out;
    }
    
    @keyframes title-pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(style);

// איפוס disco mode מדף קודם אם נשאר
function resetDiscoMode() {
    document.body.classList.remove('disco-mode');
}

// הפעלת כל האפקטים
document.addEventListener('DOMContentLoaded', () => {
    resetDiscoMode();
    createEnergyParticles();
    initButtonPersonalities();
    initBrightnessSlider();
    initControlPulse();
    trackControlStates();
    initDynamicBackground();
    
    console.log('🎮 אפקטי Control עם אישיות הופעלו!');
});
