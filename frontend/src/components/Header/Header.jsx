import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Mentora.png';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";


function Header() {
    const [isOpen, setIsOpen] = useState(false)

    // useEffect(() => {
    //     if (isOpen) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "auto";
    //     }
    // }, [isOpen])
    return (
        <header className=''>
            <nav className='bg-gray-800 w-full h-20 pt-2 pb-2 pl-8 pr-8 flex items-center justify-between shadow-sm shadow-black'>
                <Link to='/' className="w-28 h-16 flex items-center">
                    <img src={Logo} alt="Mentora Logo" />
                </Link>
                {/* For Dekstop View */}
                <div className='md:flex justify-between gap-8 hidden '>
                    <Link to="/" className='text-xl hover:text-gray-400 transition-colors duration-300'>
                        Home
                    </Link>
                    <a href='#about-us' className='text-xl hover:text-gray-400 transition-colors duration-300'>
                        About Us
                    </a>
                    <a href="#contact-us" className='text-xl hover:text-gray-400 transition-colors duration-300'>
                        Contact Us
                    </a>
                    <Link to="/privacy-policy" className='text-xl hover:text-gray-400 transition-colors duration-300'>
                        Privacy Policy
                    </Link>
                </div>
                <div className='hidden md:block'>
                    <Link to="/mentee-login" className='bg-blue-400 pl-5 pr-5 pt-2 pb-2 rounded-lg text-lg font-semibold hover:bg-blue-500 shadow-lg shadow-blue-900'>
                        Get Started
                    </Link>
                </div>
                <div
                    onClick={() => setIsOpen((prev) => !prev)}
                    className='block md:hidden absolute top-auto right-4 text-4xl font-bold'
                >
                    {
                        isOpen ? <div><ImCross /></div> : <div><GiHamburgerMenu /></div>
                    }
                </div>

                {/* For Mobile View  */}
                <div
                    className={`flex md:hidden flex-col bg-gray-900 p-5 fixed inset-0 top-20 transition-transform duration-700 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <Link to="/" className='border-b-[0.5px] pt-1 pb-1 border-gray-500 text-xl hover:text-gray-400 transition-colors duration-300'>
                        Home
                    </Link>
                    <a href='#about-us' className='border-b-[0.5px] pt-1 pb-1 border-gray-500 text-xl hover:text-gray-400 transition-colors duration-300'>
                        About Us
                    </a>
                    <a href="#contact-us" className='border-b-[0.5px] pt-1 pb-1 border-gray-500 text-xl hover:text-gray-400 transition-colors duration-300'>
                        Contact Us
                    </a>
                    <Link to="/privacy-policy" className='border-b-[0.5px] pt-1 pb-1 border-gray-500 text-xl hover:text-gray-400 transition-colors duration-300'>
                        Privacy Policy
                    </Link>
                </div>

            </nav>
        </header>
    )
}

export default Header;