// firebase.js — Mingo
const firebaseConfig = {
  apiKey: "AIzaSyBeSKdhxxCggk9f89VEzyj1ZuiEtcSlGnk",
  authDomain: "viajechucu.firebaseapp.com",
  projectId: "viajechucu",
  storageBucket: "viajechucu.firebasestorage.app",
  messagingSenderId: "885156857434",
  appId: "1:885156857434:web:9916fee3fe41c9cecbfa63"
};

firebase.initializeApp(firebaseConfig);
const FB_AUTH = firebase.auth();
const FB_DB   = firebase.firestore();

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result   = await FB_AUTH.signInWithPopup(provider);
  return result.user;
}

function fbSignOut() { return FB_AUTH.signOut(); }

// ── People ───────────────────────────────────────────────────

function _peopleCol(uid) {
  return FB_DB.collection('users').doc(uid).collection('people');
}

async function getPeople(uid) {
  const snap = await _peopleCol(uid).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function addPerson(uid, data) {
  const ref = _peopleCol(uid).doc();
  await ref.set({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
  return ref.id;
}

async function updatePerson(uid, personId, data) {
  await _peopleCol(uid).doc(personId).update(data);
}

async function deletePerson(uid, personId) {
  await _peopleCol(uid).doc(personId).delete();
}

// ── Notes ────────────────────────────────────────────────────

function _notesCol(uid, personId) {
  return _peopleCol(uid).doc(personId).collection('notes');
}

async function getNotes(uid, personId) {
  const snap = await _notesCol(uid, personId).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function addNote(uid, personId, data) {
  const ref = _notesCol(uid, personId).doc();
  await ref.set({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
  return ref.id;
}

async function deleteNote(uid, personId, noteId) {
  await _notesCol(uid, personId).doc(noteId).delete();
}

Object.assign(window, {
  FB_AUTH, FB_DB,
  signInWithGoogle, fbSignOut,
  getPeople, addPerson, updatePerson, deletePerson,
  getNotes, addNote, deleteNote,
});
