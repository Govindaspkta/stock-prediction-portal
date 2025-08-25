import React from "react"
import Header from "./Header"

const Register = () => {
  return (


    <>
        <div>Register</div>
        <div className="container">
<div className="row justify-content-center">
  <div className="col-md-6 bg-light-dark p-5">
    <h3 className="text-light text-center">Create an Account</h3>
    <form>
      <input type="text" className="form-control mb-3" placeholder="username please" />
      <input type="email" classname="form-control mb-3" placeholder="email" />
        <input type="password" classname="form-control mb-5" placeholder="password please" />
      

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