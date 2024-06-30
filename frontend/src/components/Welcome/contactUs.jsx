import React from "react";
import bgImg from "../../assets/contact.jpg";

const ContactForm = () => {
  return (
    <div id="contact" className="  min-h-screen flex items-center justify-center "  style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }} >


      <form className="max-w-lg mx-auto mb-12 p- bg-transparent">
      <div className="text-center ">
       
            <h1 className="text-6xl  text-[#f10057] font-bold font-cursive mb-20">
              Contact Us
            </h1>
          </div>
        <input
          name="name"
          type="text"
          className="feedback-input w-full p-4 mb-4 rounded text-darkBlue bg-transparent border-2 border-[#f10057] focus:border-red-500 outline-none"
          placeholder="Name"
        />
        <input
          name="email"
          type="text"
          className="feedback-input w-full p-4 mb-4 rounded text-darkBlue bg-transparent border-2 border-[#f10057] focus:border-red-500 outline-none"
          placeholder="Email"
        />
        <textarea
          name="text"
          className="feedback-input w-full p-4 mb-4 rounded text-darkBlue bg-transparent border-2 border-[#f10057] focus:border-red-500 outline-none h-40 resize-vertical"
          placeholder="Comment"
        ></textarea>
        <input
          type="submit"
          value="SUBMIT"
          className="w-full bg-[#f10057] hover:bg-[#f10057]/70 text-white font-bold py-4 rounded cursor-pointer transition-all duration-300"
        />
      </form>
    </div>
  );
};

export default ContactForm;
