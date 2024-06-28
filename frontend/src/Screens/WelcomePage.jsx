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
      <NavBar/>
      <Hero/>
      <Services/>
      {/* <AppStore/> */}
      <Banner/>
      <SDGIcons/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default WelcomePage
