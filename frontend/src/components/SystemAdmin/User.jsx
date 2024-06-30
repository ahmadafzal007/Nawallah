import React, { useEffect, useState } from "react";
import nike from "../../assets/placeholder.png";
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

const User = () => {
  const [user, setUser] = useState();
  const [order, setorder] = useState();
  const [update, setupdate] = useState(null);
  const [uid, setuid] = useState(null);
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

  const getAllOrders = async () => {
    const addOrder = collection(firestore, "orders");
    const getData = await getDocs(addOrder);
    // console.log(TableHeader)

    setorder(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
    const fetchUsersData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "clients"));
        const restaurants = await fetchRestaurants();
        const userList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('users' , userList)
        setUser(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsersData();

  }, []); 


    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "restaurantAdmins"));
        const restaurantsData = querySnapshot.docs.map(async (doc) => {
          const restaurant = { id: doc.id, ...doc.data() };
    
          // Fetch orders for the current restaurant
          const reviewsCollectionRef = collection(firestore, "restaurantAdmins", doc.id, "orders");
          const reviewsQuerySnapshot = await getDocs(reviewsCollectionRef);
          const orders = reviewsQuerySnapshot.docs.map((orderDoc) => ({
            id: orderDoc.id,
            ...orderDoc.data(),
          }));
    
          // Calculate monthly income (totalPrice of orders) and total orders count
          let totalPrice = 0;
          orders.forEach((order) => {
            totalPrice += order.totalPrice; // Assuming totalPrice is the field in Firestore orders
          });
    
          // Add monthly income (totalPrice) and orders count (length of orders array) to restaurant data
          return { ...restaurant, monthlyIncome: totalPrice, ordersCount: orders.length, orders };
        });
    
        const restaurantsWithStats = await Promise.all(restaurantsData); // Wait for all promises to resolve
        return restaurantsWithStats
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        return []; // Return empty array or handle error as needed
      }
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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query ? query.toLowerCase() : ""); // Add a guard clause here
  };

  // Function to filter products based on search query
  const filtereduser = user?.filter((product) =>
    product.userName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="mx-[56px] md:mx-6 sm:mx-3 sm:pl-4 mt-24">
      <div className="justify-between items-center  w-full flex">
        <h1 className="selector text-costomFont text-3xl font-cursive my-7 font-bold">
          All User
        </h1>

        <div className="flex gap-4  sm:hidden items-center px-3  my-7 rounded-lg  w-[406px] h-12 shadow-[#0000001a]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="#BDBDBD"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 22L20 20"
              stroke="#BDBDBD"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="text-base w-[300px]  focus:outline-none focus:ring-0 font-normal selector text-[#E5E5E5] my-2  bg-brandDark"
            placeholder="Search user"
          />
        </div>
      </div>
      <div>
        <div class="overflow-x-auto bg-costomFont rounded-xl ">
          <table class="w-full  sm:w-full md:w-full md:overflow-x-scroll sm:overflow-x-scroll text-left  text-gray-400 ">
            <thead class="text-sm h-12 font-bold 2xl:text-lg selector  text-[#E5E5E5]   border-b border-grey-400">
              <tr className="">
                <th scope="col" className="w-6 h-6  pl-6 py-3 ">
                  {/* <input
                    type="checkbox"
                    class="w-6 h-6 
                       bg-[#dad3ff] rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                  /> */}
                </th>
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
              {filtereduser?.map((val, ind) => (
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
                  <td className="w-[200px] items-center text-center justify-center">
                    <div class="flex  items-center text-center justify-center">
                      <img
                        class="w-10 h-10 items-center text-center justify-center rounded-full"
                        src={val.photo}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="w-[200px] items-center text-center justify-center">
                    {val.userName}
                  </td>
                  <td className="w-[200px] items-center text-center justify-center">
                    {val.id}
                  </td>
                  {/* <td className="w-[200px] items-center text-center justify-center">{val.schoolName}</td>
                      <td className="w-[200px] items-center text-center justify-center">{val.rewards}</td> */}
                  <td className="w-[200px] items-center text-center justify-center">
                    {getorders(val.id)}
                  </td>
                  <td className="w-[200px] items-center text-center justify-center">
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

      {update && (
        <div
          id="defaultModal"
          class={
            " flex absolute top-0 right-0 sm:right-0 md:right-0 left-0 z-50   w-full sm:w-full md:w-full h-[100%]  bg-[#000000b3] bg-opacity-5 justify-center items-center"
          }
        >
          <div
            class={`absolute top-0 right-0 h-screen px-5 py-6 md:mr-0 sm:mr-0   text-base list-none bg-[#2A2A2A] shadow-[#0000004d] divide-y-0 sm:divide-y rounded-l-lg shadow  divide-gray-600" id="user-dropdown`}
          >
            <div className="flex ">
              <button
                onClick={() => setupdate(false)}
                type="button"
                class="text-gray-400 bg-[#0000001a] p-2 rounded-full  ml-auto flex items-center "
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <h1 className="selector text-[#E5E5E5] text-[25px] pr-[175px] pt-2 pl-[116px]  font-bold">
                Edit User
              </h1>
            </div>
            {/* {fields && (
          <p
            
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </p>
        )} */}

            <div class="space-y-4 md:space-y-6">
              <div className=" justify-center items-center">
                {selectedImage ? (
                  <div className="mt-7 xl:mt-4 w-[170px] ml-28 xl:ml-32 h-[170px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] flex flex-col gap-1 rounded-full bg-[#353535] justify-center items-center shadow-[#0000001a]">
                    <img
                      className="rounded-full w-[160px] h-[160px] lg:w-[140px] lg:h-[140px] xl:w-[140px] xl:h-[150px]"
                      alt="not found"
                      src={selectedImage}
                    />
                    <DeleteOutline
                      className="absolute text-white cursor-pointer"
                      onClick={deleteImage}
                    />{" "}
                  </div>
                ) : (
                  <div className="mt-7 xl:mt-4 w-[170px] ml-28 xl:ml-32 h-[170px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] flex flex-col gap-1 rounded-full bg-[#353535] justify-center items-center shadow-[#0000001a]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleClick}
                      width="58"
                      height="51"
                      viewBox="0 0 58 51"
                      fill="none"
                    >
                      <g opacity="0.5">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M54.1836 33.2177C54.1836 19.8626 44.843 9.8276 33.2847 7.68175C33.6396 6.94771 33.828 6.14487 33.8373 5.3294C33.8559 3.9228 33.3102 2.56681 32.3222 1.56533C31.3337 0.56383 29.9857 0 28.5785 0C27.1713 0 25.8233 0.563783 24.8348 1.56533C23.8468 2.56684 23.3011 3.9228 23.3197 5.3294C23.2969 6.14855 23.4881 6.95939 23.8747 7.68175C17.9303 8.78233 12.566 11.9487 8.7298 16.6212C4.89357 21.2938 2.83155 27.1721 2.90919 33.2177C2.15423 33.1903 1.42018 33.468 0.872645 33.9885C0.325606 34.509 0.0106936 35.2281 0 35.9831V39.3057C0.00744263 40.6435 0.542383 41.9246 1.48853 42.8703C2.43513 43.8165 3.71619 44.351 5.05396 44.3579H5.60611L6.16106 47.7481C6.32154 48.6588 6.79741 49.4845 7.50585 50.079C8.21429 50.6739 9.10977 51 10.0349 51H47.1266C48.0481 50.9884 48.937 50.6581 49.6432 50.065C50.3488 49.4724 50.8279 48.6537 50.9987 47.748L51.5536 44.3579H52.1086C53.4455 44.3495 54.7256 43.8146 55.6703 42.8689C56.6155 41.9232 57.1495 40.6427 57.1569 39.3057V35.9831C57.1416 35.2179 56.8169 34.4913 56.2559 33.9704C55.6954 33.4489 54.9478 33.1772 54.1836 33.2177ZM52.1089 40.9646L5.05364 40.9641C4.14098 40.9544 3.40281 40.2185 3.38971 39.3058V36.6083H53.7674V39.3058C53.7553 40.2166 53.0197 40.9524 52.1089 40.9646ZM47.6792 47.194C47.6006 47.4345 47.3801 47.6006 47.127 47.6089H10.0354C9.78138 47.602 9.55949 47.4354 9.48135 47.194L8.99479 44.358H48.1633L47.6792 47.194ZM28.5784 10.5906C40.3429 10.5906 50.8599 19.9273 50.8599 33.2173H6.29698C6.29698 20.0004 16.7455 10.5906 28.5784 10.5906ZM26.6424 5.32904C26.6233 4.81131 26.8126 4.30708 27.1676 3.92935C27.5229 3.5521 28.0146 3.33255 28.5328 3.31998C29.051 3.30742 29.5525 3.5028 29.9255 3.86283C30.2986 4.2224 30.5121 4.71688 30.5181 5.23501C30.5242 5.75368 30.3228 6.2528 29.9581 6.62125C29.5938 6.98967 29.0966 7.19712 28.5784 7.19665C28.0765 7.19712 27.5941 7.00268 27.2326 6.65427C26.8717 6.30586 26.6601 5.83096 26.6424 5.32904Z"
                          fill="#BDBDBD"
                        />
                      </g>
                    </svg>
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    <h1
                      className="text-[#BDBDBD] selector text-xs font-normal cursor-pointer"
                      onClick={handleClick}
                    >
                      Select Item Image
                    </h1>
                  </div>
                )}

                <div className="mt-[24px] xl:mt-[20px] ml-[29px]">
                  <h1 className="selector text-[#E5E5E5] font-normal xl:text-[20px] text-[25px]">
                    User Detail
                  </h1>
                  <div className=" mt-[13px] rounded-full justify-between w-[377px] h-12 xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]">
                    <input
                      type="text"
                      value={updateData["userName"]}
                      name="userName"
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          ["userName"]: e.target.value,
                        })
                      }
                      className="text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]"
                      placeholder=" Name"
                    />
                  </div>

                  <div className=" mt-[8px] rounded-full justify-between w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]">
                    <input
                      type="text"
                      value={updateData["schoolName"]}
                      name="schoolName"
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          ["schoolName"]: e.target.value,
                        })
                      }
                      className="text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]"
                      placeholder="school name"
                    />
                  </div>

                  <div className=" mt-[8px] rounded-full justify-between w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={updateData["phoneNumber"]}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          ["phoneNumber"]: e.target.value,
                        })
                      }
                      className="text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]"
                      placeholder="phone no"
                    />
                  </div>

                  <div className=" mt-[8px] rounded-full justify-between w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]">
                    <input
                      type="number"
                      value={updateData["rewards"]}
                      name="rewards"
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          ["rewards"]: parseInt(e.target.value),
                        })
                      }
                      className="text-base w-full  focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]"
                      placeholder="rewards"
                    />
                  </div>

                  <div className="mt-8 ml-20 xl:mt-7 ">
                    <button
                      onClick={updateDetails}
                      className="selector text-lg font-bold xl:py-2  py-4 px-20 text-[#E5E5E5] bg-[#FF6154] flex gap-1  rounded-full justify-center items-center"
                    >
                      Update
                    </button>
                    :
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
