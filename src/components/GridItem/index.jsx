import Item from "../../components/Item";
import { v4 as uuid } from "uuid";

function GridItem({ data = [], showFilter = false }) {
  return (
    <>
      {data.map((item) => {
        return (
          <Item
            key={uuid()}
            item={item}
            className={`scale-90 ${
              showFilter
                ? "xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-full"
                : "xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-full"
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
