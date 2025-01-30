import React from "react";

import { NavLink } from "react-router-dom";

function DashboardSideBar({ setIsDashboardOpen, links }) {
    return (
        <div>
            <div className="flex flex-col p-2">
                {links &&
                    links.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            end
                            onClick={() => setIsDashboardOpen(false)}
                            className={({ isActive }) =>
                                `group flex flex-col px-2 py-1 text-xl font-semibold mb-1 rounded-lg transition-all
                            ${isActive
                                    ? "text-white bg-blue-600"
                                    : "text-gray-100 md:bg-slate-500 hover:text-white"
                                }`
                            }
                        >
                            {link.data}
                            <div className="h-[1px] max-w-full group-hover:bg-blue-200 transition-colors duration-300"></div>
                        </NavLink>
                    ))}
            </div>
        </div>
    );
}

export default DashboardSideBar;
