import {
auth,
db
}
from
"../firebase/firebase-config.js";

import {
collection,
query,
where,
getDocs,
doc,
getDoc
}
from
"https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const studentName =
document.getElementById(
"studentName"
);

const approved =
document.getElementById(
"approvedBatches"
);

const applications =
document.getElementById(
"applicationsGrid"
);



async function loadDashboard(){

const user=
auth.currentUser;

if(!user){

window.location.href=
"./login.html";

return;

}



const userDoc=
await getDoc(
doc(
db,
"users",
user.uid
)
);

if(
studentName &&
userDoc.exists()
){

studentName.textContent=
userDoc.data().name;

}



const apps=
await getDocs(

query(

collection(
db,
"batchApplications"
),

where(
"studentId",
"==",
user.uid
)

)

);



approved.innerHTML="";
applications.innerHTML="";



for(
const item
of
apps.docs
){

const data=
item.data();

applications.innerHTML+=`

<div class="application-card">

<h3>
${data.batchId}
</h3>

<p>
${data.status}
</p>

</div>

`;



if(
data.status!=="approved"
)
continue;



const batch=
await getDoc(

doc(
db,
"batches",
data.batchId
)

);



if(
batch.exists()
){

const b=
batch.data();

approved.innerHTML+=`

<div class="batch-card">

<h2>
${b.name}
</h2>

<p>
${b.class}
</p>

<p>
${b.timings}
</p>

<a
href="${b.driveLink}"
target="_blank">

Open Materials

</a>

</div>

`;

}

}



if(
approved.innerHTML===""
){

approved.innerHTML=
`
<p>
No approved batches
</p>
`;

}

}



auth.onAuthStateChanged(
loadDashboard
);