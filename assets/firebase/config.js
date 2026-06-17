// Firebase configuration
// (keys added later)

import { initializeApp } from "firebase/app";
import {
getFirestore
} from "firebase/firestore";

import {
getAuth
} from "firebase/auth";

import {
getMessaging
} from "firebase/messaging";

const firebaseConfig = {
apiKey: "",
authDomain: "",
projectId: "",
storageBucket: "",
messagingSenderId: "",
appId: ""
};

const app =
initializeApp(firebaseConfig);

export const db =
getFirestore(app);

export const auth =
getAuth(app);

export const messaging =
getMessaging(app);