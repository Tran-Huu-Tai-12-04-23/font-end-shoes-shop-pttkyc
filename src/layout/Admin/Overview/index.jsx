import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsDatabaseCheck } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import LineCharts from "../Satisfaction/LineChartS";
import BarChart from "../Satisfaction/BarChart";
import PieChart from "../Satisfaction/PieChart";
import OrderRecently from "./OrderRecently";
import BillingInformation from "./BillingInformation";
import TransactionInformation from "./TransactionInformation";

import { itemsApi } from "../../../Services/fectchApi";

function Overview({ show }) {
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
              $425
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
              102
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
              1.222
            </h6>
          </div>
        </div>
        <div className="flex start hover:bg-slate-50 p-4 rounded-xl cursor-pointer w-1/3 scale-95">
          <div className="rounded-full xl p-4 bg-purple-300 ">
            <AiOutlineStock className="text-4xl text-white"></AiOutlineStock>
          </div>
          <div className="ml-2 flex flex-col">
            <h5 className="text-xl font-barlow">Stock Available</h5>
            <h6 className="text-xl font-barlow font-bold text-orange-400">
              1.222
            </h6>
          </div>
        </div>
        <div className="flex start hover:bg-slate-50 p-4 rounded-xl cursor-pointer w-1/3 scale-95">
          <div className="rounded-full xl p-4 bg-orange-300 ">
            <FaCoins className="text-4xl text-white"></FaCoins>
          </div>
          <div className="ml-2 flex flex-col">
            <h5 className="text-xl font-barlow">Total Revenue</h5>
            <h6 className="text-xl font-barlow font-bold text-orange-400">
              $425
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
          <LineCharts />
        </div>
        <div className="pl-10 pr-10 grid-cols-2 grid gap-10">
          <BarChart />
          <PieChart />
        </div>

        <div className="mt-10">
          <OrderRecently data={itemsApi.slice(0, 5)} />
        </div>

        <div className="mt-12 w-full grid-cols-2 grid gap-10">
          <BillingInformation />
          <TransactionInformation />
        </div>
      </div>
    </div>
  );
}

export default Overview;
