import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSideBar from '../components/DashboardComponents/DashboardSideBar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import Footer from '../components/Footer/Footer';

function MentorDashboard() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const links = [
    { data: "Dashboard", path: "/mentor-dashboard" },
    { data: "Profile", path: "/mentor-dashboard/profile" },
    { data: "Notifications", path: "/mentor-dashboard/notifications" },
    { data: "Meetings", path: "/mentor-dashboard/meetings" },
    { data: "Help", path: "/mentor-dashboard/help" },
    { data: "Logout", path: "/mentor-dashboard/logout" },
  ];


  return (
    <div className="flex flex-row w-full h-screen">
        <div
          onClick={() => setIsDashboardOpen((prev) => !prev)}
          className="block md:hidden fixed z-50 top-4 left-4 bg-blue-600 p-2 rounded-full text-white text-2xl cursor-pointer"
          >
          {isDashboardOpen ? <ImCross /> : <GiHamburgerMenu />}
        </div>

        <div
        className={`bg-gray-800 h-screen fixed top-0 left-0 w-full md:w-64 z-40 transition-transform duration-500 ${
          isDashboardOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <DashboardSideBar
          links={links}
          isDashboardOpen={isDashboardOpen}
          setIsDashboardOpen={setIsDashboardOpen}
        />
      </div>

      <div className={`flex-1 transition-all duration-500 md:ml-64 ${isDashboardOpen ? 'ml-64' : 'ml-0'}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default MentorDashboard;
