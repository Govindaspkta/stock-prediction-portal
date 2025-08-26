import React,{useReducer, useState} from "react"
import Header from "./Header"
import axios from 'axios'

const Register = () => {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setpassword]=useState('')
  const handleRegistration = async (e) =>{
    e.preventDefault();
    const userData={
      username,email, password
    }
try{
  const response= await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
  console.log('response.data ==>',response.data)
  console.log("resgistrtion succesful")
}  
catch(error){
  console.log('Registration error:',error.response.data)


}}
  return (




    <>
        <div>Register</div>
        <div className="container">
<div className="row justify-content-center">
  <div className="col-md-6 bg-light-dark p-5">
    <h3 className="text-light text-center mb-5">Create an Account</h3>
    <form onSubmit={handleRegistration}>
      <input type="text" className="form-control mb-3" placeholder="username please" value={username} onChange={(e)=> setUsername(e.target.value)} />
      <input type="email" className="form-control mb-3" placeholder="email Please"  value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" className="form-control mb-5" placeholder="password please" value={password} onChange={(e)=>setpassword(e.target.value)} />
    
        <button type="submit" className="btn btn-info d-block mx-auto" >Register
        </button>

    </form>
  </div>
</div>

        </div>

    </>
  )
}

export default Register