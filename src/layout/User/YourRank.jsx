import { Alert, Avatar } from "@mui/material";

import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { SlWallet } from "react-icons/sl";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RiUserVoiceLine } from "react-icons/ri";

import newMember from "../../assets/icon/newMember.svg";
import shopMember from "../../assets/icon/shopMember.svg";
import vipMember from "../../assets/icon/vipMember.svg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</>;
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

function YourRank({}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full rounded-bl-xl rounded-br-xl bg-orange-400 p-4 h-44">
        <div className="font-barlow w-full start flex">
          <Avatar
            title="TRan huu tai"
            sx={{
              height: "56px",
              width: "56px",
            }}
          />
          <div className="flex flex-col ml-4 text-white w-full">
            <h6 className="text-xl">Welcome</h6>
            <h5 className="text-xl font-bold">Tran Huu Tai</h5>
          </div>

          <div className="w-full p-4 bg-slate-100 rounded-xl">
            <h5 className="text-xl text-">
              Accumulated points <span className="text-orange-400">$ 56</span>
            </h5>
            <h6 className="text-xl">Your are new member</h6>
            <h6 className="text-slate-500 text-sm">
              ( Buy another 30 to up shop-member)
            </h6>
          </div>
        </div>
        <div className="w-full mt-12">
          <Box sx={{ width: "100%", paddingTop: "1rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <div className="w-full  p-4 rounded-xl bg-orange-400 center flex">
                <h5 className="text-xl font-barlow text-white">
                  Conditions apply and accumulate points
                </h5>
              </div>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  marginTop: "1rem",
                }}
              >
                <Tab
                  label={
                    <div className="center flex flex-col">
                      <Avatar title="N-M" src={newMember} />
                      <h5 className="mt-2 font-barlow">New-Member</h5>
                    </div>
                  }
                  {...a11yProps(0)}
                ></Tab>
                <Tab
                  label={
                    <div className="center flex flex-col">
                      <Avatar title="S-M" src={shopMember} />
                      <h5 className="mt-2 font-barlow">Shop-Member</h5>
                    </div>
                  }
                  {...a11yProps(1)}
                  sx={{
                    marginLeft: "5rem",
                    marginRight: "5rem",
                  }}
                />
                <Tab
                  label={
                    <div className="center flex flex-col">
                      <Avatar title="V-M" src={vipMember} />
                      <h5 className="mt-2 font-barlow">Vip-Member</h5>
                    </div>
                  }
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="start flex p-2 text-white -translate-x-10 w-80 bg-orange-400 rounded-tr-xl rounded-br-xl">
                <SlWallet className="text-xl mr-2" />
                <span> Condition accumulate points</span>
              </div>
              <div className="start flex mt-5">
                <SlWallet className="text-3xl mr-4" />
                Sum of all your order must least{" "}
                <span className="text-orange-400">$60</span>
              </div>
              <div className="start flex mt-6">
                <SlWallet className="text-3xl mr-4" />
                You have to account
              </div>
              <div className=" start flex p-2 mt-10 text-white -translate-x-10 w-80 bg-orange-400 rounded-tr-xl rounded-br-xl">
                <MdOutlineLocalOffer className="mr-2 text-xl" />
                <span>Offers</span>
              </div>
              <Alert
                severity="info"
                sx={{
                  marginTop: "1rem",
                }}
              >
                no Offers
              </Alert>
              <div className="start flex p-2 mt-10 text-white -translate-x-10 w-80 bg-orange-400 rounded-tr-xl rounded-br-xl">
                <RiUserVoiceLine className="text-xl mr-2" />
                <span>Service policy</span>
              </div>
              <Alert
                severity="info"
                sx={{
                  marginTop: "1rem",
                }}
              >
                no service policy
              </Alert>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="start flex p-2 text-white -translate-x-10 w-80 bg-orange-400 rounded-tr-xl rounded-br-xl">
                <SlWallet className="text-xl mr-2" />
                <span> Condition accumulate points</span>
              </div>
              <div className="start flex mt-5">
                <SlWallet className="text-3xl mr-4" />
                Sum of all your order must least{" "}
                <span className="text-orange-400 ml-2">$120</span>
              </div>
              <div className="start flex mt-6">
                <SlWallet className="text-3xl mr-4" />
                You have to account
              </div>
              <div className=" start flex p-2 mt-10 text-white -translate-x-10 w-80 bg-orange-400 rounded-tr-xl rounded-br-xl">
                <MdOutlineLocalOffer className="mr-2 text-xl" />
                <span>Offers</span>
              </div>
              <Alert
                severity="info"
                sx={{
                  marginTop: "1rem",
                }}
              >
                no Offers
              </Alert>
              <div className="start flex p-2 mt-10 text-white -translate-x-10 w-80 bg-orange-400 rounded-tr-xl rounded-br-xl">
                <RiUserVoiceLine className="text-xl mr-2" />
                <span>Service policy</span>
              </div>
              <Alert
                severity="info"
                sx={{
                  marginTop: "1rem",
                }}
              >
                no service policy
              </Alert>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="start flex p-2 text-white -translate-x-10 w-80 bg-orange-400 rounded-tr-xl rounded-br-xl">
                <SlWallet className="text-xl mr-2" />
                <span> Condition accumulate points</span>
              </div>
              <div className="start flex mt-5">
                <SlWallet className="text-3xl mr-4" />
                Sum of all your order must least{" "}
                <span className="text-orange-400">$120</span>
              </div>
              <div className="start flex mt-6">
                <SlWallet className="text-3xl mr-4" />
                You have to account
              </div>
              <div className=" start flex p-2 mt-10 text-white -translate-x-10 w-80 bg-orange-400 rounded-tr-xl rounded-br-xl">
                <MdOutlineLocalOffer className="mr-2 text-xl" />
                <span>Offers</span>
              </div>
              <Alert
                severity="info"
                sx={{
                  marginTop: "1rem",
                }}
              >
                no Offers
              </Alert>
              <div className="start flex p-2 mt-10 text-white -translate-x-10 w-80 bg-orange-400 rounded-tr-xl rounded-br-xl">
                <RiUserVoiceLine className="text-xl mr-2" />
                <span>Service policy</span>
              </div>
              <Alert
                severity="info"
                sx={{
                  marginTop: "1rem",
                }}
              >
                no service policy
              </Alert>
            </TabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default YourRank;
