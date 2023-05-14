import { useState } from "react";
import CardUser from "./CardUser";

import { v4 as uuid } from "uuid";

import { CiGift, CiDeliveryTruck } from "react-icons/ci";
import { GiRank1 } from "react-icons/gi";
import ButtonCustom from "../../components/Button";

function Overview({ show }) {
  const [nav, setNav] = useState([
    {
      id: uuid(),
      name: "Your voucher",
      icon: <CiGift className="text-8xl" />,
      action: null,
      des: "3 voucher",
    },
    {
      id: uuid(),
      name: "Your order",
      icon: <CiDeliveryTruck className="text-8xl" />,
      action: null,
      des: "2 order",
    },
    {
      id: uuid(),
      name: "Your rank",
      icon: <GiRank1 className="text-8xl" />,
      action: null,
      des: "You are new member",
    },
  ]);
  return (
    <div
      className="w-full flex flex-col"
      style={{
        transition: ".8s",
        transform: show ? "" : "scale(0)",
        opacity: show ? "" : "0",
        position: show ? "" : "fixed",
      }}
    >
      <CardUser></CardUser>

      <div className="w-full flex justify-around mt-10 ">
        {nav.map((item, index) => {
          return (
            <div
              onClick={item.action}
              className={`p-4 flex center flex-col  min-w-15 w-1/3 rounded-xl scale-95 ${
                index === 0
                  ? "bg-orange-200"
                  : index === 1
                  ? "bg-red-200"
                  : "bg-yellow-200"
              }`}
              key={item.id}
            >
              <div
                className={`w-unset p-4 rounded-full  ${
                  index === 1
                    ? "bg-orange-200"
                    : index === 2
                    ? "bg-red-200"
                    : "bg-yellow-200"
                }`}
              >
                {item.icon}
              </div>
              <h5 className="text-3xl mt-4 mb-4 font-barlow font-bold ml-auto mr-auto">
                {item.name}
              </h5>

              <h6 className="text-xl text-orange-500 mb-8 mt-5">{item.des}</h6>

              <ButtonCustom
                nameButton="Watch"
                style={{
                  color: "#f97316",
                  background: "#fff",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Overview;
