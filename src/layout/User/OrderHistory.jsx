import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Alert, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { v4 as uuid } from "uuid";
import Item from "./Item";

import { CiDeliveryTruck } from "react-icons/ci";
import { FaCoins } from "react-icons/fa";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const history = useNavigate();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function OrderHistory({ order, setOrder }) {
  console.log(order);
  const [orderWait, setOrderWait] = useState([]);
  const [orderConfirmed, setConfirmed] = useState([]);
  const [orderDelivery, setOrderDelivery] = useState([]);
  const [orderReceived, setOrderReceived] = useState([]);
  const [orderComplete, setOrderComplete] = useState([]);
  const [orderCancelled, setOrderCancelled] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setOrderWait([]);
    setConfirmed([]);
    setOrderDelivery([]);
    setOrderReceived([]);
    setOrderComplete([]);
    setOrderCancelled([]);
    order.map((od) => {
      if (od.status_process === 0) {
        setOrderWait((prev) => [...prev, od]);
      }
      if (od.status_process === 1) {
        setConfirmed((prev) => [...prev, od]);
      }
      if (od.status_process === 2) {
        setOrderDelivery((prev) => [...prev, od]);
      }
      if (od.status_process === 3) {
        setOrderReceived((prev) => [...prev, od]);
      }
      if (od.status_process === 5) {
        setOrderComplete((prev) => [...prev, od]);
      }
      if (od.status_process === -1) {
        setOrderCancelled((prev) => [...prev, od]);
      }
    });
  }, [order]);

  const tabs = [
    {
      name: "All",
      value: order.map((od, index) => {
        return (
          <Item key={index} data={od} setOrder={setOrder} order={order}></Item>
        );
      }),
    },
    {
      name: "Wait for confirmation",
      value: orderWait.map((od, index) => {
        return (
          <Item key={index} data={od} setOrder={setOrder} order={order}></Item>
        );
      }),
    },
    {
      name: "Confirmed",
      value: orderConfirmed.map((od, index) => {
        return (
          <Item key={index} data={od} setOrder={setOrder} order={order}></Item>
        );
      }),
    },
    {
      name: "Delivery",
      value: orderDelivery.map((od, index) => {
        return (
          <Item key={index} data={od} setOrder={setOrder} order={order}></Item>
        );
      }),
    },
    {
      name: "Wait Received",
      value: orderReceived.map((od, index) => {
        return (
          <Item key={index} data={od} setOrder={setOrder} order={order}></Item>
        );
      }),
    },
    {
      name: "Complete",
      value: orderComplete.map((od, index) => {
        return (
          <Item key={index} data={od} setOrder={setOrder} order={order}></Item>
        );
      }),
    },
    {
      name: "Cancelled",
      value: orderCancelled.map((od, index) => {
        return (
          <Item key={index} data={od} setOrder={setOrder} order={order}></Item>
        );
      }),
    },
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // handle cancel order up to quantity
  const calTotalOrderComplete = useMemo(() => {
    let totalOrder = 0;
    order.map((od) => {
      if (order.status_process === 5) {
        return (totalOrder += od.total);
      }
    });

    return totalOrder;
  }, [order]);

  useEffect(() => {
    setTotal(calTotalOrderComplete);
  }, [order]);

  return (
    <div className="w-full flex flex-col font-barlow">
      <h1 className="text-2xl text-orange-400 font-bold ml-auto mr-auto">
        Manager Order
      </h1>
      <h5 className="text-xl text-orange-300 ml-auto mr-auto">
        (Detail order, Search order)
      </h5>

      <div className="w-full justify-evenly flex mt-10">
        <div className="flex flex-col items-center">
          <CiDeliveryTruck className="text-8xl text-orange-400" />
          <h5 className="font-bold mt-2">{order.length} order</h5>
        </div>
        <div className="flex flex-col items-center">
          <FaCoins className="text-8xl text-orange-400" />
          <span className="font-bold mt-2">$ {total}</span>
        </div>
      </div>

      <div className="w-full mt-10">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {tabs.map((tab, index) => {
                return (
                  <Tab
                    key={uuid()}
                    sx={{
                      fontFamily: `"Barlow Condensed", "sans-serif"`,
                      fontWeight: "bold",
                    }}
                    label={tab.name}
                    {...a11yProps(index)}
                  />
                );
              })}
            </Tabs>
          </Box>
          {tabs.map((tab, index) => {
            return (
              <TabPanel
                key={uuid()}
                value={value}
                index={index}
                sx={{
                  fontFamily: `"Barlow Condensed", "sans-serif"`,
                  fontWeight: "bold",
                }}
                label={tab.name}
                {...a11yProps(index)}
              >
                {tab.value.length > 0 &&
                  tab.value.map((item) => {
                    return (
                      <div className="w-full" key={uuid()}>
                        {item}
                      </div>
                    );
                  })}

                {order.length === 0 && (
                  <>
                    <Alert severity="info">You have never order</Alert>
                    <Button onClick={(e) => history("/shop")}>
                      {" "}
                      Go to order{" "}
                    </Button>
                  </>
                )}
              </TabPanel>
            );
          })}
        </Box>
      </div>
    </div>
  );
}

export default OrderHistory;
