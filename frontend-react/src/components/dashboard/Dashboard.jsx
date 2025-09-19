import React, {useEffect,useState} from 'react'
import axios from 'axios'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
  const [ticker,setTicker]=useState('')

  const handleSubmit = async(e) =>{
e.preventDefault();
try{
    const response=await axiosInstance.post('/predict/', 
        {
            ticker:ticker

    });
}
catch(error){
    console.error('caught error while making api requetst')
}
  }
useEffect(() =>{
    const fetchProtectedData = async() =>{
        try{
const response=await axiosInstance.get('/protected-view/',{

})
console.log("success: ",response.data);
        }
        catch(error ) {
            console.error('error in fetching data')
        }
    }
    fetchProtectedData();
 }, [])

    return (

 <div className="container">
    <div className="row">
        <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit} >
                <input type="text" className='form-control' placeholder='Enter a Stock Ticker'
                onChange={(e) => setTicker(e.target.value)}  required  />
               
            <button type="submit" className="btn btn-info mt-3 mx-auto" >See Prediction</button>
                   
            
            </form>
        </div>
    </div>
 </div>


    
  )
}

export default Dashboard