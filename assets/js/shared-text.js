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
  onSnapshot,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);

function escapeAndLinebreak(s) {
  const div = document.createElement("div");
  div.textContent = s || "";
  return div.innerHTML.replace(/\n/g, "<br>");
}

function formatTimestamp(ts) {
  if (!ts || typeof ts.toDate !== "function") return "";
  const d = ts.toDate();
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  const timeStr = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (sameDay) return `today at ${timeStr}`;
  const dateStr = d.toLocaleDateString([], { month: "short", day: "numeric" });
  return `${dateStr} at ${timeStr}`;
}

function setup(root, user) {
  const sessionId = root.dataset.session;
  const fieldName = root.dataset.field;
  const placeholder = root.dataset.placeholder || "Nothing here yet.";
  if (!sessionId || !fieldName) {
    console.warn("shared-text: missing data-session or data-field", root);
    return;
  }

  root.innerHTML = `
    <div class="st-view">
      <div class="st-content"></div>
      <div class="st-meta-row">
        <span class="st-meta"></span>
        <button type="button" class="st-edit-btn">Edit</button>
      </div>
    </div>
    <div class="st-edit hidden">
      <textarea class="st-input" rows="8" placeholder="Type your notes…"></textarea>
      <div class="st-edit-row">
        <span class="st-status"></span>
        <div class="st-actions">
          <button type="button" class="st-cancel-btn">Cancel</button>
          <button type="button" class="st-save-btn">Save</button>
        </div>
      </div>
    </div>
  `;

  const viewEl = root.querySelector(".st-view");
  const editEl = root.querySelector(".st-edit");
  const contentEl = root.querySelector(".st-content");
  const metaEl = root.querySelector(".st-meta");
  const inputEl = root.querySelector(".st-input");
  const statusEl = root.querySelector(".st-status");
  const editBtn = root.querySelector(".st-edit-btn");
  const cancelBtn = root.querySelector(".st-cancel-btn");
  const saveBtn = root.querySelector(".st-save-btn");

  const docRef = doc(db, "sessions", sessionId, "fields", fieldName);
  let currentData = null;

  function showView() {
    editEl.classList.add("hidden");
    viewEl.classList.remove("hidden");
  }

  function showEdit() {
    inputEl.value = currentData?.content || "";
    statusEl.textContent = "";
    statusEl.dataset.state = "idle";
    viewEl.classList.add("hidden");
    editEl.classList.remove("hidden");
    // Resize hint: grow textarea to fit existing content
    inputEl.style.height = "auto";
    inputEl.style.height = Math.max(180, inputEl.scrollHeight) + "px";
    inputEl.focus();
  }

  function render() {
    if (currentData?.content) {
      contentEl.innerHTML = escapeAndLinebreak(currentData.content);
      contentEl.classList.remove("st-empty");
      const who = currentData.updatedBy || "someone";
      const when = formatTimestamp(currentData.updatedAt);
      metaEl.textContent = when
        ? `Last updated by ${who} ${when}`
        : `Last updated by ${who}`;
    } else {
      contentEl.innerHTML = escapeAndLinebreak(placeholder);
      contentEl.classList.add("st-empty");
      metaEl.textContent = "";
    }
  }

  // Subscribe to real-time updates so other viewers see edits immediately.
  onSnapshot(
    docRef,
    (snap) => {
      currentData = snap.exists() ? snap.data() : null;
      // Don't clobber edit mode if the viewer is actively typing.
      if (editEl.classList.contains("hidden")) render();
    },
    (err) => {
      console.error("shared-text snapshot error:", err);
      contentEl.textContent = "Couldn't load — refresh to try again.";
    }
  );

  editBtn.addEventListener("click", showEdit);
  cancelBtn.addEventListener("click", showView);

  saveBtn.addEventListener("click", async () => {
    saveBtn.disabled = true;
    statusEl.textContent = "Saving…";
    statusEl.dataset.state = "saving";
    try {
      await setDoc(docRef, {
        content: inputEl.value,
        updatedBy: user.displayName || user.email,
        updatedAt: serverTimestamp(),
      });
      statusEl.textContent = "Saved";
      statusEl.dataset.state = "saved";
      showView();
    } catch (err) {
      console.error("shared-text save error:", err);
      statusEl.textContent = "Couldn't save — try again.";
      statusEl.dataset.state = "error";
    } finally {
      saveBtn.disabled = false;
    }
  });

  // Keyboard shortcuts: Esc cancels, Ctrl/Cmd+Enter saves.
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      showView();
    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      saveBtn.click();
    }
  });

  inputEl.addEventListener("input", () => {
    inputEl.style.height = "auto";
    inputEl.style.height = inputEl.scrollHeight + "px";
  });
}

onAuthStateChanged(auth, (user) => {
  if (!user) return;
  document.querySelectorAll(".shared-text").forEach((el) => setup(el, user));
});
