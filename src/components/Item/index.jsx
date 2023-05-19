import product3 from "../../assets/img/home/product3.png";
import { AiFillStar } from "react-icons/ai";
import ButtonCustom from "../Button";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useContextStore } from "../../Store";

function Item({ className, item, discount }) {
  const history = useNavigate();
  const { setIdProductDetail, itemsBag, setItemsBag, setAlert } =
    useContextStore();

  const handleAddItemToBag = (item) => {
    setItemsBag((prev) => {
      return [...prev, item];
    });
    localStorage.setItem("bag", JSON.stringify([...itemsBag, item]));
    setAlert({
      type: "success",
      message: "Add new item to your bag!",
    });
  };

  return (
    <div
      onClick={(e) => {
        setIdProductDetail(item?.item_id);
        history("/detail-item");
        window.scrollTo(0, {
          behavior: "smooth",
        });
      }}
      className={`p-4 rounded-xl transition-all cursor-pointer hover:shadow-xl  ${className}
      ${discount ? "relative" : ""}
      `}
      style={{
        backgroundColor: "#f6f6f6",
      }}
    >
      <div className="w-full center flex">
        <img src={item.link_photo} className="h-40 w-40 " style={{}}></img>
      </div>
      <h5 className=" font-barlow font-bold text-xl mt-2 text-ellipsis h-12">
        {item.name}
      </h5>
      <div className="start flex text-sm font-barlow mt-2">
        <div className="start flex">
          Status: <span className="ml-2">{item.status}</span>
        </div>
        <div
          className="start flex ml-2 pl-2 "
          style={{
            borderLeft: "1px solid #ccc",
          }}
        >
          Size: <span className="ml-2">{item.size}</span>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <span className="text-orange-600 font-bold font-barlow text-xl">
          $ {item.cost}
        </span>
        <ButtonCustom
          onClick={(e) => {
            e.stopPropagation();
            handleAddItemToBag(item);
          }}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
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
