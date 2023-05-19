import ButtonCustom from "../../../components/Button";

import { v4 as uuid } from "uuid";
import OrderItem from "./OrderItem";

function OrderRecently({ data, setActive }) {
  return (
    <div className="w-full   pb-10">
      <h1
        className="font-bold font-barlow text-xl w-fit"
        style={{
          borderBottom: "2px solid #ccc",
        }}
      >
        Order Recently
      </h1>
      <div className="flex flex-col pt-5">
        {data.map((item) => {
          return <OrderItem data={item} key={uuid()}></OrderItem>;
        })}
      </div>
      <ButtonCustom
        onClick={(e) => setActive(2)}
        nameButton="Watch all"
        style={{
          color: "white",
          marginTop: "2rem",
          background: "#fb923c",
        }}
      />
    </div>
  );
}

export default OrderRecently;
