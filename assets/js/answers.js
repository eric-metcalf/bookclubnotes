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

// Shared status pill for a group of inputs (e.g. the Likert block).
// Flashes text and dismisses on a timeout for "saved" state.
function makeGroupStatus(containerEl) {
  const el = containerEl?.querySelector(".group-save-status");
  let clearTimer;
  return (text, state) => {
    if (!el) return;
    clearTimeout(clearTimer);
    el.textContent = text;
    el.dataset.state = state;
    if (state === "saved") {
      clearTimer = setTimeout(() => {
        el.textContent = "";
        el.dataset.state = "idle";
      }, 1500);
    }
  };
}

function setupTextarea(ta, userDocRef, data) {
  const qid = ta.dataset.questionId;
  if (data[qid]?.answer != null) ta.value = data[qid].answer;
  autosize(ta);
  setStatus(ta, "", "idle");

  const save = debounce(async () => {
    setStatus(ta, "Saving…", "saving");
    try {
      await setDoc(
        userDocRef,
        {
          [qid]: { answer: ta.value, updatedAt: serverTimestamp() },
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
}

function setupLikertRow(row, userDocRef, data, flashStatus) {
  const qid = row.dataset.questionId;
  const existing = data[qid]?.answer;
  if (existing != null) {
    const match = row.querySelector(
      `input[type="radio"][value="${existing}"]`
    );
    if (match) match.checked = true;
  }

  row.querySelectorAll('input[type="radio"]').forEach((r) => {
    r.addEventListener("change", async () => {
      if (!r.checked) return;
      flashStatus("Saving…", "saving");
      try {
        await setDoc(
          userDocRef,
          {
            [qid]: { answer: r.value, updatedAt: serverTimestamp() },
          },
          { merge: true }
        );
        flashStatus("Saved", "saved");
      } catch (err) {
        console.error("Failed to save:", err);
        flashStatus("Couldn't save", "error");
      }
    });
  });
}

onAuthStateChanged(auth, async (user) => {
  if (!user || !DATE_ID) return;

  const userDocRef = doc(db, "users", user.uid, "answers", DATE_ID);
  const textareas = document.querySelectorAll("textarea[data-question-id]");
  const likertBlocks = document.querySelectorAll(".likert-block");

  let data = {};
  try {
    const snap = await getDoc(userDocRef);
    data = snap.exists() ? snap.data() : {};
  } catch (err) {
    console.error("Failed to load answers:", err);
    textareas.forEach((ta) => setStatus(ta, "Couldn't load", "error"));
    return;
  }

  textareas.forEach((ta) => setupTextarea(ta, userDocRef, data));

  likertBlocks.forEach((block) => {
    const flash = makeGroupStatus(block);
    block
      .querySelectorAll(".likert-row[data-question-id]")
      .forEach((row) => setupLikertRow(row, userDocRef, data, flash));
  });
});
