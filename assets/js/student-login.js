import {
login
}
from
"../firebase/auth.js";

const form =
document.getElementById(
"loginForm"
);

if(form){

form.addEventListener(
"submit",

async(e)=>{

e.preventDefault();

try{

const data=
new FormData(form);

await login(

data.get("email"),

data.get("password")

);

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

}