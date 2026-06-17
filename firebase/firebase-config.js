import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import { getMessaging }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging.js";

const firebaseConfig = {
apiKey: "AIzaSyACSiynLPxopfyXBD_CFtGgib7uD43NZAU",

authDomain:
"biobyte-14e38.firebaseapp.com",

projectId:
"biobyte-14e38",

storageBucket:
"biobyte-14e38.firebasestorage.app",

messagingSenderId:
"12921699605",

appId:
"1:12921699605:web:5be73ca051f9cafb003d1c"
};

const app =
initializeApp(
firebaseConfig
);

export const auth =
getAuth(app);

export const db =
getFirestore(app);

export const messaging =
getMessaging(app);

export default app;