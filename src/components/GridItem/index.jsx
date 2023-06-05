import Item from "../../components/Item";
import { v4 as uuid } from "uuid";

function GridItem({ data = [], showFilter = false }) {
  return (
    <>
      {data.map((item) => {
        return (
          <Item
            discount={
              item.price_sale
                ? Math.round(100 - (item.price_sale / item.cost) * 100) + "%"
                : false
            }
            key={uuid()}
            item={item}
            className={`scale-90 ${
              showFilter
                ? "xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-full w-full"
                : "xl:w-1/5 lg:w-1/4 md:w-1/2 sm:w-full w-full"
            }`}
            style={{
              transition: ".4s",
            }}
          />
        );
      })}
    </>
  );
}

export default GridItem;
