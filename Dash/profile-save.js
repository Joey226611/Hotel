import { auth } from "./firebase.js";
import { getDatabase, ref, set }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const db = getDatabase();

window.saveProfile = async () => {

  const user = auth.currentUser;
  if (!user) return;

  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    birthDate: birthDate.value,
    language: language.value,
    theme: themeSelect.value
  };

  await set(ref(db, "users/" + user.uid), data);

  alert("Profile saved 💾");
};
