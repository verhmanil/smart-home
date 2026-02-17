// ==================== Firebase Auth (Login) ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Firebase config (provided)
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

// Init Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app); // optional
const auth = getAuth(app);

// Elements
const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const errorBox = document.getElementById('login-error');
const toggleBtn = document.getElementById('toggle-mode');
const title = document.getElementById('auth-title');

let mode = 'login'; // 'login' | 'signup'

function setLoading(isLoading) {
  if (isLoading) {
    loginBtn.disabled = true;
    loginBtn.textContent = mode === 'login' ? 'מתחבר...' : 'יוצר חשבון...';
  } else {
    loginBtn.disabled = false;
    loginBtn.textContent = mode === 'login' ? 'התחבר' : 'צור חשבון';
  }
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorBox.textContent = '';
  setLoading(true);

  const email = emailInput.value.trim();
  const password = passInput.value;

  try {
    if (mode === 'login') {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    window.location.href = 'home.html';
  } catch (err) {
    // שגיאות נפוצות מתורגמות
    let msg = mode === 'login' ? 'שגיאת התחברות. בדוק אימייל וסיסמה.' : 'שגיאה בהרשמה. נסה שוב.';
    if (err.code === 'auth/invalid-email') msg = 'אימייל לא תקין';
    else if (err.code === 'auth/user-not-found') msg = 'משתמש לא נמצא';
    else if (err.code === 'auth/wrong-password') msg = 'סיסמה שגויה';
    else if (err.code === 'auth/email-already-in-use') msg = 'אימייל כבר קיים';
    else if (err.code === 'auth/weak-password') msg = 'סיסמה חלשה (מינ׳ 6 תווים)';
    else if (err.code === 'auth/too-many-requests') msg = 'יותר מדי ניסיונות, נסה מאוחר יותר';
    errorBox.textContent = msg;
  } finally {
    setLoading(false);
  }
});

// Toggle login/signup
toggleBtn?.addEventListener('click', () => {
  mode = mode === 'login' ? 'signup' : 'login';
  errorBox.textContent = '';
  passInput.value = '';

  if (mode === 'signup') {
    title.textContent = 'יצירת חשבון';
    loginBtn.textContent = 'צור חשבון';
    toggleBtn.textContent = 'כבר רשום? התחבר';
    passInput.placeholder = 'סיסמה (מינ׳ 6 תווים)';
  } else {
    title.textContent = 'כניסה למערכת';
    loginBtn.textContent = 'התחבר';
    toggleBtn.textContent = 'צור חשבון חדש';
    passInput.placeholder = 'סיסמה';
  }
});
