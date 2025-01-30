import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MentorContext } from '../contexts/MentorContext';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from 'axios';

function MentorLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { mentor, setMentor } = useContext(MentorContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/mentor/login`, { email, password });
            if (response.status === 200) {
                setMentor(response.data.mentor);
                localStorage.setItem("token", response.data.token);
                navigate("/mentor-dashboard");
            }
        } catch (err) {
            console.error("Login Error:", err);
        
            if (err.response) {
                // Server responded with an error status
                const { data, status } = err.response;
        
                if (data.error && Array.isArray(data.error)) {
                    // Handling validation errors
                    let errMsg = "";
                    data.error.forEach((error) => {
                        console.error(`Field: ${error.path || "Unknown"}, Message: ${error.msg}`);
                        errMsg += `${error.msg}\n`;
                    });
                    alert(`Validation Error:\n${errMsg.trim()}`); // Use UI notification if needed
                } else if (data.message) {
                    // Handling authentication errors or general server errors
                    console.error(`Error ${status}: ${data.message}`);
                    alert(`Error: ${data.message}`);
                } else {
                    console.error(`Unexpected error ${status}:`, data);
                    alert("An unexpected error occurred. Please try again.");
                }
            } else if (err.request) {
                // No response from the server
                console.error("No response received from the server:", err.request);
                alert("Server is not responding. Please check your internet connection and try again.");
            } else {
                // Unexpected error (network issue, client-side error, etc.)
                console.error("Unexpected error:", err.message);
                alert("Something went wrong. Please try again later.");
            }
        }
        
    }
    return (
        <div className='w-full h-screen flex justify-center items-center py-5 px-2'>
            <div className='bg-gray-700 m-auto  p-4 md:p-6 lg:p-8 rounded-xl'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl text-blue-400 font-bold text-center mb-2'>Mentor Login</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-4 mt-8'>
                        <input
                            className='min-w-60 text-sm md:text-base lg:text-lg rounded-lg px-3 py-1 text-black outline-none sm:placeholder:text-lg md:placeholder:text-xl '
                            name='email'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className='flex items-center relative'>
                            <input
                                className='min-w-80 text-sm md:text-base lg:text-lg rounded-lg px-3 py-1 text-black outline-none sm:placeholder:text-lg md:placeholder:text-xl '
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
                    <div className='w-full flex justify-center items-center gap-7 flex-col'>
                        <div>
                            <button type='submit' className='text-base md:text-lg lg:text-xl font-semibold bg-blue-400 rounded-lg py-2 w-72'>Login</button>
                            <p className='text-sm md:text-base lg:text-lg mt-2 text-center'>New here? <Link to="/mentor-register" className='text-blue-600' >Create an Account</Link></p>
                        </div>
                        <Link to="/mentee-login" className='text-base md:text-lg lg:text-xl font-semibold bg-blue-800 rounded-lg py-2 w-80 text-center' > Login as a Mentee </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MentorLoginPage;