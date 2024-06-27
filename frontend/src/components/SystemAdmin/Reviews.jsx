import "../../styles/font/font.css"
import pfp from "../../assets/placeholder.png"
import pfp1 from "../../assets/placeholder (1).png"
import pfp2 from "../../assets/placeholder (2).png"
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { firestore } from "../../firebase.config.jsx";
import { useEffect } from 'react'


import React, { useState } from 'react';
import { Button } from '@mui/material';

const UnauthorizedRestaurants = () => {
  // Dummy data
  const restaurants = [
    {
      id: 1,
      logo: 'https://via.placeholder.com/40',
      name: 'Restaurant One',
      email: 'contact@restaurantone.com',
      address: '123 Main St, City, Country',
      phone: '+1234567890',
    },
    {
      id: 2,
      logo: 'https://via.placeholder.com/40',
      name: 'Restaurant Two',
      email: 'contact@restauranttwo.com',
      address: '456 Another St, City, Country',
      phone: '+0987654321',
    },
    // Add more restaurants as needed
  ];

  const handleAccept = (id) => {
    // Implement accept functionality here
    console.log(`Accepted restaurant with ID: ${id}`);
  };

  const handleReject = (id) => {
    // Implement reject functionality here
    console.log(`Rejected restaurant with ID: ${id}`);
  };

  return (
    <div className='mx-[56px] md:mx-6 sm:mx-3 sm:pl-4 bg-secondary mt-[25px]'>
      <div className="justify-between items-center w-full flex">
        <h1 className='selector text-[#E5E5E5] text-xl my-7 font-bold'>Unauthorized Restaurants</h1>
      </div>
      <div>
        <div className="overflow-x-auto bg-brandDark">
          <table className="w-full sm:w-full md:w-full md:overflow-x-scroll sm:overflow-x-scroll text-left text-gray-400">
            <thead className="text-sm font-bold 2xl:text-lg selector text-[#E5E5E5] border-b border-grey-400">
              <tr className="">
                <th scope="col" className="pl-6 py-3">Logo</th>
                <th scope="col">Restaurant Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone No</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="border-b text-[#E5E5E5] text-sm selector font-normal border-gray-400">
                  <td className="py-4 pl-6 font-light text-sm 2xl:text-lg text-white whitespace-nowrap">
                    <img src={restaurant.logo} alt={`${restaurant.name} logo`} className="w-10 h-10 rounded-full" />
                  </td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.email}</td>
                  <td>{restaurant.address}</td>
                  <td>{restaurant.phone}</td>
                  <td>
                    <div className='flex flex-row gap-3'>
                      <Button variant="contained" color="success" onClick={() => handleAccept(restaurant.id)}>Accept</Button>
                      <Button variant="contained" color="error" onClick={() => handleReject(restaurant.id)}>Reject</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedRestaurants;
