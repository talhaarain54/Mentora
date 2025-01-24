import React from 'react'

function WhyChooseMentoraSectionCard({heading, content, cardStyle, icon}) {
  return (
    <div className={`bg-blue-400 w-72 md:w-80 h-56 md:h-72 pt-5 pl-5 pr-5 pb-8 rounded-xl m-auto shadow-lg shadow-blue-900 ${cardStyle}`}>
        <h1 className='text-xl md:text-2xl lg:text-3xl text-center text-white font-bold'>{heading}</h1>
        <p className='text-lg md:text-xl lg:text-2xl  text-center text-white mt-4'>{content}</p>
        <div className='text-6xl flex items-center justify-center mt-5'>
            {icon}
        </div>
    </div>
  )
}

export default WhyChooseMentoraSectionCard