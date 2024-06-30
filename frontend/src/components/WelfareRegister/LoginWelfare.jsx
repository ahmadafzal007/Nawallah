import React, { useState , useEffect } from "react";
import { motion } from "framer-motion";
import AuthApi from "../../API/AuthApi";
import { Navigate, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon from Material-UI
import bgNawalah from "../../assets/bgNawalah.png"
const LoginWelfare = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    let errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors found
  };

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();

    if (!validateForm()) {
      return; // Exit early if form validation fails
    }

    setLoggingIn(true);
    let serverResponse;
    try {
      serverResponse = await AuthApi.loginNgo(email,password);

       setLoading(false);

      if (serverResponse.response.success){
        localStorage.setItem("ngo",JSON.stringify(serverResponse.response.ngo))
            navigate("../WelfareDashBoard")
      }else{
        // alert(serverResponse.response.message)
        setFormErrors({...formErrors, email: "Email or Password Incorrect", password: "Email or Password Incorrect"});
        setFormErrors({...formErrors, password: "Email or Password Incorrect", email: "Email or Password Incorrect"});

      }

    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    } finally {
      setLoggingIn(false);
      setUploading(false);

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
      className="flex justify-center font-serif items-center min-h-screen bg-brandDark p-4"
    >{loading ? 
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    :
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 max-w-2xl w-full"
      >
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-5 rounded-lg shadow-lg relative">
          <CloseIcon
            className="absolute top-2 right-2 cursor-pointer text-black"
            onClick={() => navigate("/")}
          />
          <div className="text-2xl font-medium mb-4">Welfare Login</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
                className={`w-full p-2 border rounded-md focus:outline-none focus:border-purple-600 ${
                  formErrors.email ? "border-red-500" : ""
                }`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className={`w-full p-2 border rounded-md focus:outline-none focus:border-purple-600 ${
                  formErrors.password ? "border-red-500" : ""
                }`}
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md font-medium cursor-pointer transition-transform transform hover:scale-95"
              disabled={loggingIn}
            >
              {loggingIn ? "Logging in..." : "Login"}
            </button>
            <div className="text-center pt-2">
              <p>Don't have an account? <span 
              onClick={()=>{
                navigate("../WelfareRegister")
              }}
              className="font-bold text-darkBlue">Register</span></p>
            </div>
          </form>
        </div>
      </motion.div>
}
    </div>
  );
};

export default LoginWelfare;