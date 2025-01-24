import React from 'react';

import { NavLink } from 'react-router-dom';



function DashboardSideBar({isDashboardOpen, setIsDashboardOpen}) {

    return (
        <div>
            <div>

            </div>
            <div className='flex flex-col'>
                    <NavLink   >Dashboard</NavLink>
                    <NavLink  >Profile</NavLink>
                    <NavLink  >Notifications</NavLink>
                    <NavLink  >Meetings</NavLink>
                    <NavLink  >Settings</NavLink>
                    <NavLink  >Help</NavLink>
                    <NavLink  >Customer Support</NavLink>
                    <NavLink  >Logout</NavLink>
            </div>
        </div>
    )
}

export default DashboardSideBar