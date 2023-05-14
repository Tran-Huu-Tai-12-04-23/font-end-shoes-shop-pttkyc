import { useState, useEffect } from "react";

import Nav from "./Nav";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { RiAddLine } from "react-icons/ri";

import { CircularProgress, Badge, Avatar } from "@mui/material";

import ButtonCustom from "../../components/Button";
import MenuCustom from "../../components/MenuCustom";

import Overview from "./Overview";
import Orders from "./Order";
import Product from "./Product";
import User from "./User";
import AddNewShoes from "./AddNewShoes";
import OrderDetail from "./OrderDetail";
import { UseAuthUserContext } from "../../AuthUser";
import { useNavigate } from "react-router-dom";

import { CiLogout, CiShoppingCart } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";

import { auth } from "../../Firebase";

function Admin() {
  const { user, setUser } = UseAuthUserContext();
  const [active, setActive] = useState(0);
  const [showLoad, setShowLoad] = useState(false);
  const [activeMenuUser, setActiveMenuUser] = useState(null);
  const history = useNavigate();

  const handleNextStep = (value = 0) => {
    setShowLoad(true);
    setActive(value);
    const timeOut = setTimeout(() => {
      setShowLoad(false);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  };

  return (
    <>
      <div
        className="bg-blur fixed top-0 bottom-0 right-0 left-0 center flex "
        style={{
          zIndex: "20000",
          display: showLoad ? "" : "none",
        }}
      >
        <CircularProgress />
      </div>
      <div className="w-full flex">
        <div>
          <div
            style={{
              width: "15rem",
            }}
          >
            <div
              className="fixed left-0 bottom-0 top-0 col-span-1 bg-blur overflow-auto custom-scrollbar"
              style={{
                width: "15rem",
              }}
            >
              <Nav handleNextStep={handleNextStep} active={active} />
            </div>
          </div>
        </div>
        <div
          className={``}
          style={{
            width: "calc(100% - 15rem)",
          }}
        >
          <div
            className=" h-16 flex bg-blur justify-between items-center pl-10 pr-10 fixed top-0 right-0"
            style={{
              borderBottom: "1px solid #ccc",
              zIndex: "1000",
              width: "calc(100% - 15rem)",
            }}
          >
            <h1 className="text-xl font-bold font-barlow">Dashboard Shop</h1>
            <div className="start flex ">
              <Badge badgeContent={4} color="secondary">
                <HiOutlineBellAlert className="text-4xl"></HiOutlineBellAlert>
              </Badge>
              <ButtonCustom
                onClick={(e) => setActive(-1)}
                nameButton="Add New Employee"
                iconRight={<RiAddLine className="text-xl mb-1 "></RiAddLine>}
                style={{
                  marginLeft: "2rem",
                  padding: ".5rem 2rem",
                  border: "1px solid #fb923c",
                }}
              />
              <ButtonCustom
                onClick={(e) => setActive(-1)}
                nameButton="Add New"
                iconRight={
                  <RiAddLine
                    className="text-xl mb-1"
                    style={{
                      color: "#fff",
                    }}
                  ></RiAddLine>
                }
                style={{
                  marginLeft: "1rem",
                  padding: ".5rem 2rem",
                  background: "#fb923c",
                  color: "#fff",
                }}
              />

              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                }}
                onClick={(e) => setActiveMenuUser(e.currentTarget)}
                className="ml-3 cursor-pointer"
                alt={user?.username}
                src={user?.avatar}
              />
              <MenuCustom
                activeMenu={activeMenuUser}
                setActiveMenu={setActiveMenuUser}
                data={[
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
            </div>
          </div>
          {/* content */}
          <div className="pt-16  pl-20 pr-20">
            {active === -1 && <AddNewShoes setActive={setActive} />}
            <Overview show={active === 0} />
            {active === 1 && <Product show={active === 1} />}
            {active === 2 && (
              <Orders handleNextStep={handleNextStep} show={active === 2} />
            )}
            {active === 3.1 && <OrderDetail />}
            {active === 3 && <User show={active === 3} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
