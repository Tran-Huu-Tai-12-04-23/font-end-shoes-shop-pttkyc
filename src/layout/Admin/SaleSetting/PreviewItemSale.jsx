import Util from "../../../util";

function PreviewItemSale({ data }) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 grid-cols-2 grid mb-5 gap-10 relative">
      {data.sale && (
        <div
          className="font-barlow font-bold text-white text-center text-md absolute p-2 bg-orange-400 -top-1 -left-1 tag-sale
        rounded-bl-lg
        rounded-tr-lg
        "
        >
          {data.sale}
        </div>
      )}

      <div className="p-4 flex center flex-col rounded-xl bg-slate-100 w-full">
        <img
          src={data.link_photo}
          className="p-4 rounded-xl center "
          style={{
            width: "10rem",
            height: "10rem",
          }}
        ></img>
        <h1 className="text-md font-barlow font-bold">{data.name}</h1>
        <h1 className="text-md font-barlow mt-2">Status: {data.status}</h1>
        <h1 className="text-md font-barlow mt-2">Size: {data.size}</h1>
        <h1 className="text-md font-barlow mt-2">Quantity: {data.quantity}</h1>
      </div>

      <div className="w-full flex flex-col">
        <div className="w-full">
          <h5 className="font-barlow ">Price:</h5>
          <h5 className="p-4 rounded-xl text-orange-400 font-barlow start  ">
            <span className="text-orange-300 text-sm line-through mr-2">
              ${data.cost}
            </span>
            ${data.price_sale}
          </h5>
        </div>
        <h1 className="font-barlow mt-2">
          Date start :{" "}
          <span className="text-orange-400">{data.date_start}</span>
        </h1>
        <h1 className="font-barlow mt-2">
          Date end : <span className="text-orange-400">{data.date_end}</span>
        </h1>
        <h1 className="font-barlow mt-2">
          Date number :{" "}
          <span className="text-orange-400">
            {Util.calculateDateDifference(data.date_end, data.date_start)} day
            {Util.calculateDateDifference(data.date_end, data.date_start) > 1 &&
              "s"}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default PreviewItemSale;
