// firebase.js — inicialización Firebase (compat SDK cargado vía CDN)
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
  const user     = result.user;
  const ref      = FB_DB.collection('users').doc(user.uid);
  const snap     = await ref.get();
  if (!snap.exists) {
    await ref.set({
      name:      user.displayName,
      email:     user.email,
      photoURL:  user.photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
  return user;
}

function fbSignOut() {
  return FB_AUTH.signOut();
}

Object.assign(window, { FB_AUTH, FB_DB, signInWithGoogle, fbSignOut });
