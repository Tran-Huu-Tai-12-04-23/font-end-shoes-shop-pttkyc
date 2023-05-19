import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { CiTrash } from "react-icons/ci";

function ItemBag({ data, handleRemoveItem = () => {} }) {
  const [age, setAge] = useState("36");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div
      className="p-4 flex "
      style={{
        borderBottom: "1px solid #ccc",
      }}
    >
      <div className="w-44 h-32 rounded-xl mr-4 center">
        <img
          className=" h-full rounded-2xl   "
          src={
            Array.isArray(data.link_photo)
              ? data.link_photo[0]
              : data.link_photo
          }
          style={{
            width: "7rem",
            height: "7rem",
          }}
        />
      </div>

      <div className="flex flex-col items-start w-full font-barlow">
        <div className="justify-between flex w-full">
          <h5 className="text-md font-barlow font-bold ">{data.name}</h5>
          <div className="text-md font-barlow  text-orange-400">
            {data.price_sale && (
              <>
                <span className="text-md line-through">${data.cost}</span>
                <span className="text-xl ml-2">${data.price_sale}</span>
              </>
            )}
            {!data.price_sale && <>${data.cost}</>}
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="start flex mt-2">
            Status : <span className="ml-2"> {data.status}</span>
          </div>

          <div className="start flex ">
            <div
              className="start flex mt-2 mr-4 pr-4 "
              style={{
                borderRight: "1px solid #ccc",
              }}
            >
              <span className="text-md mr-2">Size : {data.size}</span>
            </div>
            <div className="start flex mt-2 ">
              <span className="text-md mr-2">
                Quantity : {data.quantityOrder}
              </span>
            </div>

            {data.quantity <= 0 && (
              <div className="p-2 rounded-xl bg-orange-400 mt-2 text-white">
                Pre-order
              </div>
            )}
          </div>
        </div>
        <div>
          <CiTrash
            className="text-3xl hover:text-red-400 cursor-pointer "
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveItem(data.item_id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemBag;
