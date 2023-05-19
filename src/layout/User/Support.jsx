import { FcOnlineSupport } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephoneOutbound } from "react-icons/bs";

function Support({}) {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="start flex w-full p-4 rounded-xl bg-slate-300">
        <FcOnlineSupport className="text-5xl" />
        <div className=" ml-2">
          <h5 className="text-xl font-barlow font-bold">Shopping Advice</h5>
          <h6 className="text-sm text-orange-400 font-barlow ">
            (Available 8:00 am - 9:00 pm )
          </h6>
        </div>
      </div>
      <div className="start flex w-full p-4 rounded-xl bg-slate-300">
        <AiOutlineMail className="text-5xl" />
        <div className=" ml-2">
          <h5 className="text-xl font-barlow font-bold">Email</h5>
          <h6 className="text-sm text-orange-400 font-barlow ">
            (abc.cskh@.com.vn)
          </h6>
        </div>
      </div>
      <div className="start flex w-full p-4 rounded-xl bg-slate-300">
        <BsTelephoneOutbound className="text-5xl" />
        <div className=" ml-2">
          <h5 className="text-xl font-barlow font-bold">Hotline</h5>
          <h6 className="text-sm text-orange-400 font-barlow ">(1900. 1009)</h6>
        </div>
      </div>
    </div>
  );
}

export default Support;
