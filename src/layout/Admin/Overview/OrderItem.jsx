import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";

function OrderItem({ data }) {
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    const handleWindowClick = () => {
      setActiveMenu(false);
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);
  return (
    <div
      className="relative justify-start flex p-2 mt-2 mb-2 rounded-xl hover:slate-slate-50"
      style={{
        border: "1px solid #ccc",
      }}
    >
      <img
        src={data.photoUrl}
        style={{}}
        className="w-14 h-14 rounded-xl"
      ></img>
      <div className="font-barlow center flex  flex-col mr-10 ml-10">
        <h5 className="">Date</h5>
        <h6 className="text-xl text-orange-400">1/1/2023</h6>
      </div>
      <div className="font-barlow center flex  flex-col mr-10 ml-10">
        <h5 className="">Price</h5>
        <h6 className="text-xl text-orange-400">$40</h6>
      </div>
      <div className="font-barlow center flex  flex-col mr-10 ml-10">
        <h5 className="">Total</h5>
        <h6 className="text-xl text-orange-400">$40</h6>
      </div>
      <CiMenuKebab
        onClick={(e) => {
          e.stopPropagation();
          setActiveMenu(!activeMenu);
        }}
        className="absolute right-1 top-1/2 -translate-y-1/2 text-3xl hover:text-orange-400 cursor-pointer"
      ></CiMenuKebab>

      {activeMenu && (
        <div
          className="absolute p-4 rounded-xl bg-blur right-1 cursor-pointer top-1/2"
          style={{
            zIndex: "2",
            border: "1px solid #ccc",
          }}
          onMouseLeave={(e) => setActiveMenu(!activeMenu)}
        >
          <ul>
            <li className="start flex items-center p-2 rounded-xl hover:bg-orange-100">
              <AiOutlineEdit className="text-xl font-barlow mr-2 " />
              <span>Edit</span>
            </li>
            <li className="start flex items-center mt-2 bg-orange-300 hover:bg-orange-100 p-2 rounded-xl">
              <AiOutlineEye className="text-xl font-barlow mr-2 " />
              <span>Detail</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrderItem;
