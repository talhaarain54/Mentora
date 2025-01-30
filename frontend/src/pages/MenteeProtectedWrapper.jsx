import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenteeContext } from '../contexts/MenteeContext';
import axios from 'axios';

function MenteeProtectedWrapper({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setMentee } = useContext(MenteeContext);
    const token = localStorage.getItem("token");


    useEffect(() => {
        if (!token){
            navigate('/mentee-login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/mentee/get-profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setMentee(response.data.mentee);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Profile Fetch Error:", error);
                setError(error);
            
                if (error.response) {
                    // Extract status and error message
                    const { status, data } = error.response;
            
                    if (status === 401) {
                        // Unauthorized access (invalid or expired token)
                        console.warn("Unauthorized access. Redirecting to login...");
                        alert("Session expired or unauthorized access. Please log in again.");
                        navigate("/mentee-login");
                    } else if (data.message) {
                        // Handle general API errors
                        console.error(`Error ${status}: ${data.message}`);
                        alert(`Error: ${data.message}`);
                    } else {
                        // Unexpected server response
                        console.error(`Unexpected server error ${status}:`, data);
                        alert("An unexpected error occurred. Please try again.");
                    }
                } else if (error.request) {
                    // No response received from the server
                    console.error("No response received from server:", error.request);
                    alert("Server is not responding. Please check your connection and try again.");
                } else {
                    // Unexpected client-side or network error
                    console.error("Unexpected error:", error.message);
                    alert("Something went wrong. Please try again later.");
                }
            });            
    }, []);

    if (error)
        return <div>Something Went wrong please try again!</div>


    if (loading)
        return (
            <div className='flex h-screen w-full justify-center items-center'>
                <h2 className='text-2xl text-blue-700 font-bold'>Loading....</h2>
            </div>
        )
    return (
        <div>{children}</div>
    )
}

export default MenteeProtectedWrapper