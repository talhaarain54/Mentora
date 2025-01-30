import axios from "axios";
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaBan } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function MeetingCard({ meeting, userType, setReloadFlag}) {
    const [feedback, setFeedback] = useState("");
    const date = new Date(meeting.meetingTime).toLocaleDateString("en-PK", { month: "short", day: "2-digit", year: "numeric" });
    const time = new Date(meeting.meetingTime).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit", hour12: true });
    const token = localStorage.getItem("token");
    // meeting.status = "completed";
    // meeting.feedback = "abcd"

    const handleAddFeedback = async () => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/meeting/add-feedback`, {
                meetingId: meeting._id,
                feedback
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status === 200){
                setReloadFlag((prev) => !prev);
                alert("Feedback added successfully");
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
        <div className="w-full bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start md:items-center ">
                <div className="flex flex-col md:gap-2">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold">{userType === "Mentee" ? meeting.mentor.name : meeting.mentee.name}</h3>

                    <p className="text-sm md:text-base font-medium">Status:
                        <span className={`font-normal`}> {meeting.status}</span>
                    </p>
                </div>
                <div className="flex flex-col md:gap-2 ">
                    <p className="text-sm md:text-base">
                        <span className="font-medium">Date:</span> {date}
                    </p>
                    <p className="text-sm md:text-base">
                        <span className="font-medium">Time:</span> {time}
                    </p>
                </div>
            </div>
            {
                (meeting.status === "completed" && meeting.feedback) ?
                    <p className="text-sm md:text-base">
                        <span className="font-medium">Feedback:</span> {meeting.feedback}
                    </p>
                    : null
            }
            {
                (meeting.status === "completed" && !meeting.feedback && userType === 'Mentee') ?
                    <div className="flex gap-2 flex-col md:flex-row ">
                        <p className="text-sm md:text-base font-medium">Feedback:
                            <input
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="bg-gray-600 ml-2 px-2 py-[2px] text-sm md:text-base rounded-md font-normal outline-none w-fit" />
                        </p>
                        <button
                            onClick={handleAddFeedback}
                            className="text-sm w-44 sm:text-base flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg transition duration-300"
                        >
                            <FaCheckCircle />
                            Add Feedback
                        </button>
                    </div>
                    : null
            }
            {(meeting.status === "pending" || meeting.status === "scheduled") && (
                <button
                    onClick={handleCancelMeeting}
                    className="text-sm sm:text-base mt-2 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition duration-300"
                >
                    <MdCancel />
                    Cancel Meeting
                </button>
            )}
        </div>
    );
}

export default MeetingCard;
