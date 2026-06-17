import {
db
}
from
"../firebase/firebase-config.js";

import {
collection,
getDocs,
query,
where,
doc,
setDoc,
serverTimestamp
}
from
"https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const batchSelect =
document.getElementById(
"batchSelect"
);

const examName =
document.getElementById(
"examName"
);

const studentsTable =
document.getElementById(
"studentsTable"
);

const saveBtn =
document.getElementById(
"saveResults"
);



async function loadBatches(){

const snap=
await getDocs(
collection(
db,
"batches"
)
);

snap.forEach(
b=>{

batchSelect.innerHTML+=`

<option
value="${b.id}">

${b.data().name}

</option>

`;

});

}



async function loadStudents(){

studentsTable.innerHTML="";

const batchId=
batchSelect.value;

const apps=
await getDocs(

query(

collection(
db,
"batchApplications"),

where(
"batchId",
"==",
batchId
),

where(
"status",
"==",
"approved"
)

)

);



for(
const app
of
apps.docs
){

const data=
app.data();

studentsTable.innerHTML+=`

<tr>

<td>

${data.studentId}

</td>

<td>

<input
type="number"
min="0"
max="100"
class="marks"
data-id="${data.studentId}">

</td>

</tr>

`;

}



}



async function saveExam(){

const marks=
document
.querySelectorAll(
".marks"
);

for(
const row
of
marks
){

await setDoc(

doc(

collection(
db,
"results"
)

),

{

batchId:
batchSelect.value,

studentId:
row.dataset.id,

exam:
examName.value,

marks:
Number(
row.value
),

createdAt:
serverTimestamp()

}

);

}



alert(
"Results Uploaded"
);

}



batchSelect
.addEventListener(
"change",
loadStudents
);

saveBtn
.addEventListener(
"click",
saveExam
);

loadBatches();