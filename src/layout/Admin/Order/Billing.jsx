import ButtonCustom from "../../../components/Button";

import { CiTrash } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";

function Billing({ data, style }) {
  return (
    <div
      className="w-full p-4 rounded-xl flex flex-col hover:bg-slate-100 cursor-pointer"
      style={{
        ...style,
      }}
    >
      <div className="items-center justify-between w-full flex">
        <h1 className="font-barlow font-bold">{data?.name}</h1>
        <div className="start flex ">
          <ButtonCustom
            nameButton="Delete"
            style={{ color: "#ef4444" }}
            iconLeft={<CiTrash className="text-xl mr-2"></CiTrash>}
          />
          <ButtonCustom
            nameButton="Detail"
            style={{
              marginLeft: "1rem",
            }}
            iconLeft={<CgDetailsMore className="text-xl mr-2"></CgDetailsMore>}
          />
        </div>
      </div>

      <div className="w- mt-2">Date: {data?.date}</div>
      <div className="w- mt-2">Total: ${data?.total}</div>
      <div className="w- mt-2">Items: {data?.item}</div>
    </div>
  );
}

export default Billing;
