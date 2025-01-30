import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MentorContext } from '../contexts/MentorContext';

function MentorDashboardHome() {
    const { mentor } = useContext(MentorContext);
    const recentNotifications = mentor.notifications?.filter((notif) => notif.status === "unread");    
    const meetings = mentor.meetings?.reverse().filter((meeting) => meeting.status === "scheduled");
    const attendedmeetings = mentor.meetings?.filter((meeting) => meeting.status === "completed" );

    return (
        <div className='px-5 py-14'>
            <div>
                <div className='text-center'>
                    <h2 className='text-lg  md:text-2xl lg:text-3xl  font-semibold text-white'>Welcome back, <span className='text-blue-600'>{mentor.name}</span></h2>
                    <p className='text-base md:text-lg lg:text-xl  text-gray-200  font-medium'>Let's make a greate session today!</p>
                </div>
                {/* <div className='flex flex-col sm:flex-row justify-between gap-1 px-5 mt-5'>
                    <p className='text-sm md:text-base lg:text-lg'>{mentor.name}</p>
                    <p className='text-sm md:text-base lg:text-lg'>Meetings attended: {attendedmeetings.length}</p>
                    <Link className='text-sm md:text-base lg:text-lg text-blue-600 ' to='/mentor-dashboard/profile'>Go to Profile</Link>
                </div> */}
            </div>
            <div className='px-5 mt-5'>
                <div className='flex justify-between'>
                    <h4 className='text-sm md:text-base lg:text-lg font-medium'>Recent Notifications</h4>
                    <Link className='text-sm md:text-base lg:text-lg  text-blue-600 ' to='/mentor-dashboard/notifications'>View All</Link>
                </div>
                <div>
                    {
                        recentNotifications.length > 0 ? recentNotifications.reverse().slice(0, 4).map((notif, index) => (
                            <div key={index} className='text-sm md:text-base lg:text-lg bg-gray-700 px-5 py-2 rounded-md mt-1'>{notif.content}</div>
                        ))
                            :
                            <div className='text-sm md:text-base lg:text-lg bg-gray-700 px-5 py-[2px] rounded-md mt-1'>No unread Notifications</div>
                    }
                </div>
            </div>
            <div className='px-5 mt-5'>
                <div className='flex justify-between'>
                    <h4 className='text-sm md:text-base lg:text-lg font-medium'>Meetings</h4>
                    <Link className='text-sm md:text-base lg:text-lg text-blue-600' to='/mentor-dashboard/meetings'>View All</Link>
                </div>
                <div className='flex flex-col md:flex-row mt-1 gap-2'>
                    {
                        meetings.length > 0 ? meetings.slice(0, 4).map((meeting, index) => {
                            const date = new Date(meeting.meetingTime).toLocaleDateString("en-PK", { month: "short", day: "2-digit", year: "numeric" });
                            const time = new Date(meeting.meetingTime).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true });
                        
                            return <div key={index} className='bg-gray-800 text-center rounded-md px-3 py-2 flex justify-between flex-col sm:flex-row md:flex-col mt-1'>
                                <h6 className='text-sm md:text-base lg:text-lg'>{meeting.mentee.name}</h6>
                                <p className='text-sm md:text-base lg:text-lg'>{date}</p>
                                <p className='text-sm md:text-base lg:text-lg'>{time}</p>
                                <p className='text-sm md:text-base lg:text-lg'>{meeting.status}</p>
                            </div>})
                            :
                            <div className='text-sm md:text-base lg:text-lg bg-gray-700 px-5 py-[2px] rounded-md mt-1 w-full'>No Upcoming meetings!</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MentorDashboardHome;