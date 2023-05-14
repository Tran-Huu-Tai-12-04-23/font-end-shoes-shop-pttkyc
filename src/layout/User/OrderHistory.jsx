import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { v4 as uuid } from "uuid";
import Item from "./Item";

import { CiDeliveryTruck } from "react-icons/ci";
import { FaCoins } from "react-icons/fa";

function TabPanel(props) {
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

function OrderHistory({ show }) {
  const tabs = [
    {
      name: "All",
      value: [
        <Item
          data={
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80"
          }
        ></Item>,
        <Item
          data={
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80"
          }
        />,
        <Item
          data={
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80"
          }
        />,
      ],
    },
    {
      name: "Wait for confirmation",
      value: [],
    },
    {
      name: "Confirmed",
      value: [],
    },
    {
      name: "being transported",
      value: [],
    },
    {
      name: "Received",
      value: [],
    },
    {
      name: "Cancelled",
      value: [],
    },
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className="w-full flex flex-col font-barlow"
      style={{
        transition: ".8s",
        transform: show ? "" : "scale(0)",
        opacity: show ? "" : "0",
        position: show ? "" : "fixed",
      }}
    >
      <h1 className="text-2xl text-orange-400 font-bold ml-auto mr-auto">
        Manager Order
      </h1>
      <h5 className="text-xl text-orange-300 ml-auto mr-auto">
        (Detail order, Search order)
      </h5>

      <div className="w-full justify-evenly flex mt-10">
        <div className="flex flex-col items-center">
          <CiDeliveryTruck className="text-8xl text-orange-400" />
          <h5 className="font-bold mt-2">2 order</h5>
        </div>
        <div className="flex flex-col items-center">
          <FaCoins className="text-8xl text-orange-400" />
          <span className="font-bold mt-2">Bought : $ 45</span>
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
              </TabPanel>
            );
          })}
        </Box>
      </div>
    </div>
  );
}

export default OrderHistory;
