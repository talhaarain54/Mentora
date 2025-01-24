import React from 'react'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section className='border-b-[0.5px] border-gray-500 pb-10'>
        <div className='p-8 md:pt-10 md:pb-10 md:pl-28 md:pr-28 '>
            <h1 className='text-2xl md:text-3xl lg:text-5xl text-gray-200 text-center font-semibold'>Mentorship Simplified, Growth Alpified</h1>
            <p className='text-xl md:text-2xl lg:text-3xl text-center mt-4'>"Mentora connects aspiring mentees with experienced mentors to unlock their true potential. Whether you’re seeking guidance or sharing expertise, Mentora is your gateway to meaningful mentorship."</p>
            <p className='text-xl md:text-2xl lg:text-3xl text-center mt-4 pl-2 pr-2'>Join our thriving community of mentors and mentees. Start your journey to personal and professional growth today!</p>
        </div>
        <div className='flex justify-center items-center gap-5 md:gap-10 flex-col md:flex-row'>
        <Link to="/mentee-register" className='bg-blue-400 pl-5 pr-5 pt-2 pb-2 w-52 rounded-lg text-lg md:text-xl text-center font-semibold hover:bg-blue-500 shadow-lg shadow-blue-900'>
            Find a Mentor
        </Link>
        <Link to="/mentor-register" className='bg-blue-400 pl-5 pr-5 pt-2 pb-2 w-52 rounded-lg text-lg md:text-xl text-center font-semibold hover:bg-blue-500 shadow-lg shadow-blue-900'>
            Become a Mentor
        </Link> 
        </div>
    </section>
  )
}

export default HeroSection