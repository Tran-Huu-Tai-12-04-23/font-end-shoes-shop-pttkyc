function ItemCheckOut({ data }) {
  return (
    <div
      className="p-4 flex "
      style={{
        borderBottom: "1px solid #ccc",
      }}
    >
      <div className="w-44 h-32 bg-blur rounded-xl mr-4">
        <img className="w-full h-full object-contain   " src={data} />
      </div>

      <div className="flex flex-col items-start w-full font-barlow">
        <div className="justify-between flex w-full">
          <h5 className="text-xl font-barlow font-bold ">Nike</h5>
          <h5 className="text-xl font-barlow  text-orange-400">$ 42</h5>
        </div>
        <div className="flex flex-col ">
          <div className="start flex mt-2">
            Status : <span className="ml-2"> 95%</span>
          </div>

          <div className="start flex ">
            <div
              className="start flex mt-2 mr-4 pr-4 "
              style={{
                borderRight: "1px solid #ccc",
              }}
            >
              <span className="text-md mr-2">Size : 36</span>
            </div>
            <div className="start flex mt-2 ">
              <span className="text-md mr-2">Quantity :1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCheckOut;
