import { useEffect, useState } from "react";

import Table from "../../../components/table";
import { v4 as uuid } from "uuid";
import { orders } from "../../../Services/fectchApi";

import Services from "../../../Services";

import MenuItem from "@mui/material/MenuItem";
import ButtonCustom from "../../../components/Button";
import CustomizedMenus from "../../../components/CustomizedMenu";

function Order({ handleNextStep, setOrderDetail }) {
  const [order, setOrder] = useState([]);
  const [orderSelected, setOrderSelected] = useState([]);
  const [activeFilter, settActiveFilter] = useState(true);
  const [filter, setFilter] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name_client", headerName: "Username", width: 130 },
    { field: "email_client", headerName: "Email", width: 200 },
    {
      field: "address",
      headerName: "Address",
      width: 250,
    },
    {
      field: "quantity",
      type: "number",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "name_item",
      headerName: "Name item",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <div
          className="w-fix rounded-xl p-2 center "
          style={{
            color: "#fff",
            background:
              params.row.status_process === 0
                ? "#2586f8"
                : params.row.status_process === 1
                ? "#964ce8"
                : params.row.status_process === 2
                ? "#ffae3c"
                : params.row.status_process === 3
                ? "#ffe500"
                : params.row.status_process === 4
                ? "#76a509"
                : params.row.status_process === 5
                ? "#76a509"
                : "Red",
          }}
        >
          {params.row.status}
        </div>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <ButtonCustom
          style={{
            marginLeft: "1rem",
            background: "#fb923c",
            color: "#fff",
          }}
          nameButton="Detail"
          onClick={(e) => {
            handleDetail(params.row.order_id);
          }}
        ></ButtonCustom>
      ),
    },
  ];
  // Function to handle remove action
  function handleRemove(id) {
    console.log(`Remove order with ID ${id}`);
  }

  // Function to handle detail action
  function handleDetail(id) {
    setOrderDetail(order.filter((item) => item.order_id === id)[0]);
    handleNextStep(2.1);
  }

  useEffect(() => {
    const initOrder = async () => {
      const res = await Services.getDataFromApi("/api/item/order/all");
      if (res.status === 200) {
        setOrder(
          JSON.parse(res.data).map((item, index) => {
            return {
              ...item,
              id: index + 1,
            };
          })
        );
      }
    };
    initOrder();
  }, []);
  return (
    <div className="w-full mt-12">
      <div className="w-full end flex mb-4">
        {orderSelected.length > 0 && (
          <ButtonCustom
            nameButton="Remove order selected"
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
        data={order}
        columns={columns}
        pageSize={12}
        orderSelected={orderSelected}
        setSelection={setOrderSelected}
      ></Table>
    </div>
  );
}

export default Order;
