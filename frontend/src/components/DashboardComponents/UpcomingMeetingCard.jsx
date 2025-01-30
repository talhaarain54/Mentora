import axios from "axios";
import React from "react";
import { FaVideo } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function UpcomingMeetingCard({ meeting , userType, setReloadFlag}) {

    const date = new Date(meeting.meetingTime).toLocaleDateString("en-PK", { month: "short", day: "2-digit", year: "numeric" }); 
    const time = new Date(meeting.meetingTime).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true }); 
    const token = localStorage.getItem("token");
    const handleCancelMeeting = async () => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/meeting/cancel-meeting-request`, {
                meetingId: meeting._id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setReloadFlag((prev) => !prev);
                alert("Meeting request cancelled");
            }
        } catch (error) {
            console.log("Error: ", error);
            alert(`Error ${error}`);
        }
    }

    return (
        <div className="w-full bg-gray-800 text-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center ">
            <div className="flex flex-col gap-2">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">{ userType === "Mentee" ? meeting.mentor.name : meeting.mentee.name}</h3>
                <p className="text-sm md:text-base">
                    <span className="font-medium">Date:</span> {date}
                </p>
                <p className="text-sm md:text-base">
                    <span className="font-medium">Time:</span> {time}
                </p>
            </div>

            <div className="flex gap-4 flex-row md:flex-col lg:flex-row  items-center mt-4 md:mt-0">
                <a
                    href={meeting.meetingUrl}
                    target="_blank"
                    className="text-sm sm:text-base md:text-lg flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                    <FaVideo />
                    Join Meeting
                </a>
                <button
                    onClick={handleCancelMeeting}
                    className="text-sm sm:text-base md:text-lg flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-300"
                >
                    <MdCancel />
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default UpcomingMeetingCard;
