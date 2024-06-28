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
import bcrypt from 'bcryptjs'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import axios from 'axios'; // ES6 module
import { useForm } from 'react-hook-form';


const Reataurant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const [name,setname] = useState()
  const [email,setemail] = useState()
  const [phone,setphone] = useState()
  const [password,setpassword] = useState()
  const [description,setdescription] = useState()
  const [alertStatus, setAlertStatus] = useState("danger");
    const navigate = useNavigate();
    const [additem,setadditem]=useState(false);
    const [addaddon,setaddaddon]=useState(false);
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [restaurant,setRestaurant] = useState([])
    const [order,setorder] = useState()
    const [category,setcategory] = useState()
    const [ cordinate, setcordinate]=useState([])
    const [addons,setaddons] = useState()
    const [addonsid,setaddonsid] = useState()
    const[loading , setLoading] = useState(true)
   
    let latitude = 0;
let longitude = 0;
    const location = new GeoPoint(latitude, longitude);

    const getAllRestaurants = async () => {
      const querySnapshot = await getDocs(collection(firestore, "restaurantAdmins"));
      const restaurantList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      return restaurantList
    };


    const getAlladdons= async () => {
      const addMenu =collection(firestore,   `restaurantAdmins/${addonsid}/Addons`);
      const getData = await getDocs(addMenu);
     
     
      setaddons(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
   
      };
     
   
  useEffect(() => {
    
   getAlladdons()
 
 }, [addonsid]);



    const getAllOrders= async () => {
      const addOrder = query(collection(firestore,   "orders"));
      const getData = await getDocs(addOrder);
    
     
      setorder(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
  
      };

      const getorders = (id)=>{
        var counter = 0
      
       const counts= order?.map((val,ind)=>(
          val.restaurantId == id ? counter++ : ""
          
       ))
       

        return counter;
      }
      const [update,setupdate] = useState(false)
      const [addon,setaddon] = useState(false)
      const [resid,setresid] = useState(false)
      const openitemupdate = async (id)=>{
        setupdate(!update)
        setresid(id)
    }
    const openitem = async ()=>{
      setadditem(!additem)
  }
  const handleaddon = async (id)=>{
    setaddonsid(id)
    setaddaddon(!addaddon)  
}

const handleAddon = async (id)=>{
 
  setaddon(!addon)  
}

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
          setUpdateData({ ...updateData, ["logo"]: downloadURL })
         setimgmsg(false)
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
    name: '',
    selectedImage:'',
    email: '',
    password: '',
    phone:'',
    description:'',
   
  };



  const [address, setAddress] = useState();
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener('places_changed', () => {
        const places = autocomplete.getPlaces();
        if (places.length > 0) {
          setAddress(places[0].formatted_address);
        }
      });
    }
  }, [autocomplete]);


  const [msg, setMsg] = useState(null);
  const [fields, setFields] = useState(false);
  const [emailmsg, setemailmsg]=useState()
  const [emailmsgs, setemailmsgs]=useState(false)
  const [imgmsg, setimgmsg]=useState(false)
  const [namemsg, setnamemsg]=useState(false)
  const [desmsg, setdesmsg]=useState(false)
  const [phonemsg, setphonemsg]=useState(false)
  const [passmsg, setpassmsg]=useState(false)
  const [catmsg, setcatmsg]=useState(false)
  const [locmsg, setlocmsg]=useState(false)
  const [field, setField] = useState(false);
  

const apiKey = 'AIzaSyBgfj1d3-rPRMKfpfjdOmRKuyVpLsu_tPc';

const geocodeAddress = async (address, apiKey) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    
    const { results } = response.data;

    if (results.length > 0) {
      const location = results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;

      return { latitude, longitude };
    } else {
      throw new Error('No results found for the provided address.');
    }
  } catch (error) {
    throw new Error(`Error occurred while fetching geocoding data: ${error.message}`);
  }
};

geocodeAddress(address, apiKey)
  .then((coordinates) => {
    
   latitude = coordinates.latitude
   longitude = coordinates.longitude
  
  })
  .catch((error) => {
    console.error(error.message);
  });
  const getemails = [];
  const [inputFields, setInputFields] = useState([{ name: '', price: '', }]);
  const [inputField, setInputField] = useState(false);
  const [showAddButtons, setShowAddButtons] = useState(true); // Track visibility of "Add" buttons for each addon
 
  const [plus, setplus] = useState([true]);
   const handleInputChanges = (index, fieldName, value) => {
   const updatedFields = [...inputFields];
   updatedFields[index][fieldName] = value;
   setInputFields(updatedFields);
   setUpdateaddonData({ ...updateaddonData, ["addonItems"]: updatedFields })
        
 };
 
 
 
 const handleCheckboxChanges = (index) => {
   const updatedFields = [...inputFields];
   updatedFields[index].required = !updatedFields[index].required; // Toggle the 'required' property
   setInputFields(updatedFields);
 };
  
 const handleAddField = () => {
  if(inputField === false)
  {setInputField(true)
   setShowAddButtons(false); // Show "Add" button for the newly added addon
  
 }
  else{  
   setInputField(true)
   setplus([...plus, false]); // Show "Add" button for the newly added addon
 
  
   setInputFields([...inputFields, { name: '', price: '',  }]);
 
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
 
  const saveDetails =async (values) => {
  
   var data = restaurant?.filter(val => val.email === email)
       
       getemails.push(data[0]?.email)
   
    
      
    try {
      if(!selectedImage){
       
        setimgmsg(true)
      }
      else if(!name){
       
        setnamemsg(true)
      }
      else if(!description){
       
        setdesmsg(true)
      }
      else if(!email){
       
        setemailmsgs(true)
      }
     
      else if(!phone){
       
        setphonemsg(true)
      }
      else if(!password){
       
        setpassmsg(true)
      }
      else if(!category){
       
        setcatmsg(true)
      }
      else if(!address){
       
        setlocmsg(true)
      }
         else if( getemails[0] === email){
            setemailmsg("email already exist");
            setField(true)
          }
           
     else {
        const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
     
 
        const datacategory = {
         
          name: name,
          logo: selectedImage,
          email:email,
          phone:phone,
          address: address,
          location:new GeoPoint(latitude, longitude),
          password:hashedPassword,
          description:description,
          distance:0,
          category:category,
          workingHrs: "",
          prepDelay:"",
         
        };
         // Perform the Firestore document creation with auto-generated ID
    const docRef = await addDoc(collection(firestore, `restaurantAdmins`), datacategory );
    
    // Update the document with the auto-generated ID as "itemId"
    const itemId = docRef.id;
    await updateDoc(doc(firestore, `restaurantAdmins`, docRef.id), {
      userId: itemId
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

       if(address){
       newData.address = address;
       newData.location =new GeoPoint(latitude, longitude);

      
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
     }

       else{
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
    await deleteDoc(
      doc(firestore,`restaurantAdmins/${addonsid}/Addons`,idd)
    );
   
   
    getAlladdons()
    
  };
  const deletecategory = async (id) => {
    // Delete items subcollection
    const itemsQuery = query(collection(firestore, `restaurantAdmins/${id}/items`));
    const itemsQuerySnapshot = await getDocs(itemsQuery);
  
    itemsQuerySnapshot.forEach(async (itemDoc) => {
      await deleteDoc(doc(firestore, `restaurantAdmins/${id}/items`, itemDoc.id));
    });
  
    // Delete restaurants subcollection
    const restaurantsQuery = query(collection(firestore, `restaurantAdmins/${id}/restaurants`));
    const restaurantsQuerySnapshot = await getDocs(restaurantsQuery);
  
    restaurantsQuerySnapshot.forEach(async (restaurantDoc) => {
      await deleteDoc(doc(firestore, `restaurantAdmins/${id}/restaurants`, restaurantDoc.id));
    });
  
    // Delete the main document
    await deleteDoc(doc(firestore, 'restaurantAdmins', id));
  
    // Reload the page or navigate to another location
    window.location.reload(true);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "restaurantAdmins"));
        const restaurantList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRestaurant(restaurantList);
      } catch (error) {
        console.error("Error fetching restaurants: ", error);
      }
    };

    fetchRestaurants();
  }, []);



  const addaddons = async () => {
    try {
      const newData = { ...updateaddonData };
      newData.canChooseUpto = canChooseUpTo;
       // Perform the Firestore document creation with auto-generated ID
    const docRef = await addDoc(collection(firestore, `restaurantAdmins/${addonsid}/Addons`), newData);
    
    // Update the document with the auto-generated ID as "itemId"
    const addonId = docRef.id;
    await updateDoc(doc(firestore, `restaurantAdmins/${addonsid}/Addons`, docRef.id), {
      addonId: addonId
    });

    setFields(true);
    setMsg("Data Uploaded successfully");
    setAlertStatus("success");
    setTimeout(() => {
      setFields(false);
    }, 4000);

   setaddon(false)
   getAlladdons()
    clearData();
    setUpdateaddonData({})
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
    const hashedPassword = bcrypt.hashSync(event.target.value, '$2a$10$CwTycUXWue0Thq9StjUM0u')
    setpassword(event.target.value)
    // Dynamically update the fields you want to change
        setUpdateData({ ...updateData, ["password"]:  hashedPassword}) 
    }
    

    

    const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
    // Function to filter products based on search query
    const filteredrestaurant = restaurant?.filter((product) =>{
      console.log(product, product.username)
    return  product.username.toLowerCase().includes(searchQuery.toLowerCase())

    }
  );

  const datee = (timestamp)=>{
    const date = new Date(timestamp * 1000); // Convert to JavaScript Date

    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    
    const formattedDate = date.toLocaleString('en-US', options);
    
    return formattedDate
  }
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth()-1);
  

  const monthlyIncome = (id) => {
    const total = order?.filter((val) => val.restaurantId === id)
    
 
    const counter = total?.filter((item) => new Date(item.time) >= oneMonthAgo) .reduce((acc, val) => acc + val.totalPrice, 0);
  
    const pay = isNaN(counter) ? 0 : counter.toFixed(1);

  
    return pay;
  };
 
 
  return (
    <div className='lg:mx-[56px] md:mx-6 mx-4 px-4 mt-[25px] bg-secondary'>
      
      <div className="justify-end items-end w-full flex">
       <div className='md:flex gap-4  hidden items-center px-3  my-7 rounded-lg bg-brandDark w-[406px] h-12 shadow-[#0000001a]'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" >
  <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 22L20 20" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        <input type="text" value={searchQuery}
        onChange={handleSearchInputChange} className='text-base w-[300px]  focus:outline-none focus:ring-0 font-normal selector text-[#E5E5E5] my-2  bg-brandDark' placeholder='Search restaurant'/>
   
    </div>
    </div>
     <div className='flex flex-row justify-between mb-[13px]'>
    <h1 className='selector text-[#E5E5E5] text-xl  font-bold'>Registered Restaurants</h1>
    {/* <button  onClick={()=>openitem()} className='selector text-lg font-normal  py-2 text-[#E5E5E5] bg-brandDark flex gap-1 px-[16px] rounded-full justify-center items-center'><p>Add New</p><svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12.3158H13.5V18H11.5V12.3158H5.5V10.4211H11.5V4.73685H13.5V10.4211H19.5V12.3158Z" fill="#E5E5E5"/>
</svg></button> */}
</div>
      <div>
      <div class="overflow-x-auto bg-brandDark relative  ">
              <table class="w-full md:overflow-x-scroll overflow-x-scroll text-left  text-gray-400 ">
                <thead class="text-sm font-bold 2xl:text-lg selector  text-[#E5E5E5]   border-b border-grey-400">
                  <tr className="">
                    <th scope="col" class="  pl-6 py-3 ">
                    <input
                      type="checkbox"
                      class="w-6 h-6 
                       bg-[#dad3ff] rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />
                    </th>
                    <th scope="col" className="w-[200px] text-center" >
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
                <tbody className='text-white'>
                  {filteredrestaurant?.map((val, ind) => (
                    <tr class=" border-b  text-[#E5E5E5] text-sm   selector font-normal border-gray-400 ">
                      <th
                        scope="row"
                        class="py-4 pl-6 font-light text-sm   2xl:text-lg text-white whitespace-nowrap "
                      >
                      <input
                      type="checkbox"
                      class="w-6 h-6  bg-gray-100  rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />
                      </th>
                      <td  className="w-[200px] items-center text-center justify-center">
                        
                     <div className="flex items-center justify-center"> 
                        <img
                          class="w-10 h-10 items-center text-center justify-center rounded-full"
                          src={val.logo}
                          alt="Bonnie image"
                        />
 </div>
                        </td>
                      <td className="w-[200px] justify-center items-center text-center"> 
                     {val.username} 
                      </td>
                      <td className="w-[200px] justify-center items-center text-center"> {val.email} </td>
                      <td className="w-[200px] justify-center items-center text-center"> {val.address} </td>
                      <td className="w-[200px] justify-center items-center text-center"> {monthlyIncome(val.id)} </td>
                      
                      <td className="w-[200px] justify-center items-center text-center">
                     
                     {getorders(val.id)}
                      </td>
                      <td className="w-[200px] justify-center items-center text-center">
                      <div className='flex flex-row gap-3 justify-center  text-center items-center'>
                     <div className="cursor-pointer"  onClick={()=> deletecategory(val.id)}> <DeleteOutline/></div>
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
      {addaddon && (
        <div
        id="defaultModal"
        class={
          " flex absolute top-0 right-0 right-0 md:right-0 left-0 z-50   w-full    bg-[#000000b3] bg-opacity-10 justify-center items-center"
        }
      >
         <div class={`absolute justify-between top-0 w-full right-0 h-screen overflow-y-scroll px-5 py-6 md:mr-0 mr-0   text-base list-none bg-[#2A2A2A] shadow-[#0000004d] divide-y-0 sm:divide-y rounded-l-lg shadow  divide-gray-600" id="user-dropdown`}>
         <div className='flex '>
         <button
              onClick={() => {setaddaddon(false);setaddons()}}
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
            <h1 className='selector text-[#E5E5E5] text-[25px] pr-[175px] pt-2 pl-[116px]  font-bold'>AddOns</h1>
          
            </div>
<div className="flex justify-between pt-16 w-full">
  <div> <h1 className='selector text-[#E5E5E5] text-[25px] pt-2  font-bold'>Add New</h1>
           </div>
            <div className="bg-[#FF6154]  p-2">
         
         <svg onClick={handleAddon} xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 17 18" fill="none">
<path opacity="0.3" d="M7.66667 9.83341H4.33333C4.11232 9.83341 3.90036 9.74562 3.74408 9.58934C3.5878 9.43306 3.5 9.22109 3.5 9.00008C3.5 8.77907 3.5878 8.56711 3.74408 8.41083C3.90036 8.25455 4.11232 8.16675 4.33333 8.16675H7.66667V9.83341ZM12.6667 8.16675H9.33333V9.83341H12.6667C12.8877 9.83341 13.0996 9.74562 13.2559 9.58934C13.4122 9.43306 13.5 9.22109 13.5 9.00008C13.5 8.77907 13.4122 8.56711 13.2559 8.41083C13.0996 8.25455 12.8877 8.16675 12.6667 8.16675Z" fill="#fff"/>
<path d="M12.6667 8.16667H9.33333V4.83333C9.33333 4.61232 9.24554 4.40036 9.08926 4.24408C8.93297 4.0878 8.72101 4 8.5 4C8.27899 4 8.06702 4.0878 7.91074 4.24408C7.75446 4.40036 7.66667 4.61232 7.66667 4.83333V8.16667H4.33333C4.11232 8.16667 3.90036 8.25446 3.74408 8.41074C3.5878 8.56702 3.5 8.77899 3.5 9C3.5 9.22101 3.5878 9.43297 3.74408 9.58926C3.90036 9.74554 4.11232 9.83333 4.33333 9.83333H7.66667V13.1667C7.66667 13.3877 7.75446 13.5996 7.91074 13.7559C8.06702 13.9122 8.27899 14 8.5 14C8.72101 14 8.93297 13.9122 9.08926 13.7559C9.24554 13.5996 9.33333 13.3877 9.33333 13.1667V9.83333H12.6667C12.8877 9.83333 13.0996 9.74554 13.2559 9.58926C13.4122 9.43297 13.5 9.22101 13.5 9C13.5 8.77899 13.4122 8.56702 13.2559 8.41074C13.0996 8.25446 12.8877 8.16667 12.6667 8.16667Z" fill="#fff"/>
</svg></div>
</div>
            {addons?.map((val, ind) => (
            <div  className=' mt-[20px] rounded-lg justify-between items-center w-full md:w-[377px]   px-4 flex  gap-3 py-3 border-[#353535] bg-[#353535] border-solid border'>
            <div>
            <h1 className='selector text-[#E5E5E5] text-[25px] pt-2  font-bold'>{val.addonName}</h1>
            <p className='selector text-[#FF6154] text-[16px] pt-1  font-bold'>{val.canChooseUpto} <span className='selector text-[#FF6154] text-[13px] pt-2  font-bold'>choices</span></p>
           
           </div>
            <svg  onClick={()=> deleteaddons(val.id)}  xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 9 10" fill="none">
  <path d="M7.6001 2.40002L7.35221 6.41006C7.28887 7.4346 7.25721 7.94688 7.0004 8.31517C6.87343 8.49726 6.70996 8.65094 6.52038 8.76643C6.13694 9.00002 5.62369 9.00002 4.5972 9.00002C3.56934 9.00002 3.05542 9.00002 2.67172 8.766C2.48202 8.65029 2.3185 8.49635 2.19157 8.31396C1.93485 7.94506 1.90388 7.43207 1.84194 6.40609L1.6001 2.40002" stroke="#FF6154" stroke-linecap="round"/>
  <path d="M8.2 2.40002H1" stroke="#FF6154" stroke-linecap="round"/>
  <path d="M6.22212 2.4L5.94905 1.83669C5.76766 1.4625 5.67696 1.27541 5.52051 1.15872C5.48581 1.13284 5.44906 1.10982 5.41064 1.08988C5.23739 1 5.02947 1 4.61364 1C4.18736 1 3.97422 1 3.7981 1.09365C3.75907 1.1144 3.72182 1.13836 3.68674 1.16527C3.52848 1.28668 3.44008 1.48062 3.26327 1.8685L3.021 2.4" stroke="#FF6154" stroke-linecap="round"/>
  <path d="M3.6001 6.80005L3.6001 4.40005" stroke="#FF6154" stroke-linecap="round"/>
  <path d="M5.6001 6.80015L5.6001 4.40015" stroke="#FF6154" stroke-linecap="round"/>
</svg>
           </div>
))}
       </div>
       </div>)}
      {additem && (
        <div
        id="defaultModal"
        class={
          " flex absolute top-0 right-0 sm:right-0 md:right-0 left-0 z-50   w-full sm:w-full  md:w-full   bg-[#000000b3] bg-opacity-5 justify-center items-center"
        }
      >
         <div class={`absolute top-0 sm:w-full right-0 h-screen overflow-y-scroll px-5 py-6 md:mr-0 sm:mr-0   text-base list-none bg-[#2A2A2A] shadow-[#0000004d] divide-y-0 sm:divide-y rounded-l-lg shadow  divide-gray-600" id="user-dropdown`}>
        <div className='flex '>
         <button
              onClick={() => setadditem(false)}
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
            <h1 className='selector text-[#E5E5E5] text-[25px] pr-[175px] pt-2 pl-[116px]  font-bold'>New Restaurant</h1>
          
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
        <Formik
      initialValues={initialValues}
        // validationSchema={validationSchema}
      validate={(values) => {
           const errors = {};
           if (!name) {
             errors.name = "Required";
           }

           if (!selectedImage) {
             errors.selectedImage = "Required";
           }
          
           if (!email) {
             errors.email = "Required";
           }
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           var test1 = emailRegex.test(email);
           if (email && !test1) {
             errors.email = "Invalid email address";
           }
           {restaurant?.map((val,ind)=>{
          if(email && test1 && val.email === email){
            errors.email = " email address already exist";
          }
           
        })}
        if (!password) {
             errors.password = "Required";
            
           }
           var reg = /^(?=.*[!@#$%^&*/.,])(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
      var test = reg.test(password);
    
        if (password && !test) {
       setFields(true)
        errors.password ="weak"
      } 
       

      if (!values.confirmpassword) {
             errors.confirmpassword = "Required";
            
           }
      if (values.confirmpassword && values.confirmpassword !== password){
        errors.confirmpassword="Password do not matched";
      }
     
           if (!phone) {
             errors.phone = "Required";
           }
           const phoneRegex = /^\+[1-9]\d{1,14}$/;
           var phonetest = phoneRegex.test(phone);
    //        if (phone && !phonetest) {
       
    //    errors.phone ="invalid phone numbr"
    //  } 
     {restaurant?.map((val,ind)=>{
          if(phone &&  val.phone === phone){
            errors.phone = " phone number already exist";
          }
           
        })}
           

         

          
           return errors;
         }}
       
       onSubmit={saveDetails}
    >
        {({ isSubmitting }) => (
              <Form  className="space-y-4 md:space-y-6" >
            <div className=' justify-center items-center'>
            {selectedImage ? <div className='mt-7 xl:mt-4 w-[170px] md:ml-28 ml-10 xl:ml-32 h-[170px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] flex flex-col gap-1 rounded-full bg-[#353535] justify-center items-center shadow-[#0000001a]'>
          <img className='rounded-full w-[160px] h-[160px] lg:w-[140px] lg:h-[140px] xl:w-[140px] xl:h-[150px]'
            alt="not found"
            src={selectedImage}
          />
           <DeleteOutline className='absolute text-white cursor-pointer'  onClick={deleteImage}/> </div>  
           :
            <div className='mt-7 xl:mt-4 w-[170px] ml-28 xl:ml-32 h-[170px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] flex flex-col gap-1 rounded-full bg-[#353535] justify-center items-center shadow-[#0000001a]'>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleClick} width="58" height="51" viewBox="0 0 58 51" fill="none">
  <g opacity="0.5">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M54.1836 33.2177C54.1836 19.8626 44.843 9.8276 33.2847 7.68175C33.6396 6.94771 33.828 6.14487 33.8373 5.3294C33.8559 3.9228 33.3102 2.56681 32.3222 1.56533C31.3337 0.56383 29.9857 0 28.5785 0C27.1713 0 25.8233 0.563783 24.8348 1.56533C23.8468 2.56684 23.3011 3.9228 23.3197 5.3294C23.2969 6.14855 23.4881 6.95939 23.8747 7.68175C17.9303 8.78233 12.566 11.9487 8.7298 16.6212C4.89357 21.2938 2.83155 27.1721 2.90919 33.2177C2.15423 33.1903 1.42018 33.468 0.872645 33.9885C0.325606 34.509 0.0106936 35.2281 0 35.9831V39.3057C0.00744263 40.6435 0.542383 41.9246 1.48853 42.8703C2.43513 43.8165 3.71619 44.351 5.05396 44.3579H5.60611L6.16106 47.7481C6.32154 48.6588 6.79741 49.4845 7.50585 50.079C8.21429 50.6739 9.10977 51 10.0349 51H47.1266C48.0481 50.9884 48.937 50.6581 49.6432 50.065C50.3488 49.4724 50.8279 48.6537 50.9987 47.748L51.5536 44.3579H52.1086C53.4455 44.3495 54.7256 43.8146 55.6703 42.8689C56.6155 41.9232 57.1495 40.6427 57.1569 39.3057V35.9831C57.1416 35.2179 56.8169 34.4913 56.2559 33.9704C55.6954 33.4489 54.9478 33.1772 54.1836 33.2177ZM52.1089 40.9646L5.05364 40.9641C4.14098 40.9544 3.40281 40.2185 3.38971 39.3058V36.6083H53.7674V39.3058C53.7553 40.2166 53.0197 40.9524 52.1089 40.9646ZM47.6792 47.194C47.6006 47.4345 47.3801 47.6006 47.127 47.6089H10.0354C9.78138 47.602 9.55949 47.4354 9.48135 47.194L8.99479 44.358H48.1633L47.6792 47.194ZM28.5784 10.5906C40.3429 10.5906 50.8599 19.9273 50.8599 33.2173H6.29698C6.29698 20.0004 16.7455 10.5906 28.5784 10.5906ZM26.6424 5.32904C26.6233 4.81131 26.8126 4.30708 27.1676 3.92935C27.5229 3.5521 28.0146 3.33255 28.5328 3.31998C29.051 3.30742 29.5525 3.5028 29.9255 3.86283C30.2986 4.2224 30.5121 4.71688 30.5181 5.23501C30.5242 5.75368 30.3228 6.2528 29.9581 6.62125C29.5938 6.98967 29.0966 7.19712 28.5784 7.19665C28.0765 7.19712 27.5941 7.00268 27.2326 6.65427C26.8717 6.30586 26.6601 5.83096 26.6424 5.32904Z" fill="#BDBDBD"/>
  </g>
</svg>
<input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
<h1 className='text-[#BDBDBD] selector text-xs font-normal cursor-pointer'  onClick={handleClick}>Select Image</h1>

            </div>}
            {imgmsg  &&
          <p className="error text-[#FF6154]">Required</p>
        }
           
                    
            <div className='mt-[24px] xl:mt-[20px] md:ml-[29px] ml-3'>
                <h1 className='selector text-[#E5E5E5] font-normal xl:text-[20px] text-[25px]'>Restaurant Details</h1>
                <div className=' mt-[13px] rounded-full justify-between w-full md:w-[377px] h-12 xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="text"  value={name}
            onChange={(e) => {setname(e.target.value); setnamemsg(false)}}  className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Restaurant Name'/>
            </div>
            {namemsg  &&
          <p className="error text-[#FF6154]">Required</p>
        }
                    
            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="text"  value={description}
            onChange={(e) => {setdescription(e.target.value); setdesmsg(false)}}   className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='About restaurant'/>
            </div>
             {desmsg  &&
          <p className="error text-[#FF6154]">Required</p>
        }
                    
            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="email"   value={email} name="email"
            onChange={(e) => {setemail(e.target.value);setemailmsgs(false)}} className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Email'/>
            </div>
            {field   &&
          <p className="error text-[#FF6154]">{emailmsg}</p>
        }
         {emailmsgs  &&
          <p className="error text-[#FF6154]">Required</p>
        }
                    
            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="tel"   value={phone}
            onChange={(e) => {setphone(e.target.value); setphonemsg(false)}} className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Phone No'/>
            </div>
            {phonemsg  &&
          <p className="error text-[#FF6154]">Required</p>
        }
                    
            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="password"  value={password}
            onChange={(e) => {setpassword(e.target.value); setpassmsg(false)}}  className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Password'/>
            </div>
            {passmsg  &&
          <p className="error text-[#FF6154]">Required</p>
        }
            
            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <select   name="category"
            
            onChange={(e) => {setcategory(e.target.value); setcatmsg(false)}}   className='text-base  w-[377px] sm:w-full focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' >
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Kebab">Kebab</option>
             <option value="Asiatique">Asiatique</option>
             <option value="Chinois">Chinois</option>
             <option value="Boulangerie">Boulangerie</option>
             <option value="Africain">Africain</option>
             <option value="Snacking">Snacking</option>
             <option value="Drinks">Drinks</option>
             <option value="Sandwich">Sandwich</option>
             <option value="Patisserie">Patisserie</option>
             <option value="Arabe">Arabe</option>
             <option value="Amérique du sud">Amérique du sud</option>
             <option value="Autres">Autres</option> 
            </select>
            </div>
            {catmsg  &&
          <p className="error text-[#FF6154]">Required</p>
        }      
            <LoadScript googleMapsApiKey="AIzaSyBgfj1d3-rPRMKfpfjdOmRKuyVpLsu_tPc" libraries={["places"]}>
      <StandaloneSearchBox
        onLoad={box => setAutocomplete(box)}
        onPlacesChanged={() => {}}
      >
        <input
        className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 text-[#E5E5E5] border-[#bdbdbd0d] border-solid bg-[#353535]'
          type="text"
          placeholder="Enter a location"
          value={address}
          onChange={(e) => {setAddress(e.target.value);setlocmsg(false)}}
        />
      </StandaloneSearchBox>
    </LoadScript>
    {locmsg &&
          <p className="error text-[#FF6154]">Required</p>
        }
    
            
            </div>
            </div>
            <div className='mt-8 ml-20 sm:ml-10 xl:mt-7 '>
            <button type="submit" onClick={saveDetails}  className='selector text-lg font-bold xl:py-2  py-4 px-20 text-[#E5E5E5] bg-[#FF6154] flex gap-1  rounded-full justify-center items-center'>Confirm
           </button>
           </div>
            </Form>
            )}
            </Formik>

            
     </div>
    </div>
       
      )}


      {update && (
        <div
        id="defaultModal"
        class={
          " flex absolute   top-0 right-0 sm:right-0 md:right-0 left-0 z-50   w-full sm:w-full md:w-full h-[100%]  bg-[#000000b3] bg-opacity-5 justify-center items-center"
        }
      >
         <div class={`absolute top-0 right-0 h-screen overflow-y-scroll px-5 py-6 md:mr-0 sm:mr-0   text-base list-none bg-[#2A2A2A] shadow-[#0000004d] divide-y-0 sm:divide-y rounded-l-lg shadow  divide-gray-600" id="user-dropdown`}>
        <div className='flex '>
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
            <h1 className='selector text-[#E5E5E5] text-[25px] pr-[175px] pt-2 pl-[116px]  font-bold'>Edit Restaurant</h1>
          
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
  
              <div   class="space-y-4 md:space-y-6" >
            <div className=' justify-center items-center'>
            {selectedImage ? <div className='mt-7 xl:mt-4 w-[170px] ml-28 xl:ml-32 h-[170px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] flex flex-col gap-1 rounded-full bg-[#353535] justify-center items-center shadow-[#0000001a]'>
          <img className='rounded-full w-[160px] h-[160px] lg:w-[140px] lg:h-[140px] xl:w-[140px] xl:h-[150px]'
            alt="not found"
            src={selectedImage}
          />
           <DeleteOutline className='absolute text-white cursor-pointer'  onClick={deleteImage}/> </div>  
           :
            <div className='mt-7 xl:mt-4 w-[170px] ml-28 xl:ml-32 h-[170px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] flex flex-col gap-1 rounded-full bg-[#353535] justify-center items-center shadow-[#0000001a]'>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleClick} width="58" height="51" viewBox="0 0 58 51" fill="none">
  <g opacity="0.5">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M54.1836 33.2177C54.1836 19.8626 44.843 9.8276 33.2847 7.68175C33.6396 6.94771 33.828 6.14487 33.8373 5.3294C33.8559 3.9228 33.3102 2.56681 32.3222 1.56533C31.3337 0.56383 29.9857 0 28.5785 0C27.1713 0 25.8233 0.563783 24.8348 1.56533C23.8468 2.56684 23.3011 3.9228 23.3197 5.3294C23.2969 6.14855 23.4881 6.95939 23.8747 7.68175C17.9303 8.78233 12.566 11.9487 8.7298 16.6212C4.89357 21.2938 2.83155 27.1721 2.90919 33.2177C2.15423 33.1903 1.42018 33.468 0.872645 33.9885C0.325606 34.509 0.0106936 35.2281 0 35.9831V39.3057C0.00744263 40.6435 0.542383 41.9246 1.48853 42.8703C2.43513 43.8165 3.71619 44.351 5.05396 44.3579H5.60611L6.16106 47.7481C6.32154 48.6588 6.79741 49.4845 7.50585 50.079C8.21429 50.6739 9.10977 51 10.0349 51H47.1266C48.0481 50.9884 48.937 50.6581 49.6432 50.065C50.3488 49.4724 50.8279 48.6537 50.9987 47.748L51.5536 44.3579H52.1086C53.4455 44.3495 54.7256 43.8146 55.6703 42.8689C56.6155 41.9232 57.1495 40.6427 57.1569 39.3057V35.9831C57.1416 35.2179 56.8169 34.4913 56.2559 33.9704C55.6954 33.4489 54.9478 33.1772 54.1836 33.2177ZM52.1089 40.9646L5.05364 40.9641C4.14098 40.9544 3.40281 40.2185 3.38971 39.3058V36.6083H53.7674V39.3058C53.7553 40.2166 53.0197 40.9524 52.1089 40.9646ZM47.6792 47.194C47.6006 47.4345 47.3801 47.6006 47.127 47.6089H10.0354C9.78138 47.602 9.55949 47.4354 9.48135 47.194L8.99479 44.358H48.1633L47.6792 47.194ZM28.5784 10.5906C40.3429 10.5906 50.8599 19.9273 50.8599 33.2173H6.29698C6.29698 20.0004 16.7455 10.5906 28.5784 10.5906ZM26.6424 5.32904C26.6233 4.81131 26.8126 4.30708 27.1676 3.92935C27.5229 3.5521 28.0146 3.33255 28.5328 3.31998C29.051 3.30742 29.5525 3.5028 29.9255 3.86283C30.2986 4.2224 30.5121 4.71688 30.5181 5.23501C30.5242 5.75368 30.3228 6.2528 29.9581 6.62125C29.5938 6.98967 29.0966 7.19712 28.5784 7.19665C28.0765 7.19712 27.5941 7.00268 27.2326 6.65427C26.8717 6.30586 26.6601 5.83096 26.6424 5.32904Z" fill="#BDBDBD"/>
  </g>
</svg>
<input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
<h1 className='text-[#BDBDBD] selector text-xs font-normal cursor-pointer'  onClick={handleClick}>Select Item Image</h1>

            </div>}
                    
            <div className='mt-[24px] xl:mt-[20px] ml-[29px]'>
                <h1 className='selector text-[#E5E5E5] font-normal xl:text-[20px] text-[25px]'>Edit Restaurant Details</h1>
                <div className=' mt-[13px] rounded-full justify-between w-full md:w-[377px] h-12 xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="text"   value={updateData["name"]} name="name"
             onChange={(e) =>  setUpdateData({ ...updateData, ["name"]: e.target.value })}  className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Restaurant Name'/>
            </div>
                    
            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="text"   value={updateData["description"]} name="description"
             onChange={(e) =>  setUpdateData({ ...updateData, ["description"]: e.target.value })}   className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='About restaurant'/>
            </div>
                    
            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="email"    name="email"
           value={updateData["email"]}  onChange={(e) =>  setUpdateData({ ...updateData, ["email"]: e.target.value })} className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Email'/>
            </div>
                    
            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="tel"   name="phone"
            value={updateData["phone"]}  onChange={(e) =>  setUpdateData({ ...updateData, ["phone"]: e.target.value })}  className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Phone No'/>
            </div>

            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <select   name="category"
            value={updateData["category"]}  onChange={(e) =>  setUpdateData({ ...updateData, ["category"]: e.target.value })}  className='text-base  w-[377px] sm:w-full focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Phone No'>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Kebab">Kebab</option>
             <option value="Asiatique">Asiatique</option>
             <option value="Chinois">Chinois</option>
             <option value="Boulangerie">Boulangerie</option>
             <option value="Africain">Africain</option>
             <option value="Snacking">Snacking</option>
             <option value="Drinks">Drinks</option>
             <option value="Sandwich">Sandwich</option>
             <option value="Patisserie">Patisserie</option>
             <option value="Arabe">Arabe</option>
             <option value="Amérique du sud">Amérique du sud</option>
             <option value="Autres">Autres</option> 
            </select>
            </div>
                    
            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="password"  phone="password" name="password"
           value={password}  onChange={(e) => handleInputpassword(e) }  className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Password'/>
            </div>
            <LoadScript googleMapsApiKey="AIzaSyBgfj1d3-rPRMKfpfjdOmRKuyVpLsu_tPc" libraries={["places"]}>
      <StandaloneSearchBox
        onLoad={box => setAutocomplete(box)}
        onPlacesChanged={() => {}}
      >
        <input
        className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 text-[#E5E5E5] border-[#bdbdbd0d] border-solid bg-[#353535]'
          type="text"
          placeholder="Enter a location"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </StandaloneSearchBox>
    </LoadScript>     

            
             <div className='mt-8 ml-20 sm:ml-10 xl:mt-7 '>
            <button  onClick={updateDetails}  className='selector text-lg font-bold xl:py-2  py-4 px-20 text-[#E5E5E5] bg-[#FF6154] flex gap-1  rounded-full justify-center items-center'>Update
            </button>
            
            </div>
            </div>
            </div>
            </div>
          
     </div>
    </div>
       
      )}

{addon && (
                <div
        id="defaultModal"
        class={
          " flex absolute top-0 right-0 sm:right-0 md:right-0 left-0 z-50   w-full sm:w-full md:w-full h-screen  bg-[#0000004d]  justify-center items-center"
        }
      >
         <div class={`absolute justify-center  items-center w-[500px] sm:w-full h-[500px] overflow-y-scroll overflow-y-[#2A2A2A]  md:mr-0 sm:mr-0   text-base list-none bg-[#2A2A2A] shadow-[#0000004d] divide-y-0 sm:divide-y rounded-xl shadow  divide-gray-600"`}>
          <div className='px-5 py-6  justify-between border-b items-center  flex gap-[10px]'>
            <h1 className='font-["Inter"] text-lg font-semibold selector text-[#E5E5E5]'>Addon Details</h1>
           <div  onClick={() => setaddon(false)} className='cursor-pointer'>
            <svg  xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <g opacity="0.8">
    <mask id="path-1-inside-1_118_7164" fill="white">
      <path d="M7.08213 5.99991L11.7433 10.6727C12.0467 10.9767 12.0467 11.4681 11.7433 11.772C11.4401 12.076 10.9499 12.076 10.6467 11.772L5.98535 7.09924L1.32414 11.772C1.0208 12.076 0.530709 12.076 0.227507 11.772C-0.0758358 11.4681 -0.0758358 10.9767 0.227507 10.6727L4.88871 5.99991L0.227507 1.32711C-0.0758358 1.02317 -0.0758358 0.531728 0.227507 0.227781C0.378611 0.0761642 0.577289 0 0.775826 0C0.974362 0 1.1729 0.0761642 1.32414 0.227781L5.98535 4.90058L10.6467 0.227781C10.7979 0.0761642 10.9965 0 11.195 0C11.3935 0 11.5921 0.0761642 11.7433 0.227781C12.0467 0.531728 12.0467 1.02317 11.7433 1.32711L7.08213 5.99991Z"/>
    </mask>
    <path d="M7.08213 5.99991L11.7433 10.6727C12.0467 10.9767 12.0467 11.4681 11.7433 11.772C11.4401 12.076 10.9499 12.076 10.6467 11.772L5.98535 7.09924L1.32414 11.772C1.0208 12.076 0.530709 12.076 0.227507 11.772C-0.0758358 11.4681 -0.0758358 10.9767 0.227507 10.6727L4.88871 5.99991L0.227507 1.32711C-0.0758358 1.02317 -0.0758358 0.531728 0.227507 0.227781C0.378611 0.0761642 0.577289 0 0.775826 0C0.974362 0 1.1729 0.0761642 1.32414 0.227781L5.98535 4.90058L10.6467 0.227781C10.7979 0.0761642 10.9965 0 11.195 0C11.3935 0 11.5921 0.0761642 11.7433 0.227781C12.0467 0.531728 12.0467 1.02317 11.7433 1.32711L7.08213 5.99991Z" fill="#FDA800"/>
    <path d="M7.08213 5.99991L4.53338 8.54233L1.99727 5.99991L4.53338 3.45749L7.08213 5.99991ZM11.7433 10.6727L9.19522 13.2158L9.19459 13.2151L11.7433 10.6727ZM11.7433 11.772L9.19462 9.22958L9.19522 9.22898L11.7433 11.772ZM10.6467 11.772L8.09799 14.3145L8.09799 14.3145L10.6467 11.772ZM5.98535 7.09924L3.4366 4.55682L5.98531 2.00178L8.53405 4.55678L5.98535 7.09924ZM1.32414 11.772L3.87289 14.3145L3.87225 14.3151L1.32414 11.772ZM0.227507 11.772L2.77562 9.22898L2.77621 9.22958L0.227507 11.772ZM0.227507 10.6727L2.77625 13.2151L2.77562 13.2158L0.227507 10.6727ZM4.88871 5.99991L7.43746 3.45749L9.97357 5.99991L7.43746 8.54233L4.88871 5.99991ZM0.227507 1.32711L2.77562 -1.21594L2.77625 -1.21531L0.227507 1.32711ZM0.227507 0.227781L2.77741 2.76904L2.77562 2.77084L0.227507 0.227781ZM1.32414 0.227781L3.87285 -2.31468L3.87289 -2.31464L1.32414 0.227781ZM5.98535 4.90058L8.53405 7.44304L5.98531 9.99805L3.4366 7.443L5.98535 4.90058ZM10.6467 0.227781L13.1954 2.77024L10.6467 0.227781ZM11.7433 0.227781L9.19522 2.77084L9.19463 2.77024L11.7433 0.227781ZM11.7433 1.32711L9.19459 -1.21531L9.19522 -1.21594L11.7433 1.32711ZM9.63087 3.45749L14.2921 8.13029L9.19459 13.2151L4.53338 8.54233L9.63087 3.45749ZM14.2914 8.12965C15.9973 9.83891 15.9973 12.6058 14.2914 14.3151L9.19522 9.22898C8.09604 10.3303 8.09604 12.1144 9.19522 13.2158L14.2914 8.12965ZM14.292 14.3145C12.5822 16.0285 9.80779 16.0285 8.09799 14.3145L13.1954 9.22958C12.092 8.12347 10.298 8.12347 9.19463 9.22958L14.292 14.3145ZM8.09799 14.3145L3.43664 9.6417L8.53405 4.55678L13.1954 9.22958L8.09799 14.3145ZM8.53409 9.64166L3.87289 14.3145L-1.2246 9.22962L3.4366 4.55682L8.53409 9.64166ZM3.87225 14.3151C2.16278 16.028 -0.611069 16.0288 -2.3212 14.3145L2.77621 9.22958C1.67249 8.12314 -0.121175 8.124 -1.22397 9.22898L3.87225 14.3151ZM-2.3206 14.3151C-4.02647 12.6058 -4.02647 9.83891 -2.3206 8.12965L2.77562 13.2158C3.87479 12.1144 3.87479 10.3303 2.77562 9.22898L-2.3206 14.3151ZM-2.32124 8.13029L2.33997 3.45749L7.43746 8.54233L2.77625 13.2151L-2.32124 8.13029ZM2.33997 8.54233L-2.32124 3.86953L2.77625 -1.21531L7.43746 3.45749L2.33997 8.54233ZM-2.3206 3.87017C-4.02647 2.16092 -4.02647 -0.606021 -2.3206 -2.31527L2.77562 2.77084C3.87479 1.66948 3.87479 -0.114582 2.77562 -1.21594L-2.3206 3.87017ZM-2.32239 -2.31348C-1.46993 -3.16884 -0.342317 -3.6 0.775826 -3.6V3.6C1.4969 3.6 2.22716 3.32116 2.77741 2.76904L-2.32239 -2.31348ZM0.775826 -3.6C1.89498 -3.6 3.02142 -3.1682 3.87285 -2.31468L-1.22456 2.77024C-0.675626 3.32053 0.0537469 3.6 0.775826 3.6V-3.6ZM3.87289 -2.31464L8.53409 2.35816L3.4366 7.443L-1.2246 2.7702L3.87289 -2.31464ZM3.43664 2.35812L8.09799 -2.31468L13.1954 2.77024L8.53405 7.44304L3.43664 2.35812ZM8.09799 -2.31468C8.94941 -3.1682 10.0759 -3.6 11.195 -3.6V3.6C11.9171 3.6 12.6465 3.32053 13.1954 2.77024L8.09799 -2.31468ZM11.195 -3.6C12.3142 -3.6 13.4406 -3.1682 14.292 -2.31468L9.19463 2.77024C9.74356 3.32053 10.4729 3.6 11.195 3.6V-3.6ZM14.2914 -2.31527C15.9973 -0.606021 15.9973 2.16092 14.2914 3.87017L9.19522 -1.21594C8.09604 -0.114582 8.09604 1.66948 9.19522 2.77084L14.2914 -2.31527ZM14.2921 3.86953L9.63087 8.54233L4.53338 3.45749L9.19459 -1.21531L14.2921 3.86953Z" fill="#48525B" mask="url(#path-1-inside-1_118_7164)"/>
  </g>
</svg> </div>  </div> 
<div className="flex flex-col justify-center items-center">
<div className=' mt-[13px] rounded-full justify-between w-full md:w-[377px] h-12 xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="text"   value={updateaddonData["addonName"]} name="addonName"
             onChange={(e) =>  setUpdateaddonData({ ...updateaddonData, ["addonName"]: e.target.value })}  className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Addon Name'/>
            </div>
            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
           
           <select   value={updateaddonData["addonType"]} name="addonType"
            onChange={(e) =>  setUpdateaddonData({ ...updateaddonData, ["addonType"]: e.target.value })}  className=' selector rounded-full focus:ring-0 focus:border-0 justify-between w-[377px]  items-center  flex flex-row text-[#E5E5E5]  border-[#bdbdbd0d] border-solid bg-[#353535]'>
          <option >Select Addon Type</option>
          <option value="Choices">Choices</option>
           <option value="Ingredients">Ingredient</option>
           </select>
           </div>

           <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3  '>
            <h1     className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  ' >Can Choose upto</h1>
            <div className="flex gap-3 items-center">
            <div className="bg-[#353535] rounded-full p-1 flex items-center justify-center">
  <svg  onClick={() => {
      handleDecrement();
      setUpdateaddonData({ ...updateaddonData, ["canChooseUpto"]: canChooseUpTo });
    }} width="17" height="18" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="#fff" />
  </svg>
</div>
            <h1     className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  ' >{canChooseUpTo}</h1>
          
            <div className="bg-[#353535] rounded-full p-1">
           
            <svg onClick={handleIncrement} xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
  <path opacity="0.3" d="M7.66667 9.83341H4.33333C4.11232 9.83341 3.90036 9.74562 3.74408 9.58934C3.5878 9.43306 3.5 9.22109 3.5 9.00008C3.5 8.77907 3.5878 8.56711 3.74408 8.41083C3.90036 8.25455 4.11232 8.16675 4.33333 8.16675H7.66667V9.83341ZM12.6667 8.16675H9.33333V9.83341H12.6667C12.8877 9.83341 13.0996 9.74562 13.2559 9.58934C13.4122 9.43306 13.5 9.22109 13.5 9.00008C13.5 8.77907 13.4122 8.56711 13.2559 8.41083C13.0996 8.25455 12.8877 8.16675 12.6667 8.16675Z" fill="#fff"/>
  <path d="M12.6667 8.16667H9.33333V4.83333C9.33333 4.61232 9.24554 4.40036 9.08926 4.24408C8.93297 4.0878 8.72101 4 8.5 4C8.27899 4 8.06702 4.0878 7.91074 4.24408C7.75446 4.40036 7.66667 4.61232 7.66667 4.83333V8.16667H4.33333C4.11232 8.16667 3.90036 8.25446 3.74408 8.41074C3.5878 8.56702 3.5 8.77899 3.5 9C3.5 9.22101 3.5878 9.43297 3.74408 9.58926C3.90036 9.74554 4.11232 9.83333 4.33333 9.83333H7.66667V13.1667C7.66667 13.3877 7.75446 13.5996 7.91074 13.7559C8.06702 13.9122 8.27899 14 8.5 14C8.72101 14 8.93297 13.9122 9.08926 13.7559C9.24554 13.5996 9.33333 13.3877 9.33333 13.1667V9.83333H12.6667C12.8877 9.83333 13.0996 9.74554 13.2559 9.58926C13.4122 9.43297 13.5 9.22101 13.5 9C13.5 8.77899 13.4122 8.56702 13.2559 8.41074C13.0996 8.25446 12.8877 8.16667 12.6667 8.16667Z" fill="#fff"/>
</svg></div>

            </div>
            </div>

            <div className=' mt-[8px] rounded-full justify-between w-full md:w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 '>
            <h1     className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  ' >AddOns Choices</h1>
            <div className="flex gap-3">
           
            <div className="bg-[#FF6154] rounded-lg px-4 py-1">
         
         <svg onClick={handleAddField} xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 17 18" fill="none">
<path opacity="0.3" d="M7.66667 9.83341H4.33333C4.11232 9.83341 3.90036 9.74562 3.74408 9.58934C3.5878 9.43306 3.5 9.22109 3.5 9.00008C3.5 8.77907 3.5878 8.56711 3.74408 8.41083C3.90036 8.25455 4.11232 8.16675 4.33333 8.16675H7.66667V9.83341ZM12.6667 8.16675H9.33333V9.83341H12.6667C12.8877 9.83341 13.0996 9.74562 13.2559 9.58934C13.4122 9.43306 13.5 9.22109 13.5 9.00008C13.5 8.77907 13.4122 8.56711 13.2559 8.41083C13.0996 8.25455 12.8877 8.16675 12.6667 8.16675Z" fill="#fff"/>
<path d="M12.6667 8.16667H9.33333V4.83333C9.33333 4.61232 9.24554 4.40036 9.08926 4.24408C8.93297 4.0878 8.72101 4 8.5 4C8.27899 4 8.06702 4.0878 7.91074 4.24408C7.75446 4.40036 7.66667 4.61232 7.66667 4.83333V8.16667H4.33333C4.11232 8.16667 3.90036 8.25446 3.74408 8.41074C3.5878 8.56702 3.5 8.77899 3.5 9C3.5 9.22101 3.5878 9.43297 3.74408 9.58926C3.90036 9.74554 4.11232 9.83333 4.33333 9.83333H7.66667V13.1667C7.66667 13.3877 7.75446 13.5996 7.91074 13.7559C8.06702 13.9122 8.27899 14 8.5 14C8.72101 14 8.93297 13.9122 9.08926 13.7559C9.24554 13.5996 9.33333 13.3877 9.33333 13.1667V9.83333H12.6667C12.8877 9.83333 13.0996 9.74554 13.2559 9.58926C13.4122 9.43297 13.5 9.22101 13.5 9C13.5 8.77899 13.4122 8.56702 13.2559 8.41074C13.0996 8.25446 12.8877 8.16667 12.6667 8.16667Z" fill="#fff"/>
</svg></div>

            </div>
            </div>
            {inputField && inputFields.map((field, index) => (
             
             <div>
            
                  <div  key={index} className=' mt-[8px] rounded-lg justify-between w-full md:w-[377px]  items-center px-4 flex flex-col gap-3 py-3 border-[#353535] border-solid border'>
                  <div className="flex justify-between gap-2 w-full">
                 <div></div>
                 <div className="bg-[#262525] rounded-full p-1">
                 <svg onClick={() => handleRemoveField(index)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11 8H4V7H11V8Z" fill="#fff"/> </svg>
      </div>
                  </div>
                
                 <div className="flex justify-between gap-2 w-full">
                 <input
                  type="text"
                  name="name"
                  value={field.name}
                  onChange={(e) => handleInputChanges(index, 'name', e.target.value)}
                  className='text-base pl-2 w-full rounded-full h-10 focus:outline-none focus:ring-0 font-normal selector text-[#E5E5E5] py-5 bg-[#353535]'
                  placeholder='name'
                />
              { updateaddonData["addonType"] === "Ingredients" &&
                  <input
                  type="text"
                  name="price"
                  value={field.price}
                  onChange={(e) => handleInputChanges(index, 'price', e.target.value || '0')}
                  className='text-base pl-2 w-full rounded-full h-10 focus:outline-none focus:ring-0 font-normal selector text-[#E5E5E5] py-5 bg-[#353535]'
                  placeholder='price'
                />
            }
                  </div>
               
                
                  </div>
                 
                  </div>
            ))}

<div className='mt-8  xl:mt-7 mb-8'>
            <button  onClick={addaddons}  className='selector text-lg font-bold xl:py-2  py-4 px-20 text-[#E5E5E5] bg-[#FF6154] flex gap-1  rounded-full justify-center items-center'>Add Addon
            </button>
            
            </div>
            </div>
      </div>  </div>)}
        </div>
  )
}

export default Reataurant