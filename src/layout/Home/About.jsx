import product4 from "../../assets/img/home/product4.png";
import makeColor from "../../assets/img/home/makeColor.png";
import ButtonCustom from "../../components/Button";

import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function About() {
  const history = useNavigate();
  return (
    <div className="w-full grid gird-cols-2 mt-5">
      <div className="grid grid-cols-2 pt-12 pb-10 ">
        <div className="col-span-1 font-barlow pr-10 flex-col  items-center justify-center flex relative">
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
          <div className="absolute  min-w-15 h-14 bg-blue-600 center p-4 rounded-md top-0 left-2/3">
            <div className="absolute min-w-15 border-solid border-slate-600 border-2 h-14 bg-blur font-barlow center p-4 rounded-md bottom-2 left-2 text-white text-xl">
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
        <div className="col-span-1 container pl-16  mx-auto flex justify-center flex-wrap">
          <div className="w-full font-barlow">
            <h1 className="w-max rounded-sm text-3xl font-bold font-barlow border-b-4 border-solid border-slate-600">
              About us
            </h1>
            <h1 className="text-5xl xl:w-4/6 md:w-full min-w-15">
              We provide
              <span className="ml-2 mr-4 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                HIGH
              </span>{" "}
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
      </div>
    </div>
  );
}

export default About;
