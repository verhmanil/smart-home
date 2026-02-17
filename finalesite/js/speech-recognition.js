// ==================== SPEECH RECOGNITION WITH FIREBASE INTEGRATION ====================

// 1. הגדרות אלמנטים מה-HTML
const listenBtn = document.getElementById("listen-btn");
const voiceText = document.getElementById("voice-text");
const voiceStatus = document.querySelector(".voice-status");

// 2. הגדרת שפה לעברית
const LANG = "he-IL";

// 3. חיבור ל-Firebase
let databaseRef = null;

const initializeDatabase = () => {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        try {
            databaseRef = firebase.database().ref("toAltera");
            return true;
        } catch (error) {
            console.error("שגיאה באיתחול Firebase:", error);
            return false;
        }
    }
    return false;
};

const getDatabaseRef = () => {
    if (!databaseRef) {
        initializeDatabase();
    }
    return databaseRef;
};

// 4. יצירת אובייקט זיהוי קולי
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    if (voiceStatus) {
        voiceStatus.textContent = "❌ הדפדפן אינו תומך בזיהוי קולי";
        voiceStatus.style.color = "#ff4444";
    }
    if (listenBtn) listenBtn.disabled = true;
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = LANG;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let isListening = false;

    // המתנה לטעינת Firebase
    setTimeout(() => {
        if (initializeDatabase()) {
            if (voiceStatus) voiceStatus.textContent = "✅ מוכן לפקודות קוליות";
        } else {
            if (voiceStatus) voiceStatus.textContent = "⚠️ ממתין לחיבור Firebase...";
            setTimeout(initializeDatabase, 1000);
        }
    }, 500);

    // אירוע תחילת האזנה
    recognition.onstart = () => {
        if (listenBtn) {
            listenBtn.classList.add('listening');
        }
        if (voiceStatus) voiceStatus.textContent = "🎤 מקשיב עכשיו...";
        if (voiceText) voiceText.textContent = "";
    };

    // עיבוד תוצאות הדיבור
    recognition.onresult = (event) => {
        let transcript = "";
        let isFinal = false;
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript = event.results[i][0].transcript;
            isFinal = event.results[i].isFinal;
            
            if (!isFinal) {
                // טקסט ביניים
                if (voiceText) voiceText.textContent = transcript + "...";
            } else {
                // תוצאה סופית
                if (voiceText) voiceText.textContent = transcript;
                const cmd = transcript.toLowerCase().trim();
                
                // מעבד פקודה ישירות
                processVoiceCommand(cmd);
            }
        }
    };

    // סיום האזנה
    recognition.onend = () => {
        if (listenBtn) listenBtn.classList.remove('listening');
        if (voiceStatus) voiceStatus.textContent = "✅ מוכן לפקודות קוליות";
        isListening = false;
    };

    // טיפול בשגיאות
    recognition.onerror = (event) => {
        console.error("❌ שגיאת זיהוי קולי:", event.error);
        
        if (listenBtn) listenBtn.classList.remove('listening');
        isListening = false;
        
        if (event.error === 'no-speech') {
            if (voiceStatus) voiceStatus.textContent = "⚠️ לא זוהה דיבור, נסה שוב";
        } else if (event.error === 'audio-capture') {
            if (voiceStatus) voiceStatus.textContent = "❌ בעיית גישה למיקרופון";
        } else if (event.error === 'not-allowed') {
            if (voiceStatus) voiceStatus.textContent = "❌ אין הרשאה למיקרופון";
        } else if (event.error === 'network') {
            if (voiceStatus) voiceStatus.textContent = "❌ בעיית רשת";
        } else if (event.error !== 'aborted') {
            if (voiceStatus) voiceStatus.textContent = "⚠️ שגיאה: " + event.error;
        }
    };

    // כפתור האזנה
    if (listenBtn) {
        listenBtn.addEventListener("click", () => {
            if (!isListening) {
                if (!getDatabaseRef()) {
                    if (voiceStatus) voiceStatus.textContent = "❌ Firebase לא מוכן עדיין";
                    return;
                }
                
                isListening = true;
                try {
                    recognition.start();
                } catch (e) {
                    console.error("שגיאת התחלת האזנה:", e);
                    isListening = false;
                    if (listenBtn) listenBtn.classList.remove('listening');
                    if (voiceStatus) voiceStatus.textContent = "❌ לא ניתן להתחיל האזנה";
                }
            } else {
                recognition.stop();
                isListening = false;
                if (listenBtn) listenBtn.classList.remove('listening');
                if (voiceStatus) voiceStatus.textContent = "✅ מוכן לפקודות קוליות";
            }
        });
    }
}

/**
 * פונקציה המנתחת את הדיבור ושולחת ערך ל-Firebase
 */
function processVoiceCommand(cmd) {
    const commandRef = getDatabaseRef();
    if (!commandRef) {
        if (voiceStatus) voiceStatus.textContent = "❌ Firebase לא מחובר";
        console.error("לא ניתן לשלוח פקודה - Firebase לא מוכן");
        return;
    }

    let val = null;
    let name = "";

    // מיפוי פקודות לערכים (תואם ל-control.js)
    
    // ==================== מאוורר / FAN ====================
    if (cmd.includes("מאוורר") || cmd.includes("מניפה") || cmd.includes("fan") || cmd.includes("וונטילטור") || cmd.includes("מפוח")) {
        if (cmd.includes("הדלק") || cmd.includes("תדליק") || cmd.includes("פתח") || cmd.includes("הפעל") || 
            cmd.includes("on") || cmd.includes("start") || cmd.includes("דלוק") || cmd.includes("תפעיל")) {
            val = 1; 
            name = "מאוורר דולק";
        } else if (cmd.includes("כבה") || cmd.includes("תכבה") || cmd.includes("סגור") || cmd.includes("עצור") || 
                   cmd.includes("off") || cmd.includes("stop") || cmd.includes("כבוי") || cmd.includes("תסגור")) {
            val = 0; 
            name = "מאוורר כבוי";
        }
    }
    
    // ==================== דלת / DOOR ====================
    else if (cmd.includes("דלת") || cmd.includes("door") || cmd.includes("שער") || cmd.includes("כניסה")) {
        if (cmd.includes("פתח") || cmd.includes("תפתח") || cmd.includes("פתיחה") || cmd.includes("open") || 
            cmd.includes("הפתח") || cmd.includes("לפתוח") || cmd.includes("פותח")) {
            val = 129; 
            name = "דלת נפתחת";
        } else if (cmd.includes("סגור") || cmd.includes("תסגור") || cmd.includes("סגירה") || cmd.includes("close") || 
                   cmd.includes("הסגר") || cmd.includes("לסגור") || cmd.includes("סוגר")) {
            val = 128; 
            name = "דלת נסגרת";
        }
    }
    
    // ==================== זמזום / BUZZER ====================
    else if (cmd.includes("זמזום") || cmd.includes("זמזם") || cmd.includes("צפצוף") || cmd.includes("רעש") || 
             cmd.includes("buzzer") || cmd.includes("צלצול") || cmd.includes("צפצף") || cmd.includes("באזר")) {
        if (cmd.includes("הדלק") || cmd.includes("תדליק") || cmd.includes("הפעל") || cmd.includes("on") || 
            cmd.includes("start") || cmd.includes("צפצף") || cmd.includes("תצפצף")) {
            val = 65; 
            name = "זמזום פועל";
        } else if (cmd.includes("כבה") || cmd.includes("תכבה") || cmd.includes("עצור") || cmd.includes("off") || 
                   cmd.includes("stop") || cmd.includes("שתוק") || cmd.includes("תעצור")) {
            val = 64; 
            name = "זמזום כבוי";
        }
    }
    
    // ==================== תאורה / LIGHT ====================
    else if (cmd.includes("אור") || cmd.includes("תאורה") || cmd.includes("light") || cmd.includes("נורה") || 
             cmd.includes("לד") || cmd.includes("led") || cmd.includes("נאו") || cmd.includes("neo") || cmd.includes("אורות")) {
        
        // כיבוי מלא
        if (cmd.includes("כבה") || cmd.includes("תכבה") || cmd.includes("אפס") || cmd.includes("off") || 
            cmd.includes("כבוי") || cmd.includes("סגור") || cmd.includes("0") || cmd.includes("תכבי")) {
            val = 192; 
            name = "אור כבוי";
        }
        // 50%
        else if (cmd.includes("50") || cmd.includes("חצי") || cmd.includes("half") || cmd.includes("חמישים") || 
                 cmd.includes("באמצע") || cmd.includes("middle") || cmd.includes("בינוני") || cmd.includes("חלש")) {
            val = 193; 
            name = "אור 50%";
        }
        // 100%
        else if (cmd.includes("100") || cmd.includes("מלא") || cmd.includes("full") || cmd.includes("מקסימום") || 
                 cmd.includes("max") || cmd.includes("הכי חזק") || cmd.includes("מאה") || cmd.includes("הדלק") ||
                 cmd.includes("תדליק") || cmd.includes("on") || cmd.includes("חזק")) {
            val = 194; 
            name = "אור 100%";
        }
        // דיסקו
        else if (cmd.includes("דיסקו") || cmd.includes("disco") || cmd.includes("מסיבה") || cmd.includes("party")) {
            val = 66; 
            name = "מצב דיסקו 🎉";
        }
        // מצב 3 מיוחד
        else if (cmd.includes("מצב 3") || cmd.includes("מצב שלוש") || cmd.includes("mode 3") || 
                 cmd.includes("שלושה") || cmd.includes("מיוחד") || cmd.includes("special") || cmd.includes("3")) {
            val = 66; 
            name = "מצב דיסקו 🎉";
        }
    }
    
    // ==================== דיסקו ישיר ====================
    else if (cmd.includes("דיסקו") || cmd.includes("disco") || cmd.includes("מסיבה") || cmd.includes("party") ||
             cmd.includes("צבעוני") || cmd.includes("צבעים")) {
        val = 66;
        name = "מצב דיסקו 🎉";
    }
    
    // ==================== פקודות קיצור (ללא ציון מכשיר ספציפי) ====================
    // פתח - יפתח דלת
    else if (cmd === "פתח" || cmd === "תפתח" || cmd === "open" || cmd === "פתיחה" || cmd === "פותח") {
        val = 129;
        name = "דלת נפתחת";
    }
    // סגור - יסגור דלת
    else if (cmd === "סגור" || cmd === "תסגור" || cmd === "close" || cmd === "סגירה" || cmd === "סוגר") {
        val = 128;
        name = "דלת נסגרת";
    }
    // הדלק - ידליק אור במצב מקסימלי
    else if (cmd === "הדלק" || cmd === "תדליק" || cmd === "on" || cmd === "דלוק") {
        val = 194;
        name = "אור 100%";
    }
    // כבה - יכבה אור
    else if (cmd === "כבה" || cmd === "תכבה" || cmd === "off" || cmd === "כבוי") {
        val = 192;
        name = "אור כבוי";
    }
    
    // שליחה ל-Firebase ועדכון ה-UI
    if (val !== null) {
        try {
            commandRef.set(val); // עדכון הנתיב toAltera
            if (voiceStatus) voiceStatus.textContent = "✅ בוצע: " + name;
            if (voiceText) voiceText.style.color = "#00ff88";

            
            // איפוס צבע אחרי 2 שניות
            setTimeout(() => {
                if (voiceText) voiceText.style.color = "";
                if (voiceStatus) voiceStatus.textContent = "✅ מוכן לפקודות קוליות";
            }, 2000);
            
            // הדמיית לחיצה על הכפתור הקיים ב-UI
            simulateButtonClick(val);
        } catch (error) {
            console.error("שגיאה בשליחת פקודה ל-Firebase:", error);
            if (voiceStatus) voiceStatus.textContent = "❌ שגיאה בשליחה";
        }
    } else {
        if (voiceStatus) voiceStatus.textContent = "❓ לא הבנתי: '" + cmd + "'";
        if (voiceText) voiceText.style.color = "#ff8800";
        
        setTimeout(() => {
            if (voiceText) voiceText.style.color = "";
            if (voiceStatus) voiceStatus.textContent = "✅ מוכן לפקודות קוליות";
        }, 3000);
    }
}

/**
 * פונקציה שמוצאת את הכפתור ב-UI עם הערך המתאים ומפעילה לו אפקט ויזואלי
 */
function simulateButtonClick(val) {
    const buttons = document.querySelectorAll('.manual-btn, .neo-btn');
    buttons.forEach(btn => {
        if (parseInt(btn.dataset.val) === val) {
            btn.classList.add("active");
            setTimeout(() => btn.classList.remove("active"), 300);
        }
    });
}