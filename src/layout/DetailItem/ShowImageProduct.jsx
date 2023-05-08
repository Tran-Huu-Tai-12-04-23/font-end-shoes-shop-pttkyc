import { v4 as uuid } from "uuid";
import Slider from "../../components/Slider";

function ShowImageProduct({ data = [] }) {
  return (
    <Slider
      autoPlaySpeed={0}
      autoPlay={false}
      superLargeDesktop={1}
      desktop={1}
      tablet={1}
      dot={true}
    >
      {data.map((item) => {
        return (
          <div key={uuid()} className="w-full  rounded-xl  ">
            <img
              className="rounded-xl xl:w-4/6 lg:w-5/6 w-full col-span-1 object-contain "
              src={item}
              style={{
                margin: "0 auto",
              }}
            ></img>
          </div>
        );
      })}
    </Slider>
  );
}

export default ShowImageProduct;
