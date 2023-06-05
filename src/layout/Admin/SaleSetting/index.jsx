import { useEffect, useState, memo } from "react";
import Services from "../../../Services";
import { v4 as uuid } from "uuid";
import Util from "../../../util";

import Table from "../../../components/Table";
import ButtonCustom from "../../../components/Button";
import { useContextStore } from "../../../Store";
import {
  TextField,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Autocomplete,
} from "@mui/material";

import PreviewItemSale from "./PreviewItemSale";
const discount = ["2%", "5%", "10%", "12%", "15%"];
const columns = [
  {
    field: "item_id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "link_photo",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <div className="p-4 rounded-xl">
        <img
          src={params.row.link_photo}
          alt="product"
          style={{ width: 50, height: 50 }}
        />
      </div>
    ),
  },
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "color",
    headerName: "Color",
    width: 100,
    renderCell: (params) => (
      <div
        className="rounded-full p-2 h-3 w-3"
        alt="product"
        style={{
          border: "1px solid #fb923c",
          width: 30,
          height: 30,
          background: params.row.color,
        }}
      />
    ),
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 100,
  },
  {
    field: "cost",
    headerName: "Cost",
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "add_date",
    headerName: "Add date",
    width: 200,
  },
  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
];
function convertPercentageToFraction(percentage) {
  if (typeof percentage !== "string") {
    throw new Error("Invalid input. Percentage must be a string.");
  }
  const percentValue = parseFloat(percentage);
  if (isNaN(percentValue) || percentValue < 0 || percentValue > 100) {
    throw new Error(
      "Invalid input. Percentage must be a valid number between 0 and 100."
    );
  }
  const numerator = percentValue;
  const denominator = 100;
  return numerator / denominator;
}
function SaleSetting({ handleNextStep }) {
  const { setAlert } = useContextStore();
  const [productSelected, setProductSelected] = useState([]);
  const [product, setProduct] = useState([]);
  const [itemSale, setItemSale] = useState([]);
  const [selectedDiscount, setSelectDiscount] = useState(null);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const handleAutocompleteChange = (event, value) => {
    setSelectDiscount(value);
  };

  useEffect(() => {
    let limit = 100;
    let number = 0;
    const handleGetAllItems = async () => {
      const result = await Services.getDataFromApi(
        "/api/item/all",
        `/?limit=${limit}&number=${number}`
      );
      if (result.status === 200) {
        const data = JSON.parse(result.data);
        setProduct(
          data.map((item) => {
            return {
              ...item,
              id: uuid(),
            };
          })
        );
      } else {
        setAlert({
          type: "error",
          message: "Server is err",
        });
      }
    };
    handleGetAllItems();
  }, []);

  const changeSale = () => {
    setItemSale((prev) => {
      return prev.map((item) => {
        let dis = 0;
        if (selectedDiscount) {
          dis = convertPercentageToFraction(selectedDiscount);
        }

        return {
          ...item,
          sale: selectedDiscount,
          date_start: dateStart,
          date_end: dateEnd,
          price_sale: item.cost - dis * item.cost,
          discount: selectedDiscount,
        };
      });
    });
  };
  useEffect(() => {
    setItemSale(product.filter((item) => productSelected.includes(item.id)));
    changeSale();
  }, [productSelected]);

  useEffect(() => {
    changeSale();
  }, [dateStart, dateEnd, selectedDiscount]);

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
    if (productSelected.length <= 0) {
      setAlert({
        type: "warning",
        message: "Please select item to sale!",
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
    let listIdProduct = product.map((item) => {
      if (productSelected.includes(item.id)) return item.item_id;
    });
    listIdProduct = listIdProduct.filter((item) => item !== undefined);

    const result = await Services.callApi("/api/item/sale/add", {
      listIdProduct,
      dateEnd,
      dateStart,
      selectedDiscount,
    });
    if (result.status === 200) {
      setAlert({
        type: "success",
        message: result.message,
      });
    } else {
      setAlert({
        type: "error",
        message: result.message,
      });
    }
    handleNextStep(1.3);
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-barlow font-bold center">Sale Setting</h1>

      <div className="w-full center flex flex-col mt-10">
        <div className="w-full">
          <h5 className="text-xl font-barlow mb-2">List product</h5>
          <h5 className="text-md font-barlow mb-2 text-orange-400">
            Please select sale to setting sale
          </h5>
          {product.length > 0 && (
            <Table
              data={product}
              columns={columns}
              pageSize={12}
              setSelection={setProductSelected}
            ></Table>
          )}
        </div>
        <div className=" w-full center mt-10 pb-40 flex-col">
          <div
            className="w-5/6 p-4 rounded-xl h-16 center flex bg-orange-400 relative"
            style={{
              zIndex: 1,
            }}
          >
            <div className="text-md text-white center font-barlow font-bold">
              Edit information for sale
            </div>
          </div>
          <div className="w-full pt-12 rounded-xl p-4 bg-slate-100 -translate-y-6 grid-cols-2 grid gap-10">
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Day start
              </InputLabel>
              <Input
                sx={{
                  fontFamily: '"Barlow Condensed", "sans-serif"',
                }}
                type="date"
                onChange={(e) => setDateStart(e.target.value)}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Day end
              </InputLabel>
              <Input
                sx={{
                  fontFamily: '"Barlow Condensed", "sans-serif"',
                }}
                onChange={(e) => setDateEnd(e.target.value)}
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
            </div>
            <div className="w-full p-4 flex flex-col col-span-2">
              <h1 className="text-md font-barlow font-bold">
                Apply sale for item behind:
              </h1>

              <div className="w-full grid-cols-2 grid gap-10 mt-10">
                {itemSale.map((item) => {
                  return <PreviewItemSale key={uuid()} data={item} />;
                })}
              </div>
            </div>
            <div className="col-span-2 center ">
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

export default memo(SaleSetting);
