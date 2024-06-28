import React, { useEffect, useState } from "react";
import axios from "axios";
import bgNawalah from "../../assets/bgNawalah.png";
import { motion } from "framer-motion";
import { BrandingWatermarkOutlined } from "@mui/icons-material";
import AuthApi from "../../API/AuthApi/index"

const Registration = () => {
  const [location, setLocation] = useState("");
  const [logoImage, setLogoImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    category: "",
    description: "",
    address: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(` ${latitude}, ${longitude}`);
          },
          (error) => {
            console.error("Error fetching location: ", error);
            setLocation("Unable to fetch location");
          }
        );
      } else {
        setLocation("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, []);

  const handleLogoImageChange = (e) => {
    setLogoImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.name) errors.name = "Name is required";
    if (!formValues.email) errors.email = "Email is required";
    if (!formValues.phoneNumber) errors.phoneNumber = "Phone Number is required";
    if (!formValues.category) errors.category = "Category is required";
    if (!formValues.description) errors.description = "Description is required";
    if (!formValues.address) errors.address = "Address is required";
    if (!password) errors.password = "Password is required";
    if (!logoImage) errors.logoImage = "Logo image is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", logoImage);
      formData.append("upload_preset", "kmzzjyam");
      let serverResponse;
  
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dj3p3xvrj/image/upload`,
          formData
        );
        const imageUrl = response.data.secure_url;
        console.log("Image uploaded to:", imageUrl);
  
        const jsonData = {
          username: formValues.name,
          email: formValues.email,
          phone: formValues.phoneNumber,
          category: formValues.category,
          description: formValues.description,
          address: formValues.address,
          password: password,
          logo: imageUrl,
          location: location,
          openingHours: openingHours
        };
  
        console.log("Data to be sent to backend:", jsonData);
  
        // Send jsonData to the backend
        serverResponse = await AuthApi.registerRestaurant(jsonData);
        console.log("response received" , serverResponse)
        if (serverResponse.message){
          alert(serverResponse.message)
        }else
        setShowAlert(true);
  
      } catch (error) {
        console.error("Error uploading image:", error);
        alert(serverResponse.message)
      } finally {
        setUploading(false);
      }
    }
  };
  

  return (
    <div
      style={{
        backgroundImage: `url(${bgNawalah})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // filter: showAlert ? "blur(5px)" : "none",
      }}
      className="flex justify-center items-center min-h-screen bg-brandDark p-4"
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 mr-20 max-w-5xl w-full"
      >
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg max-w-5xl w-full p-5 rounded-lg shadow-lg">
          <div className="text-2xl font-medium mb-2 relative">
            Restaurant Registration
            <div className="absolute left-0 bottom-0 h-1 w-8 bg-brandDark rounded-full"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
              <div className="mb-2">
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
                {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  readOnly
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600 bg-gray-100"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
                {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
                {formErrors.phoneNumber && <p className="text-red-500 text-xs">{formErrors.phoneNumber}</p>}
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={formValues.category}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                >
                  <option value="">Select a category</option>
                  <option value="western cuisine">Western Cuisine</option>
                  <option value="chinese">Chinese</option>
                  <option value="fast food">Fast Food</option>
                  <option value="desi restaurant">Desi Restaurant</option>
                </select>
                {formErrors.category && <p className="text-red-500 text-xs">{formErrors.category}</p>}
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Opening Hours</label>
                <input
                  type="text"
                  name="openingHours"
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                  placeholder="10:00 - 22:00"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Description</label>
                <input
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  placeholder="Enter a description"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
                {formErrors.description && <p className="text-red-500 text-xs">{formErrors.description}</p>}
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
                {formErrors.address && <p className="text-red-500 text-xs">{formErrors.address}</p>}
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Logo Image</label>
                <input
                  type="file"
                  onChange={handleLogoImageChange}
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
                {formErrors.logoImage && <p className="text-red-500 text-xs">{formErrors.logoImage}</p>}
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
                {formErrors.password && <p className="text-red-500 text-xs">{formErrors.password}</p>}
              </div>
            </div>
            <div className="mt-3">
              <input
                type="submit"
                value={uploading ? "Registering..." : "Register"}
                className="w-full py-2 bg-black text-white rounded-md font-medium cursor-pointer transition-transform transform hover:scale-95"
                disabled={uploading}
              />
            </div>
          </form>
        </div>
      </motion.div>
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Request Submitted</h2>
            <p>Your request has proceeded<br/>The system admin will verify it and inform you within the next 24 hours.<br/>Keep checking your email.</p>
            <button
              className="mt-4 py-2 px-4 bg-brandDark text-white rounded-md"
              onClick={() => setShowAlert(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
