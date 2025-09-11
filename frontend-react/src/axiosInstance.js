import axios from "axios";

const baseURL=import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance=axios.create({
    baseURL:baseURL,
    headers:{
        "Content-Type":'application/json'
    }

})


axiosInstance.interceptors.request.use(
    function(config){
        console.log('request==',config)
        const accessToken=localStorage.getItem('accessTokens')
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config;

    },
    function(error){
        return Promise.reject(error)
    }
)
export default axiosInstance