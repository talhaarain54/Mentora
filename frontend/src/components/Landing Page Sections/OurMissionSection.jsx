import React from 'react'
import OurMissionCard from '../Landing Page Components/OurMissionCard'

function OurMissionSection() {
  return (
    <section id='our-mission' className='border-b-[0.5px] border-gray-500 pb-10'>
    <div className='p-8 md:pt-10 md:pb-10 md:pl-28 md:pr-28'>
        <h1 className='text-2xl md:text-3xl lg:text-5xl  text-gray-200 text-center font-semibold'>Our Mission: Bridging the Gap Between Aspirations and Expertise</h1>
        <p className='text-xl md:text-2xl lg:text-3xl text-center mt-5'>At Mentora, we believe in the power of guidance and the potential it unlocks in every individual. Our mission is to create a platform where learning meets experience, connecting mentees with mentors who inspire, guide, and help them achieve their dreams.</p>
    </div>
    <div className='flex items-center flex-col lg:justify-center lg:flex-row gap-10'>
        <OurMissionCard heading={"Empower Growth"} content={"We empower individuals by facilitating meaningful mentorship relationships tailored to their unique goals."} />
        <OurMissionCard heading={"Foster Connections"} content={"We bring together a diverse community of mentors and mentees to share knowledge and build networks."} />
        <OurMissionCard heading={"Transform Futures"} content={"Through personalized guidance, we enable mentees to overcome challenges, gain confidence, and achieve their aspirations."} />
    </div>
</section>
  )
}

export default OurMissionSection