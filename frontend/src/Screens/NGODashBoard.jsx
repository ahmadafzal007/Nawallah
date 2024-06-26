import React  from "react";
import DonationDetail from "../components/WelfareRegister/DonationDetails"
import WelfareNav from "../components/WelfareRegister/WelfareNav.jsx"
import "aos/dist/aos.css";
import AOS from "aos";

const NGODashBoard = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return(
    <div  className="bg-brandDark h-screen dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
    <WelfareNav/>
    <DonationDetail/>
    </div>
  )



}

export default NGODashBoard;

