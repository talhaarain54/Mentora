import React, { useContext, useEffect, useState } from 'react'
import UpcomingMeetingsPanel from '../components/DashboardComponents/UpcomingMeetingsPanel';
import MeetingHistoryPanel from '../components/DashboardComponents/MeetingHistoryPanel';
import { MentorContext } from '../contexts/MentorContext';
import MeetingRequestsPanel from '../components/DashboardComponents/MeetingRequestsPanel';
import axios from 'axios';

function MentorMeetingsPage() {
  const [upcomingMeetingActive, setUpcomingMeetingActive] = useState(false);
  const [meetingRequestsActive, setMeetingRequestsActive] = useState(true);
  const [meetingHistoryActive, setMeetingHistoryActive] = useState(false);
  const { mentor, setMentor } = useContext(MentorContext);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [upcomingMeetings, setUpcomingMeetings] = useState(mentor.meetings?.filter((meeting) => meeting.status === "scheduled") || []);
  const [allMeetings, setAllMeetings] = useState(mentor.meetings?.reverse());
  const [requestedMeetings, setRequestedMeetings] = useState(mentor.meetings?.filter((meeting) => meeting.status === "pending") || []);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/mentor/get-profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setMentor(res.data.mentor);
      setRequestedMeetings(res.data.mentor.meetings?.filter((meeting) => meeting.status === "pending") || []);
      setUpcomingMeetings(res.data.mentor.meetings?.filter((meeting) => meeting.status === "scheduled") || []);
      setAllMeetings(res.data.mentor.meetings?.reverse());
    }).catch((err) => {
      console.log(err);
      alert(`Error: ${err}`);
    })
  }, [reloadFlag]);



  return (
    <div className='px-5 py-14'>
      <h2 className='text-lg md:text-xl lg:text-2xl text-center font-semibold mb-4'>Meetings</h2>
      <div className={`w-full bg-gray-800 flex justify-between rounded-md`}>
        <button
          onClick={() => {
            setMeetingRequestsActive(true)
            setUpcomingMeetingActive(false)
            setMeetingHistoryActive(false)
          }}
          className={`w-full py-2 text-center rounded-l-md text-sm sm:text-base md:text-lg font-semibold ${meetingRequestsActive ? "bg-blue-600" : ""}`}
        >
          Meeting Requests
        </button>
        <button
          onClick={() => {
            setMeetingRequestsActive(false)
            setUpcomingMeetingActive(true)
            setMeetingHistoryActive(false)
          }}
          className={`w-full py-2 text-center text-sm sm:text-base md:text-lg font-semibold ${upcomingMeetingActive ? "bg-blue-600" : ""}`}
        >
          Upcoming Meetings
        </button>
        <button
          onClick={() => {
            setMeetingRequestsActive(false)
            setUpcomingMeetingActive(false)
            setMeetingHistoryActive(true)
          }}
          className={`w-full py-2 text-center rounded-r-md text-sm sm:text-base md:text-lg font-semibold ${meetingHistoryActive ? "bg-blue-600" : ""}`}
        >
          Meetings History
        </button>
      </div>
      <div className='h-full w-full bg-gray-500 mt-3 rounded-md p-3'>
        {
          meetingRequestsActive && <MeetingRequestsPanel  meetings={requestedMeetings} setReloadFlag={setReloadFlag} />
        }
        {
          upcomingMeetingActive && <UpcomingMeetingsPanel  userType="Mentor" meetings={upcomingMeetings} setReloadFlag={setReloadFlag} />
        }
        {
          meetingHistoryActive && <MeetingHistoryPanel  userType="Mentor" meetings={allMeetings} setReloadFlag={setReloadFlag} />
        }
      </div>
    </div>
  )
}

export default MentorMeetingsPage