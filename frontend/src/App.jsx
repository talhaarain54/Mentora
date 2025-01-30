import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { LandingPage, MenteeDashboard, MenteeLoginPage, MenteeSignupPage, MentorDashboard, MentorLoginPage, MentorSignUpPage, MenteeDashboardHome, MenteeProfilePage, MenteeNotificationsPage, HelpPage, MenteeLogoutPage, MentorDashboardHome, MentorProfilePage, MentorNotificationsPage, MentorLogoutPage, MenteeProtectedWrapper, MentorProtectedWrapper, FindMentorPage, MenteeMeetingsPage, MentorMeetingsPage, MentorEditProfilePage, MenteeEditProfilePage, MentorDeleteProfilePage, MenteeDeleteProfilePage, PrivacyPolicy} from './pages/index';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/mentor-register' element={<MentorSignUpPage />} />
        <Route path='/mentor-login' element={<MentorLoginPage />} />
        <Route path='/mentee-login' element={<MenteeLoginPage />} />
        <Route path='/mentee-register' element={<MenteeSignupPage />} />
        <Route path='/mentee-dashboard' 
          element={
            <MenteeProtectedWrapper>
              <MenteeDashboard />
            </MenteeProtectedWrapper>
          } >
          <Route path='' element={<MenteeDashboardHome />} />
          <Route path="profile" element={<MenteeProfilePage />} />
          <Route path="profile/edit" element={<MenteeEditProfilePage />} />
          <Route path="profile/delete" element={<MenteeDeleteProfilePage />} />
          <Route path="meetings" element={<MenteeMeetingsPage />} />
          <Route path="notifications" element={<MenteeNotificationsPage />} />
          <Route path="find-mentor" element={<FindMentorPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="logout" element={<MenteeLogoutPage />} />
        </Route>
        <Route path='/mentor-dashboard' 
          element={
            <MentorProtectedWrapper>
              <MentorDashboard />
            </MentorProtectedWrapper>          
          } >
          <Route path='' element={<MentorDashboardHome />} />
          <Route path="profile" element={<MentorProfilePage />} />
          <Route path="profile/edit" element={<MentorEditProfilePage />} />
          <Route path="profile/delete" element={<MentorDeleteProfilePage />} />
          <Route path="meetings" element={<MentorMeetingsPage />} />
          <Route path="notifications" element={<MentorNotificationsPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="logout" element={<MentorLogoutPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;