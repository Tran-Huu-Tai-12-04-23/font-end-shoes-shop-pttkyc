import { useState, memo, useEffect } from "react";
import NewNav from "./NewNav";
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
import ItemTrash from "./ItemTrash";
import { UseAuthUserContext } from "../../AuthUser";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { auth } from "../../Firebase";
import Detail from "./Product/Detail";
import SaleSetting from "./SaleSetting";
import ItemSaleing from "./ItemSaleing";
import AddNewEmployee from "./AddNewEmployee";

function Admin() {
  const { user, setUser } = UseAuthUserContext();
  const [active, setActive] = useState(0);
  const [showLoad, setShowLoad] = useState(false);
  const [activeMenuUser, setActiveMenuUser] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  //
  const [orderDetail, setOrderDetail] = useState(null);
  const history = useNavigate();

  const handleNextStep = (value = 0) => {
    setActive(value);
  };

  const handleLogout = () => {
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
  };

  useEffect(() => {
    if (!user) {
      history("/login");
    }
  }, [user]);

  return (
    <>
      <div
        className="bg-blur fixed top-0 bottom-0 right-0 left-0 center flex"
        style={{
          zIndex: "20000",
          display: "none",
        }}
      >
        <CircularProgress />
      </div>
      <div className="w-full flex">
        <div style={{ width: "15rem" }}>
          <div
            className="fixed left-0 bottom-0 top-0 col-span-1 bg-blur overflow-auto custom-scrollbar"
            style={{ width: "15rem" }}
          >
            <NewNav
              handleNextStep={handleNextStep}
              active={active}
              handleLogout={handleLogout}
            ></NewNav>
          </div>
        </div>
        <div
          className=""
          style={{
            width: "calc(100% - 15rem)",
          }}
        >
          <div
            className="h-12 flex bg-blur justify-between items-center pl-10 pr-10 fixed top-0 right-0"
            style={{
              borderBottom: "1px solid #ccc",
              zIndex: "1000",
              width: "calc(100% - 15rem)",
            }}
          >
            <h1 className="text-xl font-bold font-barlow">Dashboard Shop</h1>
            <div className="start flex">
              <Badge badgeContent={4} color="secondary">
                <HiOutlineBellAlert className="text-xl" />
              </Badge>
              <ButtonCustom
                onClick={(e) => setActive(-2)}
                nameButton="Add New Employee"
                iconRight={<RiAddLine className="text-xl mb-1" />}
                style={{
                  marginLeft: "2rem",
                  padding: ".2rem 2rem",
                  border: "1px solid #fb923",
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
                hoverBg={"#ffcd74"}
                style={{
                  marginLeft: "1rem",
                  padding: ".2rem 2rem",
                  background: "#fb923c",
                  color: "#fff",
                }}
              />
              <h5 className="text-xl ml-2 font-barlow">{user?.username}</h5>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                }}
                onClick={(e) => setActiveMenuUser(e.currentTarget)}
                className="ml-3 cursor-pointer"
                alt={user?.username}
                src={user?.avatar}
              />
            </div>
          </div>
          {/* content */}
          <div className="pt-16 pl-20 pr-20">
            {active === -1 && <AddNewShoes setActive={setActive} />}
            {active === -2 && <AddNewEmployee setActive={setActive} />}
            {active === 0 && (
              <Overview setActive={setActive} show={active === 0} />
            )}
            {active === 1 && (
              <Product
                setProductDetail={setProductDetail}
                setActive={setActive}
              />
            )}
            {active === 1.1 && (
              <Detail
                setShowLoad={setShowLoad}
                setActive={setActive}
                productDetail={productDetail}
              />
            )}
            {active === 1.2 && <SaleSetting handleNextStep={handleNextStep} />}
            {active === 1.3 && <ItemSaleing />}
            {active === 1.4 && <ItemTrash />}
            {active === 2 && (
              <Orders
                handleNextStep={handleNextStep}
                show={active === 2}
                setOrderDetail={setOrderDetail}
              />
            )}

            {active === 2.1 && (
              <OrderDetail
                orderDetail={orderDetail}
                setActive={setActive}
                setOrderDetail={setOrderDetail}
              />
            )}
            {active === 3 && <User show={active === 3} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Admin);
