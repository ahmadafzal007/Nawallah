import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { FaUser } from "react-icons/fa";
import { DownOutlined } from "@ant-design/icons";
import Logo from "../../assets/nawalah.png";

const WelfareNav = () => {
  // Dummy data for welfare name and logo (replace with actual data as needed)
 const [welfareName, setWelfareName]  =useState("asdf");
 const [welfareLogo, setwelfareLogo] = useState("asdf");

 useEffect(()=>{
      const ngo = JSON.parse(localStorage.getItem("ngo"));
     setWelfareName(ngo.name);
     setwelfareLogo(ngo.logo);
 },[])
  const menu = (
    <Menu style={{ width: "220px" }}>
      <Menu.Item key="logo" style={{ borderBottom: "1px solid #e8e8e8", paddingBottom: "8px" }}>
        <img src={welfareLogo} alt="Logo" className="w-8 h-8 rounded-full transform rotate-180 ml-20 mr-20 flex align-center justify-center" style={{ marginBottom: "8px", display: "flex", alignItems:"center", justifyContent:"center" }} />
      </Menu.Item>
      <Menu.Item key="name" style={{ paddingTop: "8px", paddingBottom: "8px" }}>
      <Button type="text" className="font-bold flex items-center justify-center font-serif">
          {welfareName}
        </Button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Button type="text" className="font-bold flex items-center justify-center font-serif" onClick={() => console.log("Logout")}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-secondary from-secondary to-secondary/90 shadow-md text-white">
      <div className="container py-2">
        <div className="flex justify-between items-center">
          {/* Logo section */}
          <div data-aos="fade-down" data-aos-once="true">
            <a
              href="#"
              className="font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive"
            >
              <img src={Logo} alt="Logo" className="w-14 " />
              Nawalah
            </a>
          </div>

          {/* Profile section */}
          <div
            data-aos="fade-down"
            data-aos-once="true"
            data-aos-delay="300"
            className="flex justify-between items-center gap-4"
          >
            <Dropdown overlay={menu} trigger={['click']}>
              <Button
                type="text"
                className="text-xl text-white/70 hover:text-white duration-200"
              >
                <FaUser className="inline-block" />
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelfareNav;
