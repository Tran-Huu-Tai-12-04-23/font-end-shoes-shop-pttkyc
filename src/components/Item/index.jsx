import product3 from "../../assets/img/home/product3.png";
import { AiFillStar } from "react-icons/ai";
import ButtonCustom from "../Button";
import { CiShoppingCart } from "react-icons/ci";

function Item({ className, item, discount = "14%" }) {
  return (
    <div
      className={`p-4 rounded-xl transition-all cursor-pointer hover:shadow-xl bg-gray-50 ${className}
      ${discount ? "relative" : ""}
      `}
    >
      <div className="w-full center flex">
        <img src={product3} className="h-40 scale-150" style={{}}></img>
      </div>
      <h5 className=" font-barlow font-bold text-2xl">{item.name}</h5>
      <div className="start flex text-xl">
        <AiFillStar className="text-2xl text-yellow-400"></AiFillStar>
        <span>4.2</span>
      </div>
      <div className="flex justify-between items-center ">
        <span className="text-orange-600 font-bold font-barlow text-xl">
          $ {item.cost}
        </span>
        <ButtonCustom
          iconRight={
            <CiShoppingCart className="text-4xl text-black hover:text-blue-600" />
          }
        />
      </div>
      {discount && (
        <div
          className="font-barlow font-bold text-white text-center text-xl absolute w-1/6 min-w-3xl max-w-3xl bg-orange-400 -top-1 -left-1 tag-sale
        rounded-bl-lg
        rounded-tr-lg
        "
        >
          {discount}
        </div>
      )}
    </div>
  );
}

export default Item;
