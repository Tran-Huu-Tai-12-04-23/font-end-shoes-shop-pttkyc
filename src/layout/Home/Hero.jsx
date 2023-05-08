import CarouselComponent from "../../components/CarouselComponent";
import ButtonCustom from "../../components/Button";

import { BsArrowRightShort } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

import product1 from "../../assets/img/home/product1.png";
import product2 from "../../assets/img/home/product2.png";
import product3 from "../../assets/img/home/product3.png";

function Hero() {
  return (
    <>
      <div className="w-full pt-12">
        <CarouselComponent
          data={[
            "https://1.bp.blogspot.com/-B-xcs2EQlts/X9wiLAMeOgI/AAAAAAAAAXQ/V9UFzzTEoYsgbdWnLa1GQVlzirV8At33gCLcBGAsYHQ/s1600/banner-3.jpg",
            "https://1.bp.blogspot.com/-lfu7auTdDs4/X9weRwkeHQI/AAAAAAAAAWo/7JHpU0vX6L8657KI26x00JFUMGpzrGHsgCLcBGAsYHQ/s1600/banner-1.jpg",
            "https://1.bp.blogspot.com/-cie45kpeK3M/X9wd3e2UI5I/AAAAAAAAAWg/ufhsChpEGUgZoTXzjqnvDm_d16aBMZdKACLcBGAsYHQ/s0/banner-2.jpg",
          ]}
        ></CarouselComponent>
      </div>
      <div className="grid grid-cols-2 pt-12 ">
        <div className="col-span-1 font-barlow flex-col  items-center justify-center flex relative">
          <h1 className="text-5xl xl:w-4/6 md:w-full min-w-15 mb-2">
            Looking for new<br></br> shoes in
            <span className="ml-4 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              2023
            </span>
            <div className="rounded-full h-4 w-4 bg-pink-600 inline-block "></div>
          </h1>
          <h5 className="text-2xl opacity-50 xl:w-4/6 md:w-full min-w-15">
            The styles of shoe available to consumers are endless and profit
            also endless.
          </h5>
          <div className="start flex xl:w-4/6 md:w-full">
            <ButtonCustom
              nameButton="Explore more"
              style={{
                padding: " .5rem 1rem",
                fontWeight: "bold",
                background: "var(--linear)",
                color: "#fff",
                marginTop: "2rem",
              }}
              iconRight={<BsArrowRightShort className="text-2xl" />}
            />
          </div>
        </div>
        <div className="col-span-1 container  mx-auto flex justify-center flex-wrap">
          <div className="w-2/5 show-icon max-h-60 hover:bg-slate-200 cursor-pointer transition-all  bg-slate-100  rounded-xl  m-5">
            <img
              src={product1}
              alt=""
              className="w-full h-full object-contain show-icon"
            />
            <FiSearch className="icon hover:text-white hover:scale-125" />
          </div>
          <div className="w-2/5 show-icon max-h-60 hover:bg-slate-200 cursor-pointer transition-all  bg-slate-100  rounded-xl  m-5">
            <img
              src={product2}
              alt=""
              className="w-full h-full object-contain show-icon"
            />
            <FiSearch className="icon hover:text-white hover:scale-125" />
          </div>
          <div className="w-2/5 show-icon max-h-60 hover:bg-slate-200 cursor-pointer transition-all  bg-slate-100  rounded-xl m-5">
            <img
              src={product3}
              alt=""
              className="w-full h-full object-contain show-icon"
            />
            <FiSearch className="icon hover:text-white hover:scale-125" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
