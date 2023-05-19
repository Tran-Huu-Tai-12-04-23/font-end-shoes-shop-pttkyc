function ItemCheckOut({ data }) {
  return (
    <div
      className="p-4 flex "
      style={{
        borderBottom: "1px solid #ccc",
      }}
    >
      <div className="w-44 h-32 bg-blur rounded-xl mr-4">
        <img
          className="w-full h-full object-contain   "
          src={
            Array.isArray(data.link_photo)
              ? data.link_photo[0]
              : data.link_photo
          }
        />
      </div>

      <div className="flex flex-col items-start w-full font-barlow">
        <div className="justify-between flex w-full">
          <h5 className="text-xl font-barlow font-bold ">{data.name}</h5>
          <div className="text-xl font-barlow   text-orange-400">
            {data.price_sale && (
              <>
                <span className="text-md line-through">${data.cost}</span>
                <span className="text-xl ml-2">${data.price_sale}</span>
              </>
            )}
            {!data.price_sale && <>${data.cost}</>}
          </div>
          {/* {data.price_sale && (
            <div className="bg-orange-400 p-4 rounded-xl">
              {Math.round(data.cost / data.price_sale) * 100 + "%"}
            </div>
          )} */}
        </div>
        <div className="flex flex-col ">
          <div className="start flex mt-2">
            Status : <span className="ml-2"> {data.status}</span>
          </div>

          <div className="start flex ">
            <div
              className="start flex mt-2 mr-4 pr-4 "
              style={{
                borderRight: "1px solid #ccc",
              }}
            >
              <span className="text-md mr-2">Size : {data.size}</span>
            </div>
            <div className="start flex mt-2 ">
              <span className="text-md mr-2">
                Quantity : {data.quantityOrder}
              </span>
            </div>

            {data.quantity === 0 && (
              <div className="p-2 rounded-xl bg-orange-400 mt-2 text-white">
                Pre-order
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCheckOut;
