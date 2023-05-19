import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuid } from "uuid";

import logo from "../../assets/img/home/logo.png";
import { IoMdSearch } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiLogout, CiShoppingCart } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { auth } from "../../Firebase/index";

import { useContextStore } from "../../Store/index";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

import Input from "../../components/Input";
import MenuCustom from "../MenuCustom";
import ButtonCustom from "../Button";
import { FaSleigh } from "react-icons/fa";

import { UseAuthUserContext } from "../../AuthUser";

function Header() {
  const { setGender, itemsBag } = useContextStore();
  const { user, setUser } = UseAuthUserContext();
  const searchPopular = ["Nike air", "Bitis Hunter", "Adidas"];
  const { setSearch, search } = useContextStore();
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeMenuUser, setActiveMenuUser] = useState(null);
  const history = useNavigate();
  const [enterSearch, setEnterSearch] = useState(false);

  const handleSubmitSearch = () => {
    setActiveSearch(false);
    setEnterSearch(false);
    history("/search");
  };
  const classEnterSearch =
    "fixed top-0 left-0 w-full flex-col  backdrop-blur-6xl bg-white items-center flex right-0 h-unset xl:pl-20 xl:pr-20 pt-5";
  const classInputSearch = "h-7 min-w-30";

  useEffect(() => {
    const handleWindowClick = () => {
      setEnterSearch(false);
    };
    window.addEventListener("click", handleWindowClick);
    return handleWindowClick;
  }, []);

  useEffect(() => {
    if (!search) {
      setEnterSearch(false);
    }
  }, []);

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
            className="pt-2 text-md pb-2 pl-4 pr-4 font-barlow cursor-pointer hover:bg-slate-50 rounded-sm"
          >
            Home
          </li>
          <li
            onClick={(e) => {
              setGender("unisex");
              history("/shop");
            }}
            className="pt-2 text-md pb-2 pl-4 pr-4 font-barlow cursor-pointer hover:bg-slate-50 rounded-sm"
          >
            Unisex
          </li>
          <li
            onClick={(e) => {
              setGender("men");
              history("/shop");
            }}
            className="pt-2 text-md pb-2 pl-4 pr-4 font-barlow cursor-pointer hover:bg-slate-50 rounded-sm"
          >
            Men
          </li>
          <li
            onClick={(e) => {
              setGender("women");
              history("/shop");
            }}
            className="pt-2 text-md pb-2 pl-4 pr-4 font-barlow cursor-pointer hover:bg-slate-50 rounded-sm"
          >
            Women
          </li>
        </ul>
      </div>
      <div
        className={`col-span-3 relative end flex `}
        style={{
          zIndex: "3",
        }}
      >
        <IoMdSearch
          onClick={(e) => {
            setActiveSearch(!activeSearch);
          }}
          className="text-2xl hover:text-orange-400 hover:scale-150 transition-all cursor-pointer rounded-sm"
        />
        <div
          className={` min-w-15 ${activeSearch ? "" : "-translate-y-28"}  ${
            enterSearch ? classEnterSearch : "absolute  top-9"
          }`}
          style={{
            zIndex: "3",
            transition: ".5s",
          }}
        >
          <div className="flex justify-center">
            <Input
              className={`font-barlow ${enterSearch ? classInputSearch : ""}`}
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setEnterSearch(true);
              }}
              onKeyPressEnter={(e) => {
                handleSubmitSearch();
              }}
            />
            <IoCloseSharp
              onClick={(e) => setActiveSearch(!activeSearch)}
              className={`${
                enterSearch ? "hidden" : ""
              } absolute top-1/2 right-1 -translate-y-1/2 text-2xl hover:text-red-600 hover:scale-150 transition-all cursor-pointer`}
            />
            <IoMdSearch
              onClick={handleSubmitSearch}
              className={`${
                enterSearch ? "block" : "hidden"
              } text-3xl hover:text-orange-400 cursor-pointer hover:scale-150 transition-all`}
            />
          </div>

          {/* history search */}
          <div
            className={`${
              enterSearch
                ? "items-start flex-col j flex  overflow-auto custom-scrollbar min-w-30 pb-10"
                : "hidden"
            }`}
          >
            <h1 className="text-xl border-b-2 font-barlow border-solid border-slate-500 rounded-sm mt-5 mb-5">
              Popular search
            </h1>
            {searchPopular?.map((his) => {
              return (
                <h5
                  className="text-xl font-barlow mr-2 p-2 hover:bg-slate-200 cursor-pointer rounded-md"
                  key={uuid()}
                  onClick={(e) => {
                    setSearch(his);
                    history("/search");
                  }}
                >
                  {his}
                </h5>
              );
            })}
          </div>
        </div>

        <Badge
          badgeContent={itemsBag.length}
          color="primary"
          sx={{
            "& span": {
              background: "#fb923c",
            },
          }}
        >
          <CiShoppingCart
            className="text-2xl ml-3 cursor-pointer hover:text-orange-400"
            onClick={(e) => {
              history("/bag");
            }}
          />
        </Badge>

        {!user && (
          <ButtonCustom
            nameButton="Log In"
            style={{
              marginLeft: "1rem",
              fontSize: "1rem",
              padding: ".2rem 1rem",
            }}
            onClick={(e) => history("/sign")}
          />
        )}

        {user && (
          <>
            <Avatar
              sx={{
                width: 30,
                height: 30,
              }}
              onClick={(e) => setActiveMenuUser(e.currentTarget)}
              className="ml-3 cursor-pointer"
              alt={user.username}
              src={user.avatar}
            />
            <MenuCustom
              activeMenu={activeMenuUser}
              setActiveMenu={setActiveMenuUser}
              data={[
                {
                  name: "Profile",
                  onClick: () => {},
                  icon: <CgProfile className="text-xl mr-3" />,
                  action: (e) => {
                    history("/user");
                  },
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
                  action: () => {
                    sessionStorage.clear();
                    setUser(null);
                    auth.signOut().then(
                      function () {
                        history("/sign");
                        console.log("Signed Out");
                      },
                      function (error) {
                        console.error("Sign Out Error", error);
                      }
                    );
                  },
                },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
