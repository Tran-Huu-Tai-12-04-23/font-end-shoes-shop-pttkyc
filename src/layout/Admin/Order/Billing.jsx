import ButtonCustom from "../../../components/Button";

import { CiTrash } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";
import Util from "../../../util";

function Billing({ data, style }) {
  return (
    <div
      className="w-full p-4 rounded-md flex flex-col hover:bg-slate-100 cursor-pointer"
      style={{
        ...style,
      }}
    >
      <div className="items-center justify-between w-full flex">
        <h1 className="font-barlow font-bold">{data?.name_client}</h1>
      </div>

      <div className="w- mt-2">Date: {Util.formatDate(data?.order_date)}</div>
      <div className="w- mt-2">Total: ${data?.price}</div>
      <div className="w- mt-2">Items: {data?.name_item}</div>
    </div>
  );
}

export default Billing;
