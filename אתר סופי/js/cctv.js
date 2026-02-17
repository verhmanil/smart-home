// ==================== CCTV & ALARM MONITORING ====================

// Use existing Firebase instance or initialize if needed
let database;

function initializeCCTV() {
  try {
    // Check if Firebase is already initialized
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
      database = firebase.database();
    } else {
      // Initialize Firebase if not already done
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

    setupAlarmSystem();
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

function setupAlarmSystem() {
  // Get alarm elements
  const alarmIndicator = document.getElementById('alarm-indicator');
  const alarmStatus = document.getElementById('alarm-status');

  // Guard: exit if critical elements missing
  if (!alarmIndicator || !alarmStatus) {
    console.error("CCTV: alarm elements missing");
    return;
  }

  // Reference to alarm sensor value (fromAltera/C)
  const alarmRef = database.ref("/fromAltera/C");
  // Reference to send buzzer commands (toAltera)
  const buzzerRef = database.ref("/toAltera");
  // Reference to alarm state (persistent until manually disabled)
  const alarmStateRef = database.ref("/alarmState");
  // Reference to check if alarm is disabled
  const alarmDisabledRef = database.ref("/alarmDisabled");

  // Track previous C value to detect changes
  let previousCValue = null;
  let isFirstRead = true;
  let isAlarmDisabled = false;
  
  // Listen for alarm disabled state
  alarmDisabledRef.on("value", (snapshot) => {
    isAlarmDisabled = snapshot.val() === true;
  });

  // Listen for C value changes (0-255)
  alarmRef.on("value", (snapshot) => {
    const currentCValue = snapshot.val();
    
    // Skip first read to establish baseline
    if (isFirstRead) {
      previousCValue = currentCValue;
      isFirstRead = false;
      return;
    }
    
    // Detect any change in C value - only trigger if alarm is not disabled
    if (currentCValue !== previousCValue && !isAlarmDisabled) {
      alarmStateRef.set(1);
    }
    
    previousCValue = currentCValue;
  });

  // Listen to alarm state to control visual/audio alarm
  alarmStateRef.on("value", (snapshot) => {
    const state = snapshot.val();
    
    if (state === 1) {
      alarmIndicator.classList.add('alarm-active');
      alarmStatus.textContent = "🔴 אזעקה פעילה!";
      buzzerRef.set(65);
    } else {
      alarmIndicator.classList.remove('alarm-active');
      alarmStatus.textContent = "מערכת רגועה";
      buzzerRef.set(64);
    }
  });

  // Manual alarm disable function
  window.disableAlarm = function() {
    alarmStateRef.set(0);
  };
}

// Image capture function
function captureImage() {
  const img = document.getElementById('stream');
  if (!img || !img.complete) {
    console.error("Stream image not available");
    return;
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  if (canvas.width === 0 || canvas.height === 0) {
    console.error("Invalid image dimensions");
    return;
  }
  
  canvas.getContext('2d').drawImage(img, 0, 0);
  const link = document.createElement('a');
  link.download = 'capture_' + new Date().getTime() + '.jpg';
  link.href = canvas.toDataURL('image/jpeg');
  link.click();
}

// Make captureImage available globally
window.captureImage = captureImage;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCCTV);
} else {
  initializeCCTV();
}
