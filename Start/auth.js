import { auth } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

// 🔐 GOOGLE LOGIN
export async function loginGoogle() {
  return await signInWithPopup(auth, provider);
}

// ✉️ REGISTER
export async function registerEmail(email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCred.user);
  return userCred;
}

// 🔑 LOGIN
export async function loginEmail(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
