import React, { useEffect, useState } from "react";
import Logo from "../../assets/nawalah.png";
import { FaCoffee } from "react-icons/fa";

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

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gradient-to-r from-secondary to-secondary/90 shadow-md bg-gray-900 text-white">
      <div className="container py-2">
        <div className="flex justify-between items-center">
          {/* Logo section */}
          <div data-aos="fade-down" data-aos-once="true">
            <a
              href="#"
              className="font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive"
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
            className="flex justify-between items-center gap-4"
          >
            <ul className="sm:hidden md:flex items-center gap-4">
  {Menu.map((menu) => (
    <li key={menu.id}>
      <a
        href={menu.link}
        className="inline-block text-xl py-4 px-4 text-white/70 hover:text-white duration-200"
      >
        {menu.name}
      </a>
    </li>
  ))}
</ul>

            <a
              href="/#join"
              className="bg-primary/70 hover:scale-105 duration-200 text-white px-4 py-2 rounded-full flex items-center gap-3"
            >
              Join
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
