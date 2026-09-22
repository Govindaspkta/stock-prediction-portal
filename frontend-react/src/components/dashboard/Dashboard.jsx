import React, {useEffect,useState} from 'react'
import axios from 'axios'
import axiosInstance from '../../axiosInstance'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'


const Dashboard = () => {
const [ticker,setTicker]=useState('')
const [error,setError]=useState()
  const[loading,setLoading]=useState(false)
  const [plot,setPlot]=useState()
  const[ma100,setMA100]=useState()
  const [ma200,setMA200]=useState()
  const[prediction,setPrediction]=useState()
  const[mse,setMSE]=useState()
    const[rmse,setRMSE]=useState()
    const[r2,setR2]=useState()

useEffect(() =>{
    const fetchProtectedData = async() =>{
        try{
    const response=await axiosInstance.get('protected-view/');

        }
        catch(error ) {
            console.error('error in fetching data',error)
        }
    }
    fetchProtectedData();
 }, [])
const handleSubmit = async(e) =>{
e.preventDefault();
setLoading(true)
try{
    const response=await axiosInstance.post('predict/', 
        {
            ticker:ticker

    });
    console.log(response.data)

    const backendRoot=import.meta.env.VITE_BACKEND_ROOT
    const plotUrl= `${backendRoot}${response.data.plot_img}`
    const ma100url=`${backendRoot}${response.data.plot_100_dma}`
    const ma200url=`${backendRoot}${response.data.plot_200_dma}`
    const predictionurl=`${backendRoot}${response.data.plot_prediction}`

    setPlot(plotUrl)
    setMA100(ma100url)
    setMA200(ma200url)
    setPrediction(predictionurl)
    setMSE(response.data.mse)
    setRMSE(response.data.rmse)
    setR2(response.data.r2)

    if(response.data.error){
        setError(response.data.error)
    }
}
catch(error){
    console.error('caught error while making api requetst')
    setError('Something went wrong. Try a different ticker.')
}
finally{
setLoading(false);
}
  }
    return (

 <div className="container py-4">
    <div className="row">
        <div className="col-md-6 mx-auto">
            <div className="card shadow-sm border-0 bg-dark">
              <div className="card-body p-4">
                <h5 className="card-title text-light mb-3">Stock Prediction</h5>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                      <input type="text" className='form-control' placeholder='Enter a Stock Ticker (e.g. AAPL)'
                      onChange={(e) => setTicker(e.target.value.toUpperCase())} value={ticker} required />
                      <button type="submit" className="btn btn-info" disabled={loading}>
                        {loading ? <span><FontAwesomeIcon icon={faSpinner} spin /> Predicting...</span> : 'See Prediction'}
                      </button>
                    </div>
                    {error && <div className="text-danger mt-2 small">{error}</div>}
                </form>
              </div>
            </div>
        </div>
    </div>

    {plot && (
      <div className="row mt-5">
        <div className="col-12 col-lg-10 mx-auto">

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header">Closing Price</div>
            <div className="card-body text-center">
              <img src={plot} className="img-fluid rounded" alt="Closing price" />
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header">100-Day Moving Average</div>
            <div className="card-body text-center">
              <img src={ma100} className="img-fluid rounded" alt="100 day moving average" />
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header">200-Day Moving Average</div>
            <div className="card-body text-center">
              <img src={ma200} className="img-fluid rounded" alt="200 day moving average" />
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header">Prediction vs Actual</div>
            <div className="card-body text-center">
              <img src={prediction} className="img-fluid rounded" alt="Prediction vs actual" />
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-5">
            <div className="card-header">Model Evaluation</div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4">
                  <div className="text-muted small">MSE</div>
                  <div className="fs-5">{mse?.toFixed(2)}</div>
                </div>
                <div className="col-4">
                  <div className="text-muted small">RMSE</div>
                  <div className="fs-5">{rmse?.toFixed(2)}</div>
                </div>
                <div className="col-4">
                  <div className="text-muted small">R²</div>
                  <div className="fs-5">{typeof r2 === 'number' ? r2.toFixed(3) : r2}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )}
 </div>


  )
}

export default Dashboard
