/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { DeleteOutline } from '@mui/icons-material';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore/lite";
import { firestore } from "../../firebase.config";
import "../../styles/font/font.css";

const Welfare = () => {
  const [welfares, setWelfares] = useState([]);

  useEffect(() => {
    const fetchWelfares = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "ngos"));
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

  const deleteWelfare = async (id) => {
    try {
      await deleteDoc(doc(firestore, "ngos", id));
      console.log(`Deleted welfare with ID: ${id}`);
      setWelfares(prevWelfares => prevWelfares.filter(welfare => welfare.id !== id));
    } catch (error) {
      console.error("Error deleting welfare: ", error);
    }
  };

  return (
    <div className="mx-[56px] md:mx-6 sm:mx-3 sm:pl-4 bg-secondary mt-[25px]">
      <h1 className="selector text-[#E5E5E5] text-xl my-7 font-bold">Welfares</h1>

      {/* Welfare Table */}
      <div className="overflow-x-auto bg-brandDark">
        <table className="w-full text-left text-gray-400">
          <thead className="text-sm font-bold selector text-[#E5E5E5] border-b border-grey-400">
            <tr>
              <th scope="col" className="pl-6 py-3">Logo</th>
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
                <td>{welfare.name}</td>
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

export default Welfare;
