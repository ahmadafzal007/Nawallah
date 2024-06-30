import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { firestore } from "../../firebase.config.jsx";
import "../../styles/font/font.css";

const UnauthorizedWelfares = () => {
  const [welfares, setWelfares] = useState([]);

  useEffect(() => {
    const fetchWelfares = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "ngos_pending"));
        const welfaresList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWelfares(welfaresList);
      } catch (error) {
        console.error("Error fetching welfares: ", error);
      }
    };

    fetchWelfares();
  }, []);

  
const handleAccept = async (id) => {
  try {
    const welfareDocRef = doc(firestore, "ngos_pending", id);
    const welfareDocSnap = await getDoc(welfareDocRef); // Use getDoc here
    if (welfareDocSnap.exists()) {
      const welfareData = welfareDocSnap.data();

      // Move to ngos collection
      await setDoc(doc(firestore, "ngos", id), welfareData);

      // Remove from ngos_pending collection
      await deleteDoc(welfareDocRef);

      console.log(`Accepted welfare with ID: ${id}`);
      setWelfares(prevWelfares => prevWelfares.filter(welfare => welfare.id !== id));
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error accepting welfare: ", error);
  }
};
const handleReject = async (id) => {
  try {
    const welfareDocRef = doc(firestore, "ngos_pending", id);
    const welfareDocSnap = await getDoc(welfareDocRef); // Use getDoc here
    if (welfareDocSnap.exists()) {
      const welfareData = welfareDocSnap.data();

      // Move to ngos_deleted collection
      await setDoc(doc(firestore, "ngos_deleted", id), welfareData);

      // Remove from ngos_pending collection
      await deleteDoc(welfareDocRef);

      console.log(`Rejected welfare with ID: ${id}`);
      setWelfares(prevWelfares => prevWelfares.filter(welfare => welfare.id !== id));
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error rejecting welfare: ", error);
  }
};

  return (
    <div className='mx-[56px] md:mx-6 sm:mx-3 sm:pl-4  mt-24 bg-white'>
      <div className="justify-between items-center w-full flex">
        <h1 className='selector text-costomFont font-cursive  text-3xl my-7 font-bold'>Unthorized Welfares</h1>
      </div>
      <div>
        <div className="overflow-x-auto rounded-xl bg-costomFont">
          <table className="w-full py-8 sm:w-full md:w-full md:overflow-x-scroll sm:overflow-x-scroll text-left text-gray-400">
            <thead className=" text-lg text-center font-bold 2xl:text-lg selector text-[#E5E5E5] border-b border-grey-400">
              <tr className="">
                <th scope="col" className="pl-6 py-3">Logo</th>
                <th scope="col">Welfare Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone No</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className='text-white text-center'>
              {welfares.map((welfare) => (
                <tr key={welfare.id} className="border text-center md:text-center sm:text-center text-[#E5E5E5] text-lg selector font-normal border-gray-400">
                  <td className="py-4 pl-6 border md:text-center sm:text-center border-gray-400 font-light text-lg 2xl:text-lg text-white whitespace-nowrap">
                    <img src={welfare.logoImage} alt={`${welfare.name} logo`} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="boder border-gray-400">{welfare.name}</td>
                  <td className="border border-gray-400">{welfare.email}</td>
                  <td className="border border-gray-400">{welfare.phone}</td>
                  <td className="border border-gray-400">{welfare.address}</td>
                  <td className="border border-gray-400">
                    <div className='flex flex-row lg:pl-14 md:pl-1 sm:pl-1 lg:pr-0 md:pr-1 sm:pr-1 gap-3'>
                      <Button variant="contained" color="success" onClick={() => handleAccept(welfare.id)}>Accept</Button>
                      <Button variant="contained" color="error" onClick={() => handleReject(welfare.id)}>Reject</Button>
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

export default UnauthorizedWelfares;
