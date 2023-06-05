import product4 from "../../assets/img/home/product4.png";
import makeColor from "../../assets/img/home/makeColor.png";
import ButtonCustom from "../../components/Button";

import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function About() {
  const history = useNavigate();
  return (
    <div className="w-full grid gird-cols-2">
      <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 pt-12 pb-10 ">
        <div className="xl:flex lg:flex col-span-1 font-barlow xl:pr-10 lg:pr-10 flex-col  items-center justify-center hidden relative">
          <img src={product4} alt="" className="center" />
          <ButtonCustom
            nameButton="Buy"
            onClick={(e) => history("/shop")}
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              padding: ".2rem 2rem",
              background: "var(--linear)",
              color: "#fff",
            }}
            iconRight={<CiShoppingCart className="text-2xl ml-2" />}
          />
          <div className="absolute h-14 w-1/2 bg-blue-600 center p-4 rounded-md top-0 xl:left-2/3 lg:left-2/3 left-1/2">
            <div className="absolute w-full border-solid border-slate-600 border-2 h-14 bg-blur font-barlow center p-4 rounded-md bottom-2 left-2 text-white text-xl">
              Get up to 30% discount
            </div>
            <img
              src={makeColor}
              className="scale-75 absolute top-1 right-10"
              style={{
                zIndex: -1,
              }}
            ></img>
          </div>
        </div>
        <div className="col-span-1 container l:pl-16 lg:pl-16  flex justify-center flex-wrap">
          <div className="w-full font-barlow  xl:ml-0 lg:ml-0 xl:mr-0 lg:mr-0 mr-auto ml-auto">
            <h1 className=" xl:mt-0 lg:mt-0 mt-10 w-max rounded-sm text-3xl font-bold font-barlow border-b-4 border-solid border-slate-600">
              About us
            </h1>
            <h1 className="ml-auto mr-auto xl:ml-0 xl:mr-0 lg:mr-0 lg:ml-0 text-5xl xl:mt-0 lg:mt-0 mt-5  min-w-15 w-fit">
              We provide
              <span className="ml-2 mr-4 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                HIGH
              </span>
              <br />
              quality shoes
              <div className="rounded-full h-4 w-4 bg-pink-600 inline-block "></div>
            </h1>
            <h5 className="text-2xl opacity-50 xl:w-4/6 md:w-full min-w-15 mt-2">
              Welcome to our online shoe store!
            </h5>
            <h5 className="text-2xl opacity-50 xl:w-4/6 md:w-full min-w-15 mt-2">
              We are dedicated to providing you with the highest quality shoes
              that not only look great but also offer superior comfort and
              durability.
            </h5>
            <h5 className="text-2xl opacity-50 xl:w-4/6 md:w-full min-w-15 mt-2">
              At our store, we believe that every step you take should be a
              stylish and comfortable one.
            </h5>
          </div>
        </div>
        <div className="xl:hidden mt-10 lg:hidden col-span-1 font-barlow xl:pr-10 lg:pr-10 flex-col  items-center justify-center flex relative">
          <img src={product4} alt="" className="center" />
          <ButtonCustom
            nameButton="Buy"
            onClick={(e) => history("/shop")}
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              padding: ".2rem 2rem",
              background: "var(--linear)",
              color: "#fff",
            }}
            iconRight={<CiShoppingCart className="text-2xl ml-2" />}
          />
          <div className="absolute h-14 w-1/2 bg-blue-600 center p-4 rounded-md top-0 xl:left-2/3 lg:left-2/3 left-1/2">
            <div className="absolute w-full border-solid border-slate-600 border-2 h-14 bg-blur font-barlow center p-4 rounded-md bottom-2 left-2 text-white text-xl">
              Get up to 30% discount
            </div>
            <img
              src={makeColor}
              className="scale-75 absolute top-1 right-10"
              style={{
                zIndex: -1,
              }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
