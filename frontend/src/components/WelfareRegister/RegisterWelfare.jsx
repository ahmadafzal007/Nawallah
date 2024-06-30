import React, { useEffect, useState } from "react";
import axios from "axios";
import bgNawalah from "../../assets/bgNawalah.png";
import { motion } from "framer-motion";
import AuthApi from "../../API/AuthApi/index";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const WelfareRegistration = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [logoImage, setLogoImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false)

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
            setLocation(`Lat: ${latitude}, Long: ${longitude}`);
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
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setLogoImage(file);
      setFormErrors({ ...formErrors, logoImage: "" });
    } else {
      setLogoImage(null);
      setFormErrors({ ...formErrors, logoImage: "Only JPG, JPEG, and PNG files are allowed" });
    }
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
    if (!formValues.description) errors.description = "Description is required";
    if (!formValues.address) errors.address = "Address is required";
    if (!formValues.password) errors.password = "Password is required";
    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!logoImage) errors.logoImage = "Logo image is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", logoImage);
      formData.append("upload_preset", "kmzzjyam"); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dj3p3xvrj/image/upload`, // Replace with your Cloudinary cloud name
          formData
        );
        const imageUrl = response.data.secure_url;
        console.log("Image uploaded to:", imageUrl);


        const jsonData = {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phoneNumber,
          description: formValues.description,
          address: formValues.address,
          password: formValues.password,
          logoImage: imageUrl,
          location: location,
        };

        // Call your NGO registration API endpoint
        const serverResponse = await AuthApi.registerNgo(jsonData);
        console.log('server response',serverResponse)

        if (serverResponse.message) {
          setFormErrors({...formErrors, email:serverResponse.message});
        } else {
          setShowAlert(true);
          
                }
      } catch (error) {
        console.error("Error uploading image:", error);
        setFormErrors({ ...formErrors, logoImage: "error uploading image" });
      } finally {
        setUploading(false);
        setLoading(false);
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
      }}
      className="flex justify-center items-center min-h-screen bg-brandDark p-4"
    >
      {loading ? 
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    :
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        className="group relative cursor-pointer items-center  font-serif  justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 mt-60 md:mt-0 md:mr-20 max-w-5xl w-full"
      >
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg max-w-5xl w-full p-5 rounded-lg shadow-lg relative">
          <CloseIcon 
            className="absolute top-2 right-2 cursor-pointer text-black"
            onClick={() => navigate("/")}
          />
          <div className="text-2xl font-medium mb-2 relative">
            Welfare Registration
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
                <label className="block font-medium mb-1">Description</label>
                <input
                  type="text"
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
                <label className="block font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
                {formErrors.password && <p className="text-red-500 text-xs">{formErrors.password}</p>}
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
                {formErrors.confirmPassword && <p className="text-red-500 text-xs">{formErrors.confirmPassword}</p>}
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Welfare Logo</label>
                <input
                  type="file"
                  onChange={handleLogoImageChange}
                  required
                  accept=".jpg,.jpeg,.png"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
                {formErrors.logoImage && <p className="text-red-500 text-xs">{formErrors.logoImage}</p>}
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
            <div className="text-center pt-2">
              <p>Already have an account? <span 
              onClick={()=>{
                navigate("../WelfareLogin")
              }}
              className="font-bold text-darkBlue">Login</span></p>
            </div>
          </form>
        </div>
      </motion.div>
}
    
      {showAlert && (
        <div   style={{
          backgroundImage: `url(${bgNawalah})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }} className="fixed font-serif   top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 border-2 border-costomFont rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="flex items-center justify-center text-2xl font-bold mb-4">Request Submitted</h2>
            <p>Your request has proceeded. The system admin will verify it and inform you within the next 24 hours. Keep checking your email.</p>
            <button
              className="flex justify-center items-center mt-4 py-2 px-4 bg-costomFont text-white rounded-md"
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

export default WelfareRegistration;
