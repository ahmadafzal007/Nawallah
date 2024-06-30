import React, { useEffect, useState } from "react";
import nike from "../../assets/placeholder.png"
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
import { firestore } from "../../firebase.config";
import { Link } from "react-router-dom";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
 
} from "firebase/storage";
import { storage } from "../../firebase.config";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import { DeleteOutline, Diversity1Rounded, DriveFileRenameOutline, DriveFileRenameOutlineOutlined } from '@mui/icons-material';

const Order = () => {

  const [order, setorder] = useState([]);
  const [update,setupdate] = useState(false)
  const [uid,setuid] = useState(false)
 
  const [selectedImage, setSelectedImage] = useState(null);
  const openitemupdate = async (id)=>{
    setupdate(!update)
    setuid(id)
}
const getAllOrders = async () => {
  try {
    const addOrder = collection(firestore, "orders");
    const querySnapshot = await getDocs(addOrder);
   
    const orderData = [];
    querySnapshot.forEach((doc) => {
      orderData.push({ ...doc.data(), id: doc.id });
    });
    setorder(orderData);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};



// const getAllOrders = async () => {
//   try {
//     const addOrder = collection(firestore, "orders");
//     // Set a timeout of 10 seconds
//     const timeout = setTimeout(() => {
//       console.error("Timeout: getDocs did not complete in 10 seconds");
//     }, 40000);
//     // Show a loading indicator
   
//     const querySnapshot = await getDocs(addOrder);
//     // Clear the timeout and hide the loading indicator
//     clearTimeout(timeout);
   
//     console.log(querySnapshot.size)
//     const orderData = [];
//     querySnapshot.forEach((doc) => {
//       orderData.push({ ...doc.data(), id: doc.id });
//     });
//     setorder(orderData);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//   }
// };



      useEffect(() => {
        getAllOrders()
       }, []);

     
      const deleteuser = async (idd) => {
        await deleteDoc(
          doc(firestore,`orders`,idd)
        );
       
       
        window.location.reload(true)
        
      };


  const updateDetails = async () => {
   
    try {
      
        const updatedocument = doc(firestore, "clients", uid);
        await updateDoc(updatedocument, updateData);
     
        window.location.reload(true);
        clearData();
      
    } catch (error) {
      console.log(error);
    
    }

  
  };

  const clearData = () => {
    setSelectedImage(null);
    setUpdateData({});
  
   
  };
  

  const [updateData, setUpdateData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
    // Function to filter products based on search query
    const filtereduser = order?.filter((product) =>
    product.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const [currentPage, setCurrentPage] = useState(1);
 
  const itemsPerPage = 15;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
      const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentItems = filtereduser?.slice(startIndex, endIndex);
const totalEntries = filtereduser?.length;

  return (
    <div className='mx-[56px] md:mx-6 sm:mx-3 sm:pl-4  mt-24 '>
       <div className="justify-between items-center  w-full flex">
       <h1 className='selector text-costomFont text-3xl font-cursive my-7 font-bold'>All Orders</h1>
   
       <div className='flex gap-4  sm:hidden items-center px-3  my-7 rounded-lg bg-costomFont w-[406px] h-12 shadow-[#5829291a]'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" >
  <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 22L20 20" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        <input type="text" value={searchQuery}
        onChange={handleSearchInputChange} className='text-base w-[300px]  focus:outline-none focus:ring-0 font-normal selector text-[#E5E5E5] my-2  bg-brandDark' placeholder='Search order'/>
   
    </div>
    </div>
      <div>
      <div class="overflow-x-auto bg-costomFont rounded-xl ">
              <table class="w-full   sm:w-full md:w-full md:overflow-x-scroll sm:overflow-x-scroll text-left  text-gray-400 ">
                <thead class="text-sm h-12 font-bold 2xl:text-lg selector  text-[#E5E5E5]   border-b border-grey-400">
                  <tr className="">
                    <th scope="col" class="  pl-6 py-3 ">
                    {/* <input
                      type="checkbox"
                      class="w-6 h-6 
                       bg-secondary rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    /> */}
                    </th>
                   
                    <th scope="col" >
                     User Name
                    </th>
                    <th scope="col" >
                     Restaurant Name
                    </th>
                    <th scope="col">
                      Total Price
                    </th>
                    <th scope="col" >
                      Status
                    </th>
                    <th scope="col" >
                     Pickup Time
                    </th>
                    <th scope="col" >
                      Action
                    </th>
                    
                     </tr>
                </thead>
                <tbody className='text-white'>
                  {currentItems?.map((val, ind) => (
                    <tr class=" border-b  text-[#E5E5E5] text-sm   selector font-normal border-gray-400 ">
                      <th
                        scope="row"
                        class="py-4 pl-6 font-light text-sm   2xl:text-lg text-white whitespace-nowrap "
                      >
                      <input
                      type="checkbox"
                      class="w-6 h-6  bg-gray-100 rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />
                      </th>
                     
                      <td > 
                      {val.userName}  
                      </td>
                      <td > 
                      {val.restaurantName}  
                      </td>
                      <td >{val.totalPrice}</td>
                      <td >{val.status}</td>
                      <td >{val.time}</td>
                      <td >
                      <div className='flex flex-row gap-3 cursor-pointer'>
                      <div className="cursor-pointer"  onClick={()=> deleteuser(val.orderId)} ><DeleteOutline   /></div>
                      {/* <div className="cursor-pointer"  onClick={()=>openitemupdate(val.id)} >  <DriveFileRenameOutlineOutlined /></div> */}
                      </div>
                      </td>
                     
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className=' mx-[18px]  my-3 pb-[38px] flex flex-row justify-between'>
            <div className='flex'>
            <h1 className='font-["Nunito Sans"] text-xs font-normal text-[#b9b9c3]'>Showing {startIndex} to {endIndex} of {totalEntries} entries</h1>
              </div>
  <div className='flex font-["Nunito Sans"] text-xs font-normal text-[#b9b9c3]'>
             <Stack spacing={-1}  style={{ color: 'red' }}>
           <Pagination className='font-["Nunito Sans"] text-xs font-normal text-[#b9b9c3]'
            count={Math.ceil(order?.length / itemsPerPage)}
  page={currentPage}
  onChange={handlePageChange} 
  renderItem={(item) => (
    <PaginationItem
      {...item}
      style={{ color: 'white' }} // Set your text color here
    />
  )}
  
  />
  </Stack>
  </div>
  </div>
      </div>

      
        </div>
  )
}

export default Order