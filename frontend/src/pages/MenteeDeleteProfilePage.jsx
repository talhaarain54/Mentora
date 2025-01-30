import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MenteeDeleteProfilePage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!password) {
            alert("Please Enter Password");
            return;
        }
    
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/mentee/delete-profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    data: { password }, 
                }
            );
    
            console.log(response);
    
            if (response.status === 200) {
                localStorage.removeItem("token");
                alert("Your profile has been deleted");
                navigate('/mentee-login');
            }
        } catch (error) {
            console.log("Error", error);
            setError(error.response?.data?.message || "An error occurred");
        }
    };
    

    return (
        <div className="px-4 py-14 flex justify-center items-center h-screen bg-gray-800 text-white ">
            <div className="w-full max-w-md bg-gray-700 rounded-lg p-6 shadow-lg">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-6">Delete Your Profile</h2>
                <p className="text-xs sm:text-base md:text-lg text-center mb-4">
                    Are you sure you want to permanently delete your profile? This action cannot be undone.
                </p>

                <form >
                    <div className="flex justify-center mb-4">
                        <input
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-xs sm:text-base md:text-lg w-full p-2 mt-1 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && <p className="text-xs sm:text-base text-red-500 text-center mb-4">{error}</p>}

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handleDelete}
                            className={`px-4 py-2 text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg w-full`}
                        >
                            Delete Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MenteeDeleteProfilePage;
