import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Button from './Button'

const Main = () => {
  return (
    <>
    {/* <Header /> */}
<div className='container'>
    <div className='p-5 text-center bg-light-dark rounded'>
        <h1 className='text-light'>Stock Prediction Portal</h1>
        <p className='text-light lead'>Rjhis stock preciction application utilizes </p>
      <Button text='Login' class='btn-outline-info' />
    </div>


</div> 
{/* <Footer /> */}
</>
 )
}

export default Main