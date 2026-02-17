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

// Initialize Firebase (reuse existing app if already initialized)
if (typeof firebase !== "undefined" && firebase.apps && firebase.apps.length > 0) {
  firebase.app();
} else {
  firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

const tempElement = document.getElementById('temp');
const humidityElement = document.getElementById('humidity');
const doorElement = document.getElementById('door');

// Guard: exit if critical elements missing
if (!tempElement || !humidityElement || !doorElement) {
  console.error("Dashboard: critical DOM elements missing");
  throw new Error("Dashboard initialization failed");
}    

const tempRef = database.ref("/fromAltera/A");
const humidityRef = database.ref("/fromAltera/B");
const doorStatusRef = database.ref("/toAltera");

// עדכון טמפרטורה
tempRef.on("value", (snapshot) => {
  const temp = snapshot.val();
  if (tempElement && temp !== null) {
    tempElement.textContent = temp + " °C";
  }
});

// עדכון לחות
humidityRef.on("value", (snapshot) => {
  const humidity = snapshot.val();
  if (humidityElement && humidity !== null) {
    humidityElement.textContent = humidity + " %";
  }
});

// עדכון מצב דלת מחיישן
doorStatusRef.on("value", (snapshot) => {
  const val = snapshot.val();
  if (!doorElement) return;
  
  if (val === 129) {
    doorElement.textContent = "פתוחה";
    doorElement.style.color = "rgb(29, 249, 9)";
  } else if (val === 128) {
    doorElement.textContent = "נעולה";
    doorElement.style.color = "#ea0303";
  } else {
    doorElement.textContent = "מצב לא ידוע";
    doorElement.style.color = "#a0a8b5";
  }
});