import { useEffect, useState, memo, useMemo } from "react";

import Table from "../../../components/table";
import { v4 as uuid } from "uuid";
import { itemsApi } from "../../../Services/fectchApi";

import MenuItem from "@mui/material/MenuItem";
import ButtonCustom from "../../../components/Button";
import CustomizedMenus from "../../../components/CustomizedMenu";

import Services from "../../../Services";
import { Button } from "@mui/material";

function Product({ setProductDetail, setActive }) {
  const [productSelected, setProductSelected] = useState([]);
  const [activeFilter, settActiveFilter] = useState(true);
  const [filter, setFilter] = useState({});
  const [product, setProduct] = useState([]);
  const [productShow, setProductShow] = useState([]);
  const [prevFilter, setPrevFilter] = useState({});
  const [lazyLoadTable, setLazyLoadTable] = useState(true);
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
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <>
          <ButtonCustom
            nameButton="Remove"
            style={{
              color: "red",
            }}
            onClick={(e) => {
              handleRemove(params.row.item_id);
            }}
          ></ButtonCustom>
          <ButtonCustom
            style={{
              marginLeft: "1rem",
              background: "#fb923c",
              color: "#fff",
            }}
            nameButton="Detail"
            onClick={(e) => {
              handleDetail(params.row.item_id);
            }}
          ></ButtonCustom>
        </>
      ),
    },
  ];
  // Function to handle remove action
  function handleRemove(id) {
    console.log(`Remove product with ID ${id}`);
  }

  // Function to handle detail action
  function handleDetail(id) {
    setActive(1.1);
    setProductDetail(id);
  }

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
        setProductShow(
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

  const filterByStatus = () => {
    return product.filter((item) => item.status === filter.value);
  };

  const filterByType = () => {
    return product.filter((item) => item.type === filter.value);
  };

  const filterByDate = () => {
    return product.filter((item) => {
      const date = new Date(item.add_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate === filter.value;
    });
  };
  const filteredProduct = useMemo(() => {
    if (!filter.type) {
      return product;
    }

    switch (filter.type) {
      case "status":
        return filterByStatus();
      case "type":
        return filterByType();
      case "date":
        return filterByDate();
      default:
        return product;
    }
  }, [filter, product]);
  useEffect(() => {
    setProduct(filteredProduct);
  }, [filter, product]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLazyLoadTable(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="w-full mt-12">
      <div className="w-full end flex mb-4">
        {filter.type && (
          <>
            <div className="font-barlow mr-2">
              Filter : {filter.type} : {filter.value}
            </div>
            <Button
              variant="outline"
              sx={{
                color: "red",
              }}
              onClick={(e) => setFilter({})}
            >
              Clear filter
            </Button>
          </>
        )}

        {productSelected.length > 0 && (
          <ButtonCustom
            nameButton="Remove product selected"
            style={{ marginRight: "1rem", color: "red" }}
          />
        )}
        <CustomizedMenus
          nameButton={"Status"}
          active={activeFilter}
          setActive={settActiveFilter}
        >
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setPrevFilter(filter);
              setFilter({
                type: "status",
                value: "90%",
              });
            }}
          >
            90%
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "status",
                value: "95%",
              });
            }}
          >
            95%
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "status",
                value: "99%",
              });
            }}
          >
            99%
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "status",
                value: "other",
              });
            }}
          >
            other
          </MenuItem>
          <MenuItem
            disableRipple
            sx={{
              color: "red",
              bproductTop: "1px solid red",
            }}
            onClick={(e) => {
              setFilter(prevFilter);
              settActiveFilter(false);
            }}
          >
            Cancel
          </MenuItem>
        </CustomizedMenus>
        <CustomizedMenus
          nameButton={"Type"}
          active={activeFilter}
          setActive={settActiveFilter}
        >
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "type",
                value: "running",
              });
            }}
          >
            Running
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "type",
                value: "sneaker",
              });
            }}
          >
            Sneaker
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "type",
                value: "sandals",
              });
            }}
          >
            Sandals
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "type",
                value: "hiking",
              });
            }}
          >
            Hiking
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "type",
                value: "other",
              });
            }}
          >
            Other
          </MenuItem>
          <MenuItem
            disableRipple
            sx={{
              color: "red",
              bproductTop: "1px solid red",
            }}
            onClick={(e) => {
              setFilter(prevFilter);
              settActiveFilter(false);
            }}
          >
            Cancel
          </MenuItem>
        </CustomizedMenus>
        <CustomizedMenus
          nameButton={"Date"}
          active={activeFilter}
          setActive={settActiveFilter}
        >
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("running");
            }}
          >
            <input
              type="date"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                setFilter({
                  type: "date",
                  value: e.target.value,
                })
              }
            />
          </MenuItem>
          <MenuItem
            disableRipple
            sx={{
              color: "red",
              bproductTop: "1px solid red",
            }}
            onClick={(e) => {
              settActiveFilter(false);
            }}
          >
            Cancel
          </MenuItem>
        </CustomizedMenus>
      </div>
      {!lazyLoadTable && product.length > 0 && (
        <Table
          data={productShow}
          columns={columns}
          pageSize={12}
          setSelection={setProductSelected}
        ></Table>
      )}
    </div>
  );
}

export default memo(Product);
