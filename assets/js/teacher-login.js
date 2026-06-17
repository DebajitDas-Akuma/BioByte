import {
auth,
db
}
from
"../firebase/firebase-config.js";

import {
signInWithEmailAndPassword
}
from
"https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
collection,
query,
where,
getDocs
}
from
"https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const form =
document.getElementById(
"teacherLoginForm"
);

form.addEventListener(
"submit",

async(e)=>{

e.preventDefault();

try{

const data=
new FormData(form);

const email=
data.get("email");

const password=
data.get("password");

await signInWithEmailAndPassword(
auth,
email,
password
);

const snap=
await getDocs(

query(
collection(
db,
"teachers"
),

where(
"email",
"==",
email
)

)

);

if(
snap.empty
){

alert(
"Not a teacher account"
);

await auth.signOut();

return;

}

window.location.href=
"./dashboard.html";

}

catch(err){

console.error(err);

alert(
err.message
);

}

}
);