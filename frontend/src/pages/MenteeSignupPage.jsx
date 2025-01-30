import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenteeContext } from '../contexts/MenteeContext';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";


function MenteeSignupPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [interests, setInterests] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [highestDegreeInstitute, setHighestDegreeInstitute] = useState("");
    const [highestDegreeName, setHighestDegreeName] = useState("");
    const [highestDegreeCompletionYear, setHighestDegreeCompletionYear] = useState("");
    const [otherDegrees, setOtherDegrees] = useState([]);

    const { mentee, setMentee } = useContext(MenteeContext);
    const navigate = useNavigate();


    const handleAddDegree = () => {
        setOtherDegrees([
            ...otherDegrees,
            { institute: "", degreeName: "", completionYear: "" },
        ]);
    };

    const handleOtherDegreeChange = (index, field, value) => {
        const updatedDegrees = otherDegrees.map((degree, i) =>
            i === index ? { ...degree, [field]: value } : degree
        );
        setOtherDegrees(updatedDegrees);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const interestArray = interests.split(",");

        const newMentee = {
            name,
            email,
            password,
            yearsOfExperience,
            highestDegree: {
                institute: highestDegreeInstitute,
                degreeName: highestDegreeName,
                completionYear: highestDegreeCompletionYear
            },
            interests: interestArray,
            otherDegrees
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/mentee/register`, newMentee);

            if (response.status === 201) {
                setMentee(response.data.newMentee);
                localStorage.setItem("token", response.data.token);
                navigate("/mentee-dashboard");
            }
            console.log(response);
        } catch (error) {
            console.error("Registration Error:", error);
        
            if (error.response) {
                // Server responded with a status code outside the 2xx range
                const { data, status } = error.response;
                
                if (data.errors && Array.isArray(data.errors)) {
                    // Validation errors
                    data.errors.forEach(err => {
                        console.error(`Field: ${err.path || "Unknown"}, Message: ${err.msg}`);
                        alert(`${err.msg}`); // Replace with UI notification if needed
                    });
                } else if (data.message) {
                    // General server error
                    console.error(`Error ${status}: ${data.message}`);
                    alert(data.message); // Replace with UI notification if needed
                } else {
                    console.error(`Unexpected error ${status}:`, data);
                    alert("An unexpected error occurred. Please try again.");
                }
            } else if (error.request) {
                // No response from the server
                console.error("No response received from the server:", error.request);
                alert("Server is not responding. Please check your internet connection and try again.");
            } else {
                // Unexpected error (network issue, client-side error, etc.)
                console.error("Unexpected error:", error.message);
                alert("Something went wrong. Please try again later.");
            }
        }
        

        setName("");
        setEmail("");
        setPassword("");
        setInterests("");
        setYearsOfExperience("");
        setHighestDegreeName("");
        setHighestDegreeInstitute("");
        setHighestDegreeCompletionYear("");
        setOtherDegrees([]);
    };


    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-gray-900 py-10 px-4'>
            <div className='bg-gray-800 p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl w-full max-w-4xl'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl text-blue-400 font-bold text-center mb-6'>Mentee Sign Up</h1>
                <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    <div>
                        <h3 className='text-base md:text-lg lg:text-xl font-semibold text-gray-300 mb-4'>Personal Information</h3>
                        <div className='flex flex-col lg:flex-row gap-4'>
                            <input
                                className='flex-1 px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg outline-none'
                                name='name'
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                className='flex-1 px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg outline-none'
                                name='email'
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className='flex items-center relative'>
                                <input
                                    className='flex-1 px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg outline-none '
                                    name='password'
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div
                                    className='absolute right-3 text-xl cursor-pointer z-10 text-black'
                                    onClick={() => setPasswordVisible(!passwordVisible)}

                                >
                                    {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='text-base md:text-lg lg:text-xl font-semibold text-gray-300 mb-4'>Professional and Educational Information</h3>
                        <input
                            className='w-full px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg mt-4 outline-none'
                            type="text"
                            name="interests"
                            placeholder='Enter interests separated by commas (e.g., coding, music)'
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            required
                        />
                        <input
                            className='w-full px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg mt-4 outline-none'
                            type="text"
                            name="yearsOfExperience"
                            placeholder='Experience in Years (if any)'
                            value={yearsOfExperience}
                            onChange={(e) => setYearsOfExperience(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className='text-base md:text-lg lg:text-xl font-semibold text-gray-300 mb-4'>Highest Education Degree</h3>
                        <div className='flex flex-col lg:flex-row gap-4'>
                            <input
                                className='flex-1 px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg outline-none'
                                type="text"
                                name="highestDegreeInstituteName"
                                placeholder="Institute Name"
                                value={highestDegreeInstitute}
                                onChange={(e) => setHighestDegreeInstitute(e.target.value)}
                                required
                            />
                            <input
                                className='flex-1 px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg outline-none'
                                type="text"
                                name="highestDegreeName"
                                placeholder="Degree Name"
                                value={highestDegreeName}
                                onChange={(e) => setHighestDegreeName(e.target.value)}
                                required
                            />
                            <input
                                className='flex-1 px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg outline-none'
                                type="number"
                                name="highestDegreeCompletionYear"
                                placeholder="Completion Year"
                                value={highestDegreeCompletionYear}
                                onChange={(e) => setHighestDegreeCompletionYear(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className='text-base md:text-lg lg:text-xl font-semibold text-gray-300 mb-4'>Other Degrees</h3>
                        {otherDegrees.map((degree, index) => (
                            <div key={index} className='flex flex-col lg:flex-row gap-4 mb-4'>
                                <input
                                    className='flex-1 px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg outline-none'
                                    type="text"
                                    placeholder="Institute"
                                    value={degree.institute}
                                    onChange={(e) => handleOtherDegreeChange(index, "institute", e.target.value)}
                                    required
                                />
                                <input
                                    className='flex-1 px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg outline-none'
                                    type="text"
                                    placeholder="Degree Name"
                                    value={degree.degreeName}
                                    onChange={(e) => handleOtherDegreeChange(index, "degreeName", e.target.value)}
                                    required
                                />
                                <input
                                    className='flex-1 px-3 py-2 rounded-lg text-black text-sm md:text-base lg:text-lg outline-none'
                                    type="text"
                                    placeholder="Completion Year"
                                    value={degree.completionYear}
                                    onChange={(e) => handleOtherDegreeChange(index, "completionYear", e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                        <button
                            className='text-base md:text-lg lg:text-xl bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold '
                            type="button"
                            onClick={handleAddDegree}
                        >
                            Add Another Degree
                        </button>
                    </div>
                    <div className='text-center'>
                        <button
                            type='submit'
                            className='text-base md:text-lg lg:text-xl bg-blue-400 text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-600 w-full'
                        >
                            Sign Up
                        </button>
                        <p className='text-sm md:text-base lg:text-lg text-gray-400 mt-4'>
                            Already have an account? <Link to="/mentee-login" className='text-blue-400 hover:underline'>Login here</Link>
                        </p>
                        <Link
                            to="/mentor-register"
                            className='text-base md:text-lg lg:text-xl block mt-4 bg-gray-700 text-white px-10 py-3 rounded-lg font-bold hover:bg-gray-600'
                        >
                            Sign Up as a Mentor
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MenteeSignupPage;
