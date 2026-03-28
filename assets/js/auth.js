import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// FIREBASE_CONFIG and ALLOWED_EMAILS are injected by Jekyll in default.html
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const overlay = document.getElementById("auth-overlay");
const pageContent = document.getElementById("page-content");
const signinBtn = document.getElementById("google-signin-btn");
const signOutBtn = document.getElementById("sign-out-btn");
const userNameEl = document.getElementById("user-name");
const authError = document.getElementById("auth-error");

function showError(msg) {
  authError.textContent = msg;
  authError.classList.remove("hidden");
}

function clearError() {
  authError.classList.add("hidden");
  authError.textContent = "";
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    if (ALLOWED_EMAILS.includes(user.email.toLowerCase())) {
      overlay.classList.add("fade-out");
      setTimeout(() => overlay.classList.add("hidden"), 400);
      pageContent.classList.remove("hidden");
      userNameEl.textContent = user.displayName || user.email;
    } else {
      // Not on the list — sign them back out
      showError(
        `${user.email} isn't on the guest list. Reach out to the organizer to get access.`
      );
      await signOut(auth);
    }
  } else {
    overlay.classList.remove("hidden", "fade-out");
    pageContent.classList.add("hidden");
  }
});

signinBtn.addEventListener("click", async () => {
  clearError();
  signinBtn.disabled = true;
  signinBtn.textContent = "Signing in…";

  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error("Firebase auth error:", err.code, err.message);
    if (err.code !== "auth/popup-closed-by-user") {
      showError(`Sign-in failed: ${err.code || err.message}`);
    }
    signinBtn.disabled = false;
    signinBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#fff" opacity=".9"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#fff" opacity=".9"/>
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#fff" opacity=".9"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#fff" opacity=".9"/>
      </svg>
      Sign in with Google`;
  }
});

signOutBtn.addEventListener("click", () => signOut(auth));
