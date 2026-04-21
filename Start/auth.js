import { auth } from "./firebase.js";

import {
GoogleAuthProvider,
signInWithPopup,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

// GOOGLE LOGIN
window.googleLogin = async () => {
    await signInWithPopup(auth, provider);
};

// EMAIL REGISTER
window.registerEmail = async (email,password) => {
    return await createUserWithEmailAndPassword(auth,email,password);
};

// EMAIL LOGIN
window.loginEmail = async (email,password) => {
    return await signInWithEmailAndPassword(auth,email,password);
};

// AUTO REDIRECT
onAuthStateChanged(auth, user => {
    if(user){
        window.location.href = "../Dash/dashboard.html";
    }
});
