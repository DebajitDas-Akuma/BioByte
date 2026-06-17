import {
db,
auth
}
from
"../firebase/firebase-config.js";

import {
collection,
getDocs,
doc,
setDoc,
serverTimestamp
}
from
"https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const grid =
document.querySelector(
".batch-grid"
);

async function loadBatches(){

const snap =
await getDocs(
collection(
db,
"batches"
)
);

grid.innerHTML="";

snap.forEach(
(batch)=>{

const data=
batch.data();

grid.innerHTML+=`

<article class="batch-item">

<div>

<h2>${data.name}</h2>

<p>${data.class}</p>

<p>${data.timings}</p>

</div>

<button
class="btn btn--primary apply-btn"
data-id="${batch.id}">

Apply

</button>

</article>

`;

});



document
.querySelectorAll(
".apply-btn"
)

.forEach(

btn=>{

btn.onclick=
()=>apply(
btn.dataset.id
);

}

);

}



async function apply(
batchId
){

const user=
auth.currentUser;

if(
!user
){

alert(
"Login required"
);

return;

}

await setDoc(

doc(
db,
"batchApplications",
`${user.uid}_${batchId}`
),

{

studentId:
user.uid,

batchId,

status:
"pending",

createdAt:
serverTimestamp()

}

);

alert(
"Application sent"
);

}



loadBatches();