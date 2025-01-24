import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { LandingPage, MenteeDashboard, MenteeLoginPage, MenteeSignupPage, MentorDashboard, MentorLoginPage, MentorSignUpPage} from './pages/index';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/mentor-register' element={<MentorSignUpPage />} />
        <Route path='/mentor-login' element={<MentorLoginPage />} />
        <Route path='/mentee-login' element={<MenteeLoginPage />} />
        <Route path='/mentee-register' element={<MenteeSignupPage />} />
        <Route path='/mentor-dashboard' element={<MentorDashboard />} />
        <Route path='/mentee-dashboard' element={<MenteeDashboard />} />
      </Routes>
    </div>
  )
}

export default App