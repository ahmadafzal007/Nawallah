import React from 'react';
import food from "../../assets/food.png"
const AboutUsPage = () => {
  return (
    <div id="about" className=" min-h-screen flex justify-center items-center">
      <div className="about-sec flex justify-center items-center">
        <div className="about-img  w-[500px] mr-8 ml-4">
        <svg class="svg-icon"  viewBox="0 0 1041 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path 
        fill='#d11559'
        d="M524.575 975.495c255.102 0 459.902-206.597 459.902-461.699S779.677 53.895 524.575 53.895 62.877 258.695 62.877 513.796s206.597 461.699 461.698 461.699z m0 46.709c-280.252 0-506.61-228.155-506.61-508.408S244.323 7.186 524.575 7.186s506.611 226.358 506.611 506.61-226.358 508.408-506.61 508.408z m26.948-795.846c-16.169 0-28.744 5.39-41.32 16.168-10.778 10.78-17.964 25.151-17.964 41.32s5.39 28.743 17.965 41.319c10.778 10.779 25.15 16.168 41.319 16.168 16.168 0 28.744-5.39 41.32-16.168 10.778-10.779 16.168-25.151 16.168-41.32 0-16.168-5.39-28.743-16.169-41.319-12.575-10.779-25.15-16.168-41.32-16.168z m-3.593 513.796c-5.39-5.39-7.186-16.168-7.186-30.54 0-5.39 0-14.372 1.796-25.15 1.797-10.78 3.593-21.559 5.39-30.541l21.558-111.383c1.796-10.779 3.593-21.558 3.593-34.133s1.796-21.558 1.796-25.15c0-23.355-5.39-43.117-17.965-57.489-10.779-14.372-26.947-21.557-48.505-21.557-10.779 0-23.354 3.593-37.726 8.982-12.576 5.39-26.948 12.575-41.32 21.558l-5.39 34.133c3.594-1.796 8.983-5.39 14.373-7.186 5.39-1.796 12.575-3.593 17.965-3.593 10.779 0 19.761 3.593 23.354 8.983 3.593 5.39 5.39 16.168 5.39 30.54 0 7.186 0 16.168-1.797 25.15-1.796 8.983-3.593 19.762-5.39 30.541l-19.76 111.383c-1.797 12.575-3.594 21.558-3.594 30.54-1.796 8.983-1.796 17.965-1.796 26.947 0 23.355 5.39 41.32 17.965 57.488 12.575 14.372 28.744 21.558 50.301 21.558 14.372 0 25.151-1.796 35.93-7.186 10.78-5.39 25.151-12.575 41.32-23.354l5.39-34.134-14.373 7.186c-7.186 1.797-12.575 3.593-17.965 3.593-10.779 1.797-19.761-1.796-23.354-7.186z"  /></svg>        </div>
        <div className="about-intro text-white border-l-4 border-[#840d38] p-8 md:p-10">
          <h3 className="text-3xl md:text-5xl font-bold font-sans text-[#d11559] mb-4 md:mb-6">About Us<span className="text-[#840d38]"> !</span></h3>
          <p className=" text-xl font-mono opacity-70 text-[#d11559] leading-relaxed">
          We operate a win-win-win business model focused on benefiting people, profit, and the planet. <br/>
          Nawalah is dedicated to reducing food waste and addressing hunger through a unique platform. By connecting food businesses with consumers, we ensure surplus food is saved from going to waste. 
          
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
