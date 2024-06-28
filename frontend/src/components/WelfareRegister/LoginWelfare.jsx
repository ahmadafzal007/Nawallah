import React, { useState , useEffect } from "react";
import { motion } from "framer-motion";
import AuthApi from "../../API/AuthApi";
import { Navigate, useNavigate } from "react-router-dom";
const LoginWelfare = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

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
    e.preventDefault();

    if (!validateForm()) {
      return; // Exit early if form validation fails
    }

    setLoggingIn(true);
    let serverResponse;
    try {
      serverResponse = await AuthApi.loginNgo(email,password);
      if (serverResponse.response.success){
        localStorage.setItem("ngo",JSON.stringify(serverResponse.response.ngo))
            navigate("../WelfareDashBoard")
      }else{
        alert(serverResponse.response.message)
      }

    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
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
        className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 max-w-2xl w-full"
      >
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-5 rounded-lg shadow-lg">
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
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginWelfare;
