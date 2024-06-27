import React from "react";
import Food from "../../assets/qualityFood.png";
import discount from "../../assets/discount.png";
import delivery from "../../assets/delivery.png";


const ServicesData = [
  {
    id: 1,
    img: Food,
    name: "Quality Food",
    description:
      "Providing delicious and quality food from the top notch restaurants of your city",
    aosDelay: "100",
  },
  {
    id: 2,
    img: discount,
    name: "Low Rates",
    description:
      "Provides multiple discounts and free food vouchers to their customers",
    aosDelay: "300",
  },
  {
    id: 3,
    img: delivery,
    name: "Quick Delivery",
    description:
      "Prodies the quickest delivery at you door step",
    aosDelay: "500",
  },
];
const Services = () => {
  return (
    <>
      <span id="services"></span>
      <div className="py-10">
        <div className="container">
          {/* Heading section  */}
          <div className="text-center mb-20">
            <h1 className="text-4xl font-bold font-cursive text-gray-800">
              Nawalah Provides You With
            </h1>
          </div>

          {/* Services Card section  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
            {ServicesData.map((service) => (
             <div
             data-aos="fade-up"
             data-aos-delay={service.aosDelay}
             className="rounded-2xl bg-white hover:bg-card hover:text-white relative shadow-xl duration-high group max-w-[300px] delay-600 hover:opacity-50"
           >
            
                <div className="h-[122px]">
                  <img
                    src={service.img}
                    alt=""
                    className="max-w-[200px] block mx-auto transform -translate-y-14
                  group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="w-full "></div>
                  <h1 className="text-xl font-serif mb-2 font-bold">{service.name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
