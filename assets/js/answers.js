import {
  getApps,
  initializeApp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);

const DATE_ID = window.ANSWERS_DATE_ID;
const DEBOUNCE_MS = 700;

// ---- Hide/show-all-answers toggle (runs before auth is resolved) -----
const TOGGLE_KEY = `answersHidden:${DATE_ID || "default"}`;

function applyHiddenState(hidden) {
  document.body.classList.toggle("answers-hidden", hidden);
  document.querySelectorAll("[data-answers-toggle]").forEach((btn) => {
    btn.textContent = hidden ? "Show my answers" : "Hide my answers";
    btn.setAttribute("aria-pressed", hidden ? "true" : "false");
  });
}

applyHiddenState(localStorage.getItem(TOGGLE_KEY) === "1");

document.querySelectorAll("[data-answers-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const nowHidden = !document.body.classList.contains("answers-hidden");
    applyHiddenState(nowHidden);
    localStorage.setItem(TOGGLE_KEY, nowHidden ? "1" : "0");
  });
});

// ---- Firestore load/save ---------------------------------------------
function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function setStatus(textareaEl, text, state) {
  const statusEl = textareaEl
    .closest(".answer-area")
    ?.querySelector(".save-status");
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.dataset.state = state;
}

function autosize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

onAuthStateChanged(auth, async (user) => {
  if (!user || !DATE_ID) return;

  const userDocRef = doc(db, "users", user.uid, "answers", DATE_ID);
  const textareas = document.querySelectorAll("textarea[data-question-id]");

  try {
    const snap = await getDoc(userDocRef);
    const data = snap.exists() ? snap.data() : {};
    textareas.forEach((ta) => {
      const qid = ta.dataset.questionId;
      if (data[qid]?.answer != null) {
        ta.value = data[qid].answer;
      }
      autosize(ta);
      setStatus(ta, "", "idle");
    });
  } catch (err) {
    console.error("Failed to load answers:", err);
    textareas.forEach((ta) => setStatus(ta, "Couldn't load", "error"));
  }

  textareas.forEach((ta) => {
    const qid = ta.dataset.questionId;

    const save = debounce(async () => {
      setStatus(ta, "Saving…", "saving");
      try {
        await setDoc(
          userDocRef,
          {
            [qid]: {
              answer: ta.value,
              updatedAt: serverTimestamp(),
            },
          },
          { merge: true }
        );
        setStatus(ta, "Saved", "saved");
      } catch (err) {
        console.error("Failed to save:", err);
        setStatus(ta, "Couldn't save", "error");
      }
    }, DEBOUNCE_MS);

    ta.addEventListener("input", () => {
      autosize(ta);
      setStatus(ta, "Typing…", "typing");
      save();
    });
  });
});
