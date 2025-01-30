import React, { useContext } from 'react';
import { MentorContext } from '../../contexts/MentorContext';
import { MenteeContext } from '../../contexts/MenteeContext'; // Import Mentee Context
import axios from 'axios';

function NotificationCard({ notification, userType }) {
  const { setMentor, mentor } = useContext(MentorContext);
  const { setMentee, mentee } = useContext(MenteeContext);
  const token = localStorage.getItem("token");

  const markNotificationRead = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/notification/mark-read`,
        { notificationId: notification._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {        
        if (userType === "Mentor") {
          const updatedMentor = { ...mentor };          
          updatedMentor.notifications = updatedMentor.notifications.map((notif) =>
            notif._id === notification._id ? { ...notif, status: 'read' } : notif
          );
          setMentor(updatedMentor);
        } else {
          const updatedMentee = { ...mentee };
          updatedMentee.notifications = updatedMentee.notifications.map((notif) =>
            notif._id === notification._id ? { ...notif, status: 'read' } : notif
          );
          setMentee(updatedMentee);
        }
      }
    } catch (error) {
      console.log("Error in marking the notification read", error);
    }
  };

  return (
    <div className={`px-6 py-3 rounded-md relative w-full my-2 ${notification.status === "unread" ? "bg-blue-600" : "bg-gray-800"}`}>
      <p className='absolute top-1 right-2 text-xs md:text-base text-gray-200'>
        {new Date(notification.time).toLocaleString("en-PK")}
      </p>
      <p className='text-xs sm:text-base md:text-xl lg:text-xl mt-3'>{notification.content}</p>
      {
        notification.status === "unread" && (
          <button
            onClick={markNotificationRead}
            className='text-xs sm:text-base md:text-xl lg:text-xl bg-gray-600 rounded-md px-3 py-1 mt-1 text-white cursor-pointer'
          >
            Mark as Read
          </button>
        )
      }
    </div>
  );
}

export default NotificationCard;
