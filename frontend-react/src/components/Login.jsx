import React, {useContext, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Login = () => {

  const[username,setUsername] =useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading] =useState(false)
  const navigate=useNavigate()
  const[error,setError]=useState('')
  const{isLoggedIn,setIsLoggedIn} =useContext(AuthContext)


  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true)
    
const userData={username,password}

if(!username || !password){
  setError("Please enter both username and password")
  setLoading(false)
  return;

  
}


    try{
      const response= await axios.post(`${import.meta.env.VITE_BACKEND_BASE_API}/token/`,userData)
      localStorage.setItem('accessToken',response.data.access)
      localStorage.setItem('refreshToken',response.data.refresh)
      setIsLoggedIn(true)
      navigate('/dashboard')
    }
    catch(errors){
      console.error("invalid credential")
      setError("Invalid Credentials")
    }
    finally{
      setLoading(false)
    }
  }
  return (
  <>
        <div>Login</div>
        <div className="container">
<div className="row justify-content-center">
  <div className="col-md-6 bg-light-dark p-5">
    <h3 className="text-light text-center mb-5">Login to Stock Prediction Portal</h3>
    <form  onSubmit={handleLogin}>
      <input type="text" className="form-control mb-3" placeholder="username please" value={username} onChange={(e)=> setUsername(e.target.value)} />
      {/* <small>{errors.username && <div className="text-danger"> {errors.username}</div>}</small> */}

          <input type="password" className="form-control mb-3" placeholder="Password please" value={password} onChange={(e)=> setPassword(e.target.value)} />

      <div className="mb-2">
      </div>
      {error && <div className='text-center text-danger mb-2'>{error}</div>}
      {loading ? (
      <button type="submit" className="btn btn-info d-block mx-auto" disabled><FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon> Logging in..</button>
      ):
      (
             <button type="submit" className="btn btn-info d-block mx-auto" >Login
        </button>
      )

      }
   

    </form>
  </div>
</div>

        </div>

    </>
   
  )
}

export default Login