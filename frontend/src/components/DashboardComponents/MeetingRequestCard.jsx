import axios from 'axios';
import React, { useRef, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

function MeetingRequestCard({ meeting, setReloadFlag }) {
    const date = new Date(meeting.meetingTime).toLocaleDateString("en-PK", { month: "short", day: "2-digit", year: "numeric" });
    const time = new Date(meeting.meetingTime).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true });
    const meetingUrlnput = useRef(null);
    const [meetingUrl, setMeetingUrl] = useState("");
    const token = localStorage.getItem("token");

    const handleAcceptMeeting = async () => {
        if (!meetingUrl) {
            alert("Please enter the meeting URL first");
            return;
        }
        if (meetingUrl.trim().length === 0) {
            alert("Please enter the meeting URL first");
            return;
        }

        try {
            const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/meeting/accept-meeting-request`, {
                meetingId: meeting._id,
                meetingUrl
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setReloadFlag((prev) => !prev);
                alert("Meeting request accepted");
            }

        } catch (error) {
            console.log("Error: ", error);
            alert(`Error ${error}`);
        }

    }

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
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">{meeting.mentee.name}</h3>
                <p className="text-sm md:text-base">
                    <span className="font-medium">Date:</span> {date}
                </p>
                <p className="text-sm md:text-base">
                    <span className="font-medium">Time:</span> {time}
                </p>
                <input
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    type="url"
                    ref={meetingUrlnput}
                    className='bg-gray-600 px-2 py-1 rounded-md text-sm md:text-base outline-none'
                    placeholder='Meeting Url'
                />
            </div>
            <div className="flex gap-4 flex-row md:flex-col lg:flex-row items-center mt-2 md:mt-0">
                <button
                    onClick={handleAcceptMeeting}
                    className="text-sm sm:text-base md:text-lg flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                    <FaCheckCircle />
                    Accept
                </button>
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

export default MeetingRequestCard;