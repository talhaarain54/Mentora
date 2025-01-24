import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MentorContext } from '../contexts/MentorContext';
import axios from 'axios';

function MentorLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {mentor, setMentor} = useContext(MentorContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();        

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/mentor/login`, {email, password});
            if(response.status === 200){
                setMentor(response.data.mentor);
                localStorage.setItem("token", response.data.token);
                navigate("/mentor-dashboard");
            }
        } catch (error) {
            if(error.response && error.response.data){
                const errors = error.response.data.error;
                const error = error.response.data.message;

                if(errors){
                    let errMsg = "";
                    errors.forEach((err) => {
                        console.error(`Field: ${err.path}, Message: ${err.msg}`);
                        errMsg.concat(err.msg);
                    });
                    alert("Error: ", errMsg);
                }

                if(error){
                    console.error(error);
                    alert("Error: ", error);
                }

                else {
                    console.error("An unexpected error occurred:", error);
                    alert("Something went wrong. Please try again later.");
                }
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
                            className='min-w-60 text-base md:text-lg lg:text-xl  rounded-lg px-3 py-1 text-black outline-none sm:placeholder:text-lg md:placeholder:text-xl '
                            name='email'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className='min-w-60 text-base md:text-lg lg:text-xl  rounded-lg px-3 py-1 text-black outline-none sm:placeholder:text-lg md:placeholder:text-xl '
                            name='password'
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-full flex justify-center items-center gap-7 flex-col'>
                        <div>
                            <button type='submit' className='text-lg md:text-xl lg:text-2xl font-semibold bg-blue-400 rounded-lg py-2 w-72'>Login</button>
                            <p className='mt-2 text-center'>New here? <Link to="/mentor-register" className='text-blue-600' >Create an Account</Link></p>
                        </div>
                        <Link to="/mentee-login" className='text-lg md:text-xl lg:text-2xl font-semibold bg-blue-800 rounded-lg py-2 w-80 text-center' > Login as a Mentee </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MentorLoginPage;