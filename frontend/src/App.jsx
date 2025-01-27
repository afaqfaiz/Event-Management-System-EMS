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
import Viewhall from './company/components/Halls'
import PaymentForm from './client/pages/paymentForm'
import Bookings from './client/pages/Booking'
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
            <Route path='/company/halls' element={<Viewhall/>} />
            <Route path='//company/edit' element={<Editcompany/>} />
            <Route path='/company/addhall' element={<Addhall/>} />
            <Route path='/company/updatehall' element={<Update/>}/>
            

            <Route path='/client/dashboard' element={<ClientDash/>} />
            <Route path='/client/paymentform' element={<PaymentForm/>}/>
            <Route path='/booking' element={<Bookings/>}/>

            <Route path='/company/signup' element={<CompSignupPage/>} />
             <Route path='/bookingform' element={<HallBooking/>} />
             <Route path='/client' element={<ClientDash/>}/>
            </Routes>
    </div>
  )
}

export default App
