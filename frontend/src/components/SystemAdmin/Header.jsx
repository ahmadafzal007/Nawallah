import React from 'react'
import "../../styles/font/font.css"
import img1 from "../../assets/admin.png"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    
  };
  const handleSearch = () => {
    const formattedQuery = searchQuery.trim().toLowerCase();
    if (formattedQuery === 'dashboard' ) {
      navigate('/dashboard', { replace: true });
    } else if (formattedQuery === 'users') {
      navigate('/users', { replace: true });
    } else if (formattedQuery === 'restaurant' ) {
      navigate('/restaurants', { replace: true });
    }
  }

  return (
    <div className='bg-secondary justify-between md:w-full w-[83%] flex flex-row shadow-[#0000001a] shadow-lg'>
    <div className='flex gap-8 m-7'>
        <h1 className='text-[#E5E5E5] hidden lg:block selector pt-3 text-2xl font-normal'>Hello Admin</h1>
        {/* <div className='rounded-lg bg-[#353535] p-3 justify-center items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12.0201 2.91C8.71009 2.91 6.02009 5.6 6.02009 8.91V11.8C6.02009 12.41 5.76009 13.34 5.45009 13.86L4.30009 15.77C3.59009 16.95 4.08009 18.26 5.38009 18.7C9.69009 20.14 14.3401 20.14 18.6501 18.7C19.8601 18.3 20.3901 16.87 19.7301 15.77L18.5801 13.86C18.2801 13.34 18.0201 12.41 18.0201 11.8V8.91C18.0201 5.61 15.3201 2.91 12.0201 2.91Z" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
  <circle cx="19.02" cy="5.93994" r="4" fill="#FF6154"/>
  <path d="M13.8699 3.2C13.5599 3.11 13.2399 3.04 12.9099 3C11.9499 2.88 11.0299 2.95 10.1699 3.2C10.4599 2.46 11.1799 1.94 12.0199 1.94C12.8599 1.94 13.5799 2.46 13.8699 3.2Z" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.90002 21.18C9.36002 20.64 9.02002 19.88 9.02002 19.06" stroke="#BDBDBD" stroke-width="1.5" stroke-miterlimit="10"/>
</svg>
        </div> */}
    </div>
    {/* <div className='flex gap-4 sm:hidden items-center px-3  my-7 rounded-lg bg-[#353535] w-[406px] h-12 shadow-[#0000001a]'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" >
  <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 22L20 20" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        <input type="text" value={searchQuery}
        onChange={handleSearchInputChange} className='text-base w-[300px]  focus:outline-none focus:ring-0 font-normal selector text-[#E5E5E5] my-2  bg-[#353535]' placeholder='Search'/>
    <button className='text-[#E5E5E5]' onClick={handleSearch}>Search</button>
    </div> */}
    <div className='flex gap-2  m-7'>
        <h1 className='text-[#E5E5E5] hidden lg:block pt-3 selector text-md font-normal'>Mr Admin</h1>
        <img className="w-12 h-12" src={img1}/>
    </div>
    </div>
  )
}

export default Header