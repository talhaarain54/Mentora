import React, { useContext } from 'react'
import NotificationCard from '../components/DashboardComponents/NotificationCard'
import { MenteeContext } from '../contexts/MenteeContext'

function MenteeNotificationsPage() {
  const {mentee} = useContext(MenteeContext);
  const notifications = [...mentee.notifications].reverse();

return (
  <div className='px-4 py-14'>
      <h2 className='text-lg md:text-xl lg:text-2xl text-center font-semibold mb-4'>Notifications</h2>
      {
          notifications.length > 0 ? notifications.map((notif) => 
              <NotificationCard key={notif._id} notification={notif} userType="Mentee" />)
          : <div className='bg-gray-600 rounded-md px-5 py-2 text-xs sm:text-base md:text-lg'>No Notifications yet</div>
      }
  </div>
  )
}

export default MenteeNotificationsPage