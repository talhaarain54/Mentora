import React from 'react'
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";



function Footer() {
    return (
        <footer className='pt-10'>
            <div className='flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16'>
                <div className='w-full md:w-1/2'>
                    <h3 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-200 text-center'>Quick Links</h3>
                    <ul className='flex flex-col items-center'>
                        <li><a href='/privacy-policy.html' className='flex gap-4 items-center text-base md:text-lg lg:text-xl text-center'>Privacy Policy</a></li>
                        <li><a href='/terms-and-conditions.html' className='flex gap-4 items-center text-base md:text-lg lg:text-xl text-center'>Terms and conditions</a></li>
                        <li><a href='#contact-us' className='flex gap-4 items-center text-base md:text-lg lg:text-xl text-center'>Contact Us</a></li>
                        <li><a href='#about-us' className='flex gap-4 items-center text-base md:text-lg lg:text-xl text-center'>About Us</a></li>
                    </ul>
                </div>
                <div className='w-full md:w-1/2'>
                    <h3 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-200 text-center'>Social Media</h3>
                    <ul className='flex flex-col items-center '>
                        <li><a href="#" className='flex gap-4 items-center text-base md:text-lg lg:text-xl text-center'><FaFacebook />Facebook</a></li>
                        <li><a href="#" className='flex gap-4 items-center text-base md:text-lg lg:text-xl text-center'><FaTwitter />Twitter</a></li>
                        <li><a href="#" className='flex gap-4 items-center text-base md:text-lg lg:text-xl text-center'><FaLinkedin />LinkedIn</a></li>
                        <li><a href="#" className='flex gap-4 items-center text-base md:text-lg lg:text-xl text-center'><FaInstagram />Instagram</a></li>
                    </ul>
                </div>
            </div>
            <p className='text-xl md:text-2xl lg:text-3xl text-center mt-20 px-2 bg-gray-800 '>© 2025 Mentora. All rights reserved.</p>
        </footer>

    )
}

export default Footer