import React from 'react'
import NavBar from '../components/Welcome/NavBar';
import Hero from '../components/Welcome/Hero';
import Services from '../components/Welcome/Services';
import Banner from '../components/Welcome/Banner';
import AppStore from '../components/Welcome/AppStore';
import Testimonials from '../components/Welcome/Testimonials';
import Footer from '../components/Welcome/Footer';
// import background from '../components'
import AOS from "aos";
import "aos/dist/aos.css";
import SDGIcons from '../components/Welcome/SDGIcons';
import Caption from '../components/Welcome/caption';
import AboutUs from '../components/Welcome/aboutUs';
import Footer2 from '../components/Welcome/footer2'
import Contact from '../components/Welcome/contactUs';

const WelcomePage = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <div   className="gradient text-gray-900  duration-200 overflow-x-hidden">
      <div className='z-40'>
      <NavBar/>
      </div>
      <div className='z-30'>
      <Hero/>
      </div>
      <Services/>
      {/* <Banner/> */}
      <Caption/>
      <SDGIcons/>


      {/* <Testimonials/> */}
      <AboutUs/>
      <AppStore/>


      <Contact/>
     
   

      <Footer/>
      <Footer2/>
    </div>
  )
}

export default WelcomePage
