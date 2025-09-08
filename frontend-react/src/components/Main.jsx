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
        <p className='text-light lead'> stock preciction application utilizes </p>
      <Button text='Expore Now' class='btn-outline-info' url ="dashboard/" />
    </div>


</div> 
{/* <Footer /> */}
</>
 )
}

export default Main