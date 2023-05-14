import Avatar from "@mui/material/Avatar";
import { AiFillStar } from "react-icons/ai";

function SubFeedBack() {
  return (
    <div
      className="w-full select-none flex-shrink-0 scale-90 item  flex flex-col items-center justify-center max-w-2xl font-bold font-barlow"
      style={{
        margin: "0 auto",
      }}
    >
      <Avatar
        alt="Cindy Baker"
        src="https://vcdn1-giaitri.vnecdn.net/2022/09/23/-2181-1663929656.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=apYgDs9tYQiwn7pcDOGbNg"
      />
      <h5 className="text-xl text-center p-4 select-none font-normal">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        ndustry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer.
      </h5>
      <div className="center flex">
        <AiFillStar className="text-yellow-400" />
        <AiFillStar className="text-yellow-400" />
        <AiFillStar className="text-yellow-400" />
        <AiFillStar className="text-yellow-400" />
        <AiFillStar className="text-yellow-400" />
      </div>
    </div>
  );
}

export default SubFeedBack;
