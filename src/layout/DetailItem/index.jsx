import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

import WrapperFeedback from "./WrapperFeedback";
import MostItemRelative from "./MostItemRelative";
import Footer from "../../layout/Home/Footer";

import Header from "../../components/Header";
import ShowImageProduct from "./ShowImageProduct";
import product1 from "../../assets/img/home/product1.png";
import product2 from "../../assets/img/home/product2.png";
import product3 from "../../assets/img/home/product3.png";
import ButtonCustom from "../../components/Button";

import { RxDividerHorizontal } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsTelephone, BsWallet2 } from "react-icons/bs";
import { useContextStore } from "../../Store";

import Services from "../../Services";
import { useNavigate } from "react-router-dom";

function DetailItem() {
  const { idProductDetail, setAlert, itemSale, setItemsBag, itemsBag } =
    useContextStore();
  const [item, setItem] = useState([]);

  const remainingProduct = 3;
  const sizes = [36, 37, 38, 39, 40];
  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const [value, setValue] = useState(2);
  const history = useNavigate();
  const addToCart = () => {
    setItemsBag((prev) => {
      return [...prev, item];
    });
    localStorage.setItem("bag", JSON.stringify([...itemsBag, item]));
    setAlert({
      type: "success",
      message: "Add new item to your bag!",
    });
  };
  const checkOutItem = () => {
    addToCart();
    history("/check-out");
  };
  useEffect(() => {
    const handleGetDetailItem = async () => {
      const res = await Services.getDataFromApi(
        "/api/item/detail/",
        `?id=${idProductDetail}`
      );
      if (res.status === 200) {
        setItem(JSON.parse(res.data));
      } else {
        setAlert({
          type: "error",
          message: "Server is error. Please try again",
        });
      }
    };
    handleGetDetailItem();
  }, [idProductDetail]);

  useEffect(() => {
    if (!idProductDetail) {
      history("/");
    }
  }, []);
  return (
    <div className="w-full ">
      <Header />
      <div className="w-full center flex pt-20 pb-20 pl-10 pr-10">
        <div className="xl:w-5/6 w-full">
          <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-20">
            <div className="col-span-1 overflow-hidden">
              <ShowImageProduct data={item.link_photo} />
            </div>
            <div className="col-span-1 flex justify-center flex-col p-4">
              <h1 className="text-2xl font-barlow font-bold">
                {item.price_sale && (
                  <span className="p-2 rounded-xl bg-orange-400 font-bold text-white font-barlow ml-2 mr-2 text-md">
                    Discount up to :{" "}
                    {Math.round((item.price_sale / item.cost) * 100) + "%"}
                  </span>
                )}
                {item.name}
              </h1>
              <h5 className="font-barlow text-sm text-gray-500 mt-2">
                Description : {item.des}
              </h5>
              <div className="start flex  text-xl font-barlow mt-4 mb-4 p-2 border-slate-400 border-solid border-b-2">
                Status :
                <span className="text-orange-500 font-bold font-barlow ml-2 text-xl">
                  {item.status}
                </span>
              </div>
              <div className="start flex text-xl font-barlow mt-4 mb-4 p-2 border-slate-400 border-solid border-b-2">
                Cost :{" "}
                {item.price_sale && (
                  <>
                    <span className="line-through font-bold text-orange-500 font-barlow ml-2 text-md">
                      ${item.cost}
                    </span>
                    <span className="font-bold text-orange-500 font-barlow ml-2 text-xl">
                      ${item.price_sale}
                    </span>
                  </>
                )}
                {!item.price_sale && (
                  <span className="font-bold text-orange-500 font-barlow ml-2 text-xl">
                    ${item.cost}
                  </span>
                )}
              </div>
              <div className="start flex text-xl font-barlow mt-4 mb-4 p-2 border-slate-400 border-solid border-b-2">
                <h5>Size :</h5>
                <h6 className="ml-2 font-bold">{item.size}</h6>
              </div>

              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                sx={{
                  fontSize: "2rem",
                  marginTop: "1rem",
                }}
              />

              <div className="w-fit mt-10 md:mr-auto md:ml-auto xl:mr-auto xl:ml-auto">
                <ButtonCustom
                  onClick={addToCart}
                  nameButton="Add to cart"
                  sx={{
                    padding: ".5rem 2rem",
                    fontWeight: "bold",
                    marginRight: "1rem",
                  }}
                />
                <ButtonCustom
                  nameButton={
                    item.quantity <= 0
                      ? "Item sold-out (Pre - order)"
                      : "Buy now"
                  }
                  onClick={checkOutItem}
                  sx={{
                    color: "#fff",
                    padding: ".5rem 2rem",
                    fontWeight: "bold",
                    background: "var(--linear)",
                  }}
                />
              </div>

              <div className="start font-bold flex text-xl font-barlow mt-4 mb-4 p-2 border-slate-400 border-solid border-b-2">
                Or call numbers here:
                <span className="text-orange-500 font-bold font-barlow ml-2 text-xl">
                  123-xxx-123
                </span>
                <BsTelephone className="text-4xl ml-2 phone" />
                <span className="text-blue-500 font-bold font-barlow ml-2 text-xl">
                  (hotline free)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid gap-10 justify-evenly bg-blur xl:grid-cols-3 lg:grid-cols-3 grid-cols-1 p-10 ">
        <div className="flex flex-col items-center">
          <BsWallet2 className="text-6xl text-black " />
          <h5 className="text-3xl font-barlow font-bold text-orange-500">
            100% Genuine commitment
          </h5>
          <h5 className="text-xl font-barlow text-black">100% Authentic</h5>
        </div>
        <div className="flex flex-col items-center">
          <CiDeliveryTruck className="text-7xl text-back " />
          <h5 className="text-3xl font-barlow font-bold text-orange-500">
            Delivery fast
          </h5>
          <h5 className="text-xl font-barlow  text-black">3 - 4 N</h5>
        </div>
        <div className="flex flex-col items-center">
          <BsTelephone className="text-6xl text-back " />
          <h5 className="text-3xl font-barlow font-bold text-orange-500">
            Hotline free 24/24
          </h5>
          <h5 className="text-xl font-barlow  text-black">Call now</h5>
        </div>
      </div>
      {/* begin feed back */}
      <WrapperFeedback />

      <MostItemRelative itemSale={itemSale} />

      <Footer />
    </div>
  );
}

export default DetailItem;
