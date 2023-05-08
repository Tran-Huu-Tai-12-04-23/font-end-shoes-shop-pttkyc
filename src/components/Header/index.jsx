import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/img/home/logo.png";
import { IoMdSearch } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiLogout, CiShoppingCart } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

import Input from "../../components/Input";
import MenuCustom from "../MenuCustom";
import ButtonCustom from "../Button";

function Header() {
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeMenuUser, setActiveMenuUser] = useState(null);
  const history = useNavigate();

  return (
    <div
      className="fixed items-center top-0 left-0 right-0 h-12 w-full grid grid-cols-12 pl-4 pr-4"
      style={{
        zIndex: "100",
      }}
    >
      <img
        src={logo}
        className="w-20 col-span-3"
        onClick={(e) => history("/")}
      ></img>
      <div className="col-span-6">
        <ul className="justify-center items-center flex">
          <li
            onClick={(e) => history("/")}
            className="pt-2 text-xl pb-2 pl-4 pr-4 font-barlow cursor-pointer hover:bg-slate-50 rounded-sm"
          >
            Home
          </li>
          <li
            onClick={(e) => history("/shop")}
            className="pt-2 text-xl pb-2 pl-4 pr-4 font-barlow cursor-pointer hover:bg-slate-50 rounded-sm"
          >
            Men
          </li>
          <li
            onClick={(e) => history("/shop")}
            className="pt-2 text-xl pb-2 pl-4 pr-4 font-barlow cursor-pointer hover:bg-slate-50 rounded-sm"
          >
            Women
          </li>
          <li
            onClick={(e) => history("/shop")}
            className="pt-2 text-xl pb-2 pl-4 pr-4 font-barlow cursor-pointer hover:bg-slate-50 rounded-sm"
          >
            Kids
          </li>
        </ul>
      </div>
      <div
        className="col-span-3 relative end flex"
        style={{
          zIndex: "3",
        }}
      >
        <IoMdSearch
          onClick={(e) => setActiveSearch(!activeSearch)}
          className="text-2xl hover:text-cyan-600 hover:scale-150 transition-all cursor-pointer rounded-sm"
        />
        <div
          className={`absolute top-9 min-w-15 ${
            activeSearch ? "" : "-translate-y-28"
          } transition-all `}
          style={{
            zIndex: "3",
          }}
        >
          <Input className="font-barlow" placeholder="Search" />
          <IoCloseSharp
            onClick={(e) => setActiveSearch(!activeSearch)}
            className="absolute top-1/2 right-1 -translate-y-1/2 text-2xl hover:text-red-600 hover:scale-150 transition-all cursor-pointer"
          />
        </div>

        {/*  */}
        <Badge badgeContent={4} color="primary">
          <CiShoppingCart className="text-2xl ml-3" />
        </Badge>

        <ButtonCustom
          nameButton="Log In"
          style={{
            marginLeft: "1rem",
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: ".2rem 1rem",
          }}
          onClick={(e) => history("/sign")}
        />

        {/* <Avatar
          onClick={(e) => setActiveMenuUser(e.currentTarget)}
          className="ml-3 cursor-pointer"
          alt="Remy Sharp"
          src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        /> */}
        {/* <MenuCustom
          activeMenu={activeMenuUser}
          setActiveMenu={setActiveMenuUser}
          data={[
            {
              name: "Profile",
              onClick: () => {},
              icon: <CgProfile className="text-xl mr-3" />,
            },
            {
              name: "Store cart",
              onClick: () => {},
              icon: <MdOutlineLocalGroceryStore className="text-xl mr-3" />,
            },
            {
              name: "Settings",
              onClick: () => {},
              icon: <FiSettings className="text-xl mr-3" />,
            },
            {
              name: "Log out",
              onClick: () => {},
              icon: <CiLogout className="text-xl mr-3" />,
            },
          ]}
        /> */}
      </div>
    </div>
  );
}

export default Header;
