import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CreateOutlined,  DashboardOutlined, InsertChartOutlinedOutlined, LogoutOutlined, LunchDiningOutlined, MenuBookOutlined, PeopleAltOutlined, SettingsOutlined, StorefrontOutlined, LockOutlined } from "@mui/icons-material";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LockPersonIcon from '@mui/icons-material/LockPerson';

export default function Sidebar() {
  const navigate = useNavigate();
  const [drop, setdrop] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className=" w-[50px] fixed md:static overflow-y-scroll md:w-[150px] lg:w-[255px] h-screen  bg-white">
      <div className="selector bg-costomFont fixed w-fit  lg:w-[255px]  h-screen">
        <div className="py-4 flex flex-col  h-screen">
          <h1 className="hidden md:block font-cursive text-white text-3xl pb-20 pl-5">
            Hello Admin
          </h1>
          <ul className="space-y-[18.5px]">
            
            <li onClick={() => setdrop(false)}> 
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-costomFont text-base font-normal rounded-lg border-2 border-pink-500 border-line bg-pink-200"
                    : "text-brandDark flex items-center gap-3 p-2.5  text-base font-normal rounded-lg hover:bg-pink-100 border-dashed"
                }
                activeClassName="text-costomFont border-pink-500 bg-pink-200"
              >
                <DashboardOutlined className="w-[22px] h-[22px]" />
                <span className="hidden  lg:block">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-costomFont text-base font-normal rounded-lg border-2 border-pink-500 border-line bg-pink-200"
                    : "text-brandDark flex items-center gap-3 p-2.5  text-base font-normal rounded-lg hover:bg-pink-100 border-dashed"
                }
                activeClassName="text-costomFont border-pink-500 bg-pink-200"
              >
                <PeopleAltOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Users</span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-costomFont text-base font-normal rounded-lg border-2 border-pink-500 border-line bg-pink-200"
                    : "text-brandDark flex items-center gap-3 p-2.5  text-base font-normal rounded-lg hover:bg-pink-100 border-dashed"
                }
                activeClassName="text-costomFont border-pink-500 bg-pink-200"
              >
                <MenuBookOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Orders</span>
              </NavLink>
            </li> */}

            <li>
              <NavLink
                to="/restaurants"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-costomFont text-base font-normal rounded-lg border-2 border-pink-500 border-line bg-pink-200"
                    : "text-brandDark flex items-center gap-3 p-2.5  text-base font-normal rounded-lg hover:bg-pink-100 border-dashed"
                }
                activeClassName="text-costomFont border-pink-500 bg-pink-200"
              >
                <StorefrontOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Businesses</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/welfare"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-costomFont text-base font-normal rounded-lg border-2 border-pink-500 border-line bg-pink-200"
                    : "text-brandDark flex items-center gap-3 p-2.5  text-base font-normal rounded-lg hover:bg-pink-100 border-dashed"
                }
                activeClassName="text-costomFont border-pink-500 bg-pink-200"
              >
                <VolunteerActivismIcon className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Welfares</span>
              </NavLink>
            </li>

            <li onClick={() => setdrop(false)}>
              <NavLink
                to="/review"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-costomFont text-base font-normal rounded-lg border-2 border-pink-500 border-line bg-pink-200"
                    : "text-brandDark flex items-center gap-3 p-2.5  text-base font-normal rounded-lg hover:bg-pink-100 border-dashed"
                }
                activeClassName="text-costomFont border-pink-500 bg-pink-200"
              >
                <LockOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Uauthorized Businesses</span>
              </NavLink>
            </li>

            <li onClick={() => setdrop(false)}>
              <NavLink
                to="/UnauthNGO"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-costomFont text-base font-normal rounded-lg border-2 border-pink-500 border-line bg-pink-200"
                    : "text-brandDark flex items-center gap-3 p-2.5  text-base font-normal rounded-lg hover:bg-pink-100 border-dashed"
                }
                activeClassName="text-costomFont border-pink-500 bg-pink-200"
              >
                <LockPersonIcon className="w-[22px] h-[22px] " />
                <span className="hidden lg:block">Uauthorized Welfare</span>
              </NavLink>
            </li>

          </ul>
          <div className="pt-56">
          <div
            onClick={logout}
            className="text-brandDark flex items-center gap-3 p-2.5   text-base font-normal rounded-lg hover:bg-pink-100 border-dashed"
          >
            <LogoutOutlined className="w-[22px] h-[22px]" />
            <span className="hidden lg:block">Sign Out</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
