import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";

function OrderItem({ data }) {
  return (
    <div
      className="relative justify-start flex p-2 mt-2 mb-2 rounded-md hover:slate-slate-50"
      style={{
        border: "1px solid #ccc",
      }}
    >
      <div className="font-barlow w-24  flex  flex-col mr-10 ml-10">
        <h5 className="">Name</h5>
        <h6 className="text-md mt-2 text-orange-400">{data.name_client}</h6>
      </div>
      <div className="font-barlow  flex  flex-col mr-10 ml-10">
        <h5 className="">Date</h5>
        <h6 className="text-md mt-2 text-orange-400">{data.order_date}</h6>
      </div>
      <div className="font-barlow  flex  flex-col mr-10 ml-10">
        <h5 className="">Total</h5>
        <h6 className="text-md mt-2 text-orange-400">${data.total}</h6>
      </div>
    </div>
  );
}

export default OrderItem;
