import { useState } from "react";
import { v4 as uuid } from "uuid";

import * as React from "react";

import { GrOverview, GrTransaction } from "react-icons/gr";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { CiShoppingCart, CiLogout } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { VscPreview } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";

function Nav({ active, handleNextStep }) {
  const [navbar, setNavbar] = useState([
    {
      id: uuid(),
      name: "Overview",
      icon: <GrOverview className="text-md"></GrOverview>,
      action: "",
    },
    {
      id: uuid(),
      name: "Products",
      icon: (
        <MdOutlineProductionQuantityLimits className="text-md"></MdOutlineProductionQuantityLimits>
      ),
      action: "",
    },
    {
      id: uuid(),
      name: "Orders",
      icon: <CiShoppingCart className="text-md mt-1"></CiShoppingCart>,
      action: "",
      submenu: <div>Hello</div>,
    },
    {
      id: uuid(),
      name: "Users",
      icon: <FiUsers className="text-md"></FiUsers>,
      action: "",
    },
    {
      id: uuid(),
      name: "Transactions",
      icon: <GrTransaction className="text-md"></GrTransaction>,
      action: "",
    },
    {
      id: uuid(),
      name: "Reports",
      icon: <GoReport className="text-md"></GoReport>,
      action: "",
    },
    {
      id: uuid(),
      name: "Reviews",
      icon: <VscPreview className="text-md"></VscPreview>,
      action: "",
    },
    {
      id: uuid(),
      name: "Note",
      icon: <SlNotebook className="text-md"></SlNotebook>,
      action: "",
    },
    {
      id: uuid(),
      name: "Settings",
      icon: <IoSettingsOutline className="text-md"></IoSettingsOutline>,
      action: "",
    },
  ]);
  return (
    <div
      className="flex flex-col p-4 justify-between "
      style={{
        borderRight: "1px solid #ccc",
        minHeight: "calc( 100vh )",
      }}
    >
      <div className="w-full flex flex-col">
        {navbar.map((nav, index) => {
          return (
            <div
              key={uuid()}
              onClick={(e) => handleNextStep(index)}
              className={`transition-all center start flex cursor-pointer p-3  mt-2 mb-2
              ${index === active ? "bg-slate-300" : "hover:bg-slate-300"}
              `}
              style={{
                borderTop: "1px solid #e0e0e0",
              }}
            >
              {nav.icon}
              <h5 className={`${"text-md  ml-3"} font-barlow cursor-pointer`}>
                {nav.name}
              </h5>
            </div>
          );
        })}
      </div>
      <button className="ml-auto mr-auto center flex hover:text-orange-500 pt-1 w-32 pb-1 pr-4 pl-4 rounded-md cursor-pointer  font-barlow text-md">
        <CiLogout className="text-3xl" />
        <h5 className="ml-4 cursor-pointer">Logout</h5>
      </button>
    </div>
  );
}

export default Nav;
