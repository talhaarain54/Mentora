import React, { useState } from 'react'
import DashboardSideBar from '../components/DashboardSideBar'
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";


function MenteeDashboard() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  return (
    <div className="flex flex-row w-full h-screen">
      {/* Hamburger Menu */}
      <div
        onClick={() => setIsDashboardOpen((prev) => !prev)}
        className="block md:hidden fixed z-50 top-4 left-4 bg-green-500 p-2 rounded-full text-white text-4xl cursor-pointer"
      >
        {isDashboardOpen ? <ImCross /> : <GiHamburgerMenu />}
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-500 h-full fixed md:relative top-0 left-0 transform ${isDashboardOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-500 md:translate-x-0 md:w-1/5 w-full`}
      >
        <DashboardSideBar
          
          isDashboardOpen={isDashboardOpen}
          setIsDashboardOpen={setIsDashboardOpen}
        />
      </div>

      {/* Main Content */}
      <div
        className={`bg-blue-600 transition-all duration-500 h-full ${isDashboardOpen ? "md:w-4/5 w-full" : "w-full"
          } ml-auto`}
      >
        {/* Main Content Goes Here */}
      </div>
    </div>

  )
}

export default MenteeDashboard