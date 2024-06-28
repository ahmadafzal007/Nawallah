import React from "react";
import HeroPng from "../../assets/food.png";
import { Link } from "react-router-dom";



const Hero = () => {
  return (
    <>
      <div className="min-h-[550px] sm:min-h-[600px] bg-brandDark flex justify-center items-center text-white">
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div className="flex flex-col justify-center gap-6 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
              <h1
                data-aos="fade-up"
                data-aos-once="true"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold"
              >
                We serve the quality{" "}
                <span
                  data-aos="zoom-out"
                  data-aos-delay="300"
                  className="bg-clip-text text-transparent bg-costomFont font-cursive"
                >
                  Food
                </span>{" "}
                from the best Restaurents of your Town 
              </h1>
              <div data-aos="fade-up" data-aos-delay="400">
               
               <Link to={"/HotelRegister"}>
                <button className="bg-gradient-to-r from-secondary to-secondary border-2 border-primary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                  Business Account
                </button>
                </Link>

              </div>
            </div>
            {/* Image section */}
            <div
              data-aos="zoom-in"
              data-aos-duration="300"
              className="min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 "
            >
              <img
                data-aos-once="true"
                src={HeroPng}
                alt="biryani img"
                className="w-400px] sm:w-[580px] sm:scale-125 mx-auto spin "
              />
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
