import React from "react";

function Dashboard() {

const user =
JSON.parse(localStorage.getItem("user"));

return (

<div style={{
padding:"50px",
textAlign:"center"
}}>

<h1>
Welcome {user?.name}
</h1>

<h2>
EduMind Dashboard
</h2>

<p>
Login successful 🎉
</p>

<button
onClick={()=>{
localStorage.clear();
window.location.href="/";
}}
>
Logout
</button>

</div>

);

}

export default Dashboard;