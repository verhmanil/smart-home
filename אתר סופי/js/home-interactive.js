// ==================== דף בית אינטראקטיבי ====================

// איפוס disco mode מדף קודם אם נשאר
function resetDiscoMode() {
    document.body.classList.remove('disco-mode');
}

// 1. יצירת חלקיקים מרחפים ברקע
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // מיקום אקראי
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // גודל אקראי
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // עיכוב אנימציה אקראי
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // צבע אקראי בין כחול ותכלת
        const hue = Math.random() * 60 + 180; // 180-240 (כחול-ציאן)
        particle.style.background = `hsl(${hue}, 100%, 60%)`;
        particle.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 60%)`;
        
        container.appendChild(particle);
    }
}

// 2. שעון חי
function updateClock() {
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// 3. אפקט 3D Tilt על הכרטיסים
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // טווח של -10 עד 10 מעלות
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.setProperty('--tilt-x', `${rotateX}deg`);
            card.style.setProperty('--tilt-y', `${rotateY}deg`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
        });
    });
}

// 4. אפקט ריפל בלחיצה על כרטיס
function initRippleEffect() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(0, 212, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// הוספת אנימציית ריפל ל-CSS דינמית
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 5. אנימציית כניסה לכרטיסים
function animateCardsOnLoad() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// 6. אפקט מעקב עכבר - זוהר עוקב אחרי הסמן
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease-out;
        transform: translate(-50%, -50%);
        mix-blend-mode: screen;
        filter: blur(5px);
    `;
    document.body.appendChild(follower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
}

// 7. אפקט פרלקס על האלמנטים בגלילה
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const greetingSection = document.querySelector('.greeting-section');
        
        if (greetingSection) {
            greetingSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            greetingSection.style.opacity = 1 - (scrolled / 500);
        }
    });
}

// הפעלת כל האפקטים בטעינת הדף
document.addEventListener('DOMContentLoaded', () => {
    resetDiscoMode();
    createParticles();
    updateClock();
    setInterval(updateClock, 1000);
    initTiltEffect();
    initRippleEffect();
    animateCardsOnLoad();
    initMouseFollower();
    initParallax();
    
    console.log('🎉 דף בית אינטראקטיבי הופעל בהצלחה!');
});

// אפקט נוסף - רעידה קלה בהובר על הכותרת
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.addEventListener('mouseenter', () => {
        glitchText.style.animation = 'none';
        setTimeout(() => {
            glitchText.style.animation = 'glitch-animation 0.3s ease';
        }, 10);
    });
}
