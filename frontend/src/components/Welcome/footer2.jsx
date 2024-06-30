import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Footer = () => {

const Navigate = useNavigate();

  return (
    <footer className="w-full  font-mono mt-2 text-s text-[#0c2d57] text-white flex items-center justify-center">
      <span className="mr-2">Login as Administrator</span>
     
      <button onClick={()=>{Navigate("/login/#form")}} className="bg-[#f10057] hover:bg-[#f10057]/70 text-white font-mono font-semibold text-s py-[1px] px-[3px] rounded">
        Login
      </button>
    
    </footer>
  );
};

export default Footer;
