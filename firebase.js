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

// ── Trips ────────────────────────────────────────────────────

function generateInviteCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

async function createTrip(data, user) {
  const inviteCode = generateInviteCode();
  const ref = FB_DB.collection('trips').doc();
  await ref.set({
    name:        data.name,
    destination: data.destination || data.name,
    startDate:   data.startDate   || '',
    endDate:     data.endDate     || '',
    createdBy:   user.uid,
    createdAt:   firebase.firestore.FieldValue.serverTimestamp(),
    inviteCode,
    memberIds: [user.uid],
    members: {
      [user.uid]: {
        name:     user.displayName || 'Viajero',
        photoURL: user.photoURL    || null,
        role:     'admin',
        joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
    },
  });
  return ref.id;
}

async function joinTrip(code, user) {
  const snap = await FB_DB.collection('trips')
    .where('inviteCode', '==', code.toUpperCase().trim())
    .limit(1)
    .get();
  if (snap.empty) throw new Error('Código inválido. Pedíselo a quien creó el viaje.');
  const doc  = snap.docs[0];
  const data = doc.data();
  if (data.memberIds && data.memberIds.includes(user.uid)) return doc.id;
  await doc.ref.update({
    memberIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    [`members.${user.uid}`]: {
      name:     user.displayName || 'Viajero',
      photoURL: user.photoURL    || null,
      role:     'member',
      joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
    },
  });
  return doc.id;
}

async function getUserTrip(uid) {
  const snap = await FB_DB.collection('trips')
    .where('memberIds', 'array-contains', uid)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

async function getTrip(tripId) {
  const doc = await FB_DB.collection('trips').doc(tripId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function removeTripMember(tripId, memberId) {
  await FB_DB.collection('trips').doc(tripId).update({
    memberIds:             firebase.firestore.FieldValue.arrayRemove(memberId),
    [`members.${memberId}`]: firebase.firestore.FieldValue.delete(),
  });
}

Object.assign(window, {
  FB_AUTH, FB_DB,
  signInWithGoogle, fbSignOut,
  createTrip, joinTrip, getUserTrip, getTrip, removeTripMember,
});
