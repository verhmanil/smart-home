// 🥚 Easter Eggs System - מערכת פצחי הפתעה

(function() {
    'use strict';

    // Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            activatePartyMode();
        }
    });

    // Party Mode!
    function activatePartyMode() {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes party-spin {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.2); }
                100% { transform: rotate(360deg) scale(1); }
            }
            .party-mode { animation: party-spin 2s infinite ease-in-out !important; }
            .rainbow-bg { animation: rainbow 3s infinite !important; }
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.classList.add('rainbow-bg');
        document.querySelectorAll('.card, .navbar-logo, h2, h3').forEach(el => {
            el.classList.add('party-mode');
        });
        
        createConfetti();
        playSound();
        
        setTimeout(() => {
            document.body.classList.remove('rainbow-bg');
            document.querySelectorAll('.party-mode').forEach(el => el.classList.remove('party-mode'));
        }, 10000);
    }

    // Confetti Effect
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: hsl(${Math.random() * 360}, 100%, 50%);
                left: ${Math.random() * 100}%;
                top: -10px;
                animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes confetti-fall {
                to { transform: translateY(100vh) rotate(${Math.random() * 360}deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Secret Console Messages
    const consoleMessages = [
        '🕵️ מצאת את המסרים הסודיים!',
        '💎 אתה מפתח אמיתי!',
        '🎮 נסה את קוד הקונאמי: ↑ ↑ ↓ ↓ ← → ← → B A',
        '🤖 01001000 01101001 (זה "Hi" בבינארי)',
        '☕ קוד זה נכתב עם הרבה קפה',
        '🎨 לחץ 3 פעמים על הלוגו למשהו מיוחד...',
        '🎪 Alt + S = מצב הפתעה!',
        '🦄 יוניקורן קיימים, רק תאמין!',
    ];
    
    consoleMessages.forEach((msg, i) => {
        setTimeout(() => console.log(`%c${msg}`, 'color: #00ff00; font-size: 14px; font-weight: bold;'), i * 1000);
    });

    // Triple Click Logo Easter Egg
    let logoClickCount = 0;
    let logoClickTimer;
    
    const logo = document.querySelector('.navbar-logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            logoClickCount++;
            
            clearTimeout(logoClickTimer);
            logoClickTimer = setTimeout(() => logoClickCount = 0, 500);
            
            if (logoClickCount === 3) {
                makeElementsDance();
                logoClickCount = 0;
            }
        });
    }

    // Make Everything Dance
    function makeElementsDance() {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes wiggle {
                0%, 100% { transform: rotate(-3deg); }
                50% { transform: rotate(3deg); }
            }
            .dance { animation: wiggle 0.3s infinite !important; }
        `;
        document.head.appendChild(style);
        
        document.querySelectorAll('.card, .stat-card, button, .navbar-menu li').forEach((el, i) => {
            setTimeout(() => el.classList.add('dance'), i * 50);
        });
        
        setTimeout(() => {
            document.querySelectorAll('.dance').forEach(el => el.classList.remove('dance'));
        }, 5000);
    }

    // Secret Keyboard Shortcut: Alt + S
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            activateMatrixMode();
        }
    });

    // Matrix Rain Effect
    function activateMatrixMode() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none;';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const chars = 'אבגדהוזחטיכלמנסעפצקרשת01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        let frameCount = 0;
        const maxFrames = 300;
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            frameCount++;
            if (frameCount < maxFrames) {
                requestAnimationFrame(draw);
            } else {
                canvas.remove();
            }
        }
        
        draw();
    }

    // Type "smart" anywhere to activate
    let typedKeys = '';
    document.addEventListener('keypress', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        typedKeys += e.key;
        typedKeys = typedKeys.slice(-5);
        
        if (typedKeys === 'smart') {
            activateSmartMode();
        }
        
        // Type "doom" to play DOOM!
        if (typedKeys.slice(-4) === 'doom') {
            launchDoom();
        }
    });

    // 🎮 DOOM Easter Egg
    function launchDoom() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'doom-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 99999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `;
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕ סגור (ESC)';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            z-index: 100000;
        `;
        closeBtn.onclick = () => overlay.remove();
        
        // Title
        const title = document.createElement('h1');
        title.textContent = '🔥 DOOM 🔥';
        title.style.cssText = `
            color: #ff0000;
            font-size: 48px;
            margin-bottom: 20px;
            text-shadow: 0 0 20px #ff0000, 0 0 40px #ff4400;
            animation: doom-flicker 0.1s infinite;
        `;
        
        // Add flickering animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes doom-flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
        
        // Game iframe - using playable DOOM source
        const gameContainer = document.createElement('div');
        gameContainer.style.cssText = `
            width: 960px;
            height: 720px;
            background: #000;
            border: 4px solid #ff0000;
            box-shadow: 0 0 30px #ff0000;
            max-width: 95vw;
            max-height: 80vh;
        `;
        
        const iframe = document.createElement('iframe');
        iframe.src = 'https://playclassic.games/game-embed/play-doom-online-pc/';
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
        `;
        iframe.allow = 'autoplay; fullscreen; keyboard-map';
        
        gameContainer.appendChild(iframe);
        
        // Instructions
        const instructions = document.createElement('p');
        instructions.innerHTML = '🎮 השתמש בחצים לתנועה | CTRL לירי | SPACE לפתיחה | ESC לסגירה';
        instructions.style.cssText = `
            color: #00ff00;
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
        `;
        
        overlay.appendChild(closeBtn);
        overlay.appendChild(title);
        overlay.appendChild(gameContainer);
        overlay.appendChild(instructions);
        document.body.appendChild(overlay);
        
        // ESC to close
        const escHandler = (e) => {
            if (e.key === 'Escape' && document.getElementById('doom-overlay')) {
                overlay.remove();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // Console message
        console.log('%c🔥 DOOM ACTIVATED! RIP AND TEAR! 🔥', 'color: #ff0000; font-size: 24px; font-weight: bold;');
    }

    function activateSmartMode() {
        // Make page elements smarter (bigger brain emoji)
        document.querySelectorAll('h2, h3').forEach(el => {
            el.textContent = '🧠 ' + el.textContent.replace('🧠 ', '');
        });
    }

    // Secret Click on Time Display
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        let secretClickCount = 0;
        timeDisplay.addEventListener('click', () => {
            secretClickCount++;
            if (secretClickCount >= 5) {
                showTimeTravel();
                secretClickCount = 0;
            }
        });
    }

    function showTimeTravel() {
        const year = 1900 + Math.floor(Math.random() * 200);
        
        document.body.style.filter = 'sepia(100%)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
    }

    // Gravity Mode - Ctrl + G
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            activateGravity();
        }
    });

    function activateGravity() {
        const cards = document.querySelectorAll('.card, .stat-card, button');
        
        cards.forEach((card, i) => {
            setTimeout(() => {
                card.style.transition = 'all 2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                card.style.transform = 'translateY(1000px) rotate(720deg)';
            }, i * 100);
        });
        
        setTimeout(() => {
            cards.forEach(card => {
                card.style.transition = 'all 1s ease';
                card.style.transform = '';
            });
        }, 3000);
    }

    // Random Motivational Messages removed

    // Helper: Play Sound (simple beep using Web Audio API)
    function playSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // Silent fail if audio not supported
        }
    }

    // Secret: Shake the window
    let shakeCount = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            shakeCount++;
            if (shakeCount >= 3) {
                shakeWindow();
                shakeCount = 0;
            }
        }
    });

    function shakeWindow() {
        document.body.style.animation = 'shake 0.5s';
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }

    // Easter Egg: Click corners in sequence
    let cornerSequence = [];
    const corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
    
    document.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const threshold = 50;
        
        let corner = null;
        if (x < threshold && y < threshold) corner = 'top-left';
        else if (x > w - threshold && y < threshold) corner = 'top-right';
        else if (x > w - threshold && y > h - threshold) corner = 'bottom-right';
        else if (x < threshold && y > h - threshold) corner = 'bottom-left';
        
        if (corner) {
            cornerSequence.push(corner);
            cornerSequence = cornerSequence.slice(-4);
            
            if (JSON.stringify(cornerSequence) === JSON.stringify(corners)) {
                unlockSecretMode();
                cornerSequence = [];
            }
        }
    });

    function unlockSecretMode() {
        document.body.style.background = 'linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradient-shift 10s ease infinite';
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.background = '';
            document.body.style.animation = '';
        }, 10000);
    }

    // Double Click Anywhere - Ripple Effect
    document.body.addEventListener('dblclick', (e) => {
        createRipple(e.clientX, e.clientY);
    });

    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(100, 255, 218, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            animation: ripple-expand 1s ease-out;
        `;
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes ripple-expand {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                    border-width: 1px;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    }

    // Shift + Ctrl + Click = Emoji Explosion
    document.addEventListener('click', (e) => {
        if (e.shiftKey && e.ctrlKey) {
            emojiExplosion(e.clientX, e.clientY);
        }
    });

    function emojiExplosion(x, y) {
        const emojis = ['🎉', '🎊', '⭐', '✨', '💫', '🌟', '💥', '🎆', '🎇', '🔥', '💖', '🦄', '🌈', '🍕', '🎮', '🚀'];
        
        for (let i = 0; i < 20; i++) {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: 30px;
                pointer-events: none;
                z-index: 10000;
                animation: emoji-burst ${0.5 + Math.random()}s ease-out forwards;
            `;
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 100 + Math.random() * 100;
            emoji.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
            emoji.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
            
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 1500);
        }
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes emoji-burst {
                to {
                    transform: translate(var(--x), var(--y)) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Type "disco" for disco mode
    let typedSequence = '';
    document.addEventListener('keypress', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        typedSequence += e.key;
        typedSequence = typedSequence.slice(-5);
        
        if (typedSequence === 'disco') {
            activateDiscoMode();
        } else if (typedSequence.slice(-4) === 'flip') {
            flipUpsideDown();
        } else if (typedSequence.slice(-3) === 'cat') {
            showCatFact();
        } else if (typedSequence.slice(-5) === 'ghost') {
            activateGhostMode();
        } else if (typedSequence.slice(-4) === 'zoom') {
            activateZoomMode();
        }
    });

    // Disco Mode
    function activateDiscoMode() {
        let discoInterval;
        let count = 0;
        
        discoInterval = setInterval(() => {
            document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
            count++;
            
            if (count >= 30) {
                clearInterval(discoInterval);
                document.body.style.backgroundColor = '';
            }
        }, 200);
    }

    // Upside Down Mode
    function flipUpsideDown() {
        document.body.style.transition = 'transform 1s ease';
        document.body.style.transform = 'rotate(180deg)';
        
        setTimeout(() => {
            document.body.style.transform = '';
        }, 5000);
    }

    // Random Cat Facts
    const catFacts = [
        '🐱 חתולים ישנים 70% מחייהם!',
        '🐱 לחתול יש 32 שרירים באוזן!',
        '🐱 חתולים לא יכולים לטעום מתוק!',
        '🐱 ללב של חתול פועם פי 2 מלב אנושי!',
        '🐱 חתולים מחטאים את עצמם בדיוק כמו בני אדם!',
    ];

    function showCatFact() {
        const fact = catFacts[Math.floor(Math.random() * catFacts.length)];
        console.log(fact);
    }

    // Ghost Mode - Transparency
    function activateGhostMode() {
        document.body.style.transition = 'opacity 2s';
        document.body.style.opacity = '0.3';
        
        setTimeout(() => {
            document.body.style.opacity = '';
        }, 5000);
    }

    // Zoom Mode
    function activateZoomMode() {
        document.body.style.transition = 'transform 2s';
        document.body.style.transform = 'scale(1.5)';
        
        setTimeout(() => {
            document.body.style.transform = '';
        }, 3000);
    }

    // Hold any key for 3 seconds
    let keyHoldTimer;
    let currentKey;
    
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        if (!keyHoldTimer && e.key.length === 1) {
            currentKey = e.key;
            keyHoldTimer = setTimeout(() => {
                keyHoldSurprise();
            }, 3000);
        }
    });
    
    document.addEventListener('keyup', () => {
        clearTimeout(keyHoldTimer);
        keyHoldTimer = null;
    });

    function keyHoldSurprise() {
        createEmojiRain();
    }

    // Emoji Rain
    function createEmojiRain() {
        const rainEmojis = ['⭐', '💎', '👑', '🏆', '🎁', '🎈'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = rainEmojis[Math.floor(Math.random() * rainEmojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -50px;
                    font-size: ${20 + Math.random() * 20}px;
                    pointer-events: none;
                    z-index: 10000;
                    animation: emoji-rain ${3 + Math.random() * 2}s linear forwards;
                `;
                document.body.appendChild(emoji);
                setTimeout(() => emoji.remove(), 6000);
            }, i * 100);
        }
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes emoji-rain {
                to {
                    transform: translateY(100vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Mouse Trail (Activate with Shift + T)
    let mouseTrailActive = false;
    
    document.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.key === 'T') {
            mouseTrailActive = !mouseTrailActive;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!mouseTrailActive) return;
        
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(255,255,255,0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: trail-fade 0.5s ease-out forwards;
        `;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
    });
    
    const trailStyle = document.createElement('style');
    trailStyle.innerHTML = `
        @keyframes trail-fade {
            to { transform: scale(3); opacity: 0; }
        }
    `;
    document.head.appendChild(trailStyle);

    // Spin Logo on Long Hover
    const navLogo = document.querySelector('.navbar-logo');
    let hoverTimer;
    
    if (navLogo) {
        navLogo.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(() => {
                navLogo.style.transition = 'transform 2s';
                navLogo.style.transform = 'rotate(1080deg)';
                setTimeout(() => {
                    navLogo.style.transform = '';
                }, 2000);
            }, 2000);
        });
        
        navLogo.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
        });
    }

    // Glitch Mode - Ctrl + Shift + G
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'G') {
            e.preventDefault();
            activateGlitchMode();
        }
    });

    function activateGlitchMode() {
        const style = document.createElement('style');
        style.id = 'glitch-style';
        style.innerHTML = `
            .glitch-effect {
                animation: glitch 0.3s infinite !important;
            }
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
        `;
        document.head.appendChild(style);
        
        document.querySelectorAll('h1, h2, h3, .card').forEach(el => {
            el.classList.add('glitch-effect');
        });
        
        setTimeout(() => {
            document.querySelectorAll('.glitch-effect').forEach(el => {
                el.classList.remove('glitch-effect');
            });
            document.getElementById('glitch-style')?.remove();
        }, 5000);
    }

    // Speed Mode - Press "S" 5 times fast
    let sCount = 0;
    let sTimer;
    
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        if (e.key === 's' || e.key === 'S') {
            sCount++;
            clearTimeout(sTimer);
            sTimer = setTimeout(() => sCount = 0, 1000);
            
            if (sCount >= 5) {
                activateSpeedMode();
                sCount = 0;
            }
        }
    });

    function activateSpeedMode() {
        const style = document.createElement('style');
        style.innerHTML = `
            * { animation-duration: 0.2s !important; transition-duration: 0.2s !important; }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => style.remove(), 5000);
    }

    // Rainbow Text - Alt + R
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 'r') {
            e.preventDefault();
            activateRainbowText();
        }
    });

    function activateRainbowText() {
        const style = document.createElement('style');
        style.innerHTML = `
            .rainbow-text {
                background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet, red);
                background-size: 200% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: rainbow-slide 3s linear infinite !important;
            }
            @keyframes rainbow-slide {
                to { background-position: 200% 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.querySelectorAll('h1, h2, h3, p, a').forEach(el => {
            el.classList.add('rainbow-text');
        });
        
        setTimeout(() => {
            document.querySelectorAll('.rainbow-text').forEach(el => {
                el.classList.remove('rainbow-text');
            });
        }, 8000);
    }

    // Secret Easter Egg List - Hidden in navbar corner
    function createSecretEasterEggList() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        // Create semi-hidden trigger area in left corner with subtle hint
        const trigger = document.createElement('div');
        trigger.innerHTML = '🥚';
        trigger.style.cssText = `
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            font-size: 12px;
            opacity: 0.15;
            cursor: help;
            z-index: 1000;
            transition: all 0.3s ease;
            user-select: none;
        `;
        navbar.style.position = 'relative';
        navbar.appendChild(trigger);
        
        // Subtle hint on hover
        trigger.addEventListener('mouseenter', () => {
            trigger.style.opacity = '0.6';
            trigger.style.transform = 'translateY(-50%) scale(1.3)';
            trigger.style.filter = 'drop-shadow(0 0 5px rgba(255, 255, 0, 0.5))';
        });
        
        trigger.addEventListener('mouseleave', () => {
            trigger.style.opacity = '0.15';
            trigger.style.transform = 'translateY(-50%) scale(1)';
            trigger.style.filter = 'none';
        });
        
        let clickCount = 0;
        let clickTimer;
        
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            clickCount++;
            
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => clickCount = 0, 1000);
            
            if (clickCount === 3) {
                showEasterEggList();
                clickCount = 0;
            }
        });
    }

    function showEasterEggList() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10005;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fade-in 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        // Create list container
        const container = document.createElement('div');
        container.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid #00ff88;
            border-radius: 20px;
            padding: 30px;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 0 50px rgba(0, 255, 136, 0.3);
            animation: slide-down 0.5s ease;
        `;
        
        const easterEggsList = `
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #00ff88; font-size: 32px; margin: 0; text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);">
                    🥚 רשימת Easter Eggs סודית 🥚
                </h2>
                <p style="color: #888; font-size: 14px; margin-top: 10px;">מצאת את הרשימה הסודית! 🕵️</p>
            </div>
            
            <div style="display: grid; gap: 15px;">
                <div class="egg-category">
                    <h3 style="color: #4ecdc4; font-size: 20px; margin-bottom: 10px;">⌨️ קיצורי מקלדת</h3>
                    <div class="egg-item">🎮 <strong>Konami Code</strong> (↑ ↑ ↓ ↓ ← → ← → B A) - מצב מסיבה</div>
                    <div class="egg-item">🌈 <strong>Alt + S</strong> - אפקט מטריקס</div>
                    <div class="egg-item">⚡ <strong>Ctrl + G</strong> - מצב כבידה</div>
                    <div class="egg-item">🌟 <strong>Alt + R</strong> - טקסט קשת</div>
                    <div class="egg-item">⚠️ <strong>Ctrl + Shift + G</strong> - מצב גליץ'</div>
                    <div class="egg-item">✨ <strong>Shift + T</strong> - עקבת עכבר</div>
                    <div class="egg-item">🔄 <strong>ESC × 3</strong> - רעידת מסך</div>
                    <div class="egg-item">💨 <strong>S × 5</strong> (מהר) - מצב טורבו</div>
                    <div class="egg-item">⏰ <strong>החזק מקש 3 שניות</strong> - גשם אימוג'י</div>
                </div>
                
                <div class="egg-category">
                    <h3 style="color: #4ecdc4; font-size: 20px; margin-bottom: 10px;">✍️ הקלד מילים</h3>
                    <div class="egg-item">💃 <strong>disco</strong> - מצב דיסקו</div>
                    <div class="egg-item">🙃 <strong>flip</strong> - הפוך הכל</div>
                    <div class="egg-item">🐱 <strong>cat</strong> - עובדות על חתולים</div>
                    <div class="egg-item">👻 <strong>ghost</strong> - מצב רוח רפאים</div>
                    <div class="egg-item">🔍 <strong>zoom</strong> - זום פנימה</div>
                    <div class="egg-item">🧠 <strong>smart</strong> - מצב חכם</div>
                    <div class="egg-item">👋 <strong>hello</strong> - ברכה ידידותית</div>
                </div>
                
                <div class="egg-category">
                    <h3 style="color: #4ecdc4; font-size: 20px; margin-bottom: 10px;">🖱️ לחיצות עכבר</h3>
                    <div class="egg-item">🏠 <strong>לחץ 3 פעמים על הלוגו</strong> - ריקוד אלמנטים</div>
                    <div class="egg-item">⏰ <strong>לחץ 5 פעמים על השעה</strong> - נסיעה בזמן</div>
                    <div class="egg-item">🔲 <strong>לחץ על הפינות בכיוון השעון</strong> - מצב סודי</div>
                    <div class="egg-item">💧 <strong>Double-click בכל מקום</strong> - אפקט גלים</div>
                    <div class="egg-item">💥 <strong>Shift + Ctrl + Click</strong> - התפוצצות אימוג'י</div>
                    <div class="egg-item">🏠 <strong>Hover על לוגו 2 שניות</strong> - סיבוב לוגו</div>
                </div>
                
                <div class="egg-category">
                    <h3 style="color: #ffd700; font-size: 20px; margin-bottom: 10px;">🏆 מערכת הישגים</h3>
                    <div class="egg-item">⭐ פתח את כל ה-Easter Eggs לפרס סופי!</div>
                    <div class="egg-item">🎖️ כל הישג מציג popup מיוחד</div>
                    <div class="egg-item">🎉 תגמול אולטימטיבי בסוף!</div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                <p style="color: #666; font-size: 12px;">💡 טיפ: לחץ בכל מקום כדי לסגור</p>
                <p style="color: #00ff88; font-size: 14px; margin-top: 10px;">בהצלחה! 🎮</p>
            </div>
        `;
        
        container.innerHTML = easterEggsList;
        overlay.appendChild(container);
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slide-down {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .egg-category {
                background: rgba(255, 255, 255, 0.03);
                padding: 15px;
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .egg-item {
                color: #ddd;
                padding: 8px 12px;
                margin: 5px 0;
                background: rgba(0, 255, 136, 0.05);
                border-radius: 5px;
                border-left: 3px solid #00ff88;
                font-size: 14px;
            }
            .egg-item strong {
                color: #00ff88;
            }
            .egg-category:hover {
                background: rgba(255, 255, 255, 0.05);
                transition: background 0.3s ease;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(overlay);
        playSound();
        
        // Close on click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.animation = 'fade-out 0.3s ease';
                const fadeOutStyle = document.createElement('style');
                fadeOutStyle.innerHTML = `
                    @keyframes fade-out {
                        to { opacity: 0; }
                    }
                `;
                document.head.appendChild(fadeOutStyle);
                
                setTimeout(() => overlay.remove(), 300);
            }
        });
    }

    // Initialize secret list
    createSecretEasterEggList();

    // Initialize message
    console.log('%c🥚 Easter Eggs System v2.0 Loaded! Try to find them all...', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
    console.log('%c🎮 Basic: Konami Code, Triple-click logo, Alt+S, Ctrl+G, ESC×3, Click corners', 'color: #4ecdc4; font-size: 12px;');
    console.log('%c⭐ Advanced: Type "disco", "flip", "cat", "ghost", "zoom", "smart", "hello"', 'color: #ffd700; font-size: 12px;');
    console.log('%c🚀 Expert: Shift+Ctrl+Click, Shift+T, Hold key 3s, S×5, Ctrl+Shift+G, Alt+R, Hover logo 2s', 'color: #ff6b6b; font-size: 12px;');
    console.log('%c💎 Double-click anywhere for ripples!', 'color: #00ff00; font-size: 12px;');
    console.log('%c🔍 Secret: Triple-click top-left corner of navbar for full list!', 'color: #ff00ff; font-size: 14px; font-weight: bold;');

})();
