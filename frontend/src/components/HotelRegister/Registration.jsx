import React, { useEffect, useState } from "react";
import axios from "axios";
import bgNawalah from "../../assets/bgNawalah.png";
import { motion } from "framer-motion";

const Registration = () => {
  const [location, setLocation] = useState("");
  const [logoImage, setLogoImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState("");
  const [openingHours, setOpeningHours] = useState("");

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
    setLogoImage(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logoImage) {
      alert("Please select a logo image");
      return;
    }

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
      alert("Image uploaded successfully!");
      // Handle the rest of your form submission logic here
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgNawalah})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Alternatively, use Tailwind's h-screen class
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
                  placeholder="Enter your name"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
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
                  placeholder="Enter your email"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Category</label>
                <select
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                >
                  <option value="">Select a category</option>
                  <option value="western cuisine">Western Cuisine</option>
                  <option value="chinese">Chinese</option>
                  <option value="fast food">Fast Food</option>
                  <option value="desi restaurant">Desi Restaurant</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Opening Hours</label>
                <input
                  type="text"
                  placeholder="10:00 - 22:00"  
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Description</label>
                <input
                  placeholder="Enter a description"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Logo Image</label>
                <input
                  type="file"
                  onChange={handleLogoImageChange}
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>
            <div className="mt-3">
              <input
                type="submit"
                value={uploading ? "Uploading..." : "Register"}
                className="w-full py-2 bg-black text-white rounded-md font-medium cursor-pointer transition-transform transform hover:scale-95"
                disabled={uploading}
              />
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;
