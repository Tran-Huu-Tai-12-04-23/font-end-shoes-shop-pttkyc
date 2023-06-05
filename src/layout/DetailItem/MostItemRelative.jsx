import Item from "../../components/Item";
import Slider from "../../components/Slider";
import { v4 as uuid } from "uuid";

function MostItemRelative({ itemSale }) {
  return (
    <div className="w-full center mt-20 pl-10 pr-10">
      <div className="xl:w-5/6 w-full mt-20">
        <h1 className="w-fit text-3xl border-b-4 border-solid border-slate-400">
          You might also like
        </h1>
        <Slider autoPlay={true} superLargeDesktop={6} desktop={5}>
          <div className="flex">
            {itemSale.map((item) => {
              return (
                <Item
                  discount={
                    Math.round(100 - +(item.price_sale / item.cost) * 100) + "%"
                  }
                  key={uuid()}
                  item={item}
                  className="w-full flex-shrink-0 scale-90  "
                />
              );
            })}
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default MostItemRelative;
