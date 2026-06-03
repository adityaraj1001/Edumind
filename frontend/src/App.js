import React,{useState,useEffect} from "react";

import{
BrowserRouter,
Routes,
Route,
Navigate,
useNavigate,
Link
}

from "react-router-dom";

import "./App.css";






function Login(){

const navigate=useNavigate();

const[email,setEmail]=useState("");

const[password,setPassword]=useState("");

const[loading,setLoading]=useState(false);

const[showPw,setShowPw]=useState(false);



if(localStorage.getItem("user")){

return <Navigate to="/dashboard"/>

}



const login=async()=>{

if(!email || !password){

alert("Fill all fields");

return;

}



setLoading(true);

try{

const response=

await fetch(

"http://localhost:8081/api/auth/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email,
password

})

}

);



const data=
await response.json();



if(response.ok && data.email){

localStorage.setItem(

"user",

JSON.stringify(data)

);

navigate("/dashboard");

}

else{

alert("Invalid Login");

}

}

catch{

alert("Server Error");

}



setLoading(false);

};



return(

<div className="container">

<div className="login-box">

<h1>EduMind Login</h1>

<p>Sign in to continue learning</p>



<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>

setEmail(e.target.value)

}

/>





<div className="password-box">

<input

type={showPw ? "text" : "password"}

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(e.target.value)

}

/>



<span

onClick={()=>

setShowPw(!showPw)

}

>

{showPw ? "Hide" : "Show"}

</span>

</div>





<button

className="login-btn"

onClick={login}

>

{loading ? "Signing..." : "Login"}

</button>





<div className="bottom-text">

New User?

<Link to="/register">

Create Account

</Link>

</div>

</div>

</div>

);

}









function Register(){

const navigate=useNavigate();

const[name,setName]=useState("");

const[email,setEmail]=useState("");

const[password,setPassword]=useState("");



const register=async()=>{

if(!name || !email || !password){

alert("Fill all fields");

return;

}



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



alert("Registered Successfully");

navigate("/");

};



return(

<div className="container">

<div className="login-box">

<h1>Register</h1>



<input

placeholder="Name"

onChange={(e)=>

setName(e.target.value)

}

/>



<input

placeholder="Email"

onChange={(e)=>

setEmail(e.target.value)

}

/>



<input

placeholder="Password"

type="password"

onChange={(e)=>

setPassword(e.target.value)

}

/>



<button

className="login-btn"

onClick={register}

>

Register

</button>



<div className="bottom-text">

<Link to="/">

Back Login

</Link>

</div>

</div>

</div>

);

}









function Courses(){

const user=

JSON.parse(

localStorage.getItem("user")

);



const[courses,setCourses]=

useState([]);

const[title,setTitle]=

useState("");



const fetchCourses=async()=>{

if(!user){

return;

}



const response=

await fetch(

`http://localhost:8081/api/courses/${user.email}`

);



const data=
await response.json();

setCourses(data);

};



useEffect(()=>{

fetchCourses();

// eslint-disable-next-line

},[]);





const addCourse=async()=>{

if(!title){

return;

}



await fetch(

"http://localhost:8081/api/courses",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

title:title,
userEmail:user.email,
completed:false

})

}

);



setTitle("");

fetchCourses();

};





const deleteCourse=async(id)=>{

await fetch(

`http://localhost:8081/api/courses/${id}`,

{

method:"DELETE"

}

);



fetchCourses();

};






const completeCourse=async(id)=>{

await fetch(

`http://localhost:8081/api/courses/complete/${id}`,

{

method:"PUT"

}

);



fetchCourses();

};





if(!user){

return <Navigate to="/"/>

}





return(

<div className="page">

<h1>Courses</h1>



<div className="add-box">

<input

placeholder="Add Course"

value={title}

onChange={(e)=>

setTitle(e.target.value)

}

/>



<button onClick={addCourse}>

Add Course

</button>

</div>





{

courses.map(

(course)=>(

<div

className="course-card"

key={course.id}

>

<h3>

{course.title}

</h3>



<p>

Status:

{

course.completed ?

" Completed"

:

" Pending"

}

</p>





<div>

<button

onClick={()=>

completeCourse(course.id)

}

>

Complete

</button>



<button

onClick={()=>

deleteCourse(course.id)

}

>

Delete

</button>

</div>

</div>

)

)

}

</div>

);

}










function Chatbot(){

return(

<div className="page">

<h1>🤖 EduMind AI Chatbot</h1>

</div>

);

}







function Notes(){

return(

<div className="page">

<h1>📝 Notes Page</h1>

</div>

);

}







function Progress(){

return(

<div className="page">

<h1>📈 Progress Page</h1>

</div>

);

}










function Dashboard(){

const navigate=useNavigate();

const user=

JSON.parse(

localStorage.getItem("user")

);



const[stats,setStats]=

useState({

courses:0,
notes:0,
progress:0,
certificates:0

});



useEffect(()=>{

if(user){

fetch(

`http://localhost:8081/api/dashboard/${user.email}`

)

.then(res=>res.json())

.then(data=>setStats(data));

}

},[user]);





if(!user){

return <Navigate to="/"/>

}





const logout=()=>{

localStorage.removeItem("user");

navigate("/");

};





return(

<div className="dashboard">




<div className="sidebar">

<h2>EduMind</h2>



<ul>

<li onClick={()=>navigate("/dashboard")}>

🏠 Dashboard

</li>



<li onClick={()=>navigate("/courses")}>

📚 Courses

</li>



<li onClick={()=>navigate("/chatbot")}>

🤖 Chatbot

</li>



<li onClick={()=>navigate("/notes")}>

📝 Notes

</li>



<li onClick={()=>navigate("/progress")}>

📈 Progress

</li>



<li onClick={logout}>

🚪 Logout

</li>

</ul>

</div>






<div className="main-content">

<h1>

Welcome,{user.name} 👋

</h1>

<p>{user.email}</p>





<div className="stats">

<div className="stat-card">

<h2>{stats.courses}</h2>

<p>Courses</p>

</div>



<div className="stat-card">

<h2>{stats.progress}%</h2>

<p>Progress</p>

</div>



<div className="stat-card">

<h2>{stats.notes}</h2>

<p>Notes</p>

</div>



<div className="stat-card">

<h2>{stats.certificates}</h2>

<p>Certificates</p>

</div>

</div>







<div className="card-container">



<div

className="card"

onClick={()=>navigate("/courses")}

>

📚

<h3>Courses</h3>

<p>Manage Courses</p>

</div>





<div

className="card"

onClick={()=>navigate("/chatbot")}

>

🤖

<h3>Chatbot</h3>

<p>Ask EduMind AI</p>

</div>





<div

className="card"

onClick={()=>navigate("/notes")}

>

📝

<h3>Notes</h3>

<p>Study Materials</p>

</div>





<div

className="card"

onClick={()=>navigate("/progress")}

>

📈

<h3>Progress</h3>

<p>Track Learning</p>

</div>

</div>

</div>

</div>

);

}









function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

<Route path="/dashboard" element={<Dashboard/>}/>

<Route path="/courses" element={<Courses/>}/>

<Route path="/chatbot" element={<Chatbot/>}/>

<Route path="/notes" element={<Notes/>}/>

<Route path="/progress" element={<Progress/>}/>

</Routes>

</BrowserRouter>

);

}



export default App;