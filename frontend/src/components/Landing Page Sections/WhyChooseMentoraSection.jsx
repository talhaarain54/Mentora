import React from 'react'
import WhyChooseMentoraSectionCard from '../Landing Page Components/WhyChooseMentoraSectionCard'
import { FaBullseye, FaUsers, FaRegCalendarAlt, FaCheckCircle } from 'react-icons/fa';



function WhyChooseMentoraSection() {
  return (
    <section className='border-b-[0.5px] border-gray-500 pb-10'>
        <div className='p-8 md:pt-10 md:pb-10 md:pl-28 md:pr-28'>
            <h1 className='text-2xl md:text-3xl lg:text-5xl text-gray-200 text-center font-semibold'>Why Choose Mentora?</h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 p-5 m-auto'>
            <WhyChooseMentoraSectionCard heading={"Personalized Mentorship"} content={"Tailored to your career goals."} icon={<FaBullseye />}/>
            <WhyChooseMentoraSectionCard heading={"Growing Network"} content={"Access to a growing community of professionals."} icon={<FaUsers />} />
            <WhyChooseMentoraSectionCard heading={"Flexible Scheduling"} content={"Easy communication tools and scheduling options."} icon={<FaRegCalendarAlt />}/>
            <WhyChooseMentoraSectionCard heading={"Verified Experts"} content={"Trusted mentors with experience in your field."} icon={<FaCheckCircle />}/>
        </div>
    </section>
  )
}

export default WhyChooseMentoraSection