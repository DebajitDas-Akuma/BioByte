import {
studentEmailSignup
}
from
"../firebase/auth.js";

const form =
document.getElementById(
"signupForm"
);

if(
form
){

form.addEventListener(
"submit",

async(
e
)=>{

e.preventDefault();

try{

const data=
new FormData(
form
);


console.log({
name:data.get("name"),
email:data.get("email"),
password:data.get("password"),
whatsapp:data.get("whatsapp"),
studentClass:data.get("class")
});

await studentEmailSignup({

name:
data.get("name"),

email:
data.get("email"),

password:
data.get("password"),

whatsapp:
data.get("whatsapp"),

studentClass:
data.get("class")

});

window.location.href=
"./apply-batch.html";

}

catch(err){

alert(
err.message
);

}

}

);

}