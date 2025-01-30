import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';

function MeetingHistoryPanel({ userType, meetings, setReloadFlag }) {

    return (
        <div className='flex gap-2 flex-col'>
            {
                meetings.length > 0 ? meetings.map((meeting) => (
                    <MeetingCard key={meeting._id} meeting={meeting} userType={userType} setReloadFlag={setReloadFlag}  />
                ))
                    : <p className='text-sm sm:text-base'>No Upcoming meetings!</p>
            }
        </div>
    )
}

export default MeetingHistoryPanel