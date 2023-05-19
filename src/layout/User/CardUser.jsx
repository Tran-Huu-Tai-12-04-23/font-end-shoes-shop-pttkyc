import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";

import { BsCalendar4Event, BsBookmarks } from "react-icons/bs";
import { CiMedal } from "react-icons/ci";
import Services from "../../Services";
import { UseAuthUserContext } from "../../AuthUser";

function CardUser({ data }) {
  const [point, setPoint] = useState(0);
  const { user } = UseAuthUserContext();
  useEffect(() => {
    const intiPoint = async () => {
      const result = await Services.getDataFromApi(
        "/api/user/get-point-user/" + `?id=${user?.id}`
      );
      if (result.status === 200) {
        setPoint(result.data);
      }
    };
    intiPoint();
  }, [user]);
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
        <h3 className="text-2xl font-bold text-orange-400">
          {data.first_name
            ? data.first_name + " " + data.last_name
            : data.username}
        </h3>
      </div>

      <div className="flex justify-around w-full  gap-10">
        <div className="w-1/3">
          <h5 className="mt-2  ml-auto mr-auto w-fit">Day Join </h5>
          <BsCalendar4Event className="mt-2 mb-2 text-5xl ml-auto mr-auto  text-orange-400"></BsCalendar4Event>
          <h3 className=" font-bold text-orange-400 text-sm text-center">
            {data.create_at}
          </h3>
        </div>
        <div className="flex flex-col items-center w-1/3 ">
          <h5 className="mt-2  ml-auto mr-auto w-fit">Member rank </h5>
          <CiMedal className="mt-2 mb-2 text-5xl ml-auto mr-auto  text-orange-400"></CiMedal>
          <h3 className="text-sm font-bold text-orange-400">New Member</h3>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <h5 className="mt-2  ml-auto mr-auto w-fit">Your points </h5>
          <BsBookmarks className="mt-2 mb-2 text-5xl ml-auto mr-auto  text-orange-400"></BsBookmarks>
          <h3 className="text-sm font-bold text-orange-400">
            <span className="text-slate-500 ">
              {" "}
              {point ? parseFloat(point).toFixed(2) : 0}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CardUser;
