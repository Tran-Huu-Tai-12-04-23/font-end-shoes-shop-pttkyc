import { IoMdAdd } from "react-icons/io";

function SubTransaction({ data, className }) {
  return (
    <div
      className={`rounded-xl p-4 flex items-center justify-between ${className}`}
    >
      <div className="start flex ">
        <div
          className="flex center  p-2 rounded-full mr-4 hover:bg-green-200 cursor-pointer"
          style={{
            border: "1px solid #A0D8B3",
          }}
        >
          <IoMdAdd className="text-xl text-green-500" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl font-barlow font-bol">
            Code Order: XXX-XXX-XXXshoes111
          </h1>
          <h5 className="text-sm font-barlow text-slate-500">
            Date : 1/1/2023
          </h5>
        </div>
      </div>
      <h5 className="text-green-500 text-2xl">+ $42</h5>
    </div>
  );
}

export default SubTransaction;
