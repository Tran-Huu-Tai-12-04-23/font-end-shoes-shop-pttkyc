import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Services from "../../../Services";

import { v4 as uuid } from "uuid";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ButtonCustom from "../../../components/Button";
import { useContextStore } from "../../../Store";

function Detail({ productDetail, setActive, setShowLoad }) {
  const { setAlert } = useContextStore();
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState(1);
  const [age, setAge] = useState("all");
  const [gender, setGender] = useState("male");
  const [checkChange, setCheckChange] = useState(false);
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

  const history = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!productDetail) {
      setActive(1);
      setAlert({
        type: "warning",
        message: "Please select a product",
      });
    }
  }, []);

  useEffect(() => {
    const initData = async () => {
      const res = await Services.getDataFromApi(
        "/api/item/detail",
        `/?id=${productDetail}`
      );
      if (res.status === 200) {
        setData(JSON.parse(res.data));
        const {
          name,
          des,
          brand,
          status,
          size,
          color,
          type,
          quantity,
          cost,
          age,
          gender,
        } = JSON.parse(res.data);
        setName(name);
        setDes(des);
        setBrand(brand);
        setStatus(status);
        setSize(size);
        setColor(color);
        setType(type);
        setQuantity(quantity);
        setCost(cost);
        setAge(age);
        setGender(gender);
      }
    };
    initData();
  }, []);
  const checkInformation = () => {
    if (
      !name ||
      !des ||
      !brand ||
      !status ||
      !size ||
      !color ||
      !type ||
      !quantity ||
      !cost ||
      !age ||
      !gender
    ) {
      return false;
    }
    return true;
  };
  const handleSaveChange = async () => {
    setShowLoad(true);
    if (checkChange && checkInformation()) {
      const result = await Services.update("/api/item/update", {
        name,
        des,
        brand,
        status,
        size,
        color,
        type,
        quantity,
        cost,
        age,
        gender,
        item_id: productDetail,
      });

      if (result.status === 200) {
        setAlert({
          type: "success",
          message: "Save change successfully!",
        });
        setActive(1);
      } else {
        setAlert({
          type: "error",
          message: "Save change failed!",
        });
      }
      setShowLoad(false);
    }
  };

  return (
    <>
      <div className="w-full mt-10">
        <div className="xl:w-5/6 w-full center flex flex-col pb-20">
          <h1 className="font-barlow font-bold text-xl">
            Detail for product id:
            <span className="ml-2 text-orange-400">{productDetail}</span>{" "}
          </h1>

          <div className="grid grid-cols-3 mt-10 gap-4">
            {data &&
              data?.link_photo?.map((pic) => {
                return (
                  <div
                    key={uuid()}
                    style={{
                      background: "#f5f5f5",
                    }}
                    className="p-4 rounded-xl center flex"
                  >
                    <img
                      src={pic}
                      style={{
                        width: "15rem",
                        height: "15rem",
                        objectFit: "contain",
                        borderRadius: "1rem",
                      }}
                    ></img>
                  </div>
                );
              })}
          </div>

          <div className="xl:w-5/6 w-full mt-10 grid grid-cols-2 gap-10 p-4 rounded-xl bg-slate-50">
            <TextField
              label="Name"
              variant="standard"
              value={name}
              onChange={(e) => {
                setCheckChange(true);
                setName(e.target.value);
              }}
            />
            <FormControl fullWidth variant="standard">
              <InputLabel>Size</InputLabel>
              <Select
                value={size}
                label="Size"
                onChange={(e) => {
                  setCheckChange(true);
                  setSize(e.target.value);
                }}
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
              onChange={(e) => {
                setCheckChange(true);
                setDes(e.target.value);
              }}
            />{" "}
            <div className="w-full">
              <FormControl fullWidth variant="standard">
                <InputLabel>Color</InputLabel>
                <Select
                  value={color}
                  label="Color"
                  onChange={(e) => {
                    setCheckChange(true);
                    setColor(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setCheckChange(true);
                    setBrand(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setCheckChange(true);
                    setStatus(e.target.value);
                  }}
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
                sx={{ marginTop: "1rem" }}
              >
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  label="type"
                  onChange={(e) => {
                    setCheckChange(true);
                    setType(e.target.value);
                  }}
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
                setCheckChange(true);
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
                setCheckChange(true);
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
                onChange={(e) => {
                  setCheckChange(true);
                  setGender(e.target.value);
                }}
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
                onChange={(e) => {
                  setAge(e.target.value);
                  setCheckChange(true);
                }}
              >
                <MenuItem value={"adult"}>Adult</MenuItem>
                <MenuItem value={"teenager"}>Teenager</MenuItem>
                <MenuItem value={"kid"}>Kids</MenuItem>
                <MenuItem value={"all"}>All</MenuItem>
              </Select>
            </FormControl>
            {checkChange && (
              <div className="col-span-2 center flex">
                <ButtonCustom
                  nameButton="Save change"
                  style={{
                    marginTop: "2rem",
                    background: "#f97316",
                    marginLeft: "auto",
                    color: "#fff",
                  }}
                  onClick={handleSaveChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
