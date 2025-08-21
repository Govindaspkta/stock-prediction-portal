import React from 'react'

const Header = () => {
  return (

    <>
    <nav className='navbar container pt-3 pb-3 align-items-start'>
        <a className='navbar-brand tecxt-light' href="">Stock Prediction App</a>
        <div>
            <a className='btn btn-outline-info' href="">Login</a>
             &nbsp;
            <a className='btn btn-info' href="">register</a>
        </div>
    </nav>
    </>
   
  )
}

export default Header