import { useState } from 'react'
import './assets/css/style.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import Register from './components/Register'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import AuthProvider from './AuthProvider'
import Dashboard from './components/dashboard/dashboard'
import PrivateRoute from './privateRoute'
import PublicRoute from './publicRoute'
function App() {
  return(

 <>

<AuthProvider>
<BrowserRouter>
<Header />
<Routes>
  <Route path='/' element={<Main />} />
  <Route path='/register' element={<publicRoute><Register /></publicRoute>} />
  <Route path='/login' element={<publicRoute><Login /></publicRoute>} />
  <Route path='/dashboard' element={<privateRoute><Dashboard /></privateRoute>} />
</Routes>

<Footer />

</BrowserRouter>
 </AuthProvider>



 </>
)}
export default App
