import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Slider from "../../components/Slider";

import Item from "../../components/Item";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Sale() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <div
      className="xl:w-5/6 w-full mt-5 pb-5 "
      style={{
        margin: "0 auto",
      }}
    >
      <h1 className="w-max rounded-sm text-3xl font-bold font-barlow border-b-4 border-solid border-slate-600">
        Sales Item
      </h1>
      <Slider autoPlay={true}>
        {items.map((item) => {
          return (
            <Item
              key={uuid()}
              item={item}
              className="w-full flex-shrink-0 scale-90  "
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default Sale;
