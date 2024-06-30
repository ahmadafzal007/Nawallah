/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import nike from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import mc from "../../assets/mc.png";
import st from "../../assets/st.png";
import jl from "../../assets/jl.png";
import coffee from "../../assets/coffee.png";
import chick from "../../assets/chick.png";
import "firebase/firestore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  DeleteOutline,
  DriveFileRenameOutline,
  DriveFileRenameOutlineOutlined,
  PhoneMissed,
} from "@mui/icons-material";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  orderBy,
  query,
  getDoc,
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
import bcrypt from "bcryptjs";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import axios from "axios"; // ES6 module
import { useForm } from "react-hook-form";

const Reataurant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [password, setpassword] = useState();
  const [description, setdescription] = useState();
  const [alertStatus, setAlertStatus] = useState("danger");
  const navigate = useNavigate();
  const [additem, setadditem] = useState(false);
  const [addaddon, setaddaddon] = useState(false);
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [order, setorder] = useState();
  const [category, setcategory] = useState();
  const [cordinate, setcordinate] = useState([]);
  const [addons, setaddons] = useState();
  const [addonsid, setaddonsid] = useState();
  const [loading, setLoading] = useState(true);

  let latitude = 0;
  let longitude = 0;
  const location = new GeoPoint(latitude, longitude);

  const getAllRestaurants = async () => {
    const querySnapshot = await getDocs(
      collection(firestore, "restaurantAdmins")
    );
    const restaurantList = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return restaurantList;
  };

  const getAlladdons = async () => {
    const addMenu = collection(
      firestore,
      `restaurantAdmins/${addonsid}/Addons`
    );
    const getData = await getDocs(addMenu);

    setaddons(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getAlladdons();
  }, [addonsid]);

  const getAllOrders = async () => {
    const addOrder = query(collection(firestore, "orders"));
    const getData = await getDocs(addOrder);

    setorder(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getorders = (id) => {
    var counter = 0;

    const counts = order?.map((val, ind) =>
      val.restaurantId == id ? counter++ : ""
    );

    return counter;
  };
  const [update, setupdate] = useState(false);
  const [addon, setaddon] = useState(false);
  const [resid, setresid] = useState(false);
  const openitemupdate = async (id) => {
    setupdate(!update);
    setresid(id);
  };
  const openitem = async () => {
    setadditem(!additem);
  };
  const handleaddon = async (id) => {
    setaddonsid(id);
    setaddaddon(!addaddon);
  };

  const handleAddon = async (id) => {
    setaddon(!addon);
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
          setUpdateData({ ...updateData, ["logo"]: downloadURL });
          setimgmsg(false);
        });
      }
    );
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const handleChanges = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };
  const [imageAsset, setImageAsset] = useState(null);

  const deleteImage = () => {
    const deleteRef = ref(storage, selectedImage);
    deleteObject(deleteRef).then(() => {
      setSelectedImage(null);
    });
  };

  const initialValues = {
    name: "",
    selectedImage: "",
    email: "",
    password: "",
    phone: "",
    description: "",
  };

  const [address, setAddress] = useState();
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener("places_changed", () => {
        const places = autocomplete.getPlaces();
        if (places.length > 0) {
          setAddress(places[0].formatted_address);
        }
      });
    }
  }, [autocomplete]);

  const [msg, setMsg] = useState(null);
  const [fields, setFields] = useState(false);
  const [emailmsg, setemailmsg] = useState();
  const [emailmsgs, setemailmsgs] = useState(false);
  const [imgmsg, setimgmsg] = useState(false);
  const [namemsg, setnamemsg] = useState(false);
  const [desmsg, setdesmsg] = useState(false);
  const [phonemsg, setphonemsg] = useState(false);
  const [passmsg, setpassmsg] = useState(false);
  const [catmsg, setcatmsg] = useState(false);
  const [locmsg, setlocmsg] = useState(false);
  const [field, setField] = useState(false);

  const apiKey = "AIzaSyBgfj1d3-rPRMKfpfjdOmRKuyVpLsu_tPc";

  const geocodeAddress = async (address, apiKey) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      const { results } = response.data;

      if (results.length > 0) {
        const location = results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        return { latitude, longitude };
      } else {
        throw new Error("No results found for the provided address.");
      }
    } catch (error) {
      throw new Error(
        `Error occurred while fetching geocoding data: ${error.message}`
      );
    }
  };

  geocodeAddress(address, apiKey)
    .then((coordinates) => {
      latitude = coordinates.latitude;
      longitude = coordinates.longitude;
    })
    .catch((error) => {
      console.error(error.message);
    });
  const getemails = [];
  const [inputFields, setInputFields] = useState([{ name: "", price: "" }]);
  const [inputField, setInputField] = useState(false);
  const [showAddButtons, setShowAddButtons] = useState(true); // Track visibility of "Add" buttons for each addon

  const [plus, setplus] = useState([true]);
  const handleInputChanges = (index, fieldName, value) => {
    const updatedFields = [...inputFields];
    updatedFields[index][fieldName] = value;
    setInputFields(updatedFields);
    setUpdateaddonData({ ...updateaddonData, ["addonItems"]: updatedFields });
  };

  const handleCheckboxChanges = (index) => {
    const updatedFields = [...inputFields];
    updatedFields[index].required = !updatedFields[index].required; // Toggle the 'required' property
    setInputFields(updatedFields);
  };

  const handleAddField = () => {
    if (inputField === false) {
      setInputField(true);
      setShowAddButtons(false); // Show "Add" button for the newly added addon
    } else {
      setInputField(true);
      setplus([...plus, false]); // Show "Add" button for the newly added addon

      setInputFields([...inputFields, { name: "", price: "" }]);
    }
  };
  const [canChooseUpTo, setCanChooseUpTo] = useState(0);

  const handleIncrement = () => {
    setCanChooseUpTo(canChooseUpTo + 1);
  };

  const handleDecrement = () => {
    if (canChooseUpTo > 0) {
      setCanChooseUpTo(canChooseUpTo - 1);
    }
  };
  const handleRemoveField = (index) => {
    const updatedFields = [...inputFields];
    updatedFields.splice(index, 1); // Remove the field at the specified index
    setInputFields(updatedFields);
    const updatedShowAddButtons = [...showAddButtons];
    updatedShowAddButtons.splice(index, 1); // Remove the visibility state for the removed addon
    setShowAddButtons(updatedShowAddButtons);
  };

  const saveDetails = async (values) => {
    var data = restaurant?.filter((val) => val.email === email);

    getemails.push(data[0]?.email);

    try {
      if (!selectedImage) {
        setimgmsg(true);
      } else if (!name) {
        setnamemsg(true);
      } else if (!description) {
        setdesmsg(true);
      } else if (!email) {
        setemailmsgs(true);
      } else if (!phone) {
        setphonemsg(true);
      } else if (!password) {
        setpassmsg(true);
      } else if (!category) {
        setcatmsg(true);
      } else if (!address) {
        setlocmsg(true);
      } else if (getemails[0] === email) {
        setemailmsg("email already exist");
        setField(true);
      } else {
        const hashedPassword = bcrypt.hashSync(
          password,
          "$2a$10$CwTycUXWue0Thq9StjUM0u"
        );

        const datacategory = {
          name: name,
          logo: selectedImage,
          email: email,
          phone: phone,
          address: address,
          location: new GeoPoint(latitude, longitude),
          password: hashedPassword,
          description: description,
          distance: 0,
          category: category,
          workingHrs: "",
          prepDelay: "",
        };
        // Perform the Firestore document creation with auto-generated ID
        const docRef = await addDoc(
          collection(firestore, `restaurantAdmins`),
          datacategory
        );

        // Update the document with the auto-generated ID as "itemId"
        const itemId = docRef.id;
        await updateDoc(doc(firestore, `restaurantAdmins`, docRef.id), {
          userId: itemId,
        });
        //  await  saveRestaurant(datacategory);
        window.location.reload(true);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain ");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
  };

  const updateDetails = async (uid) => {
    try {
      const newData = { ...updateData }; // Create a new object to hold the updated data

      if (address) {
        newData.address = address;
        newData.location = new GeoPoint(latitude, longitude);

        const updatedocument = doc(firestore, "restaurantAdmins", resid);
        await updateDoc(updatedocument, newData);

        setFields(true);
        setMsg("Data Uploaded successfully ");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);

        window.location.reload(true);
        clearData();
      } else {
        const updatedocument = doc(firestore, "restaurantAdmins", resid);
        await updateDoc(updatedocument, updateData);

        setFields(true);
        setMsg("Data Uploaded successfully ");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);

        window.location.reload(true);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain ");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
  };
  const clearData = () => {
    setSelectedImage(null);
    setUpdateData({});
    setname("");
    setemail("");
    setphone("");
    setpassword("");
    setdescription("");
  };
  const deleteaddons = async (idd) => {
    await deleteDoc(doc(firestore, `restaurantAdmins/${addonsid}/Addons`, idd));

    getAlladdons();
  };
  const deletecategory = async (id) => {
    // Delete items subcollection
    const itemsQuery = query(
      collection(firestore, `restaurantAdmins/${id}/items`)
    );
    const itemsQuerySnapshot = await getDocs(itemsQuery);

    itemsQuerySnapshot.forEach(async (itemDoc) => {
      await deleteDoc(
        doc(firestore, `restaurantAdmins/${id}/items`, itemDoc.id)
      );
    });

    // Delete restaurants subcollection
    const restaurantsQuery = query(
      collection(firestore, `restaurantAdmins/${id}/restaurants`)
    );
    const restaurantsQuerySnapshot = await getDocs(restaurantsQuery);

    restaurantsQuerySnapshot.forEach(async (restaurantDoc) => {
      await deleteDoc(
        doc(firestore, `restaurantAdmins/${id}/restaurants`, restaurantDoc.id)
      );
    });

    // Delete the main document
    await deleteDoc(doc(firestore, "restaurantAdmins", id));

    // Reload the page or navigate to another location
    window.location.reload(true);
  };

  useEffect(() => {
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
        console.log(restaurantsWithStats);
        setRestaurant(restaurantsWithStats)
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        return []; // Return empty array or handle error as needed
      }
    };

    fetchRestaurants();
  }, []);

  const addaddons = async () => {
    try {
      const newData = { ...updateaddonData };
      newData.canChooseUpto = canChooseUpTo;
      // Perform the Firestore document creation with auto-generated ID
      const docRef = await addDoc(
        collection(firestore, `restaurantAdmins/${addonsid}/Addons`),
        newData
      );

      // Update the document with the auto-generated ID as "itemId"
      const addonId = docRef.id;
      await updateDoc(
        doc(firestore, `restaurantAdmins/${addonsid}/Addons`, docRef.id),
        {
          addonId: addonId,
        }
      );

      setFields(true);
      setMsg("Data Uploaded successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);

      setaddon(false);
      getAlladdons();
      clearData();
      setUpdateaddonData({});
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading: Try Again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
  };

  const [updateaddonData, setUpdateaddonData] = useState({});
  const [updateData, setUpdateData] = useState({});
  const handleInputpassword = (event) => {
    const hashedPassword = bcrypt.hashSync(
      event.target.value,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    setpassword(event.target.value);
    // Dynamically update the fields you want to change
    setUpdateData({ ...updateData, ["password"]: hashedPassword });
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // Function to filter products based on search query
  const filteredrestaurant = restaurant?.filter((product) => {
    console.log(product, product.username);
    return product.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const datee = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to JavaScript Date

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  };
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const monthlyIncome = (id) => {
    const total = order?.filter((val) => val.restaurantId === id);

    const counter = total
      ?.filter((item) => new Date(item.time) >= oneMonthAgo)
      .reduce((acc, val) => acc + val.totalPrice, 0);

    const pay = isNaN(counter) ? 0 : counter.toFixed(1);

    return pay;
  };

  return (
    <div className="lg:mx-[56px] md:mx-6 mx-4 px-4 mt-24 bg-white">
      <div className="justify-end items-end w-full flex ">
        {/* <div className="md:flex gap-4  hidden items-center px-3  my-7 rounded-lg bg-white border border-costomFont w-[406px] h-12 shadow-[#0000001a]">
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
            className="text-base w-[300px]  focus:outline-none focus:ring-0 font-normal selector text-[#E5E5E5] my-2  bg-white"
            placeholder="Search restaurant"
          />
        </div> */}
      </div>
      <div className="flex flex-row justify-between mb-[13px]">
        <h1 className="selector text-costomFont font-cursive text-3xl   font-bold">
          Registered Businesses
        </h1>
        {/* <button  onClick={()=>openitem()} className='selector text-lg font-normal  py-2 text-[#E5E5E5] bg-brandDark flex gap-1 px-[16px] rounded-full justify-center items-center'><p>Add New</p><svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12.3158H13.5V18H11.5V12.3158H5.5V10.4211H11.5V4.73685H13.5V10.4211H19.5V12.3158Z" fill="#E5E5E5"/>
</svg></button> */}
      </div>
      <div>
        <div class="overflow-x-auto bg-costomFont relative rounded-xl  ">
          <table class="w-full text-lg md:overflow-x-scroll overflow-x-scroll text-left  text-gray-400 ">
            <thead class="text-lg h-16 font-bold 2xl:text-lg selector  text-[#E5E5E5]   border-b border-grey-400">
              <tr className="h-12">
             
                <th scope="col" className="w-[200px] text-center">
                  Logo
                </th>
                <th scope="col" className="w-[200px] text-center">
                  Name
                </th>
                <th scope="col" className="w-[200px] text-center">
                  Email
                </th>
                <th scope="col" className="w-[200px] text-center">
                  Address
                </th>
                <th scope="col" className="w-[200px] text-center">
                  Monthly Income
                </th>
                <th scope="col" className="w-[200px] text-center">
                  Orders
                </th>
                <th scope="col" className="w-[200px] text-center">
                  Action
                </th>
                {/* <th scope="col" className="w-[200px] text-center">
                      Add AddOns
                    </th>
                    <th scope="col" className="w-[200px] text-center">
                      Set Menu
                    </th> */}
              </tr>
            </thead>
            <tbody className="text-white ">
              {restaurant?.map((val, ind) => (
                <tr class=" border-b h-16  text-[#E5E5E5] text-lg   selector font-normal border-gray-400 ">
                  
                  <td className="w-[200px] items-center text-center justify-center border border-gray-400">
                    <div className="flex items-center justify-center ">
                      <img
                        className="w-10 h-10 items-center text-center justify-center rounded-full  "
                        src={val.logo}
                        alt="Bonnie image"
                      />
                    </div>
                  </td>
                  <td className="w-[200px] text-lg justify-center items-center text-center border border-gray-400 ">
                    {val.username}
                  </td>
                  <td className="w-[200px] text-lg justify-center items-center text-center  border border-gray-400">
                    {" "}
                    {val.email}{" "}
                  </td>
                  <td className="w-[200px] text-lg justify-center items-center text-center  border border-gray-400">
                    {" "}
                    {val.address}{" "}
                  </td>
                  <td className="w-[200px] text-lg justify-center items-center text-center border border-gray-400">
                    {" "}
                    {val.monthlyIncome}{" Rs "}
                  </td>

                  <td className="w-[200px] text-lg justify-center items-center text-center  border border-gray-400">
                    {val.ordersCount}
                  </td>
                  <td className="w-[200px]  justify-center items-center text-center border border-gray-400">
                    <div className="flex flex-row gap-3 justify-center  text-center items-center">
                      <div
                        className="cursor-pointer"
                        onClick={() => deletecategory(val.id)}
                      >
                        {" "}
                        <DeleteOutline />
                      </div>
                      {/* <div className="cursor-pointer"  onClick={()=>openitemupdate(val.id)} ><DriveFileRenameOutlineOutlined/></div> */}
                    </div>
                  </td>
                  {/* <td className="w-[200px] justify-center items-center text-center">
                     
                   
                      <div className='flex cursor-pointer flex-row gap-3 justify-center  text-center items-center'>
                    
         <svg onClick={()=>handleaddon(val.id)} xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
<path opacity="0.3" d="M7.66667 9.83341H4.33333C4.11232 9.83341 3.90036 9.74562 3.74408 9.58934C3.5878 9.43306 3.5 9.22109 3.5 9.00008C3.5 8.77907 3.5878 8.56711 3.74408 8.41083C3.90036 8.25455 4.11232 8.16675 4.33333 8.16675H7.66667V9.83341ZM12.6667 8.16675H9.33333V9.83341H12.6667C12.8877 9.83341 13.0996 9.74562 13.2559 9.58934C13.4122 9.43306 13.5 9.22109 13.5 9.00008C13.5 8.77907 13.4122 8.56711 13.2559 8.41083C13.0996 8.25455 12.8877 8.16675 12.6667 8.16675Z" fill="#fff"/>
<path d="M12.6667 8.16667H9.33333V4.83333C9.33333 4.61232 9.24554 4.40036 9.08926 4.24408C8.93297 4.0878 8.72101 4 8.5 4C8.27899 4 8.06702 4.0878 7.91074 4.24408C7.75446 4.40036 7.66667 4.61232 7.66667 4.83333V8.16667H4.33333C4.11232 8.16667 3.90036 8.25446 3.74408 8.41074C3.5878 8.56702 3.5 8.77899 3.5 9C3.5 9.22101 3.5878 9.43297 3.74408 9.58926C3.90036 9.74554 4.11232 9.83333 4.33333 9.83333H7.66667V13.1667C7.66667 13.3877 7.75446 13.5996 7.91074 13.7559C8.06702 13.9122 8.27899 14 8.5 14C8.72101 14 8.93297 13.9122 9.08926 13.7559C9.24554 13.5996 9.33333 13.3877 9.33333 13.1667V9.83333H12.6667C12.8877 9.83333 13.0996 9.74554 13.2559 9.58926C13.4122 9.43297 13.5 9.22101 13.5 9C13.5 8.77899 13.4122 8.56702 13.2559 8.41074C13.0996 8.25446 12.8877 8.16667 12.6667 8.16667Z" fill="#fff"/>
</svg>
</div>
</td> */}

                  {/* <td className="w-[200px] justify-center items-center text-center">
                      <NavLink  to={`/restaurants/menu/${val.id}`} className="flex items-center justify-center text-center">
          <svg className="items-center justify-center text-center" xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.3109 14.6779C23.3109 9.17874 19.4648 5.04666 14.7054 4.16307C14.8516 3.86082 14.9292 3.53024 14.933 3.19446C14.9407 2.61527 14.716 2.05692 14.3091 1.64455C13.9021 1.23217 13.347 1 12.7676 1C12.1882 1 11.6331 1.23215 11.2261 1.64455C10.8193 2.05693 10.5946 2.61527 10.6022 3.19446C10.5928 3.53176 10.6716 3.86563 10.8307 4.16307C8.38307 4.61625 6.17425 5.92005 4.59462 7.84404C3.015 9.76803 2.16593 12.1885 2.1979 14.6779C1.88704 14.6666 1.58478 14.7809 1.35932 14.9953C1.13407 15.2096 1.0044 15.5057 1 15.8166V17.1847C1.00306 17.7356 1.22333 18.2631 1.61292 18.6525C2.0027 19.0421 2.5302 19.2622 3.08104 19.265H3.3084L3.53691 20.661C3.60299 21.036 3.79893 21.376 4.09064 21.6208C4.38236 21.8657 4.75108 22 5.13202 22H20.4051C20.7845 21.9952 21.1505 21.8592 21.4413 21.615C21.7319 21.371 21.9291 21.0339 21.9995 20.661L22.228 19.265H22.4565C23.007 19.2616 23.5341 19.0413 23.9231 18.6519C24.3123 18.2625 24.5322 17.7352 24.5352 17.1847V15.8166C24.5289 15.5015 24.3952 15.2023 24.1642 14.9878C23.9334 14.7731 23.6256 14.6612 23.3109 14.6779ZM22.4566 17.8678L3.08091 17.8676C2.70511 17.8636 2.40116 17.5605 2.39576 17.1847V16.074H23.1395V17.1847C23.1345 17.5598 22.8317 17.8628 22.4566 17.8678ZM20.6326 20.4328C20.6002 20.5319 20.5094 20.6002 20.4052 20.6037H5.13221C5.02763 20.6008 4.93626 20.5322 4.90409 20.4328L4.70374 19.265H20.8319L20.6326 20.4328ZM12.7676 5.36082C17.6118 5.36082 21.9423 9.20536 21.9423 14.6777H3.59287C3.59287 9.23547 7.89519 5.36082 12.7676 5.36082ZM11.9704 3.19431C11.9625 2.98113 12.0405 2.7735 12.1866 2.61797C12.333 2.46263 12.5354 2.37223 12.7488 2.36705C12.9622 2.36188 13.1687 2.44233 13.3223 2.59058C13.4759 2.73864 13.5638 2.94224 13.5663 3.15559C13.5688 3.36916 13.4858 3.57468 13.3357 3.7264C13.1857 3.8781 12.9809 3.96352 12.7676 3.96333C12.5609 3.96352 12.3623 3.88346 12.2134 3.73999C12.0648 3.59653 11.9777 3.40098 11.9704 3.19431Z" fill="#BDBDBD" stroke="#BDBDBD" stroke-width="0.5"/>
</svg>
</NavLink></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      

      

      
    </div>
  );
};

export default Reataurant;
