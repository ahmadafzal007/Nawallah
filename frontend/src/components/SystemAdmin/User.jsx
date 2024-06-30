import React, { useEffect, useState } from "react";
import nike from "../../assets/placeholder.png";
import Alt from "../../assets/alt.png"
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
import {
  DeleteOutline,
  Diversity1Rounded,
  DriveFileRenameOutline,
  DriveFileRenameOutlineOutlined,
} from "@mui/icons-material";
import Admin from "../../API/Admin";

const User = () => {
  const [user, setUser] = useState();
  const [order, setorder] = useState();
  const [update, setupdate] = useState(null);
  const [uid, setuid] = useState(null);
  const [orderCounts, setOrderCounts] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const openitemupdate = async (id) => {
    setupdate(!update);
    setuid(id);
  };
  // const getAllUser = async () => {
    
  //   const getData = await getDocs(addUser);
  //   console.log(getData);
  //   // console.log(TableHeader)

  //   setuser(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };

  const getTotalOrders = async()=>{
    try {
        const response = await Admin.getTotalOrders();
        return response.orders;
    } catch (error) {
        console.log("error",error);
    }
};
const fetchUsersData = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "clients"));
    const userList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
   return userList;
  } catch (error) {
    console.error("Error fetching users: ", error);
  }
};



  const deleteuser = async (idd) => {
    await deleteDoc(doc(firestore, `clients`, idd));

    window.location.reload(true);
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const imageFile = event.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setSelectedImage(downloadURL);
          setUpdateData({ ...updateData, ["photo"]: downloadURL });
        });
      }
    );
  };
  const deleteImage = () => {
    const deleteRef = ref(storage, selectedImage);
    deleteObject(deleteRef).then(() => {
      setSelectedImage(null);
    });
  };

  const getorders = (id) => {
    var counter = 0;

    const counts = order?.map((val, ind) =>
      val.clientId == id ? counter++ : ""
    );

    return counter;
  };

  useEffect(() => {
   const LoadData = async()=>{
    const user = await fetchUsersData();
    const orders = await getTotalOrders();

    
    const orderCountMap = orders.reduce((acc, order) => {
      acc[order.userEmail] = (acc[order.userEmail] || 0) + 1;
      return acc;
    }, {});

console.log(orderCountMap)

    setOrderCounts(orderCountMap);
    setUser(user);
   }

   LoadData();

  }, []); 


  
 





  return (
    <div className="ml-[56px] mr-2 md:mx-6 sm:mx-3 sm:pl-4  mt-24 bg-white">
      <div className="justify-between items-center  w-full flex">
        <h1 className="selector text-costomFont text-3xl font-cursive my-7 font-bold">
          All User
        </h1>

        
      </div>
      <div>
        <div class="overflow-x-auto bg-costomFont rounded-xl ">
          <table class="w-full  sm:w-full md:w-full md:overflow-x-scroll sm:overflow-x-scroll text-left  text-gray-400 ">
            <thead class="text-lg h-16 font-bold  selector  text-[#E5E5E5]   border-b border-grey-400">
              <tr className="">
              
                <th
                  scope="col"
                  className="w-[200px] items-center text-center justify-center"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="w-[200px] items-center text-center justify-center"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="w-[200px] items-center text-center justify-center"
                >
                  Email
                </th>
                {/* <th scope="col" className="w-[200px] items-center text-center justify-center">
                      School Name
                    </th> */}
                {/* <th scope="col" className="w-[200px] items-center text-center justify-center">
                      Rewards
                    </th> */}
                <th
                  scope="col"
                  className="w-[200px] items-center text-center justify-center"
                >
                  No. of Orders
                </th>
                <th
                  scope="col"
                  className="w-[200px] items-center text-center justify-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              {user?.map((val, ind) => (
                <tr class=" border h-16  text-[#E5E5E5] text-lg   selector font-normal border-gray-400 ">
                 
                  <td className="w-[180px] items-center text-center justify-center">
                    <div class="flex  items-center text-center justify-center">
                      <img
                        class="w-10 h-10 items-center border border-gray-400 text-center justify-center rounded-full"
                        src={val.photo ? val.photo : Alt}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="w-[200px] items-center  border border-gray-400 text-center justify-center">
                    {val.userName}
                  </td>
                  <td className="w-[200px] items-center border-b border-gray-400 text-center justify-center">
                    {val.id}
                  </td>
                  {/* <td className="w-[200px] items-center text-center justify-center">{val.schoolName}</td>
                      <td className="w-[200px] items-center text-center justify-center">{val.rewards}</td> */}
                  <td className="w-[200px] items-center border border-gray-400 text-center justify-center">
                    {orderCounts[val.id] || 0}
                  </td>
                  <td className="w-[200px] items-center text-center border-b justify-center">
                    <div className="flex flex-row gap-3 cursor-pointer items-center text-center justify-center">
                      <div
                        className="cursor-pointer"
                        onClick={() => deleteuser(val.id)}
                      >
                        <DeleteOutline />
                      </div>
                      {/* <div className="cursor-pointer"  onClick={()=>openitemupdate(val.id)} >  <DriveFileRenameOutlineOutlined /></div> */}
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

export default User;
