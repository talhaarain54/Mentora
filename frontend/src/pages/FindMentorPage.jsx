import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MentorProfileCard from '../components/DashboardComponents/MentorProfileCard';

function FindMentorPage() {
    const token = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [expertise, setExpertise] = useState("");
    const [searchedMentors, setSearchedMentors] = useState([]);

    useEffect(() => {
        searchMentors();
    }, []);

    const searchMentors = async () => {
        try {
            const params = {};
            if (name) params.name = name;
            if (expertise) params.expertise = expertise.split(",").map((exp) => exp.trim());
    
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/mentor/get-all-mentors`, {
                params,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("search mentor", response);
            
            if (response.status === 200) {
                setSearchedMentors(response.data);
            }
        }
        catch (error) {
            console.error('Error fetching suggested mentors: ', error);
            alert("Error fetching mentors please try again later!", error);
        }

        setName("");
        setExpertise("");
    }

    return (
        <div className='px-4 py-14'>
            <h2 className='text-lg md:text-xl lg:text-2xl font-semibold text-center mb-3'>Find Mentors</h2>
            <div className='w-full flex flex-col items-center md:flex-row md:justify-center gap-2'>
                <input
                    className='px-2 py-1 text-base md:text-lg lg:text-xl text-gray-300 bg-gray-700 placeholder:text-xs outline-none rounded-md'
                    type="search"
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className='px-2 py-1 text-base md:text-lg lg:text-xl text-gray-300 bg-gray-700 placeholder:text-xs outline-none rounded-md'
                    type="search"
                    placeholder='Expertise (comma "," separated values)'
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                />
                <button
                    className='bg-blue-600 text-white text-xs md:text-base lg:text-lg rounded-md px-3 py-1'
                    onClick={searchMentors}
                >
                    Search
                </button>
            </div>
            <h3 className='text-lg md:text-xl lg:text-2xl font-semibold text-center my-3'>Mentors</h3>
            <div className='mt-5 flex flex-col gap-10 sm:flex-row flex-wrap justify-center items-center'>
                {
                    searchedMentors && searchedMentors.map((mentor) => (
                        <MentorProfileCard mentor={mentor} key={mentor._id} />
                    ))
                }
            </div>
        </div>
    )
}

export default FindMentorPage