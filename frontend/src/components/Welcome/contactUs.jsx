import React from "react";
import bgImg from "../../assets/contact.jpg";
import Admin from "../../API/Admin";

const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const text = e.target.text.value;
    const data = {
      name,
      email,
      subject,
      text,
    };
    console.log(data);
    try {
      const res = await Admin.sendMail(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
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
        required
          name="name"
          type="text"
          className="feedback-input w-full p-4 mb-4 rounded text-darkBlue bg-transparent border-2 border-[#f10057] focus:border-red-500 outline-none"
          placeholder="Name"
        />
        <input
        required
          name="email"
          type="text"
          className="feedback-input w-full p-4 mb-4 rounded text-darkBlue bg-transparent border-2 border-[#f10057] focus:border-red-500 outline-none"
          placeholder="Email"
        />
         <input
         required
          name="subject"
          type="text"
          className="feedback-input w-full p-4 mb-4 rounded text-darkBlue bg-transparent border-2 border-[#f10057] focus:border-red-500 outline-none"
          placeholder="Subject"
        />
        
        <textarea
        required
          name="text"
          className="feedback-input w-full p-4 mb-4 rounded text-darkBlue bg-transparent border-2 border-[#f10057] focus:border-red-500 outline-none h-40 resize-vertical"
          placeholder="Comment"
        ></textarea>
        <input
          type="submit"
          value="SUBMIT"
          onSubmit={()=>handleSubmit(e)}
          className="w-full bg-[#f10057] hover:bg-[#f10057]/70 text-white font-bold py-4 rounded cursor-pointer transition-all duration-300"
        />
      </form>
    </div>
  );
};

export default ContactForm;
