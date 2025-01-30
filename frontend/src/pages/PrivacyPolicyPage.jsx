import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Mentora.png';


function PrivacyPolicyPage() {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
            {/* Header with Logo */}
            <header className="w-full py-4 bg-gray-800 shadow-md">
                <div className="max-w-screen-xl mx-auto flex justify-center items-center">
                    <Link to="/" className="flex items-center">
                        <img src={Logo} alt="Mentora Logo" className="w-28 h-16" />
                    </Link>
                </div>
            </header>

            {/* Privacy Policy Content */}
            <main className="flex flex-col items-center w-full px-6 py-12 max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl lg:text-4xl  font-semibold mb-8 text-center">
                    Privacy Policy
                </h1>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                    <p className="mb-6 text-sm md:text-base lg:text-lg">
                        <strong>Effective Date:</strong> January 31, 2025
                    </p>
                    <p className="mb-6 text-sm md:text-base lg:text-lg">
                        At Mentora, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.
                    </p>

                    {/* Information We Collect */}
                    <section className="mb-8">
                        <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4">Information We Collect</h2>
                        <p className="mb-4 text-sm md:text-base lg:text-lg">We collect the following types of information:</p>
                        <ul className="list-disc pl-6 mb-4 text-sm md:text-base lg:text-lg">
                            <li>Personal details such as name, email address, etc.</li>
                            <li>Account-related information such as login credentials.</li>
                            <li>Usage data and cookies to improve your experience on our platform.</li>
                        </ul>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="mb-8">
                        <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4">How We Use Your Information</h2>
                        <p className="mb-4 text-sm md:text-base lg:text-lg">Your information is used for the following purposes:</p>
                        <ul className="list-disc pl-6 mb-4 text-sm md:text-base lg:text-lg">
                            <li>To provide and improve our services.</li>
                            <li>To personalize your experience and interact with you.</li>
                            <li>To send you updates, newsletters, or marketing materials (you can opt-out at any time).</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section className="mb-8">
                        <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4">Data Security</h2>
                        <p className="mb-4 text-sm md:text-base lg:text-lg">We take the security of your data seriously and have implemented appropriate measures to protect it from unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is 100% secure.</p>
                    </section>

                    {/* Sharing Your Information */}
                    <section className="mb-8">
                        <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4">Sharing Your Information</h2>
                        <p className="mb-4 text-sm md:text-base lg:text-lg">We do not share your personal information with third parties except in the following cases:</p>
                        <ul className="list-disc pl-6 mb-4 text-sm md:text-base lg:text-lg">
                            <li>If required by law or in response to legal processes.</li>
                            <li>With trusted service providers who assist us in operating our platform.</li>
                        </ul>
                    </section>

                    {/* Your Rights */}
                    <section className="mb-8">
                        <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4">Your Rights</h2>
                        <p className="mb-4 text-sm md:text-base lg:text-lg">You have the right to access, update, or delete your personal information. You may also have the right to object to or restrict certain types of processing of your data. If you wish to exercise these rights, please contact us at <strong>privacy@mentora.com</strong>.</p>
                    </section>

                    {/* Changes to This Privacy Policy */}
                    <section className="mb-8">
                        <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                        <p className="mb-4 text-sm md:text-base lg:text-lg">We may update this Privacy Policy from time to time. Any changes will be reflected on this page, with the effective date updated accordingly.</p>
                    </section>

                    {/* Contact Information */}
                    <section>
                        <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4">Contact Us</h2>
                        <p className='text-sm md:text-base lg:text-lg'>If you have any questions about this Privacy Policy, please contact us at <strong>privacy@mentora.com</strong>.</p>
                    </section>
                </div>

                {/* Back to Home Link */}
                <div className="mt-8">
                    <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg">
                        Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default PrivacyPolicyPage;
