import React, { useState } from "react";
import bgNawalah from "../../assets/bgNawalah.png";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
const LoginWelfare = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    try {
      // Simulate login with axios post request
      const response = await axios.post("https://example.com/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);
      alert("Logged in successfully!");
      // Handle successful login logic here
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
        className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 mr-20 max-w-2xl w-full"
      >
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg  p-5 rounded-lg shadow-lg">
          <div className="text-2xl font-medium mb-2 relative">
            Welfare Login
            <div className="absolute left-0 bottom-0 h-1 w-8 bg-brandDark rounded-full"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3 mb-2">
              <div className="mb-2">
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
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
              <Link to={"/WelfareDashBoard"}>
              <input
                type="submit"
                value={loggingIn ? "Logging in..." : "Login"}
                className="w-full py-2 bg-black text-white rounded-md font-medium cursor-pointer transition-transform transform hover:scale-95"
                disabled={loggingIn}
              />
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginWelfare;
