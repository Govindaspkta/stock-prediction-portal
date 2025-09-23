import axios from "axios";

const baseURL=import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance=axios.create({
    baseURL:baseURL,
    headers:{
        "Content-Type":'application/json'
    }

})


axiosInstance.interceptors.request.use(/* The backtick character (`) is used in JavaScript template
literals to create a string with interpolation. This allows
you to embed expressions or variables within a string by
using `${}` syntax. In the provided code snippet, the
backticks are used to create a string template for setting
the Authorization header in the Axios request with the access
token. */

    function(config){
        console.log('request==',config)
        const accessToken=localStorage.getItem('accessToken')
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config;

    },
    function(error){
        return Promise.reject(error)
    }
)
//Rsponse interceptor
axiosInstance.interceptors.response.use(
    function(response){
        return response
    },
    //handle failed responses
   async function(error){
        const originalRequest =error.config
        if(error.response.status === 401 &&  !originalRequest.retry){
            originalRequest.retry = true;
            const refreshToken=localStorage.getItem('refreshToken')
            try{
                const response = await axiosInstance.post('/token/refresh/', {refresh:refreshToken})
                console.log('new accesss token',response.data.access)
localStorage.setItem('accessToken',response.data.access)
originalRequest.headers['Authorization']  = `Bearer ${response.data.access}`
return axiosInstance(originalRequest)          }
            catch(error){
              localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            }
          }
          return Promise.reject(error);
    }
)

export default axiosInstance