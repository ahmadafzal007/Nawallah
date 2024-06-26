import React from 'react'
import NavBar from '../components/Welcome/NavBar';
import Hero from '../components/Welcome/Hero';
import Services from '../components/Welcome/Services';
import Banner from '../components/Welcome/Banner';
import AppStore from '../components/Welcome/AppStore';
import Testimonials from '../components/Welcome/Testimonials';
import Footer from '../components/Welcome/Footer';

import AOS from "aos";
import "aos/dist/aos.css";

  


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
    <div   className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
      <NavBar/>
      <Hero/>
      <Services/>
      <Banner/>
      <AppStore/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default WelcomePage
