import React, { useEffect, useState } from "react";

function Courses() {

const user = JSON.parse(localStorage.getItem("user"));

const [courses, setCourses] = useState([]);

const [title, setTitle] = useState("");



const fetchCourses = async () => {

const response = await fetch(
`http://localhost:8081/api/courses/${user.email}`
);

const data = await response.json();

setCourses(data);

};



useEffect(() => {

fetchCourses();

}, []);



const addCourse = async () => {

if (!title) return;

await fetch(
"http://localhost:8081/api/courses",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
title: title,
userEmail: user.email,
completed: false
})
}
);

setTitle("");

fetchCourses();

};



const completeCourse = async (id) => {

await fetch(
`http://localhost:8081/api/courses/complete/${id}`,
{
method: "PUT"
}
);

fetchCourses();

};



const deleteCourse = async (id) => {

await fetch(
`http://localhost:8081/api/courses/${id}`,
{
method: "DELETE"
}
);

fetchCourses();

};



return (

<div className="page">

<h1>Courses</h1>

<div className="add-box">

<input
placeholder="Enter course"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<button onClick={addCourse}>
Add Course
</button>

</div>



{courses.map((course)=>(

<div className="course-card" key={course.id}>

<h3>{course.title}</h3>

<p>
Status:
{course.completed ? " Completed" : " Pending"}
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

))}

</div>

);

}

export default Courses;