import axios from 'axios';
import React, { useContext, useState } from 'react'
import { MenteeContext } from '../../contexts/MenteeContext';

function MentorProfileCard({ mentor }) {
    const token = localStorage.getItem("token");
    const [meetingTime, setMeetingTime] = useState("");
    const [meetingInputOpen, setMeetingInputOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { mentee, setMentee } = useContext(MenteeContext);

    const requestMeeting = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/meeting/create-meeting-request`, {
                mentor: mentor._id,
                mentee: mentee._id,
                meetingTime,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log("create meeting request response at mentorProfileCard: ", response);
            if (response.status === 201) {
                setMeetingInputOpen(false);
                setButtonDisabled(true)
            }
        } catch (error) {
            if (error.response) {
                console.log(error);
                const errors = error.response.data.error;
                if(errors.length > 0)
                    errors.map((err) => alert(`Error: ${err.msg}`))

                const errorMsg = error.response.data.message;
                if(errorMsg)
                    alert(errorMsg); 


            } else if (error.request) {
                // Request was made but no response was received
                console.error("No response from server:", error.request);
                alert("No response from server. Please try again later.");
            } else {
                // Something went wrong in setting up the request
                console.error("Error in request setup:", error.message);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    }
    return (
        <div className='bg-gray-800 max-w-72 p-3 rounded-2xl'>
            <h2 className='text-base md:text-lg lg:text-xl font-semibold text-gray-100 text-center'>{mentor.name}</h2>
            <p className='text-xs md:text-base text-gray-400 text-center'>{mentor.highestDegree.degreeName + ", " + mentor.highestDegree.institute}</p>
            <p className='text-xs md:text-base text-gray-100 text-center'>{mentor.yearsOfExperience}+ Years of Experience</p>
            <div>
                <h3 className='text-xs md:text-base lg:text-lg mt-3 mb-2'>Expertise:</h3>
                <div className='flex gap-2 flex-wrap'>
                    {
                        mentor.expertise ? mentor.expertise.map((exp, index) => (
                            <span className='bg-gray-600 px-3 rounded-full text-xs md:text-base' key={index} >{exp}</span>
                        ))
                            :
                            <span className='bg-gray-600 px-3 rounded-full text-xs md:text-base'>No Expertise</span>
                    }
                </div>
            </div>
            <div className='flex flex-col items-center mt-2'>
                <input
                    type="datetime-local"
                    className={`bg-gray-700 ${meetingInputOpen ? "opacity-100 w-auto h-auto" : "opacity-0 w-0 h-0"}`}
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                />
                {
                    meetingInputOpen ?
                        <button
                            className={`text-xs md:text-base rounded-md px-3 py-[2px] mt-2 bg-green-600 hover:bg-green-700 cursor-pointer`}
                            onClick={requestMeeting}
                        >
                            Confirm Meeting Request
                        </button>
                        :
                        <button
                            disabled={buttonDisabled}
                            className={`text-xs md:text-base rounded-md px-3 py-[2px] mt-2 bg-blue-600 cursor-pointer ${buttonDisabled ? "bg-gray-950 cursor-auto" : ""}`}
                            onClick={() => setMeetingInputOpen(true)}
                        >
                            {
                                buttonDisabled ? "Meeting request Sent" : "Request a Meeting"
                            }
                        </button>
                }
            </div>
        </div>

    )
}

export default MentorProfileCard