import { useState } from "react";

import { v4 as uuid } from "uuid";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function FillInformation({
  age,
  setAge,
  gender,
  setGender,
  cost,
  setCost,
  quantity,
  setQuantity,
  branch,
  name,
  setName,
  setBrand,
  brand,
  des,
  setDes,
  status,
  setStatus,
  color,
  setColor,
  size,
  type,
  setType,
  setSize,
  branchSelected,
  setBranchSelected,
}) {
  const [listOptionColor, setListOptionColor] = useState([
    "black",
    "white",
    "orange",
    "blue",
    "grey",
    "green",
    "other",
  ]);
  const [listBrand, setListBrand] = useState([
    "nike",
    "puma",
    "bitis",
    "adidas",
    "orther",
  ]);
  const [listStatus, setListStatus] = useState(["90%", "95%", "99%", "other"]);
  const [typeShoes, setTypeShoes] = useState([
    "running",
    "sneaker",
    "sandal",
    "boot",
    "other",
  ]);
  const [listSize, setListSize] = useState([
    "36",
    "36.5",
    "37.5",
    "38",
    "39",
    "40",
    "41.5",
    "42",
    "43",
    "44",
    "other",
  ]);
  return (
    <div className="pb-10 w-full grid-cols-2 grid gap-10 ">
      <TextField
        label="Name"
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <FormControl fullWidth variant="standard">
        <InputLabel>Size</InputLabel>
        <Select
          value={size}
          label="Size"
          onChange={(e) => setSize(e.target.value)}
        >
          {listSize.map((size) => {
            return (
              <MenuItem value={size} key={uuid()}>
                {size}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        label="Describe about product"
        multiline
        minRows={10}
        value={des}
        onChange={(e) => setDes(e.target.value)}
      />
      <div>
        <FormControl fullWidth variant="standard">
          <InputLabel>Color</InputLabel>
          <Select
            value={color}
            label="Color"
            onChange={(e) => setColor(e.target.value)}
          >
            {listOptionColor.map((color) => {
              return (
                <MenuItem key={uuid()} value={color}>
                  <div className="start flex ml-5">
                    <h4 className="font-barlow mr-4">{color}</h4>
                    <div
                      className="h-5 w-5 rounded-full p-2 "
                      style={{
                        backgroundColor: color,
                        border: "1px solid #F97B22",
                      }}
                    ></div>
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          variant="standard"
          sx={{
            marginTop: "1rem",
          }}
        >
          <InputLabel>Brand</InputLabel>
          <Select
            value={brand}
            label="brand"
            onChange={(e) => setBrand(e.target.value)}
          >
            {listBrand.map((brand) => {
              return (
                <MenuItem key={uuid()} value={brand}>
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          variant="standard"
          sx={{
            marginTop: "1rem",
          }}
        >
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            {listStatus.map((status) => {
              return (
                <MenuItem key={uuid()} value={status}>
                  {status}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          variant="standard"
          sx={{
            marginTop: "1rem",
          }}
        >
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="type"
            onChange={(e) => setType(e.target.value)}
          >
            {typeShoes.map((type) => {
              return (
                <MenuItem key={uuid()} value={type}>
                  {type}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <TextField
        label="Quantity"
        variant="standard"
        value={quantity}
        type="number"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        onBlur={(e) => {
          if (e.target.value > 0) {
            setQuantity(e.target.value);
          } else {
            setQuantity(1);
          }
        }}
      />
      <TextField
        label="Cost"
        variant="standard"
        value={cost}
        type="number"
        onChange={(e) => {
          setCost(e.target.value);
        }}
        onBlur={(e) => {
          if (e.target.value > 0) {
            setCost(e.target.value);
          } else {
            setCost(1);
          }
        }}
      />

      <FormControl fullWidth variant="standard" sx={{}}>
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          label="Gender"
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
          <MenuItem value={"unisex"}>Unisex</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth variant="standard" sx={{}}>
        <InputLabel>Age</InputLabel>
        <Select
          value={age}
          label="Age"
          onChange={(e) => setAge(e.target.value)}
        >
          <MenuItem value={"adult"}>Adult</MenuItem>
          <MenuItem value={"teenager"}>Teenager</MenuItem>
          <MenuItem value={"kid"}>Kids</MenuItem>
          <MenuItem value={"all"}>All</MenuItem>
        </Select>
      </FormControl>

      <div className="col-span-2">
        {branch.length > 0 && (
          <FormControl fullWidth variant="standard">
            <InputLabel>Branch store</InputLabel>
            <Select
              value={branchSelected}
              label="branch"
              onChange={(e) => setBranchSelected(e.target.value)}
            >
              {branch.map((br) => {
                return (
                  <MenuItem key={uuid()} value={br?.name}>
                    {br?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </div>
    </div>
  );
}

export default FillInformation;
