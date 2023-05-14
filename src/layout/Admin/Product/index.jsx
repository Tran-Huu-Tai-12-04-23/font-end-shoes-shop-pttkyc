import { useState } from "react";

import Table from "../../../components/table";
import { v4 as uuid } from "uuid";
import { itemsApi } from "../../../Services/fectchApi";

import MenuItem from "@mui/material/MenuItem";
import ButtonCustom from "../../../components/Button";
import CustomizedMenus from "../../../components/CustomizedMenu";

function Product({}) {
  const [productSelected, setProductSelected] = useState([]);
  const [activeFilter, settActiveFilter] = useState(true);
  const [filter, setFilter] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.photoUrl}
          alt="product"
          style={{ width: 50, height: 50 }}
        />
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
      width: 100,
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
              handleRemove(params.row.product_id);
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
              alert();
              handleDetail(params.row.product_id);
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
    console.log(`Show detail for product with ID ${id}`);
  }

  return (
    <div className="w-full mt-12">
      <div className="w-full end flex mb-4">
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
              setFilter("90%");
            }}
          >
            90%
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("95%");
            }}
          >
            95%
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("99%");
            }}
          >
            99%
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("other");
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
              settActiveFilter(false);
              setFilter("running");
            }}
          >
            Running
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("sneaker");
            }}
          >
            Sneaker
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("sandals");
            }}
          >
            Sandals
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("hiking");
            }}
          >
            Hiking
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("other");
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
            <input type="date" />
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
      <Table
        data={itemsApi}
        columns={columns}
        pageSize={12}
        productSelected={productSelected}
        setProductSelected={setProductSelected}
      ></Table>
    </div>
  );
}

export default Product;
