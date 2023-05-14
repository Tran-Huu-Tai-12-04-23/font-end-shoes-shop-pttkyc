import { useState } from "react";

import Table from "../../../components/table";
import { v4 as uuid } from "uuid";
import { users } from "../../../Services/fectchApi";

import { Avatar } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ButtonCustom from "../../../components/Button";
import CustomizedMenus from "../../../components/CustomizedMenu";

function User({}) {
  const [productSelected, setProductSelected] = useState([]);
  const [activeFilter, settActiveFilter] = useState(true);
  const [filter, setFilter] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Avatar
          src={params.row.avatar_url}
          alt={params.row.first_name}
          sx={{ width: 30, height: 30 }}
        />
      ),
    },
    { field: "first_name", headerName: "First name", width: 150 },
    { field: "last_name", headerName: "Last name", width: 150 },
    {
      field: "phone_number",
      headerName: "phone_number",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: "300",
      renderCell: (params) => (
        <>
          <ButtonCustom
            nameButton="Remove"
            style={{
              color: "red",
            }}
            onClick={(e) => {
              handleRemove(params.row.user_id);
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
              handleDetail(params.row.user_id);
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
          nameButton={"Filter"}
          active={activeFilter}
          setActive={settActiveFilter}
        >
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("preparing");
            }}
          >
            Status: preparing
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("ship");
            }}
          >
            Status: ship
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("ship");
            }}
          >
            Status: ...
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("ship");
            }}
          >
            Status: ...
          </MenuItem>
          <MenuItem
            disableRipple
            sx={{
              color: "red",
              borderTop: "1px solid red",
            }}
            onClick={(e) => {
              settActiveFilter(false);
            }}
          >
            Cancel filter
          </MenuItem>
        </CustomizedMenus>
      </div>
      <Table
        data={users}
        columns={columns}
        pageSize={12}
        productSelected={productSelected}
        setProductSelected={setProductSelected}
      ></Table>
    </div>
  );
}

export default User;
