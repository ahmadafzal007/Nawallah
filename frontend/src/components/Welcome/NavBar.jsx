import React, { useEffect, useState } from "react";
import Logo from "../../assets/nawalah.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoRestaurant } from "react-icons/io5";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaBuildingNgo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const MenuItems = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Services",
    link: "/#services",
  },
  {
    id: 3,
    name: "About",
    link: "/#about",
  },
];

const NavBar = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); // Close menu when resizing to desktop view
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gradient-to-r h-[120px] z-50 from-secondary to-secondary/90 shadow-md border-b-2 border-b-[#d11559] text-white relative">
      <div className="container py-8 px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo section */}
          <div data-aos="fade-down" data-aos-once="true">
            <a
              href="#"
              className="font-bold text-2xl sm:text-3xl flex items-center gap-2 tracking-wider font-cursive"
            >
              <img src={Logo} alt="Logo" className="w-14" />
              Nawalah
            </a>
          </div>

          {/* Link section */}
          <div
            data-aos="fade-down"
            data-aos-once="true"
            data-aos-delay="300"
            className="hidden md:flex items-center gap-6"
          >
            <ul className="flex font-semibold text-white items-center gap-4">
              {MenuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  <a
                    href={menuItem.link}
                    className="text-lg py-2 px-4 text-white/70 hover:text-white duration-200"
                  >
                    {menuItem.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Material-UI Dropdown */}
            <div className="relative">
              <Button
                onClick={handleMenuOpen}
                variant="contained"
                sx={{
                  backgroundColor: "#f10057",
                  "&:hover": {
                    backgroundColor: "#f10057",
                    opacity: 0.7,
                  },
                }}
                className="text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer"
                endIcon={<ExpandMoreIcon />}
              >
                For Business
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className="mt-2 z-50"
              >
                <MenuItem  onClick={()=>{
                  handleMenuClose()
                  navigate("/HotelRegister")
                }}>
                  <IoRestaurant /> <p className="pl-2">Restaurants</p>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <MdLocalGroceryStore /> <p className="pl-2">Grocery Stores</p>{" "}
                </MenuItem>
                <MenuItem  onClick={()=>{
                  handleMenuClose()
                  navigate("/WelfareRegister")
                }}>
                  <FaBuildingNgo /> <p className="pl-2">Welfares</p>
                </MenuItem>
              </Menu>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white bg-brandDark"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 p-10 rounded-b-lg bg-darkBlue">
            <ul className="flex flex-col font-semibold items-start gap-4">
              {MenuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  <a
                    href={menuItem.link}
                    className="text-lg py-2 px-4 text-white/70 hover:text-white duration-200 block"
                  >
                    {menuItem.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Material-UI Dropdown */}
            <div className="mt-4 ">
              <Button
                onClick={handleMenuOpen}
                variant="contained"
                sx={{
                  backgroundColor: "#f10057",
                  "&:hover": {
                    backgroundColor: "#f10057",
                    opacity: 0.7,
                  },
                }}
                className="text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer"
                endIcon={<ExpandMoreIcon />}
              >
                For Business
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    width: "250px", // Increase menu width here
                  },
                }}
                className="mt-2"
              >
                <MenuItem  onClick={()=>{
                  handleMenuClose()
                  navigate("/HotelRegister")
                }}> Restaurants</MenuItem>
                <MenuItem onClick={()=>{
                  handleMenuClose()
                  navigate("/HotelRegister")
                }}>Grocery Stores</MenuItem>
                <MenuItem onClick={()=>{
                  handleMenuClose()
                  navigate("/HotelRegister")
                }}>Welfares</MenuItem>
              </Menu>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
