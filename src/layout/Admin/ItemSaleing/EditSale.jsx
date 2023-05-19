import { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Autocomplete,
  Button,
} from "@mui/material";
import Services from "../../../Services";

import ButtonCustom from "../../../components/Button";

import { CiEdit } from "react-icons/ci";
import { useContextStore } from "../../../Store";
import Utils from "../../../util";

function handleGetPriceFromDis(cost, dis) {
  switch (dis) {
    case "2%": {
      return cost - (cost * 2) / 100;
    }
    case "5%": {
      return cost - (cost * 5) / 100;
    }
    case "10%": {
      return cost - (cost * 10) / 100;
    }
    case "12%": {
      return cost - (cost * 12) / 100;
    }
    case "15%": {
      return cost - (cost * 15) / 100;
    }
    default:
      return "invalid dis";
  }
}

function EditSale({ data, setOpenEditSale, setItemSales }) {
  const { setAlert } = useContextStore();
  const discount = ["2%", "5%", "10%", "12%", "15%"];
  const [selectedDiscount, setSelectDiscount] = useState(
    100 - (data?.price_sale / data?.cost) * 100 + "%"
  );
  const [dateStart, setDateStart] = useState(data?.dateStart);
  const [dateEnd, setDateEnd] = useState(data?.dateEnd);
  const [priceSale, setPriceSale] = useState(data?.price_sale);
  const Util = new Utils();

  const handleAutocompleteChange = (event, value) => {
    setSelectDiscount(value);
  };
  useEffect(() => {
    setDateEnd(data?.date_end);
    setDateStart(data?.date_start);
    setSelectDiscount(100 - (data?.price_sale / data?.cost) * 100 + "%");
  }, [data]);

  const saveSale = async () => {
    if (!dateStart) {
      setAlert({
        type: "warning",
        message: "Please select date start!",
      });
      return;
    }
    if (!dateEnd) {
      setAlert({
        type: "warning",
        message: "Please select date end!",
      });
      return;
    }
    if (!selectedDiscount) {
      setAlert({
        type: "warning",
        message: "Please select discount!",
      });
      return;
    }

    let check = Util.isValidDate(dateStart, dateEnd);
    if (check !== true) {
      setAlert({
        type: "warning",
        message: check,
      });
      return;
    }
    const dataUp = {
      dateEnd,
      dateStart,
      price_sale: handleGetPriceFromDis(data.cost, selectedDiscount),
      sale_id: data.sale_id,
    };
    const result = await Services.update("/api/item/sale/edit", dataUp);
    if (result.status === 200) {
      setAlert({
        type: "success",
        message: "Update successfully",
      });
    } else {
      setAlert({
        type: "error",
        message: result.message,
      });
    }
    updateSaleItem(dataUp);
    setOpenEditSale(false);
  };

  function updateSaleItem(data) {
    setItemSales((prev) => {
      return prev.map((item) => {
        if (item.sale_id === data.sale_id) {
          item.date_end = data.dateEnd;
          item.date_start = data.dateStart;
          item.price_sale = data.price_sale;
        }
        return item;
      });
    });
  }
  useEffect(() => {
    setPriceSale(handleGetPriceFromDis(data?.cost, selectedDiscount));
  }, [selectedDiscount]);

  return (
    <div className="w-full min-w-30">
      <div
        className="center text-xl flex pb-4"
        style={{
          borderBottom: "1px solid #ccc",
        }}
      >
        <h1 className="font-barlow font-bold mr-2">Edit sale</h1>
        <CiEdit className="text-4xl"></CiEdit>
      </div>

      <div className="mt-5 font-barlow grid-cols-2 grid gap-5">
        <img src={data?.link_photo}></img>
        <div className="flex flex-col">
          <h1 className="">
            Name: <span className="text-orange-500 ml-2">{data?.name}</span>
          </h1>{" "}
          <h1 className="mt-2">
            Status: <span className="text-orange-500 ml-2">{data?.status}</span>
          </h1>{" "}
          <h1 className="mt-2">
            Size: <span className="text-orange-500 ml-2">{data?.size}</span>
          </h1>
          <h1 className="mt-2">
            Price: <span className="text-orange-500 ml-2">$ {data?.cost}</span>
          </h1>
          <h1 className="mt-2">
            Price sale:{" "}
            <span className="text-orange-500 ml-2">$ {priceSale}</span>
          </h1>
          <FormControl
            fullWidth
            sx={{ m: 1, marginTop: "1rem" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-amount">
              Day start
            </InputLabel>
            <Input
              style={{
                fontFamily: '"Barlow Condensed", "sans-serif"',
              }}
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Day end</InputLabel>
            <Input
              sx={{
                fontFamily: '"Barlow Condensed", "sans-serif"',
              }}
              onChange={(e) => setDateEnd(e.target.value)}
              value={dateEnd}
              type="date"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>
          <div className="col-span-2">
            <Autocomplete
              disablePortal
              options={discount}
              onChange={handleAutocompleteChange}
              value={selectedDiscount}
              sx={{
                m: 1,
                margin: 0,
                marginLeft: "1rem",
                fontFamily: '"Barlow Condensed", "sans-serif"',
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Discount"
                  variant="standard"
                  onChange={(e) => console.log(e.target.value)}
                />
              )}
            />

            <div className="w-full center mt-10">
              <ButtonCustom
                onClick={saveSale}
                nameButton="Save"
                hoverBg={"#ffc966"}
                style={{
                  border: "1px solid #fb923c",
                  background: "#fb923c",
                  color: "#fff",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSale;
