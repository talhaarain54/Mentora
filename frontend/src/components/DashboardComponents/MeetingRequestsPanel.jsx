import React, { useState } from 'react'
import MeetingRequestCard from './MeetingRequestCard';
import axios from 'axios';

function MeetingRequestsPanel({meetings, setReloadFlag}) {

  return (
    <div className='flex gap-2 flex-col'>
    {
        meetings.length > 0 ? meetings.map((meeting) => (<MeetingRequestCard key={meeting._id} meeting={meeting} setReloadFlag={setReloadFlag} />))
        : <p className='text-sm sm:text-base'>No meetings requests!</p>
    }
</div>
  )
}

export default MeetingRequestsPanel;