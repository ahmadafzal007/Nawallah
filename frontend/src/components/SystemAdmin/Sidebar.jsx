import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CreateOutlined, DashboardOutlined, InsertChartOutlinedOutlined, LogoutOutlined, LunchDiningOutlined, MenuBookOutlined, PeopleAltOutlined, SettingsOutlined, StorefrontOutlined, LockOutlined } from "@mui/icons-material";

export default function Sidebar() {
  const navigate = useNavigate();
  const [drop, setdrop] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className=" w-[50px] md:w-[50px] lg:w-[255px] h-screen  bg-brandDark">
      <div className="selector bg-brandDark fixed w-fit  lg:w-[255px]  h-screen">
        <div className="py-4 flex flex-col justify-between h-screen">
          <ul className="space-y-[18.5px]">
            <li onClick={() => setdrop(false)}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-[#FF6154] text-base font-normal rounded-lg border-2 border-[#FF6154] border-line"
                    : "flex items-center gap-3 p-2.5 text-[#E5E5E5] text-base font-normal rounded-lg hover:bg-gray-500 border-dashed"
                }
                activeClassName="text-[#FF6154] border-[#FF6154]"
              >
                <DashboardOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-[#FF6154] text-base font-normal rounded-lg border-2 border-[#FF6154] border-line"
                    : "flex items-center gap-3 p-2.5 text-[#E5E5E5] text-base font-normal rounded-lg hover:bg-gray-500 border-dashed"
                }
                activeClassName="text-[#FF6154] border-[#FF6154]"
              >
                <PeopleAltOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Users</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-[#FF6154] text-base font-normal rounded-lg border-2 border-[#FF6154] border-line"
                    : "flex items-center gap-3 p-2.5 text-[#E5E5E5] text-base font-normal rounded-lg hover:bg-gray-500 border-dashed"
                }
                activeClassName="text-[#FF6154] border-[#FF6154]"
              >
                <MenuBookOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Orders</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/restaurants"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-[#FF6154] text-base font-normal rounded-lg border-2 border-[#FF6154] border-line"
                    : "flex items-center gap-3 p-2.5 text-[#E5E5E5] text-base font-normal rounded-lg hover:bg-gray-500 border-dashed"
                }
                activeClassName="text-[#FF6154] border-[#FF6154]"
              >
                <StorefrontOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Restaurants</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/welfare"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-[#FF6154] text-base font-normal rounded-lg border-2 border-[#FF6154] border-line"
                    : "flex items-center gap-3 p-2.5 text-[#E5E5E5] text-base font-normal rounded-lg hover:bg-gray-500 border-dashed"
                }
                activeClassName="text-[#FF6154] border-[#FF6154]"
              >
                <StorefrontOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Welfares</span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-[#FF6154] text-base font-normal rounded-lg border-2 border-[#FF6154] border-line"
                    : "flex items-center gap-3 p-2.5 text-[#E5E5E5] text-base font-normal rounded-lg hover:bg-gray-500 border-dashed"
                }
                activeClassName="text-[#FF6154] border-[#FF6154]"
              >
                <InsertChartOutlinedOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Analytics</span>
              </NavLink>
            </li> */}

            <li onClick={() => setdrop(false)}>
              <NavLink
                to="/review"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-[#FF6154] text-base font-normal rounded-lg border-2 border-[#FF6154] border-line"
                    : "flex items-center gap-3 p-2.5 text-[#E5E5E5] text-base font-normal rounded-lg hover:bg-gray-500 border-dashed"
                }
                activeClassName="text-[#FF6154] border-[#FF6154]"
              >
                <LockOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Uauthorized Restaurants</span>
              </NavLink>
            </li>

            <li onClick={() => setdrop(false)}>
              <NavLink
                to="/UnauthNGO"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-2.5 text-[#FF6154] text-base font-normal rounded-lg border-2 border-[#FF6154] border-line"
                    : "flex items-center gap-3 p-2.5 text-[#E5E5E5] text-base font-normal rounded-lg hover:bg-gray-500 border-dashed"
                }
                activeClassName="text-[#FF6154] border-[#FF6154]"
              >
                <LockOutlined className="w-[22px] h-[22px]" />
                <span className="hidden lg:block">Uauthorized Welfare</span>
              </NavLink>
            </li>


        
          </ul>
          <div
            onClick={logout}
            className="flex items-center gap-3 p-2.5 text-[#E5E5E5] text-base font-normal rounded-lg hover:bg-gray-500 border-dashed"
          >
            <LogoutOutlined className="w-[22px] h-[22px]" />
            <span className="hidden lg:block">Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
