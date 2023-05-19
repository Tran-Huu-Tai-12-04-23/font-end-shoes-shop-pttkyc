import { useEffect, useRef, useState } from "react";

import { v4 as uuid } from "uuid";
import Slider from "../../components/Slider";

import Item from "../../components/Item";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useContextStore } from "../../Store";

function Sale() {
  const { itemSale } = useContextStore();

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
        {itemSale.map((item) => {
          return (
            <Item
              discount={Math.round((item.price_sale / item.cost) * 100) + "%"}
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
