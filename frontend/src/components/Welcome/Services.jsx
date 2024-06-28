import React from "react";
import Food from "../../assets/qualityFood.png";
import donate from "../../assets/donate.png";
import delivery from "../../assets/delivery.png";
import playstore from "../../assets/playstore.png";
import AppStore from "./AppStore";
import { Apps } from "@mui/icons-material";
import FeatureCards from "./featureCard";
import background from "../../assets/blob.svg"; // Check and adjust the path if necessary

const ServicesData = [
  {
    id: 1,
    img: playstore,
    title: "Order fast from anywhere",
    description:
      "Download the app today.",
    aosDelay: "100",
  },
  {
    id: 2,
    img: donate,
    title: "Donate",
    description:
      "Purchase or donate the food",
    aosDelay: "300",
  },
  {
    id: 3,
    img: delivery,
    title: "Delivery",
    description:
      "Collect or deliver",
    aosDelay: "500",
  },
];

const Services = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Set z-index of background to -1 to ensure it's behind the content */}
      <div className="absolute z-[-1] w-full h-full top-0 left-0 bg-cover"  />
      
      <span id="services"></span>
     
      <div className="rounded-xl  mb-20">
        <div className="container">
          {/* Heading section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl font-bold font-cursive text-darkBlue">
              Nawalah Provides You With
            </h1>
          </div>

          {/* Services Card section */}
          <div className="grid gap-14 md:grid-cols-3 md:gap-5">
            {ServicesData.map((service) => (
              <FeatureCards key={service.id} title={service.title} description={service.description} aosDelay={service.aosDelay} image={service.img}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
