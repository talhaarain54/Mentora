import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


function ContactUsSection() {
    return (
        <section id="contact-us" className="border-b-[0.5px] border-gray-500 text-gray-200 py-10 px-5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl lg:text-5xl text-gray-200 text-center font-semibold">Get in Touch</h2>
                    <p className="text-xl md:text-2xl lg:text-3xl text-center mt-4 pl-2 pr-2">We’d love to hear from you! Reach out to us with any questions or feedback.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col justify-center items-start space-y-6">
                        <div className="flex items-center space-x-4">
                            <FaPhoneAlt className="text-blue-500 text-2xl" />
                            <p className="text-lg">+00123456789</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaEnvelope className="text-yellow-500 text-2xl" />
                            <p className="text-lg">example@example.com</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaMapMarkerAlt className="text-red-500 text-2xl" />
                            <p className="text-lg">Block ABC, City XYZ, Pakistan</p>
                        </div>
                    </div>


                    <div>
                        <form className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
                            <div>
                                <label htmlFor="name" className="block text-lg font-semibold mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:ring focus:ring-blue-500"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-lg font-semibold mb-2">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:ring focus:ring-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-lg font-semibold mb-2">Your Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:ring focus:ring-blue-500"
                                    placeholder="Write your message"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-lg font-semibold p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUsSection