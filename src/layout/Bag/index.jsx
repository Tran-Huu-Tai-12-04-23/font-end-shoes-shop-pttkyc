import { v4 as uuid } from "uuid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MostItemRelative from "./MostItemRelative";
import Footer from "../../layout/Home/Footer";

import Header from "../../components/Header";
import product1 from "../../assets/img/home/product1.png";
import product2 from "../../assets/img/home/product2.png";
import product3 from "../../assets/img/home/product3.png";
import ButtonCustom from "../../components/Button";

import { RxDividerHorizontal } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsTelephone, BsWallet2 } from "react-icons/bs";
import ItemBag from "./ItemBag";

function Bag() {
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
  const history = useNavigate();

  const [value, setValue] = useState(2);

  return (
    <div className="w-full ">
      <Header />

      <div className="w-full center flex pt-20 pb-20">
        <div className="xl:w-5/6 w-full">
          <div className="w-full">
            <h1
              className="w-fit text-3xl font-barlow font-bold"
              style={{
                borderBottom: "4px solid #ccc",
              }}
            >
              Your bag
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="col-span-1 overflow-hidden">
              {images.map((item) => {
                return <ItemBag key={uuid()} data={item} />;
              })}
            </div>
            <div className="col-span-1 flex justify-start flex-col p-4">
              <div className=" flex flex-col">
                <h1 className="text-3xl font-bold font-barlow">Or Summary</h1>
                <div
                  className="justify-between flex mt-5 pb-4"
                  style={{
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <h5 className="text-xl font-barlow">
                    Items ({images.length}):
                  </h5>
                  <span className="text-xl font-barlow text-orange-400">
                    $ 45
                  </span>
                </div>
                <div
                  className="justify-between flex mt-5 pb-4"
                  style={{
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <h5 className="text-xl font-barlow">Shipping :</h5>
                  <span className="text-xl font-barlow text-orange-400">
                    $ 3
                  </span>
                </div>
                <div
                  className="justify-between font-bold flex mt-5 pb-4"
                  style={{
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <h5 className="text-xl font-barlow">Total :</h5>
                  <span className="text-xl font-barlow text-orange-400">
                    $ 48
                  </span>
                </div>
              </div>
              <div className="w-full mt-10">
                <ButtonCustom
                  onClick={(e) => history("/check-out")}
                  nameButton="Check Out"
                  sx={{
                    color: "#fff",
                    padding: ".5rem 2rem",
                    fontWeight: "bold",
                    background: "var(--linear)",
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
      <MostItemRelative />

      <Footer />
    </div>
  );
}

export default Bag;
