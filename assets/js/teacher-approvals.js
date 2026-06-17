import {
db
}
from
"../firebase/firebase-config.js";

import {
collection,
getDocs,
doc,
updateDoc
}
from
"https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const container =
document.getElementById(
"applications"
);



async function loadApplications(){

const snap =
await getDocs(
collection(
db,
"batchApplications"
)
);

container.innerHTML="";

snap.forEach(
(app)=>{

const data=
app.data();

if(
data.status!=="pending"
)
return;

container.innerHTML+=`

<div class="approval-card">

<p>
Student:
${data.studentId}
</p>

<p>
Batch:
${data.batchId}
</p>

<button
class="approve-btn"
data-id="${app.id}">

Approve

</button>

</div>

`;

});



document
.querySelectorAll(
".approve-btn"
)

.forEach(

btn=>{

btn.onclick=
()=>approve(
btn.dataset.id
);

}

);

}



async function approve(
id
){

await updateDoc(

doc(
db,
"batchApplications",
id
),

{

status:
"approved"

}

);

alert(
"Approved"
);

loadApplications();

}



loadApplications();