import React from "react";
import HeroPng from "../../assets/food.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-transparent">
    {/* min-h-[550px] sm:min-h-[600px]  */}
      <div className=" flex justify-center items-center text-white relative
       bg-brandDark h-fit pt-20 overflow-hidden">
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* text content section */}
            <div className="flex flex-col justify-center gap-6 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
              <h1
                data-aos="fade-up"
                data-aos-once="true"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold"
              >
                Save the{" "}
                <span
                  data-aos="zoom-out"
                  data-aos-delay="300"
                  className="bg-clip-text text-transparent bg-costomFont font-cursive"
                >
                   planet
                </span>{" "}
                by simply eating and donating with{" "}
                <span
                  data-aos="zoom-out"
                  data-aos-delay="300"
                  className="bg-clip-text text-transparent bg-costomFont font-cursive"
                >
                   Nawalah
                </span>{" "}
              </h1>
              <div data-aos="fade-up" data-aos-delay="400">
                <Link to={"/HotelRegister"}>
                  <button className="hover:bg-brandDark border-2 mt-8 hover:scale-105 duration-200 font-bold text-lg hover:text-white py-4 px-14 rounded-full bg-white text-brandDark">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
            {/* Image section */}
            <div
              data-aos="zoom-in"
              data-aos-duration="300"
              className="min-h-[450px] flex justify-center items-center relative order-1 sm:order-2"
            >
              <img
                data-aos-once="true"
                src={HeroPng}
                alt="biryani img"
                className="w-400px sm:w-[580px] sm:scale-125 mx-auto spin"
              />
            </div>
          </div>
        </div>
        {/* SVG at the bottom */}
        
      </div>
        <div className="bg-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#7F1D1D"
              fillOpacity="1"
              d="M0,96L40,96C80,96,160,96,240,112C320,128,400,160,480,154.7C560,149,640,107,720,96C800,85,880,107,960,122.7C1040,139,1120,149,1200,149.3C1280,149,1360,139,1400,133.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            ></path>
          </svg>
        </div>
    </div>
  );
};

export default Hero;
