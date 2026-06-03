import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){

const navigate=useNavigate();

const[name,setName]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const register=async()=>{

await fetch(

"http://localhost:8081/api/auth/register",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,
email,
password

})

}

);

alert("Registered");

navigate("/");

};

return(

<div>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={register}>
Register
</button>

</div>

);

}

export default Register;