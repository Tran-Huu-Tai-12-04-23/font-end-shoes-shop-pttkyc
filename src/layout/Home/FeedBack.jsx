import SubFeedBack from "../../components/SubFeedBack";
import { v4 as uuid } from "uuid";

import Slider from "../../components/Slider";

function Feedback() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <div
      className="xl:w-5/6 w-full pt-32 pb-5 "
      style={{
        margin: "0 auto",
      }}
    >
      <div className="w-full center pb-5">
        <h1 className="text-5xl xl:w-4/6 md:w-full min-w-15 font-barlow text-center">
          What our
          <span className="ml-2 mr-4 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            customer says
          </span>
          <div className="rounded-full h-4 w-4 bg-pink-600 inline-block "></div>
        </h1>
      </div>
      <div
        className=""
        style={{
          margin: "0 auto",
        }}
      >
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
  );
}

export default Feedback;
