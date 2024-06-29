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
          <table className="w-full sm:w-full md:w-full md:overflow-x-scroll sm:overflow-x-scroll text-left text-gray-400">
            <thead className="text-sm font-bold 2xl:text-lg selector text-[#E5E5E5] border-b border-grey-400">
              <tr className="">
                <th scope="col" className="pl-6 py-3">Logo</th>
                <th scope="col">Welfare Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone No</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {welfares.map((welfare) => (
                <tr key={welfare.id} className="border-b text-[#E5E5E5] text-sm selector font-normal border-gray-400">
                  <td className="py-4 pl-6 font-light text-sm 2xl:text-lg text-white whitespace-nowrap">
                    <img src={welfare.logo} alt={`${welfare.name} logo`} className="w-10 h-10 rounded-full" />
                  </td>
                  <td>{welfare.name}</td>
                  <td>{welfare.email}</td>
                  <td>{welfare.phone}</td>
                  <td>{welfare.address}</td>
                  <td>
                    <div className='flex flex-row gap-3'>
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
