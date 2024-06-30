import React, { useEffect, useState } from "react";
import burger from "../../assets/burger.png"
import pizza from "../../assets/pizza.png"
import jl from "../../assets/juice.png"
import coffee from "../../assets/blackcoffee.png"
import { Link, useParams } from 'react-router-dom';
import cake from "../../assets/cake.png"
import { NavLink } from "react-router-dom";
import { DeleteOutline, DriveFileRenameOutline, DriveFileRenameOutlineOutlined } from '@mui/icons-material';
import AddItem from './AddItem'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { firestore } from "../../firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
 
} from "firebase/storage";
import { storage } from "../../firebase.config";
const staticdata1 = [
    {
      id: 1,
      input:<input
                       name="option1"
          
                      type="checkbox"
                      class="w-4 h-4  bg-gray-100 rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />,
      size: "Small",
      prices: " $22  ",
     
    },
    {
      id: 2,
      input:<input
                       name="option2"
         
                      type="checkbox"
                      class="w-4 h-4  bg-gray-100 rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />,
      size: "Medium",
      prices: " $30  ",
     
    },
    {
      id: 3,
      input:<input
                       name="option3"
        
                      type="checkbox"
                      class="w-4 h-4  bg-gray-100 rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />,
      size: "Large",
      prices: " $40  ",
     
    },]


const Menu = () => {
  const { id } = useParams();
  const [name,setname] = useState()
  const [description,setdescription] = useState()
  const [type,settype] = useState("all")
  const [prices,setprices] = useState()
  const [sizes,sesizes] = useState()
  const [alertStatus, setAlertStatus] = useState("danger");

    const [isevent,setisevent]=useState(false);
    const [additem,setadditem]=useState(false);
    const [restaurant,setrestaurant] = useState()
    const [items,setitems] = useState()
    const [addons,setaddons] = useState()
    const [update,setupdate] = useState(false)
    const [resid,setresid] = useState(false)
    const openitemupdate = async (id)=>{
      setadditem(!additem)
      setupdate(!update)
      setresid(id)
  }


  const getAllmenu= async () => {
    const addMenu =collection(firestore,   `restaurantAdmins/${id}/items`);
    const getData = await getDocs(addMenu);
   
   
    setitems(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

 
    };

    const getAlladdons= async () => {
      const addMenu =collection(firestore,   `restaurantAdmins/${id}/Addons`);
      const getData = await getDocs(addMenu);
     
     
      setaddons(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
   
      };

    const filteredmenu = type === "all" ? items : items?.filter((product) =>
    
    
    product.type === type
  );
    const deletecategory = async (idd) => {
    await deleteDoc(
      doc(firestore,`restaurantAdmins/${id}/items`,idd)
    );
   
   
    window.location.reload(true)
    
  };
    const getAllRestaurant= async () => {
    const addUser = query(collection(firestore, "restaurantAdmins"), where("userId", "==", id));
    const getData = await getDocs(addUser);
    // console.log(TableHeader)
   
    setrestaurant(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    
    };
  useEffect(() => {
   getAllRestaurant()
    getAllmenu()
    getAlladdons()
  
  }, []);
    const openitem = async ()=>{
          setadditem(!additem)
      }
      const event = async ()=>{
          setisevent(!isevent)
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
        //  setUpdateData({ ...updateData, ["photo"]: downloadURL })
        
       });
     }
   );
 };
      const [selectedImage, setSelectedImage] = useState(null);
      const deleteImage = () => {
   
   const deleteRef = ref(storage, selectedImage);
   deleteObject(deleteRef).then(() => {
     setSelectedImage(null);
    
   });
   setUpdateData({ ...updateData, ["photo"]: ''})
        
 };

 const [msg, setMsg] = useState(null);
 const [fields, setFields] = useState(false);
 const dataToSend = {};
 const emptyArray = [];

//  const saveDetails = async () => {
//   let discount = "0%";
//   try {
//     const newData = { ...updateData }; // Create a new object to hold the updated data

//     for (const checkboxName in isChecked) {
//       if (isChecked[checkboxName]) {
//         dataToSend[checkboxName] = inputValues[checkboxName] || '';

//         size.push(checkboxName);
//         emptyArray.push(inputValues[checkboxName]);
//       }
//     }
//     newData.photo=selectedImage;
//     newData.discountedPrice = emptyArray[0];
//     newData.sizes = size;
//     newData.prices = dataToSend;
//     newData.discount = discount;
//     newData.rewards = 1;
//     newData.itemId = Date.now();

    


//     // Perform the Firestore document update
//     await setDoc(doc(firestore, `restaurantAdmins/${id}/items`, `${newData.itemId}`), newData, {
//       merge: true,
//     });

//     setFields(true);
//     setMsg("Data Uploaded successfully");
//     setAlertStatus("success");
//     setTimeout(() => {
//       setFields(false);
//     }, 4000);

//     window.location.reload(true);
//     clearData();
//   } catch (error) {
//     console.log(error);
//     setFields(true);
//     setMsg("Error while uploading: Try Again");
//     setAlertStatus("danger");
//     setTimeout(() => {
//       setFields(false);
//     }, 4000);
//   }
// };


const saveDetails = async () => {
  try {
    const newData = { ...updateData }; // Create a new object to hold the updated data

    for (const checkboxName in isChecked) {
      if (isChecked[checkboxName]) {
        dataToSend[checkboxName] = inputValues[checkboxName] || '';

        size.push(checkboxName);
        emptyArray.push(inputValues[checkboxName]);
      }
    }
    newData.addOns = selectedValues;

    newData.photo = selectedImage;
    newData.discountedPrice = emptyArray[0];
    newData.sizes = size;
    newData.prices = dataToSend;
    newData.discount = "0%";
    newData.rewards = 1;

    // Perform the Firestore document creation with auto-generated ID
    const docRef = await addDoc(collection(firestore, `restaurantAdmins/${id}/items`), newData);
    
    // Update the document with the auto-generated ID as "itemId"
    const itemId = docRef.id;
    await updateDoc(doc(firestore, `restaurantAdmins/${id}/items`, docRef.id), {
      itemId: itemId
    });

    setFields(true);
    setMsg("Data Uploaded successfully");
    setAlertStatus("success");
    setTimeout(() => {
      setFields(false);
    }, 4000);

    window.location.reload(true);
    clearData();
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



 const updateDetails = async (uid) => {
  let discount = "0%";
   const newData = { ...updateData }; // Create a new object to hold the updated data

  try {
    for (const checkboxName in isChecked) {
      if (isChecked[checkboxName]) {
        dataToSend[checkboxName] = inputValues[checkboxName] || '';
       
          size.push(checkboxName)
          emptyArray.push(inputValues[checkboxName])
        
         
       
      }
    
    }
   if(selectedValues){
    newData.addOns = selectedValues;
   }
    if(selectedImage){
    newData.photo = selectedImage;}
    if (emptyArray.length > 0) {
      newData.discountedPrice = emptyArray[0];
    }

    if (size.length > 0) {
      newData.sizes = size;
    }

    if (Object.keys(dataToSend).length > 0) {
      newData.prices = dataToSend;
    }
 
   
    
      const updatedocument = doc(firestore, `restaurantAdmins/${id}/items`, resid);
      await updateDoc(updatedocument, newData);
      
      setFields(true);
      setMsg("Data Uploaded successfully ");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
      clearData();
      window.location.reload(true);
    
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
  setUpdateData({});
   setSelectedImage(null);
   setname("");
   setdescription("");
   settype("");
   setprices("");
  
 };


 const [checkboxValues, setCheckboxValues] = useState({
    small: false,
    medium: false,
    large: false,
    // Add more checkboxes as needed
  });

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setCheckboxValues({
  //     ...checkboxValues,
  //     [name]: checked,
  //   });
  // };
  const {value, setvalue}=useState([])
  const updatedValues = [];
  const displayCheckedValues = () => {
  const checkedOptions = Object.keys(checkboxValues).filter(
    (key) => checkboxValues[key]
  );
  
 
  {checkedOptions.map((option) => (
    updatedValues.push(option)
         
          ))}
          
     

};
const [isChecked, setIsChecked] = useState(false);
const [inputValues, setInputValues] = useState({});
const size = [];


const handleCheckboxChange = (checkboxName) => {
    setIsChecked({
      ...isChecked,
      [checkboxName]: !isChecked[checkboxName],
    });
  };
 
  const handleInputChange =async (inputName, e) => {
    
    const updatedSize = [...size, inputName];
    setInputValues({
      ...inputValues,
      [inputName]: parseFloat(e.target.value),
      
    });
   
   
  };


  const [inputFields, setInputFields] = useState([{ name: '', price: '', description: '', required: false }]);
 const [inputField, setInputField] = useState(false);
 const [showAddButtons, setShowAddButtons] = useState(true); // Track visibility of "Add" buttons for each addon

 const [plus, setplus] = useState([true]);
  const handleInputChanges = (index, fieldName, value) => {
  const updatedFields = [...inputFields];
  updatedFields[index][fieldName] = value;
  setInputFields(updatedFields);
  setUpdateData({ ...updateData, ["addOns"]: updatedFields })
       
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

 
  setInputFields([...inputFields, { name: '', price: '', description: '', required: false }]);

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





const [updateData, setUpdateData] = useState({
  // ... other initial state properties
  availability: true, // Set "availability" to "true" by default
});



  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredmenus = filteredmenu?.filter((product) =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase())
);


const [selectedValues, setSelectedValues] = useState([]);
  const handleCheckboxChangess = (event) => {
    const { value, checked } = event.target;

    // If the checkbox is checked, add its value to the selectedValues array
    // If it's unchecked, remove its value from the selectedValues array
    setSelectedValues((prevSelectedValues) => {
      if (checked) {
        
       
        return [...prevSelectedValues, value];

      } else {
        return prevSelectedValues.filter((val) => val !== value);
      }
    });
  
    
  };

  useEffect(() => {
    setUpdateData((prevUpdateData) => ({
      ...prevUpdateData,
      friends: selectedValues, // Merge selectedValues into friends
    }));
  }, [selectedValues]);
  return (
    <div className='mx-[56px] md:mx-6 sm:mx-4 sm:px-3 mt-[25px]'>
       <div className="justify-end items-end w-full flex">
       <div className='flex gap-4  sm:hidden items-center px-3  my-7 rounded-lg bg-brandDark w-[406px] h-12 shadow-[#0000001a]'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" >
  <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 22L20 20" stroke="#BDBDBD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        <input type="text" value={searchQuery}
        onChange={handleSearchInputChange} className='text-base w-[300px]  focus:outline-none focus:ring-0 font-normal selector text-[#E5E5E5] my-2  bg-brandDark' placeholder='Search item'/>
   
    </div>
    </div>
    <div className='flex flex-row justify-between mb-[13px]'>
    <div className='flex justify-center items-center gap-4'>
    <NavLink  to="/restaurants">
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 13 20" fill="none">
  <path d="M11 2L2 10L11 18" stroke="#BDBDBD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</NavLink>
 {restaurant?.map((val, ind) => (
    <h1 className='selector text-[#E5E5E5] text-xl  font-bold'>{val.username}</h1>
 ))}
    </div>
    <div className='flex gap-[27px] items-center justify-center'>
<div className='flex sm:hidden md:hidden cursor-pointer gap-2 mr-[30px] justify-center items-center' onClick={()=>event()}>
<h1 className='selector text-[#E5E5E5] text-xl font-bold'>Select Category</h1>
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
  <path d="M1 1L7 8L13 1" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
{isevent && (
      <div class={`absolute z-50 mt-[220px] h-[180px] overflow-y-scroll right-80  sm:mr-9  mr-10 my-4 text-base list-none bg-brandDark shadow-[#0000004d] divide-y-0 sm:divide-y rounded-lg shadow  divide-gray-600" `}>
       
        <ul  class="py-2 px-2 border-b" aria-labelledby="user-menu-button">
        
         
          {["all","Formule", "Salade", "Boisson froide", "Boisson chaude", "Accompagnement",
  "Entrée", "Plat", "Dessert", "Populaire", "Patisserie", "Snack", "Pain",
  "Confiserie", "Sandwich", "Pizza", "Burger", "Tacos", "Spécial", "Autres","Assiettes", "Boxes", "Menu enfant", "Thé frais", "Thé au fruit", "Thé au lait", "Fruit frais", "Bubble tea", "Cookies", "Cup cakes", "Donuts", "Smoothies", "Glaces", "Jus", "Burrito", "Sucre brun", "Frappé", "Thé", "Café", "Viennoiseries", "À partager", "Plaisirs salés", "Pâtes", "Poké", "Classic rolls", "Sushi", "Chirashi", "Crispy", "Yakitori", "Baguettes", "Sauces", "Pad thai", "Mix xao", "Brochettes", "Wok", "Kebab", "Menu"].map((option, index) => (
  <li key={index} value={option} onClick={e => { settype(option); setisevent(false) }}>
    <p className="block pr-6 pl-3 py-2 text-sm text-gray-400 hover:text-[#FF6154] hover:bg-[#FF6154] hover:bg-opacity-10 hover:rounded-full focus:bg-[#FF6154] focus:text-[#FF6154] focus:bg-opacity-10 focus:rounded-full">
      {option}
    </p>
  </li>
))}
        
        </ul>
      </div>
      )}
</div>
<div className='flex gap-2 sm:hidden md:hidden justify-center items-center'>
<h1 className='selector text-[#E5E5E5] text-xl  font-bold'>Sort by</h1>
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
  <path d="M1 1L7 8L13 1" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
<button onClick={()=>openitem()}  className='selector text-lg font-normal  py-2 text-[#E5E5E5] bg-[#FF6154] flex gap-1 px-[16px] rounded-full justify-center items-center'><p>Add New</p><svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12.3158H13.5V18H11.5V12.3158H5.5V10.4211H11.5V4.73685H13.5V10.4211H19.5V12.3158Z" fill="#E5E5E5"/>
</svg></button>
    </div>
    </div>
      <div>
      <div class=" bg-bg-brandDark overflow-x-auto relative  ">
              <table class="w-full  md:overflow-x-scroll sm:overflow-x-scroll text-left  text-gray-400 ">
                <thead class="text-sm font-bold 2xl:text-lg selector  text-[#E5E5E5]   border-b border-grey-400">
                  <tr className="">
                    <th scope="col" class="  pl-6 py-3 ">
                    <input
                      type="checkbox"
                      class="w-6 h-6 
                       bg-[#dad3ff] rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />
                    </th>
                    <th scope="col" >
                      Image
                    </th>
                    <th scope="col" className="pl-[33px]">
                      Name
                    </th>
                    <th scope="col" className="pl-[33px]">
                      About Item
                    </th>
                   
                    <th scope="col" className="pl-[33px]" >
                      Sizes
                    </th>
                    <th scope="col" className="pl-[33px]">
                      Prices
                    </th>
                    <th scope="col" className="pl-[33px]" >
                      Category
                    </th>
                    <th scope="col" className="pl-[33px]" >
                      Actions
                    </th>
                    
                     </tr>
                </thead>
                <tbody className='text-white'>
                  {filteredmenus?.map((val, ind) => (
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
                        
                       
                        <img
                          class="w-10 h-10   rounded-full"
                          src={val.photo}
                          alt="Bonnie image"
                        />
 
                        </td>
                      <td className="pl-[33px]"> 
                     {val.name} 
                      </td>
                      <td className="pl-[33px]" >{val.description}</td>
                      <td className="pl-[33px]" >{val.sizes?.map((item,index)=>(<span>{item} , </span>))} 
                      
                      </td>
                      <td className="pl-[33px]" ><span>S: ${val.prices.Small} </span>,  <span>M: ${val.prices.Medium}</span>,  <span>L: ${val.prices.Large}</span></td>
                      <td className="pl-[33px]" >{val.type}</td>
                      <td >
                      <div className='flex flex-row gap-3 className="pl-[33px]"'>
                      <div className="cursor-pointer"  onClick={()=> deletecategory(val.id)}> <DeleteOutline/></div>
                  
                      <div className="cursor-pointer"  onClick={()=>openitemupdate(val.id)} ><DriveFileRenameOutlineOutlined/></div>
                   
                      </div>
                      </td>
                     
                     
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      </div>
      

      {additem && (
        <div
        id="defaultModal"
        class={
          " flex absolute top-0 right-0 sm:right-0 md:right-0 left-0 z-50   w-full sm:w-full md:w-full h-[100%]  bg-[#000000b3] bg-opacity-5 justify-center items-center"
        }
      >
         <div class={`absolute top-0 right-0 sm:w-full h-screen overflow-y-scroll px-5 py-6 md:mr-0 sm:mr-0   text-base list-none bg-[#2A2A2A] shadow-[#0000004d] divide-y-0 sm:divide-y rounded-l-lg shadow  divide-gray-600" id="user-dropdown`}>
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
            {update ?  <h1 className='selector text-[#E5E5E5] text-[25px] pr-[175px] pt-2 pl-[116px]  font-bold'>Edit Item</h1>
  :
            <h1 className='selector text-[#E5E5E5] text-[25px] pr-[175px] pt-2 pl-[116px]  font-bold'>New Item</h1>
      }
            </div>
            {fields && (
          <p
            
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </p>
        )}
            <div className=' justify-center items-center'>
          {selectedImage ? <div className='mt-7 xl:mt-4 w-[170px] ml-28 sm:ml-10 xl:ml-32 h-[170px] lg:w-[130px] lg:h-[130px] xl:w-[150px] xl:h-[150px] flex flex-col gap-1 rounded-full bg-[#353535] justify-center items-center shadow-[#0000001a]'>
          <img className='rounded-full w-[160px] h-[160px] lg:w-[140px] lg:h-[140px] xl:w-[140px] xl:h-[150px]'
            alt="not found"
            src={selectedImage}
          />
           <DeleteOutline className='absolute text-white cursor-pointer' onClick={deleteImage}/> </div>  
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
            <div className='mt-[24px] xl:mt-[20px] ml-[29px] sm:ml-3'>
           {update ? <h1 className='selector text-[#E5E5E5] font-normal xl:text-[20px] text-[25px]'>Edit Items Details</h1> :
                <h1 className='selector text-[#E5E5E5] font-normal xl:text-[20px] text-[25px]'>Item Details</h1>
          }
                <div className=' mt-[13px] rounded-full justify-between sm:w-full w-[377px] h-12 xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-brandDark'>
            <input type="text"  value={updateData["name"]} name="name"
             onChange={(e) =>  setUpdateData({ ...updateData, ["name"]: e.target.value })}  className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='Item Name'/>
            </div>
            <div className=' mt-[8px] rounded-full justify-between sm:w-full w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
            <input type="text"   value={updateData["description"]} name="description"
             onChange={(e) =>  setUpdateData({ ...updateData, ["description"]: e.target.value })}  className='text-base   focus:outline-none focus:ring-0 font-normal seletor text-[#E5E5E5] my-5  bg-[#353535]' placeholder='About Item'/>
            </div>
            <div className=' mt-[8px] rounded-full justify-between sm:w-full w-[377px] h-12  xl:h-10 items-center px-4 flex flex-row gap-3 border-[#bdbdbd0d] border-solid bg-[#353535]'>
           
            <select   value={updateData["type"]} name="type"
             onChange={(e) =>  setUpdateData({ ...updateData, ["type"]: e.target.value })}  className='  rounded-full focus:ring-0 focus:border-0 justify-between w-[377px]  items-center  flex flex-row text-[#E5E5E5]  border-[#bdbdbd0d] border-solid bg-[#353535]'>
           <option >Select Category</option>
           <option value="Formule">Formule</option>
<option value="Salade">Salade</option>
<option value="Boisson froide">Boisson froide</option>
<option value="Boisson chaude">Boisson chaude</option>
<option value="Accompagnement">Accompagnement</option>
<option value="Entrée">Entrée</option>
<option value="Plat">Plat</option>
<option value="Dessert">Dessert</option>
<option value="Populaire">Populaire</option>
<option value="Patisserie">Patisserie</option>
<option value="Snack">Snack</option>
<option value="Pain">Pain</option>
<option value="Confiserie">Confiserie</option>
<option value="Sandwich">Sandwich</option>
<option value="Pizza">Pizza</option>
<option value="Burger">Burger</option>
<option value="Tacos">Tacos</option>
<option value="Spécial">Spécial</option>
<option value="Autres">Autres</option>
<option value="Assiettes">Assiettes</option>
<option value="Boxes">Boxes</option>
<option value="Menu enfant">Menu enfant</option>
<option value="Thé frais">Thé frais</option>
<option value="Thé au fruit">Thé au fruit</option>
<option value="Thé au lait">Thé au lait</option>
<option value="Fruit frais">Fruit frais</option>
<option value="Bubble tea">Bubble tea</option>
<option value="Cookies">Cookies</option>
<option value="Cup cakes">Cup cakes</option>
<option value="Donuts">Donuts</option>
<option value="Smoothies">Smoothies</option>
<option value="Glaces">Glaces</option>
<option value="Jus">Jus</option>
<option value="Burrito">Burrito</option>
<option value="Sucre brun">Sucre brun</option>
<option value="Frappé">Frappé</option>
<option value="Thé">Thé</option>
<option value="Café">Café</option>
<option value="Viennoiseries">Viennoiseries</option>
<option value="À partager">À partager</option>
<option value="Plaisirs salés">Plaisirs salés</option>
<option value="Pâtes">Pâtes</option>
<option value="Poké">Poké</option>
<option value="Classic rolls">Classic rolls</option>
<option value="Sushi">Sushi</option>
<option value="Chirashi">Chirashi</option>
<option value="Crispy">Crispy</option>
<option value="Yakitori">Yakitori</option>
<option value="Baguettes">Baguettes</option>
<option value="Sauces">Sauces</option>
<option value="Pad thai">Pad thai</option>
<option value="Mix xao">Mix xao</option>
<option value="Brochettes">Brochettes</option>
<option value="Wok">Wok</option>
<option value="Kebab">Kebab</option>
<option value="Menu">Menu</option>
<option value="Best sellers">Best sellers</option>

             </select>
             </div>

             <div className='flex flex-col gap-2 justify-start items-start text-start'>
    <h1 className='text-white font-["Nunito Sans] text-lg font-semibold'>Available</h1>
    <div className='flex w-[60%] justify-between'>
  <div className='flex items-center gap-1'>
    <input
      type="radio"
      value={updateData["availability"] === true}
      name='availability'
      id='availability'
      checked={updateData["availability"] === true}
      onChange={(e) => setUpdateData({ ...updateData, ["availability"]: true })}
      className='w-[14px] h-[14px]'
    />
    <h1 className='text-[#6e6b7b] font-["Nunito Sans] text-lg font-semibold'>Yes</h1>
  </div>
  <div className='flex items-center gap-1'>
    <input
      type="radio"
      value={updateData["availability"] === false}
      name='availability'
      id='availability'
      checked={updateData["availability"] === false}
      onChange={(e) => setUpdateData({ ...updateData, ["availability"]: false })}
      className='w-[14px] h-[14px]'
    />
    <h1 className='text-[#6e6b7b] font-["Nunito Sans] text-lg font-semibold'>No</h1>
  </div>
</div>

</div>

             

                    
       <div>
       <h1 className='font-["Inter"] text-lg font-semibold selector text-[#E5E5E5]'>Select Addons</h1>
          
            <div   className=' mt-[8px] rounded-lg justify-between sm:w-full w-[377px]   px-4 flex flex-col gap-3 py-3 border-[#353535] border-solid border'>
            {addons.length > 0 ? addons?.map((val,ind)=>
                    <tr class="  text-sm   selector font-normal items-center border-gray-400 ">
                      <th
                        scope="row"
                        class="py-2 pl-6 pr-2 font-light text-sm   2xl:text-lg text-white whitespace-nowrap "
                      >
                   <input
                      
                       value={val.id}
                       checked={selectedValues.includes(val.id)}
                       onChange={handleCheckboxChangess}
                      type="checkbox"
                      class="w-4 h-4  bg-gray-100 rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />
                      </th>
                     
                      <td className="text-white selector"> 
                   {val.addonName}
                      </td>
                    
                    </tr>
                ) : <p className="text-white selector">No Addon is added</p>}
          
           
         
          
            </div>
           
            </div>
     
            
             <div className='mt-[16px] xl:mt-[16px]'>
             <h1 className='text-[#E5E5E5] selector text-lg font-normal'>Select Price</h1>
             <div class=" mt-4 xl:mt-3 relative ml-20 sm:ml-10">
              <table class="w-[266px] h-[170px] xl:h-[100px]  bg-[#353535] rounded-lg  text-left  text-gray-400 ">
                <thead class="text-sm font-bold 2xl:text-lg selector  text-[#E5E5E5]   border-b border-grey-400">
                  <tr className="">
                    <th scope="col" class="  pl-6 py-2 ">
                    <input
                      type="checkbox"
                      class="w-4 h-4 
                       bg-[#dad3ff] rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />
                    </th>
                    <th scope="col" >
                      size
                    </th>
                    <th scope="col" >
                      price
                    </th>
                   
                    
                     </tr>
                </thead>
                <tbody className='text-white'>
                 
                    <tr class="   text-[#E5E5E5] text-sm   selector font-normal border-gray-400 ">
                      <th
                        scope="row"
                        class="py-2 pl-6 font-light text-sm   2xl:text-lg text-white whitespace-nowrap "
                      >
                   <input
                       name="22"
                       checked={isChecked['Small']}
          onChange={() => handleCheckboxChange('Small')}
                      type="checkbox"
                      class="w-4 h-4  bg-gray-100 rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />
                      </th>
                     
                      <td > 
                    Small
                      </td>
                      <td ><input  type="number"
    step="any"   value={inputValues['Small'] || ''}
          onChange={(e) => handleInputChange('Small', e)}   className='text-base   focus:outline-none focus:ring-0 font-normal w-[60px] rounded-lg border seletor text-[#E5E5E5]  px-1 justify-center h-8 bg-[#353535]' placeholder='22'/>
           </td>
                     
                     
                     
                    </tr>
                    <tr class="   text-[#E5E5E5] text-sm   selector font-normal border-gray-400 ">
                      <th
                        scope="row"
                        class="py-2 pl-6 font-light text-sm   2xl:text-lg text-white whitespace-nowrap "
                      >
                    <input
                       name="30"
                       checked={isChecked['Medium']}
          onChange={() => handleCheckboxChange('Medium')}
                      type="checkbox"
                      class="w-4 h-4  bg-gray-100 rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />
                      </th>
                     
                      <td >
                      <div name="Medium">
                     Medium</div> 
                      </td>
                      <td ><input  type="number"
    step="any"  value={inputValues['Medium'] || ''}
          onChange={(e) => handleInputChange('Medium', e)}   className='text-base   focus:outline-none focus:ring-0 font-normal w-[60px] rounded-lg border seletor text-[#E5E5E5]  px-1 justify-center h-8 bg-[#353535]' placeholder='32'/>
           </td>
                     
                     
                     
                    </tr>
                    <tr class="   text-[#E5E5E5] text-sm   selector font-normal border-gray-400 ">
                      <th
                        scope="row"
                        class="py-2 pl-6 font-light text-sm   2xl:text-lg text-white whitespace-nowrap "
                      >
                   <input
                   
                       name="40"
                       checked={isChecked['Large']}
          onChange={() => handleCheckboxChange('Large')}
                      type="checkbox"
                      class="w-4 h-4  bg-gray-100 rounded-lg border-gray-300 focus:ring-[#FF6154]  focus:ring-2"
                    />
                      </th>
                     
                      <td > 
                     Large
                      </td>
                      <td ><input  type="number"
    step="any"  value={inputValues['Large'] || ''}
          onChange={(e) => handleInputChange('Large', e)}    className='text-base   focus:outline-none focus:ring-0 font-normal w-[60px] rounded-lg border seletor text-[#E5E5E5]  px-1 justify-center h-8 bg-[#353535]' placeholder='42'/>
           </td>
                     
                     
                     
                    </tr>
                 
                </tbody>
              </table>
            </div>
             </div>
           
             <div className='mt-8 ml-20 xl:mt-7  sm:ml-10'>
             {update ?  <button  onClick={updateDetails}  className='selector text-lg font-bold xl:py-2  py-4 px-20 text-[#E5E5E5] bg-[#FF6154] flex gap-1  rounded-full justify-center items-center'>Update
            </button>:
             <button  onClick={saveDetails}  className='selector text-lg font-bold xl:py-2  py-4 px-20 text-[#E5E5E5] bg-[#FF6154] flex gap-1  rounded-full justify-center items-center'>Confirm
            </button>}
            </div>
            </div>
            </div>
     </div>
    </div>
       
      )}
        </div>
  )
}

export default Menu