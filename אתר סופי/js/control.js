// ==================== CONTROL PANEL ====================

// Wait for Firebase to be available
let database;
let commandRef;

function initializeControl() {
  try {
    // Get existing Firebase instance or initialize
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
      database = firebase.database();
    } else {
      const firebaseConfig = {
        apiKey: "AIzaSyCIQYT3BUpbi1bUcaFLhOVvEP_xN3mcq4Q",
        authDomain: "smart-home-35ff0.firebaseapp.com",
        databaseURL: "https://smart-home-35ff0-default-rtdb.firebaseio.com",
        projectId: "smart-home-35ff0",
        storageBucket: "smart-home-35ff0.firebasestorage.app",
        messagingSenderId: "301885610576",
        appId: "1:301885610576:web:518cd314bcfcc7ef7c8f55",
        measurementId: "G-NRS82B0QY8"
      };
      const app = firebase.initializeApp(firebaseConfig);
      database = firebase.database();
    }
    
    // Firebase reference for sending a single command to Altera
    commandRef = database.ref("toAltera");
    
    // Get DOM elements
    const brightnessSlider = document.getElementById('brightness');
    const brightnessValue = document.querySelector('.brightness-value');
    const buttons = document.querySelectorAll('.control-group .manual-btn');
    const neoButtons = document.querySelectorAll('.neo-btn');
    
    // Guard: exit if critical elements missing
    if (!brightnessSlider || !brightnessValue || !buttons.length || !neoButtons.length) {
      console.error("Control panel: critical DOM elements missing");
      return;
    }
    
    let lastCommand = 192;
    let discoInterval = null;
    
    function sendCommandToAltera() {
      // Convert to 8-bit (0-255) and ensure it's a number
      const value = Number(lastCommand) & 0xFF;
      commandRef.set(value);
    }

    function sendCommand(value) {
      if (typeof value === 'number' && !isNaN(value)) {
        lastCommand = value;
        sendCommandToAltera();
      }
    }

    // ==================== DISCO MODE ====================
    function activateDiscoMode() {
      const body = document.body;
      body.classList.add('disco-mode');
    }
    
    function deactivateDiscoMode() {
      // Stop the disco command interval
      if (discoInterval) {
        clearInterval(discoInterval);
        discoInterval = null;
      }
      
      const body = document.body;
      body.classList.remove('disco-mode');
      
      // אפס כל הסטיילים שנשארו מהדיסקו
      body.style.background = '';
      body.style.filter = '';
      body.style.animation = '';
      
      // אפס navbar
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.background = '';
        navbar.style.animation = '';
      }
      
      // אפס כרטיסים
      document.querySelectorAll('.card').forEach(card => {
        card.style.background = '';
        card.style.boxShadow = '';
        card.style.borderColor = '';
        card.style.animation = '';
      });
      
      // אפס כפתורים
      document.querySelectorAll('button').forEach(btn => {
        btn.style.background = '';
        btn.style.color = '';
        btn.style.animation = '';
      });
      
      // אפס טקסטים
      document.querySelectorAll('.sensor-value, h2, h3').forEach(el => {
        el.style.color = '';
        el.style.textShadow = '';
        el.style.animation = '';
      });
    }
    
    // ==================== BRIGHTNESS CONTROL ====================
    brightnessSlider.addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      brightnessValue.textContent = value + "%";
      
      // Map brightness percentage to NeoPixel range (192-195)
      if (value === 0) {
        lastCommand = 192; // OFF
        deactivateDiscoMode();
      } else if (value <= 50) {
        lastCommand = 193; // 50%
        deactivateDiscoMode();
      } else {
        lastCommand = 194; // 100%
        deactivateDiscoMode();
      }
      
      sendCommandToAltera();
    });
    
    // ==================== BUTTON COMMANDS ====================
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const value = parseInt(button.dataset.val, 10);
        if (Number.isNaN(value)) {
          console.warn("Manual button missing data-val:", button);
          return;
        }

        sendCommand(value);

        // Visual feedback
        button.classList.add("active");
        setTimeout(() => {
          button.classList.remove("active");
        }, 200);
      });
    });
    
    // ==================== NEOPIXEL BUTTONS ====================
    neoButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        // תמיד כבה דיסקו קודם
        deactivateDiscoMode();
        
        switch(index) {
          case 0: // OFF
            lastCommand = 192;
            brightnessValue.textContent = "0%";
            brightnessSlider.value = 0;
            break;
          case 1: // 50%
            lastCommand = 193;
            brightnessValue.textContent = "50%";
            brightnessSlider.value = 50;
            break;
          case 2: // 100%
            lastCommand = 194;
            brightnessValue.textContent = "100%";
            brightnessSlider.value = 100;
            break;
          case 3: // Mode 3 - DISCO
            // First send 195, wait 4 seconds, then continuously send 66
            sendCommand(195);
            setTimeout(() => {
              discoInterval = setInterval(() => sendCommand(66), 500);
            }, 4000);
            brightnessValue.textContent = "🎉 דיסקו";
            
            // Activate disco mode on website
            activateDiscoMode();
            return; // Skip the sendCommandToAltera below since we handled it
        }
        
        sendCommandToAltera();
        
        // Visual feedback
        button.classList.add("active");
        setTimeout(() => {
          button.classList.remove("active");
        }, 200);
      });
    });
    
    // ==================== ALARM DISABLE TOGGLE ====================
    const alarmDisableBtn = document.getElementById('alarm-disable-btn');
    const alarmDisableStatusText = document.getElementById('alarm-disable-status');
    const alarmDisabledRef = database.ref('alarmDisabled');
    let alarmDisabled = false;
    
    // Sync with Firebase on load
    alarmDisabledRef.on('value', (snapshot) => {
      alarmDisabled = snapshot.val() === true;
      updateAlarmDisableUI();
    });
    
    function updateAlarmDisableUI() {
      if (alarmDisableBtn) {
        if (alarmDisabled) {
          alarmDisableBtn.classList.add('disabled-mode');
          alarmDisableBtn.querySelector('.alarm-icon').textContent = '🔕';
          alarmDisableBtn.querySelector('.alarm-text').textContent = 'אזעקה מושבתת';
          if (alarmDisableStatusText) alarmDisableStatusText.textContent = 'מצב: אזעקה לא תופעל על ידי חיישנים';
        } else {
          alarmDisableBtn.classList.remove('disabled-mode');
          alarmDisableBtn.querySelector('.alarm-icon').textContent = '🔔';
          alarmDisableBtn.querySelector('.alarm-text').textContent = 'אזעקה פעילה';
          if (alarmDisableStatusText) alarmDisableStatusText.textContent = 'מצב: אזעקה תופעל על ידי חיישנים';
        }
      }
    }
    
    if (alarmDisableBtn) {
      alarmDisableBtn.addEventListener('click', () => {
        alarmDisabled = !alarmDisabled;
        alarmDisabledRef.set(alarmDisabled);
        
        // Visual feedback
        alarmDisableBtn.classList.add('active');
        setTimeout(() => alarmDisableBtn.classList.remove('active'), 200);
      });
    }
    
  } catch (error) {
    console.error("Failed to initialize control:", error);
    setTimeout(initializeControl, 500);
  }
}

// Initialize when document is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeControl);
} else {
  initializeControl();
}
