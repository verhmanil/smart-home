// 🎭 Navbar Personality System - מערכת אישיות ל-Navbar

(function() {
    'use strict';

    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
    
    // Define personality for each page
    const personalities = {
        home: {
            name: 'ידידותי וחם',
            emoji: '🏠',
            primaryColor: '#4ecdc4',
            secondaryColor: '#ff6b6b',
            greeting: 'ברוך הבא הביתה! 🏡',
            behaviors: ['wave', 'bounce', 'glow'],
            mood: 'happy'
        },
        dashboard: {
            name: 'מקצועי ואנליטי',
            emoji: '📊',
            primaryColor: '#667eea',
            secondaryColor: '#764ba2',
            greeting: 'מנתח נתונים... 📈',
            behaviors: ['pulse', 'scan', 'data-flow'],
            mood: 'focused'
        },
        control: {
            name: 'חזק ובעל שליטה',
            emoji: '🎮',
            primaryColor: '#f093fb',
            secondaryColor: '#f5576c',
            greeting: 'מוכן לפעולה! ⚡',
            behaviors: ['power-up', 'electricity', 'command'],
            mood: 'energetic'
        },
        cctv: {
            name: 'ערני ומאובטח',
            emoji: '👁️',
            primaryColor: '#fa709a',
            secondaryColor: '#fee140',
            greeting: 'מצב שמירה מופעל 🔒',
            behaviors: ['surveillance', 'blink', 'alert'],
            mood: 'vigilant'
        },
        index: {
            name: 'מסתורי ומזמין',
            emoji: '🔐',
            primaryColor: '#30cfd0',
            secondaryColor: '#330867',
            greeting: 'זיהוי משתמש... 🔑',
            behaviors: ['fade', 'mysterious', 'unlock'],
            mood: 'mysterious'
        }
    };

    const personality = personalities[currentPage] || personalities.home;

    // Initialize navbar personality
    function initNavbarPersonality() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Add page-specific class
        navbar.classList.add(`navbar-${currentPage}`);
        
        // Apply personality
        applyVisualStyle(navbar);
        addBehaviors(navbar);
        addInteractions(navbar);
        showGreeting();
        addNavbarEyes();
        addBreathingEffect(navbar);
    }

    // Apply visual style based on personality
    function applyVisualStyle(navbar) {
        const style = document.createElement('style');
        style.innerHTML = `
            .navbar-${currentPage} {
                position: relative;
                transition: all 0.3s ease;
            }
            
            .navbar-${currentPage}::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, ${personality.primaryColor}, ${personality.secondaryColor});
                animation: navbar-glow-${currentPage} 3s ease-in-out infinite;
            }
            
            @keyframes navbar-glow-${currentPage} {
                0%, 100% { opacity: 0.5; box-shadow: 0 0 10px ${personality.primaryColor}; }
                50% { opacity: 1; box-shadow: 0 0 20px ${personality.secondaryColor}; }
            }

            .navbar-${currentPage}:hover::before {
                height: 3px;
                box-shadow: 0 0 30px ${personality.primaryColor};
            }
        `;
        document.head.appendChild(style);
    }

    // Add personality-specific behaviors
    function addBehaviors(navbar) {
        personality.behaviors.forEach(behavior => {
            switch(behavior) {
                case 'wave':
                    addWaveEffect(navbar);
                    break;
                case 'bounce':
                    addBounceOnHover(navbar);
                    break;
                case 'pulse':
                    addPulseEffect(navbar);
                    break;
                case 'scan':
                    addScanEffect(navbar);
                    break;
                case 'power-up':
                    addPowerUpEffect(navbar);
                    break;
                case 'electricity':
                    addElectricityEffect(navbar);
                    break;
                case 'surveillance':
                    addSurveillanceEffect(navbar);
                    break;
                case 'blink':
                    addBlinkEffect(navbar);
                    break;
                case 'mysterious':
                    addMysteriousEffect(navbar);
                    break;
            }
        });
    }

    // Wave Effect (Home)
    function addWaveEffect(navbar) {
        const logo = navbar.querySelector('.navbar-logo');
        if (!logo) return;

        setInterval(() => {
            logo.style.animation = 'none';
            setTimeout(() => {
                logo.style.animation = 'wave 0.5s ease';
            }, 10);
        }, 8000);

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes wave {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(10deg); }
                75% { transform: rotate(-10deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Bounce on Hover (Home)
    function addBounceOnHover(navbar) {
        const menuItems = navbar.querySelectorAll('.nav-link');
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.animation = 'bounce 0.5s ease';
            });
            item.addEventListener('animationend', () => {
                item.style.animation = '';
            });
        });

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }

    // Pulse Effect (Dashboard)
    function addPulseEffect(navbar) {
        const style = document.createElement('style');
        style.innerHTML = `
            .navbar-dashboard .navbar-logo {
                animation: data-pulse 2s ease-in-out infinite;
            }
            @keyframes data-pulse {
                0%, 100% { transform: scale(1); filter: brightness(1); }
                50% { transform: scale(1.05); filter: brightness(1.2); }
            }
        `;
        document.head.appendChild(style);
    }

    // Scan Effect (Dashboard)
    function addScanEffect(navbar) {
        const scanner = document.createElement('div');
        scanner.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, ${personality.primaryColor}40, transparent);
            animation: scan-sweep 5s linear infinite;
            pointer-events: none;
            z-index: 1;
        `;
        navbar.style.overflow = 'hidden';
        navbar.appendChild(scanner);

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes scan-sweep {
                to { left: 100%; }
            }
        `;
        document.head.appendChild(style);
    }

    // Power Up Effect (Control)
    function addPowerUpEffect(navbar) {
        const logo = navbar.querySelector('.navbar-logo');
        if (!logo) return;

        logo.addEventListener('mouseenter', () => {
            logo.style.textShadow = `0 0 10px ${personality.primaryColor}, 0 0 20px ${personality.secondaryColor}`;
            logo.style.transform = 'scale(1.1)';
        });

        logo.addEventListener('mouseleave', () => {
            logo.style.textShadow = '';
            logo.style.transform = '';
        });
    }

    // Electricity Effect (Control)
    function addElectricityEffect(navbar) {
        setInterval(() => {
            const spark = document.createElement('div');
            spark.textContent = '⚡';
            spark.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: 50%;
                transform: translate(-50%, -50%);
                font-size: ${10 + Math.random() * 10}px;
                pointer-events: none;
                z-index: 2;
                animation: spark-fade 1s ease-out forwards;
            `;
            navbar.appendChild(spark);
            setTimeout(() => spark.remove(), 1000);
        }, 3000);

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spark-fade {
                to { opacity: 0; transform: translate(-50%, -150%); }
            }
        `;
        document.head.appendChild(style);
    }

    // Surveillance Effect (CCTV)
    function addSurveillanceEffect(navbar) {
        const indicator = document.createElement('div');
        indicator.innerHTML = '🔴';
        indicator.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            animation: recording-blink 1.5s ease-in-out infinite;
            z-index: 2;
        `;
        navbar.appendChild(indicator);

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes recording-blink {
                0%, 100% { opacity: 1; filter: drop-shadow(0 0 5px red); }
                50% { opacity: 0.3; }
            }
        `;
        document.head.appendChild(style);
    }

    // Blink Effect (CCTV)
    function addBlinkEffect(navbar) {
        const logo = navbar.querySelector('.navbar-logo');
        if (!logo) return;

        setInterval(() => {
            logo.style.opacity = '0.3';
            setTimeout(() => {
                logo.style.opacity = '1';
            }, 100);
        }, 4000);
    }

    // Mysterious Effect (Login)
    function addMysteriousEffect(navbar) {
        const style = document.createElement('style');
        style.innerHTML = `
            .navbar-index {
                animation: mysterious-fade 3s ease-in-out infinite;
            }
            @keyframes mysterious-fade {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Add interactive eyes that follow cursor
    function addNavbarEyes() {
        // Show eyes on all pages now
        const eyesContainer = document.createElement('div');
        eyesContainer.innerHTML = `
            <div class="navbar-eye">
                <div class="navbar-iris">
                    <div class="navbar-pupil"></div>
                    <div class="navbar-shine"></div>
                </div>
            </div>
            <div class="navbar-eye">
                <div class="navbar-iris">
                    <div class="navbar-pupil"></div>
                    <div class="navbar-shine"></div>
                </div>
            </div>
        `;
        eyesContainer.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            gap: 20px;
            pointer-events: none;
            z-index: 2;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
        `;

        const style = document.createElement('style');
        style.innerHTML = `
            .navbar-eye {
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
                border-radius: 15%;
                position: relative;
                border: 2px solid #00ffff;
                box-shadow: 
                    inset 0 0 10px rgba(0, 255, 255, 0.3),
                    0 0 15px rgba(0, 255, 255, 0.4),
                    0 2px 5px rgba(0, 0, 0, 0.5);
                overflow: hidden;
                animation: roboticScan 3s ease-in-out infinite;
            }
            
            @keyframes roboticScan {
                0%, 100% { 
                    box-shadow: 
                        inset 0 0 10px rgba(0, 255, 255, 0.3),
                        0 0 15px rgba(0, 255, 255, 0.4),
                        0 2px 5px rgba(0, 0, 0, 0.5);
                }
                50% { 
                    box-shadow: 
                        inset 0 0 15px rgba(0, 255, 255, 0.5),
                        0 0 25px rgba(0, 255, 255, 0.7),
                        0 2px 5px rgba(0, 0, 0, 0.5);
                }
            }
            
            .navbar-iris {
                position: absolute;
                width: 20px;
                height: 20px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 10%;
                background: linear-gradient(45deg, 
                    ${personality.primaryColor}99, 
                    ${personality.primaryColor}ee);
                box-shadow: 
                    inset 0 0 8px ${personality.primaryColor},
                    0 0 10px ${personality.primaryColor}aa;
                transition: all 0.1s linear;
                border: 1px solid ${personality.primaryColor};
            }
            
            .navbar-pupil {
                width: 8px;
                height: 8px;
                background: #ff0000;
                border-radius: 2px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 
                    0 0 8px #ff0000,
                    0 0 15px #ff0000,
                    inset 0 0 5px rgba(255, 255, 255, 0.5);
                transition: all 0.1s linear;
                animation: ledPulse 1.5s ease-in-out infinite;
            }
            
            @keyframes ledPulse {
                0%, 100% { 
                    box-shadow: 
                        0 0 8px #ff0000,
                        0 0 15px #ff0000,
                        inset 0 0 5px rgba(255, 255, 255, 0.5);
                }
                50% { 
                    box-shadow: 
                        0 0 12px #ff0000,
                        0 0 25px #ff0000,
                        inset 0 0 8px rgba(255, 255, 255, 0.7);
                }
            }
            
            .navbar-shine {
                position: absolute;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(0, 255, 255, 0.6), 
                    transparent);
                top: 0;
                left: 0;
                pointer-events: none;
                animation: scanLine 2s linear infinite;
            }
            
            @keyframes scanLine {
                0% { 
                    top: 0;
                    opacity: 0;
                }
                50% { 
                    opacity: 1;
                }
                100% { 
                    top: 100%;
                    opacity: 0;
                }
            }
            
            .navbar-eye:hover {
                transform: scale(1.1) rotate(5deg);
                transition: transform 0.2s ease;
                border-color: #ff00ff;
            }
        `;
        document.head.appendChild(style);

        const navbar = document.querySelector('.navbar');
        navbar.appendChild(eyesContainer);

        // Eyes follow cursor with smoother movement
        document.addEventListener('mousemove', (e) => {
            const eyes = document.querySelectorAll('.navbar-eye');
            eyes.forEach(eye => {
                const iris = eye.querySelector('.navbar-iris');
                const rect = eye.getBoundingClientRect();
                const eyeX = rect.left + rect.width / 2;
                const eyeY = rect.top + rect.height / 2;
                
                const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
                const distance = Math.min(7, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 35);
                
                const irisX = Math.cos(angle) * distance;
                const irisY = Math.sin(angle) * distance;
                
                // Robotic snappy movement
                iris.style.transform = `translate(calc(-50% + ${irisX}px), calc(-50% + ${irisY}px))`;
            });
        });
    }

    // Add breathing effect to navbar
    function addBreathingEffect(navbar) {
        if (currentPage === 'home' || currentPage === 'index') {
            const style = document.createElement('style');
            style.innerHTML = `
                .navbar-${currentPage} {
                    animation: navbar-breathe 4s ease-in-out infinite;
                }
                @keyframes navbar-breathe {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(1.02); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Add interactive responses
    function addInteractions(navbar) {
        const logo = navbar.querySelector('.navbar-logo');
        if (!logo) return;

        // Logo responds to clicks
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            
            const messages = {
                home: ['🏠 אני אוהב כשאתה כאן!', '💚 הבית שלך, הבית שלי!', '✨ בואו נעשה משהו מדהים!'],
                dashboard: ['📊 הנתונים נראים טוב היום!', '📈 המערכת פועלת בצורה מושלמת!', '💡 יש לי תובנות מעניינות!'],
                control: ['⚡ כוח מלא!', '🎮 מוכן לפקודות!', '💪 בואו נשלוט על הכל!'],
                cctv: ['👁️ הכל תחת פיקוח!', '🔒 המערכת מאובטחת!', '🚨 אני שומר עליך!'],
                index: ['🔐 מוכן להיכנס?', '🔑 אני מחכה לך!', '✨ בוא נתחיל הרפתקה!']
            };

            const pageMessages = messages[currentPage] || messages.home;
            const message = pageMessages[Math.floor(Math.random() * pageMessages.length)];
            
            showPersonalityMessage(message);
        });

        // Navbar reacts to long hover
        let hoverTimer;
        navbar.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(() => {
                showPersonalityReaction();
            }, 3000);
        });

        navbar.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
        });
    }

    // Show greeting message
    function showGreeting() {
        setTimeout(() => {
            const greeting = document.createElement('div');
            greeting.textContent = `${personality.emoji} ${personality.greeting}`;
            greeting.style.cssText = `
                position: fixed;
                top: 70px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, ${personality.primaryColor}, ${personality.secondaryColor});
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: bold;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 10000;
                animation: greeting-slide 0.5s ease, greeting-fade 3s ease;
                pointer-events: none;
            `;

            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes greeting-slide {
                    from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
                    to { transform: translateX(-50%) translateY(0); opacity: 1; }
                }
                @keyframes greeting-fade {
                    0%, 80% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);

            document.body.appendChild(greeting);
            setTimeout(() => greeting.remove(), 3000);
        }, 500);
    }

    // Show personality message
    function showPersonalityMessage(message) {
        const msg = document.createElement('div');
        msg.textContent = message;
        msg.style.cssText = `
            position: fixed;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, ${personality.primaryColor}, ${personality.secondaryColor});
            color: white;
            padding: 12px 25px;
            border-radius: 20px;
            font-size: 15px;
            font-weight: bold;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: message-pop 0.3s ease;
        `;

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes message-pop {
                0% { transform: translateX(-50%) scale(0); }
                50% { transform: translateX(-50%) scale(1.1); }
                100% { transform: translateX(-50%) scale(1); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(msg);
        setTimeout(() => {
            msg.style.transition = 'opacity 0.5s, transform 0.5s';
            msg.style.opacity = '0';
            msg.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => msg.remove(), 500);
        }, 2500);
    }

    // Show personality reaction
    function showPersonalityReaction() {
        const reactions = {
            home: ['😊', '🥰', '💕'],
            dashboard: ['🤓', '📊', '💼'],
            control: ['💪', '⚡', '🔥'],
            cctv: ['👁️', '🔍', '🛡️'],
            index: ['🤔', '🔐', '✨']
        };

        const pageReactions = reactions[currentPage] || reactions.home;
        const reaction = pageReactions[Math.floor(Math.random() * pageReactions.length)];

        const reactionEl = document.createElement('div');
        reactionEl.textContent = reaction;
        reactionEl.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 40px;
            z-index: 10001;
            animation: reaction-bounce 1s ease;
            pointer-events: none;
        `;

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes reaction-bounce {
                0% { transform: translateX(-50%) translateY(0) scale(0); }
                50% { transform: translateX(-50%) translateY(-20px) scale(1.2); }
                100% { transform: translateX(-50%) translateY(0) scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(reactionEl);
        setTimeout(() => reactionEl.remove(), 1000);
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbarPersonality);
    } else {
        initNavbarPersonality();
    }

    console.log(`%c🎭 Navbar Personality: ${personality.name} ${personality.emoji}`, `color: ${personality.primaryColor}; font-size: 14px; font-weight: bold;`);

})();
