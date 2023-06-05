import ButtonCustom from "../../components/Button";
import Input from "../../components/Input";

import footer from "../../assets/img/home/footer.svg";

import { BiRightArrowAlt } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineInstagram, AiFillYoutube } from "react-icons/ai";
import {} from "react-icons/ai";

function Footer() {
  return (
    <div
      className="w-full mt-32 bg-blue-500 flex center pb-10 pt-30"
      style={{
        borderTopLeftRadius: "2rem",
        borderTopRightRadius: "2rem",
      }}
    >
      <div className="w-5/6 pt-12 pb-5 text-white">
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 grid-cols-1">
          <div className="xl:items-start lg:items-start font-barlow flex-col flex items-center justify-center">
            <h5 className="font-bold tracking-wider font-barlow">FAQs</h5>
            <ul className="mt-2">
              <li className="pt-2 rounded-xl hover:text-blue-200 cursor-pointer">
                Get the app
              </li>
              <li className="pt-2 rounded-xl hover:text-blue-200 cursor-pointer">
                Contact us
              </li>
              <li className="pt-2 rounded-xl hover:text-blue-200 cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>
          <div className="">
            <img
              src={footer}
              alt="footer"
              className="ml-auto mr-auto mt-4 min-w-1/2 w-4/6"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-barlow font-bold text-xl mb-2">Contact us</h1>
            <Input
              placeholder="Enter message"
              iconLeft={
                <BiRightArrowAlt
                  className="text-3xl absolute "
                  style={{
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              }
            />
            <ButtonCustom
              nameButton="Send"
              style={{
                color: "#fff",
                marginTop: "1rem",
                padding: ".2rem 2rem",
                background: "var(--linear)",
                maxWidth: "8rem",
              }}
            />
            <div className=" mt-4 ml-auto mr-auto flex">
              <div className="w-fit mr-4 rounded-full flex justify-center items-center bg-slate-300 p-2 hover:bg-slate-200 cursor-pointer">
                <FaFacebookF className="text-blue-600" />
              </div>
              <div className="w-fit mr-4 rounded-full flex justify-center items-center bg-slate-300 p-2 hover:bg-slate-200 cursor-pointer">
                <AiOutlineInstagram className="text-red-400" />
              </div>
              <div className="w-fit mr-4 rounded-full flex justify-center items-center bg-slate-300 p-2 hover:bg-slate-200 cursor-pointer">
                <AiFillYoutube className="text-red-600" />
              </div>
              <div className="w-fit mr-4 rounded-full flex justify-center items-center bg-slate-300 p-2 hover:bg-slate-200 cursor-pointer">
                <BsTwitter className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
