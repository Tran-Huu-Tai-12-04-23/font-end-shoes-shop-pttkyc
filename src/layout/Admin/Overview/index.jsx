import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsDatabaseCheck } from "react-icons/bs";
import { FaCoins } from "react-icons/fa";
import LineCharts from "../Satisfaction/LineChartS";
import BarChart from "../Satisfaction/BarChart";
import PieChart from "../Satisfaction/PieChart";
import OrderRecently from "./OrderRecently";
import BillingInformation from "./BillingInformation";

import { useEffect, useState } from "react";
import Services from "../../../Services";

function Overview({ show, setActive }) {
  const [numberDelivery, setNumberDelivery] = useState("");
  const [total, setTotal] = useState("");
  const [balance, setBalance] = useState("");
  const [order, setOrder] = useState([]);
  const [numberItemSold, setNumberItemSold] = useState(0);
  const [orderRecently, setOrderRecently] = useState([]);

  useEffect(() => {
    const init = async () => {
      const result = await Services.getDataFromApi(
        "/api/item/order/count-delivery"
      );

      if (result.status === 200) {
        setNumberDelivery(result.count_delivery);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      const result = await Services.getDataFromApi(
        "/api/item/order/count-total"
      );
      if (result.status === 200) {
        setTotal(result.count_total);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      const result = await Services.getDataFromApi(
        "/api/item/order/count-balance"
      );
      if (result.status === 200) {
        setBalance(result.count_balance);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const initOrder = async () => {
      const res = await Services.getDataFromApi("/api/item/order/all-sold");
      if (res.status === 200) {
        setOrder(
          JSON.parse(res.data).map((item, index) => {
            return {
              ...item,
              id: index + 1,
            };
          })
        );
      }
    };
    initOrder();
  }, []);

  useEffect(() => {
    const initOrder = async () => {
      const res = await Services.getDataFromApi("/api/item/order/recently");
      if (res.status === 200) {
        setOrderRecently(JSON.parse(res.data));
      }
    };
    initOrder();
  }, []);

  useEffect(() => {
    const init = async () => {
      const result = await Services.getDataFromApi(
        "/api/item/order/count-item-sold"
      );
      if (result.status === 200) {
        setNumberItemSold(result.number_item_sold);
      }
    };
    init();
  }, []);
  return (
    <div
      className="w-full mt-5"
      style={{
        display: show ? "" : "none",
      }}
    >
      <h1
        className="text-xl font-bold font-barlow w-fit"
        style={{
          borderBottom: "2px solid #ccc",
        }}
      >
        Activity
      </h1>

      <div className="w-full flex-wrap mt-5 p-4 rounded-xl flex justify-start items-center bg-slate-100">
        <div className="flex start hover:bg-slate-50 p-4 rounded-xl cursor-pointer w-1/3 scale-95">
          <div className="rounded-full xl p-4 bg-blue-300 ">
            <MdOutlineAccountBalanceWallet className="text-4xl text-white"></MdOutlineAccountBalanceWallet>
          </div>
          <div className="ml-2 flex flex-col">
            <h5 className="text-xl font-barlow">Balance</h5>
            <h6 className="text-xl font-barlow font-bold text-orange-400">
              $ {balance}
            </h6>
          </div>
        </div>
        <div className="flex start hover:bg-slate-50 p-4 rounded-xl cursor-pointer w-1/3 scale-95">
          <div className="rounded-full xl p-4 bg-red-300 ">
            <CiDeliveryTruck className="text-4xl text-white"></CiDeliveryTruck>
          </div>
          <div className="ml-2 flex flex-col">
            <h5 className="text-xl font-barlow">Delivery</h5>
            <h6 className="text-xl font-barlow font-bold text-orange-400">
              {numberDelivery ? numberDelivery : "Have ever order delivery"}
            </h6>
          </div>
        </div>
        <div className="flex start hover:bg-slate-50 p-4 rounded-xl cursor-pointer w-1/3 scale-95">
          <div className="rounded-full xl p-4 bg-green-300 ">
            <BsDatabaseCheck className="text-4xl text-white"></BsDatabaseCheck>
          </div>
          <div className="ml-2 flex flex-col">
            <h5 className="text-xl font-barlow">Sold</h5>
            <h6 className="text-xl font-barlow font-bold text-orange-400">
              {numberItemSold} item sold
            </h6>
          </div>
        </div>
        {/* <div className="flex start hover:bg-slate-50 p-4 rounded-xl cursor-pointer w-1/3 scale-95">
          <div className="rounded-full xl p-4 bg-purple-300 ">
            <AiOutlineStock className="text-4xl text-white"></AiOutlineStock>
          </div>
          <div className="ml-2 flex flex-col">
            <h5 className="text-xl font-barlow">Stock Available</h5>
            <h6 className="text-xl font-barlow font-bold text-orange-400">
              1.222
            </h6>
          </div>
        </div> */}
        <div className="flex start hover:bg-slate-50 p-4 rounded-xl cursor-pointer w-1/3 scale-95">
          <div className="rounded-full xl p-4 bg-orange-300 ">
            <FaCoins className="text-4xl text-white"></FaCoins>
          </div>
          <div className="ml-2 flex flex-col">
            <h5 className="text-xl font-barlow">Total Revenue</h5>
            <h6 className="text-xl font-barlow font-bold text-orange-400">
              ${total}
            </h6>
          </div>
        </div>
      </div>

      <div className="w-full mt-5 "></div>
      <div className="w-full mt-5 ">
        <h1
          className="font-bold font-barlow text-xl w-fit"
          style={{
            borderBottom: "2px solid #ccc",
          }}
        >
          Line chart
        </h1>

        <div className="mt-10">
          <LineCharts order={order} setOrder={setOrder} />
        </div>
        {/* <div className="mt-10 pl-12 mb-10">
          <BarChart order={order} />
        </div> */}
        {/* <div className="mt-10 pl-12 mb-10">
          <PieChart order={order} />
        </div> */}

        <div className="mt-10">
          <OrderRecently
            data={orderRecently.slice(0, 5)}
            setActive={setActive}
          />
        </div>

        <BillingInformation orderRecently={orderRecently} />
      </div>
    </div>
  );
}

export default Overview;
