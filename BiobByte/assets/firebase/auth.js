import {
auth,
db
}
from "./firebase-config.js";

import {
GoogleAuthProvider,
signInWithPopup,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
setPersistence,
browserLocalPersistence,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
doc,
setDoc,
getDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

await setPersistence(
auth,
browserLocalPersistence
);



export async function studentGoogleSignup(
extraData
){

const provider =
new GoogleAuthProvider();

const result =
await signInWithPopup(
auth,
provider
);

const user =
result.user;

const ref =
doc(
db,
"users",
user.uid
);

const existing =
await getDoc(ref);

if(
!existing.exists()
){

await setDoc(
ref,
{

uid:
user.uid,

name:
user.displayName ||

"",

email:
user.email ||

"",

whatsapp:
extraData.whatsapp ||

"",

class:
extraData.class ||

"",

role:
"student",

createdAt:
serverTimestamp()

}

);

}

return user;

}



export async function studentEmailSignup({

email,
password,
name,
whatsapp,
studentClass

}){

const result =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user =
result.user;

await setDoc(

doc(
db,
"users",
user.uid
),

{

uid:
user.uid,

name,

email,

whatsapp,

class:
studentClass,

role:
"student",

createdAt:
serverTimestamp()

}

);

return user;

}



export async function login(
email,
password
){

return signInWithEmailAndPassword(
auth,
email,
password
);

}



export function observeUser(
callback
){

return onAuthStateChanged(
auth,
callback
);

}