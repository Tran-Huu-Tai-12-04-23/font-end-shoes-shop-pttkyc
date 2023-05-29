import { useEffect, useState, useMemo } from "react";

import Table from "../../../components/Table";
import { v4 as uuid } from "uuid";
import { orders } from "../../../Services/fectchApi";

import Services from "../../../Services";

import MenuItem from "@mui/material/MenuItem";
import ButtonCustom from "../../../components/Button";
import CustomizedMenus from "../../../components/CustomizedMenu";
import { Button, TextField } from "@mui/material";
const ProcessOrder = {
  1: "Preparing",
  0: "Wait to confirmation",
  2: "Delivery",
  3: "Wait received to order",
  4: "Guest confirm received",
  5: "Complete",
  "-1": "Cancelled",
};
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
function compareDates(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const year1 = d1.getFullYear();
  const month1 = d1.getMonth();
  const day1 = d1.getDate();
  const year2 = d2.getFullYear();
  const month2 = d2.getMonth();
  const day2 = d2.getDate();
  return year1 === year2 && month1 === month2 && day1 === day2;
}

function Order({ handleNextStep, setOrderDetail }) {
  const [order, setOrder] = useState([]);
  const [orderShow, setOrderShow] = useState([]);
  const [orderSelected, setOrderSelected] = useState([]);
  const [activeFilter, settActiveFilter] = useState(true);
  const [filter, setFilter] = useState({});
  const [filterOrderDate, setFilterOrderDate] = useState("");

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
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <Button
          sx={{
            marginLeft: "1rem",
            background: "rgba(251, 146, 60, .8)",
            padding: ".3rem 2rem",
            fontSize: ".8rem",
            color: "#fff",

            "&:hover": {
              background: "rgba(251, 146, 60, 1)",
            },
          }}
          onClick={(e) => {
            handleDetail(params.row.order_id);
          }}
        >
          Detail
        </Button>
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
        const data = JSON.parse(res.data).map((item, index) => {
          return {
            ...item,
            id: item.order_id,
          };
        });
        setOrder(data);
        setOrderShow(data);
      }
    };
    initOrder();
  }, []);
  const filterOrder = useMemo(() => {
    let itemFilter = order;
    if (filter.status === 0 || filter.status) {
      itemFilter = order.filter((od) => {
        console.log(od.status_process);
        console.log(od.status_process === filter.status);
        return od.status_process === filter.status;
      });
    }
    if (filter.orderDate) {
      itemFilter = itemFilter.filter((od) => {
        return compareDates(od.order_date, filter.orderDate);
      });
    }
    return itemFilter;
  }, [filter]);
  useEffect(() => {
    if (!isEmptyObject(filter)) {
      setOrderShow(filterOrder);
    } else {
      setOrderShow(order);
    }
  }, [filter]);

  return (
    <div className="w-full mt-12">
      <div className="w-full end flex mb-4">
        {orderSelected.length > 0 && (
          <ButtonCustom
            nameButton="Remove order selected"
            style={{ marginRight: "1rem", color: "red" }}
          />
        )}

        {!isEmptyObject(filter) && (
          <div className="start flex">
            <h5 className="font-barlow font-bold mr-2 ">Filter :</h5>
            {filter.status && (
              <>
                <h5 className="font-barlow font-bold mr-2 ">status:</h5>
                <h5 className="font-barlow">{ProcessOrder[filter.status]}</h5>
              </>
            )}
            {filter.status && filter.orderDate && <h5>,</h5>}
            {filter.orderDate && (
              <>
                <h5 className="font-barlow font-bold mr-2 ml-2">
                  order date :
                </h5>
                <h5 className="font-barlow">{filter.orderDate}</h5>
              </>
            )}

            <Button
              sx={{
                color: "red ",
                border: "1px solid red",
                marginLeft: "1rem",
              }}
              onClick={(e) => {
                setFilter({});
                setFilterOrderDate("");
              }}
            >
              Clear filter
            </Button>
          </div>
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
              setFilter((prev) => {
                return {
                  ...prev,
                  status: 0,
                };
              });
            }}
          >
            Wait to confirmation
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter((prev) => {
                return {
                  ...prev,
                  status: 1,
                };
              });
            }}
          >
            Preparing
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter((prev) => {
                return {
                  ...prev,
                  status: 2,
                };
              });
            }}
          >
            Delivery
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter((prev) => {
                return {
                  ...prev,
                  status: 3,
                };
              });
            }}
          >
            Wait received to order
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter((prev) => {
                return {
                  ...prev,
                  status: 4,
                };
              });
            }}
          >
            Guest confirm received
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter((prev) => {
                return {
                  ...prev,
                  status: 5,
                };
              });
            }}
          >
            Completed
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter((prev) => {
                return {
                  ...prev,
                  status: -1,
                };
              });
            }}
          >
            Cancelled
          </MenuItem>
        </CustomizedMenus>
        <input
          type="date"
          className="ml-2 rounded-md text-orange-500 h-10 bg-transparent pl-2 pr-2 reset"
          onChange={(e) => {
            setFilter((prev) => {
              return {
                ...prev,
                orderDate: e.target.value,
              };
            });
            setFilterOrderDate(e.target.value);
          }}
          style={{
            border: "1px solid orange",
          }}
          value={filterOrderDate}
        ></input>
      </div>

      <Table
        checkbox={false}
        data={orderShow}
        columns={columns}
        pageSize={12}
        orderSelected={orderSelected}
        setSelection={setOrderSelected}
      ></Table>
    </div>
  );
}

export default Order;
