import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { v4 as uuid } from "uuid";

import { MdOutlineManageAccounts } from "react-icons/md";
import { VscHistory, VscAccount } from "react-icons/vsc";
import { GiRank2 } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { GoReport } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import Overview from "./Overview";
import OrderHistory from "./OrderHistory";
import YourRank from "./YourRank";
import UserManager from "./UserManager";
import Support from "./Support";
import NavigateFooter from "./NavigateFooter";
import Services from "../../Services";
import { UseAuthUserContext } from "../../AuthUser";

function User() {
  const [active, setActive] = useState(0);
  const { user } = UseAuthUserContext();
  const [nav, setNav] = useState([
    {
      id: uuid(),
      name: "Overview",
      action: (e) => setActive(0),
      icon: <MdOutlineManageAccounts className="text-2xl" />,
    },
    {
      id: uuid(),
      name: "Order history",
      action: (e) => setActive(1),
      icon: <VscHistory className="text-2xl" />,
    },
    {
      id: uuid(),
      name: "Your rank",
      action: (e) => setActive(2),
      icon: <GiRank2 className="text-2xl" />,
    },
    {
      id: uuid(),
      name: "Your account",
      action: (e) => setActive(3),
      icon: <VscAccount className="text-2xl" />,
    },
    {
      id: uuid(),
      name: "Support",
      action: (e) => setActive(4),
      icon: <BiSupport className="text-2xl" />,
    },
  ]);
  const [userDetail, setUserDetail] = useState({});
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const initUser = async () => {
      const result = await Services.getDataFromApi(
        "/api/user/get-detail-user/" + `?id=${user?.id}`
      );
      if (result.status === 200) {
        setUserDetail(JSON.parse(result.data));
      }
    };
    initUser();
  }, [user]);

  useEffect(() => {
    const initUser = async () => {
      const result = await Services.getDataFromApi(
        "/api/item/order/user" + `?id=${user?.id}`
      );
      if (result.status === 200) {
        setOrder(JSON.parse(result.data));
      }
    };
    initUser();
  }, [user]);

  return (
    <div>
      <Header />

      <div className="w-full pt-12 font-barlow text-xl center flex">
        <div className=" w-full grid grid-cols-12 pt-12 gap-10 pr-10 pl-10">
          <div
            className="col-span-3 p-4 rounded-xl xl:block lg:block hidden"
            style={{
              minHeight: "88vh",
            }}
          ></div>
          <div
            className="fixed left-0 w-1/5 col-span-3 p-4 bg-blur rounded-xl xl:block lg:block hidden"
            style={{
              // background: "#f6fbfc",
              minHeight: "88vh",
            }}
          >
            <ul className="">
              {nav.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    onClick={item.action}
                    className={`start flex ml-2 mt-2 pl-2 pr-2 rounded-xl hover:bg-slate-200 cursor-pointer ${
                      active === index ? "bg-slate-300" : ""
                    }`}
                  >
                    {item.icon}
                    <li
                      key={item.id}
                      className={`ml-2 mt-2 mb-2 rounded-md 
                    `}
                    >
                      {item.name}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="xl:col-span-9 lg:col-span-9  mb-20 col-span-12 ">
            {active === 0 && (
              <Overview userDetail={userDetail} numberOrder={order.length} />
            )}
            {active === 1 && <OrderHistory setOrder={setOrder} order={order} />}
            {active === 2 && <YourRank />}
            {active === 3 && (
              <UserManager
                userDetail={userDetail}
                setUserDetail={setUserDetail}
              />
            )}
            {active === 4 && <Support />}
          </div>
        </div>
      </div>
      <NavigateFooter nav={nav} active={active} />
    </div>
  );
}

export default User;
