import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';


export default function Signup() {
  const navigate=useNavigate();
 const [credentials,setCredentials]=useState({name:"",email:"",password:"",location:""});

const handleSubmit=async(e)=>{
e.preventDefault();
const response=await fetch("http://localhost:5000/api/createuser",{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        name:credentials.name,
        email:credentials.email,
        password:credentials.password,
        location:credentials.location
    })
})
const json=await response.json();
if(!json.success)alert('Invalid credentials!! Please enter valid credentials');
navigate("/login");
}

const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}

  return (
    <div >
    <div>
    <Navbar />
    </div>

<div className="card container mt-5 justify-content-center align-items-center " style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '80vh' }}>
<form onSubmit={handleSubmit}>
<div className="mb-3">
    <label htmlFor="name" className="form-label">Username</label>
    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" name='location' value={credentials.location} onChange={onChange} />
  </div>
 
  <button type="submit" className="m-3 btn btn-success">Signup</button>
  <Link to='/login' className="m-3 btn btn-danger">Already a User</Link>
</form>
</div>
    </div>
  )
}
