import React, { useEffect, useState } from "react";
import Logo from "../../assets/nawalah.png";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa"; // Import icons

const Menu = [
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
];

const NavBar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
    <div className="bg-gradient-to-r from-secondary to-secondary/90 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto py-2 px-4 md:px-8">
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
            <ul className="flex items-center gap-4">
              {Menu.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.link}
                    className="text-lg py-2 px-4 text-white/70 hover:text-white duration-200"
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-primary/70 hover:bg-primary duration-200 text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer"
              >
                For Business
                <FaChevronDown />
              </button>

              {showDropdown && (
                <div className="absolute mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-64 z-10 animate-fade-in">
                  <ul className="py-2">
                    <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Section 1</li>
                    <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Section 2</li>
                    <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Section 3</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <ul className="flex flex-col items-start gap-4">
              {Menu.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.link}
                    className="text-lg py-2 px-4 text-white/70 hover:text-white duration-200 block"
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <button
                onClick={toggleDropdown}
                className="bg-primary/70 hover:bg-primary duration-200 text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer"
              >
                For Business
                <FaChevronDown />
              </button>

              {showDropdown && (
                <div className="mt-2 bg-white text-gray-900 rounded-lg shadow-lg w-full animate-fade-in">
                  <ul className="py-2">
                    <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Section 1</li>
                    <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Section 2</li>
                    <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Section 3</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
