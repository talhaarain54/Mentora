import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function MenteeLogoutPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);
  console.log(localStorage.getItem("token"));
  
  useEffect(() => {
    if (!token) {
      navigate("/mentee-login");
      return;
    }
    axios.post(`${import.meta.env.VITE_BASE_URL}/mentee/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/mentee-login");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        alert(`Error during logout: ${error}`);
        navigate("/mentee-login");
      });

  }, []);
  return (
    <div className='flex h-screen w-full justify-center items-center'>
      <h2 className='text-2xl text-blue-700 font-bold'>Loading....</h2>
    </div>
  )
}

export default MenteeLogoutPage