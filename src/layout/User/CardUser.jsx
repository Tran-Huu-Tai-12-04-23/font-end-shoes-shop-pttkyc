import { Avatar } from "@mui/material";

import { BsCalendar4Event, BsBookmarks } from "react-icons/bs";
import { CiMedal } from "react-icons/ci";

function CardUser() {
  return (
    <div
      className="p-4 rounded-xl flex flex-col items-center font-barlow"
      style={{
        border: "1px solid #ccc",
      }}
    >
      <Avatar title="Tran Huu Tai" sx={{ width: 56, height: 56 }}></Avatar>
      <div className="w-full flex flex-col center">
        <h5 className="mt-2">Welcome to </h5>
        <h3 className="text-2xl font-bold text-orange-400"> Tran Huu Tai</h3>
      </div>

      <div className="flex justify-around w-full  gap-10">
        <div>
          <h5 className="mt-2  ml-auto mr-auto w-fit">Day Join </h5>
          <BsCalendar4Event className="mt-2 mb-2 text-5xl ml-auto mr-auto  text-orange-400"></BsCalendar4Event>
          <h3 className="text-2xl font-bold text-orange-400">20/11/2022 </h3>
        </div>
        <div className="flex flex-col items-center ml-10">
          <h5 className="mt-2  ml-auto mr-auto w-fit">Member rank </h5>
          <CiMedal className="mt-2 mb-2 text-5xl ml-auto mr-auto  text-orange-400"></CiMedal>
          <h3 className="text-2xl font-bold text-orange-400">New Member</h3>
        </div>
        <div className="flex flex-col items-center ">
          <h5 className="mt-2  ml-auto mr-auto w-fit">Accumulated points </h5>
          <BsBookmarks className="mt-2 mb-2 text-5xl ml-auto mr-auto  text-orange-400"></BsBookmarks>
          <h3 className="text-2xl font-bold text-orange-400">
            800 <span className="text-slate-500"> 1/1/2023</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CardUser;
