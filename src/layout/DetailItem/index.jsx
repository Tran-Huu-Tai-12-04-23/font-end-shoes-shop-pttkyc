import { v4 as uuid } from "uuid";
import { useState } from "react";
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

function DetailItem() {
  const images = [
    product1,
    product2,
    product3,
    product1,
    product2,
    product3,
    product2,
  ];
  const remainingProduct = 3;
  const sizes = [36, 37, 38, 39, 40];
  const [size, setSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const [value, setValue] = useState(2);

  return (
    <div className="w-full ">
      <Header />
      <div className="w-full center flex pt-20 pb-20">
        <div className="xl:w-5/6 w-full">
          <div className="grid grid-cols-2 gap-20">
            <div className="col-span-1 overflow-hidden">
              <ShowImageProduct data={images} />
            </div>
            <div className="col-span-1 flex justify-center flex-col p-4">
              <h1 className="text-3xl font-barlow font-bold">Nike air max 1</h1>
              <div className="start flex font-bold  text-xl font-barlow mt-4 mb-4 p-2 border-slate-400 border-solid border-b-2">
                Status :
                <span className="text-orange-500 font-bold font-barlow ml-2 text-xl">
                  95%
                </span>
              </div>
              <div className="start font-bold flex text-xl font-barlow mt-4 mb-4 p-2 border-slate-400 border-solid border-b-2">
                Cost :
                <span className="text-orange-500 font-bold font-barlow ml-2 text-xl">
                  $ 42.2
                </span>
              </div>
              <div className="flex-col font-bold flex text-xl font-barlow mt-4 mb-4 p-2 border-slate-400 border-solid border-b-2">
                <h5>Size :</h5>
                <div className="flex flex-wrap">
                  {sizes.map((sizeI) => {
                    return (
                      <ButtonCustom
                        key={uuid()}
                        nameButton={sizeI}
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          padding: ".5rem",
                          border: "1px solid #ccc",
                          borderRadius: "1rem",
                          margin: ".5rem",
                          borderColor: size === sizeI ? "#fb923c" : "#ccc",
                        }}
                        onClick={(e) => setSize(sizeI)}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="start font-bold flex text-xl font-barlow mt-4 mb-4 p-2 border-slate-400 border-solid border-b-2">
                <h5>Quantity :</h5>
                <div
                  className="pt-1 pb-1 pl-2 pr-2 rounded-xl ml-2 start flex "
                  style={{
                    border: "1px solid #ccc",
                  }}
                >
                  <IoMdAdd
                    onClick={(e) => {
                      if (quantity < remainingProduct) {
                        setQuantity(quantity + 1);
                      }
                    }}
                    className="text-xl cursor-pointer hover:bg-slate-300 rounded-xl"
                  />
                  <input
                    type="number"
                    className="text-center w-10 hide-button-change reset"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (e.target.value > 0 && remainingProduct) {
                        setQuantity(e.target.value);
                      } else {
                        setQuantity(1);
                      }
                    }}
                  />
                  <RxDividerHorizontal
                    onClick={(e) => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    className="text-xl cursor-pointer hover:bg-slate-300  rounded-xl"
                  />
                </div>
              </div>
              <div className="start font-bold flex text-xl font-barlow mt-4 mb-4 p-2 border-slate-400 border-solid border-b-2">
                Remaining products :
                <span className="text-orange-500 font-bold font-barlow ml-2 text-xl">
                  {remainingProduct}
                </span>
              </div>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                sx={{
                  fontSize: "2rem",
                }}
              />

              <div className="w-full mt-10">
                <ButtonCustom
                  nameButton="Add to cart"
                  sx={{
                    padding: ".5rem 2rem",
                    fontWeight: "bold",
                    marginRight: "1rem",
                  }}
                />
                <ButtonCustom
                  nameButton="Buy now"
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

              <div className="w-full">
                <ButtonCustom
                  nameButton="Detail about it"
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "1px solid #fa8533",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-evenly bg-blur grid-cols-3 p-10">
        <div className="flex flex-col items-center col-span-1">
          <BsWallet2 className="text-6xl text-black " />
          <h5 className="text-3xl font-barlow font-bold text-orange-500">
            100% Genuine commitment
          </h5>
          <h5 className="text-xl font-barlow text-black">100% Authentic</h5>
        </div>
        <div className="flex flex-col items-center col-span-1">
          <CiDeliveryTruck className="text-7xl text-back " />
          <h5 className="text-3xl font-barlow font-bold text-orange-500">
            Delivery fast
          </h5>
          <h5 className="text-xl font-barlow  text-black">3 - 4 N</h5>
        </div>
        <div className="flex flex-col items-center col-span-1">
          <BsTelephone className="text-6xl text-back " />
          <h5 className="text-3xl font-barlow font-bold text-orange-500">
            Hotline free 24/24
          </h5>
          <h5 className="text-xl font-barlow  text-black">Call now</h5>
        </div>
      </div>
      {/* begin feed back */}
      <WrapperFeedback />

      <MostItemRelative />

      <Footer />
    </div>
  );
}

export default DetailItem;
