import React, {useEffect,useState} from 'react'
import axios from 'axios'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
  const [ticker,setTicker]=useState('')

useEffect(() =>{
    const fetchProtectedData = async() =>{
        try{
const response=await axiosInstance.get('/protected-view/',{

})
console.log("success: ",response.data);
        }
        catch(error ) {
            console.error('error ins fetching data')
        }
    }
    fetchProtectedData();
 }, [])

    return (
        <>
 <div className="container">
    <div className="row">
        <div className="col-md-6 mx-auto">
            <form  >
                <input type="text" className='form-control' placeholder='Enter a Stock Ticker'
                onChange={(e) => setTicker(e.target.value)}  required >
                </input>
            <button type='submit' className='btn bt-info-mt-3' >See Prediction</button>
            </form>
        </div>
    </div>
 </div>
    </>

    
  )
}

export default Dashboard