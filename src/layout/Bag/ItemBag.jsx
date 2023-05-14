import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { CiTrash } from "react-icons/ci";

function ItemBag({ data }) {
  const [age, setAge] = useState("36");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
              <span className="text-md mr-2">Size :</span>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label=""
                onChange={handleChange}
                sx={{
                  height: "2rem",
                  fontFamily: `"Barlow Condensed", "sans-serif"`,
                }}
              >
                <MenuItem value={36}>36</MenuItem>
                <MenuItem value={37}>37</MenuItem>
                <MenuItem value={38}>38</MenuItem>
              </Select>
            </div>
            <div className="start flex mt-2 ">
              <span className="text-md mr-2">Quantity :</span>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label=""
                onChange={handleChange}
                sx={{
                  height: "2rem",
                  fontFamily: `"Barlow Condensed", "sans-serif"`,
                }}
              >
                <MenuItem value={36}>36</MenuItem>
                <MenuItem value={37}>37</MenuItem>
                <MenuItem value={38}>38</MenuItem>
              </Select>
            </div>
          </div>
        </div>
        <div>
          <CiTrash className="text-3xl hover:text-red-400 cursor-pointer " />
        </div>
      </div>
    </div>
  );
}

export default ItemBag;
