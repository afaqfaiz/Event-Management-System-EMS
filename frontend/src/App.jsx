import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FrontPage from './main/pages/Firstpage'
import ClientLogin from './client/pages/login'
import ClientRegister from './client/pages/signup'
import HallBooking from './client/pages/HallBooking'
import ClientDash from './client/pages/clientDashboard'
import CompLoginPage from './company/pages/login'
 import CompSignupPage from './company/pages/signup'
 import CompDash from './company/pages/CompanyDashboard'
import Addhall from './company/pages/AddHall'
import Update from './company/pages/UpdateHall'
import Editcompany from './company/pages/companyEdit' 
const App = () => {
  return (
    <div>
      {/* <CompLoginPage/> */}
            <Routes>
            <Route path='/' element={<FrontPage/>} />
            <Route path='/companylogin' element={<CompLoginPage/>} />
            <Route path='/clientlogin' element={<ClientLogin/>} />
            <Route path='/company/signup' element={<CompSignupPage/>} />
            <Route path='/client/signup' element={<ClientRegister/>} />
            <Route path='/company/dashboard' element={<CompDash/>} />


            <Route path='/update-hall' element={<Update/>}/>
            <Route path='add-hall' element={<Addhall/>} />
            <Route path='/edit-company' element={<Editcompany/>} />
            <Route path='/company/signup' element={<CompSignupPage/>} />
             <Route path='/bookingform' element={<HallBooking/>} />
             <Route path='/client' element={<ClientDash/>}/>
            </Routes>
    </div>
  )
}

export default App
