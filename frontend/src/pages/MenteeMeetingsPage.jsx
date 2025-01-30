import React, { useContext, useEffect, useState } from 'react'
import UpcomingMeetingsPanel from '../components/DashboardComponents/UpcomingMeetingsPanel';
import MeetingHistoryPanel from '../components/DashboardComponents/MeetingHistoryPanel';
import { MenteeContext } from '../contexts/MenteeContext';
import axios from 'axios';

function MenteeMeetingsPage() {
    const [upcomingMeetingActive, setUpcomingMeetingActive] = useState(true);
    const [meetingHistoryActive, setMeetingHistoryActive] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(false);
    const { mentee, setMentee } = useContext(MenteeContext);
    const [upcomingMeetings, setUpcomingMeetings] = useState(mentee.meetings?.filter((meeting) => meeting.status === "scheduled") || []);
    const [allMeetings, setAllMeetings] = useState(mentee.meetings?.reverse());
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/mentee/get-profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setMentee(res.data.mentee);
            setUpcomingMeetings(res.data.mentee.meetings?.filter((meeting) => meeting.status === "scheduled") || []);
            setAllMeetings(res.data.mentee.meetings?.reverse());
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
                        setUpcomingMeetingActive(true)
                        setMeetingHistoryActive(false)
                    }}
                    className={`w-full py-2 text-center rounded-l-md text-sm sm:text-base md:text-lg font-semibold ${upcomingMeetingActive ? "bg-blue-600" : ""}`}
                >
                    Upcoming Meetings
                </button>
                <button
                    onClick={() => {
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
                    upcomingMeetingActive && <UpcomingMeetingsPanel  userType="Mentee" meetings={upcomingMeetings} setReloadFlag={setReloadFlag} />
                }
                {
                    meetingHistoryActive && <MeetingHistoryPanel  userType="Mentee" meetings={allMeetings} setReloadFlag={setReloadFlag} />
                }
            </div>
        </div>
    )
}

export default MenteeMeetingsPage