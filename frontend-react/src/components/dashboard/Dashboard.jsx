import React, {useEffect} from 'react'
import axios from 'axios'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
  
const accessToken=localStorage.getItem('access_token')     
useEffect(() =>{
    const fetchProtectedData = async() =>{
        try{
const response=await axiosInstance.get('/protected-view/',{
    headers:{
        Authorization: `Bearer ${accessToken}`
    }

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
    <div>Dashboard</div>
    </>

    
  )
}

export default Dashboard