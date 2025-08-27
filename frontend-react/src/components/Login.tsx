import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

const Login = () => {

  const[username,setUsername] =useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading] =useState(false)

  const handleLogin = (e) =>{
    e.preventDefault()

    const userData= {
      username,password
    }
    console.log('USer Data', userData)
  }
  return (
  <>
        <div>Register</div>
        <div className="container">
<div className="row justify-content-center">
  <div className="col-md-6 bg-light-dark p-5">
    <h3 className="text-light text-center mb-5">Login to Stock Prediction Portal</h3>
    <form  onSubmit={handleLogin}>
      <input type="text" className="form-control mb-3" placeholder="username please" value={username} onChange={(e)=> setUsername(e.target.value)} />
      {/* <small>{errors.username && <div className="text-danger"> {errors.username}</div>}</small> */}


      <div className="mb-2">
      </div>
      {loading ? (
      <button type="submit" className="btn btn-info d-block mx-auto" disabled><FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon> LogginIN</button>
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