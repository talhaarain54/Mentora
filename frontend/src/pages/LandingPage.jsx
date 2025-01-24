import React from 'react'
import Header from '../components/header/Header'
import HeroSection from '../components/Landing Page Sections/HeroSection'
import OurMissionSection from '../components/Landing Page Sections/OurMissionSection'
import WhyChooseMentoraSection from '../components/Landing Page Sections/WhyChooseMentoraSection'
import AboutUsSection from '../components/Landing Page Sections/AboutUsSection'
import ContactUsSection from '../components/Landing Page Sections/ContactUsSection'
import Footer from '../components/Footer/Footer'

function LandingPage() {
  return (
    <div>
        <Header />
        <main>
            <HeroSection />
            <OurMissionSection />
            <WhyChooseMentoraSection />
            <AboutUsSection />
            <ContactUsSection />
        </main>
        <Footer />
    </div>
  )
}

export default LandingPage