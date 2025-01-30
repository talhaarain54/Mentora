import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function MentorLogoutPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/mentor/logout`, {}, {headers: { Authorization: `Bearer ${token}`}})
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/mentor-login");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        alert(`Error during logout: ${error}`);
        navigate("/mentor-login");
      });

    if (!token) {
      navigate("/mentor-login");
      return;
    }
  }, []);
  return (
    <div className='flex h-screen w-full justify-center items-center'>
      <h2 className='text-2xl text-blue-700 font-bold'>Loading....</h2>
    </div>
  )
}

export default MentorLogoutPage