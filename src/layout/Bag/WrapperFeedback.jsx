import { useState } from "react";
import { v4 as uuid } from "uuid";

import Slider from "../../components/Slider";
import SubFeedBack from "../../components/SubFeedBack";

import Avatar from "@mui/material/Avatar";
import ButtonCustom from "../../components/Button";
import Input from "../../components/Input";

function WrapperFeedback() {
  const [message, setMessage] = useState("");
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <div className="w-full center pl-10 pr-10">
      <div className="xl:w-5/6 w-full mt-10">
        <h1 className="w-fit font-bold font-barlow text-2xl border-b-4 border-solid border-slate-400">
          Feedback Of customer
        </h1>

        {/* <ButtonCustom
          nameButton="Login to feedback"
          sx={{
            marginTop: "1rem",
            padding: ".5rem 2rem",
            border: "1px solid #ccc",
            fontWeight: "bold",
          }}
        ></ButtonCustom> */}

        <div className="start flex mt-10 w-full justify-center items-center pt-10 pb-10">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Input
            style={{
              flex: 1,
              marginLeft: "1rem",
            }}
            value={message}
            placeholder="Enter your feedback"
            onChange={(e) => setMessage(e.target.value)}
          />
          <ButtonCustom
            nameButton="Submit"
            sx={{
              fontWeight: "bold",
              padding: ".5rem 2rem",
              background: "var(--linear)",
              color: "#fff",
              marginLeft: "2rem",
            }}
          />
        </div>

        <div className="w-full mt-20">
          <Slider
            superLargeDesktop={1}
            desktop={1}
            autoPlay={true}
            tablet={1}
            autoPlaySpeed={3000}
          >
            {items.map((item) => {
              return <SubFeedBack key={uuid()} />;
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default WrapperFeedback;
