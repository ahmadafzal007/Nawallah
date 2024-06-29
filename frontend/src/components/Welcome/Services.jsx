import React from "react";
import Food from "../../assets/service1.png";
import donate from "../../assets/donate.png";
import delivery from "../../assets/service3.png";
import discount from "../../assets/service2.png";
import playstore from "../../assets/playstore.png";
import AppStore from "./AppStore";
import { Apps } from "@mui/icons-material";
import FeatureCards from "./featureCard";
import background from "../../assets/blob.svg"; // Check and adjust the path if necessary



const ServicesData = [
  {
    id: 1,
    img: Food,
    name: "Purchase Discounted Food",
    description:
    "",
      // "Providing delicious and quality food from the top notch restaurants of your city",
    aosDelay: "100",
  },
  {
    id: 2,
    img: discount,
    name: "Donate Food to Welfares",
    description:"",
      // "Provides multiple discounts and free food vouchers to their customers",
    aosDelay: "300",
  },
  {
    id: 3,
    img: delivery,
    name: "Quick Delivery/ Pick Up",
    description:"",
      // "Prodies the quickest delivery at you door step",
    aosDelay: "500",
  },
];
const Services = () => {
  return (
    <div className="bg-transparent">

    <div id="services" className="bg-[#f5eee8]">
      <div className=" pb-40 h-fit relative">
        <div className="container">
          {/* Heading section  */}
          <div className="text-center ">
            <h1 className="text-6xl pb-4 text-[#d11559] font-bold font-cursive mb-36 text-gray-800">
              Nawalah Helps You 
            </h1>
          </div>
          <div className="  ">
          {/* Services Card section  */}
          <div className="grid  grid-cols-1 lg:grid-cols-2  xl:grid-cols-3  gap-32 md:gap-32 place-items-center">
            {ServicesData.map((service) => (
             <div
             data-aos="fade-up"
             data-aos-delay={service.aosDelay}
             className="rounded-2xl bg-white hover:bg-brandDark  relative shadow-xl duration-high group max-w-[400px] min-w-[400px] delay-600 hover:opacity-50"
           >
            
                <div className="h-[122px]">
                  <img
                    src={service.img}
                    alt=""
                    className="max-w-[200px] block mx-auto transform -translate-y-14
                  group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="py-12  mx-4 text-center">
                  <div className="w-full ">
                  <h1 className="text-xl font-bold text-[#d11559] font-cursive2">{service.name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                    {service.description}
                  </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      </div>


     

    </div>
  );
};

export default Services;



