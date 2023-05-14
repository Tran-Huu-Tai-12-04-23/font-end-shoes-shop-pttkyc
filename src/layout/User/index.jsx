import { useState } from "react";
import Header from "../../components/Header";
import { v4 as uuid } from "uuid";

import { MdOutlineManageAccounts } from "react-icons/md";
import { VscHistory, VscAccount } from "react-icons/vsc";
import { GiRank2 } from "react-icons/gi";
import { AiOutlineTags } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { GoReport } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import Overview from "./Overview";
import OrderHistory from "./OrderHistory";
import YourRank from "./YourRank";
import UserManager from "./UserManager";
import Support from "./Support";

function User() {
  const [active, setActive] = useState(0);
  const [nav, setNav] = useState([
    {
      id: uuid(),
      name: "Overview",
      action: null,
      icon: <MdOutlineManageAccounts className="text-xl" />,
    },
    {
      id: uuid(),
      name: "Order history",
      action: null,
      icon: <VscHistory className="text-xl" />,
    },
    {
      id: uuid(),
      name: "Your rank",
      action: null,
      icon: <GiRank2 className="text-xl" />,
    },
    {
      id: uuid(),
      name: "Your account",
      action: null,
      icon: <VscAccount className="text-xl" />,
    },
    {
      id: uuid(),
      name: "Support",
      action: null,
      icon: <BiSupport className="text-xl" />,
    },
    {
      id: uuid(),
      name: "Report",
      action: null,
      icon: <GoReport className="text-xl" />,
    },
    {
      id: uuid(),
      name: "logout",
      action: null,
      icon: <CiLogout className="text-xl" />,
    },
  ]);

  return (
    <div>
      <Header />

      <div className="w-full pt-12 font-barlow text-xl center flex">
        <div className="xl:w-4/6 w-full grid grid-cols-12 pt-12 gap-10">
          <div
            className="col-span-4 p-4 bg-blur rounded-xl"
            style={{
              background: "#f6fbfc",
              minHeight: "88vh",
            }}
          >
            <ul>
              {nav.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    onClick={(e) => setActive(index)}
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
          <div className="col-span-8 ">
            <Overview show={active === 0} />
            <OrderHistory show={active === 1} />
            <YourRank show={active === 2}></YourRank>
            <UserManager show={active === 3}></UserManager>
            <Support show={active === 4}></Support>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
