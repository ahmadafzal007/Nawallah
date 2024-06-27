/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import nike from "../../assets/placeholder.png"
import { useNavigate } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import mc from "../../assets/mc.png"
import st from "../../assets/st.png"
import jl from "../../assets/jl.png"
import coffee from "../../assets/coffee.png"
import chick from "../../assets/chick.png"
import 'firebase/firestore';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DeleteOutline, DriveFileRenameOutline, DriveFileRenameOutlineOutlined, PhoneMissed } from '@mui/icons-material';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  deleteDoc,
  GeoPoint,
} from "firebase/firestore/lite";
import { firestore } from "../../firebase.config";
import { Link } from "react-router-dom";
import { saveRestaurant } from "../../utils/firebaseFunctions.jsx";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
 
} from "firebase/storage";
import { storage } from "../../firebase.config.jsx";
import bcrypt from 'bcryptjs'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import axios from 'axios'; // ES6 module
import { useForm } from 'react-hook-form';


// Dummy data for welfares
const welfareData = [
  {
    id: 1,
    logo: nike, // Use your welfare logo image here
    welfareName: "Sample Welfare 1",
    email: "sample1@example.com",
    phone: "+1234567890",
    address: "123 Sample St, Sample City",
  },
  {
    id: 2,
    logo: nike,
    welfareName: "Sample Welfare 2",
    email: "sample2@example.com",
    phone: "+9876543210",
    address: "456 Example Ave, Exampleville",
  },
];

const Order = () => {
  // State for welfares (initially using dummy data)
  const [welfares] = useState(welfareData);

  // Function to delete a welfare (similar to your deleteuser function)
  const deleteWelfare = (id) => {
    // Implement delete logic here
    console.log(`Deleting welfare with ID: ${id}`);
    // Placeholder for actual delete logic
  };

  return (
    <div className="mx-[56px] md:mx-6 sm:mx-3 sm:pl-4 bg-secondary mt-[25px]">
      <h1 className="selector text-[#E5E5E5] text-xl my-7 font-bold">Welfares</h1>

      {/* Welfare Table */}
      <div className="overflow-x-auto bg-brandDark">
        <table className="w-full text-left text-gray-400">
          <thead className="text-sm font-bold selector text-[#E5E5E5] border-b border-grey-400">
            <tr>
              <th scope="col" className="pl-6 py-3">
                Logo
              </th>
              <th scope="col">Welfare Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {welfares.map((welfare) => (
              <tr key={welfare.id} className="border-b text-sm selector font-normal border-gray-400">
                <td className="py-4 pl-6 font-light text-sm whitespace-nowrap">
                  <img src={welfare.logo} alt="Welfare Logo" className="h-10 w-10 rounded-full" />
                </td>
                <td>{welfare.welfareName}</td>
                <td>{welfare.email}</td>
                <td>{welfare.phone}</td>
                <td>{welfare.address}</td>
                <td>
                  <div className="flex flex-row gap-3 cursor-pointer">
                    <div className="cursor-pointer" onClick={() => deleteWelfare(welfare.id)}>
                      <DeleteOutline />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;