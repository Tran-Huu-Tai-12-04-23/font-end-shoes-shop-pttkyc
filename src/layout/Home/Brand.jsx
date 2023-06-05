import bitisLogo from "../../assets/img/home/bitisLogo.png";
import nikeLogo from "../../assets/img/home/nikeLogo.png";
import ButtonCustom from "../../components/Button";
import { BiRightArrowAlt } from "react-icons/bi";

function Brand() {
  return (
    <div
      className="xl:w-5/6 w-full mt-5 pb-5"
      style={{
        margin: "0 auto",
      }}
    >
      <h1 className="w-max rounded-sm text-3xl font-bold font-barlow border-b-4 border-solid border-slate-600">
        Brands
      </h1>
      <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 p-4 gap-10">
        <div className="flex-col ">
          <div className="rounded-2xl p-4 h-48 bg-slate-200 center hover:shadow-xl cursor-pointer flex-col">
            <img className="object-contain w-40  " src={bitisLogo}></img>
          </div>
        </div>
        <div className="flex-col ">
          <div className="rounded-2xl p-4 h-48 bg-slate-200 center hover:shadow-xl cursor-pointer flex-col">
            <img className="object-contain w-40  " src={nikeLogo}></img>
          </div>
        </div>
        <div className="flex-col ">
          <div className="rounded-2xl p-4 h-48 bg-slate-200 center hover:shadow-xl cursor-pointer flex-col">
            <img
              className="object-contain w-40 "
              src="https://images-na.ssl-images-amazon.com/images/S/abs-image-upload-na/3/AmazonStores/A1F83G8C2ARO7P/971f54abb384663b993701f80b0e634a.w722.h722.png"
            ></img>
          </div>
        </div>
        <div className="flex-col ">
          <div className="rounded-2xl p-4 h-48 bg-slate-200 center hover:shadow-xl cursor-pointer flex-col">
            <img
              className="object-contain w-40 "
              src="https://cdn.shopify.com/s/files/1/0456/5070/6581/collections/Logo_Brand-02_1200x1200.png?v=1621918720"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brand;
