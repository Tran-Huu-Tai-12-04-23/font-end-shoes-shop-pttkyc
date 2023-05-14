import { useEffect, useState, memo } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import Utils from "../../util";

import { v4 as uuid } from "uuid";

import Services from "../../Services";
import { BsNodeMinusFill } from "react-icons/bs";

function TabPanel(props) {
  const { children, value, index, sx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ ...sx, p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

function SelectAddress({ address, setAddress }) {
  const [placeholderAddress, setPlaceholderAddress] = useState("");
  const Service = new Services();
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState(null);
  const [commune, setCommune] = useState(null);
  const [provincesSelected, setProvincesSelected] = useState(null);
  const [districtSelected, setDistrictSelected] = useState(null);
  const [districtFollowProvince, setDistrictFollowProvince] = useState([]);
  const [communeSelected, setCommuneSelected] = useState("");
  const [communeFollowDistrict, setCommuneFollowDistrict] = useState("");
  const [openSelect, setOpenSelect] = useState(false);

  const [loadProvinceSearch, setLoadProvinceSearch] = useState(true);
  const [loadDistrictSearch, setLoadDistrictSearch] = useState(true);
  const [loadCommuneSearch, setLoadCommuneSearch] = useState(true);

  const Util = new Utils();
  //
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (openSelect === false) {
      setValue(0);
      return;
    }
  }, [openSelect]);

  const handleChange = (event) => {
    setAddress(event.target.value);
  };
  function countCommas(str) {
    if (str.includes(",")) {
      return str.split(",").length - 1;
    }
    return 0;
  }

  const handleChangeProvincesSelected = (value) => {
    setProvincesSelected(value);
    setAddress(value.name + ", ");
  };

  const handleChangeDistrictSelected = (value) => {
    setDistrictSelected(value);

    setAddress((prev) => {
      return prev.split(",")[0] + ", " + value.name + ", ";
    });
  };

  const handleChangeCommuneSelected = (value) => {
    setCommuneSelected(value);
    setAddress((prev) => {
      return prev + value.name;
    });
  };

  const BASE_API_URL = "https://provinces.open-api.vn/api";

  useEffect(() => {
    Service.getDataFromApiOrder(BASE_API_URL + "/p ").then((res) => {
      setProvinces(res);
      setLoadProvinceSearch(false);
    });
  }, []);

  useEffect(() => {
    if (provincesSelected) {
      Service.getDataFromApiOrder(
        BASE_API_URL + "/p/" + provincesSelected.code + "/?depth=2"
      ).then((res) => {
        setDistrictFollowProvince(res?.districts);
        setDistrict(res?.districts);
        setLoadDistrictSearch(false);
      });
    }
  }, [provincesSelected]);

  useEffect(() => {
    if (districtSelected) {
      Service.getDataFromApiOrder(
        BASE_API_URL + "/d/" + districtSelected.code + "/?depth=2"
      ).then((res) => {
        setCommune(res.wards);
        setLoadCommuneSearch(false);
      });
    }
  }, [districtSelected]);

  useEffect(() => {
    const handleWindowClick = () => {
      setOpenSelect(false);
      if (!address && placeholderAddress) {
        setAddress(placeholderAddress);
      }
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  useEffect(() => {
    if (!provincesSelected) {
      setLoadProvinceSearch(true);
      Service.getDataFromApiOrder(
        `${BASE_API_URL}/p/${address ? "search/?q=" + address.trim() : ""}`
      ).then((res) => {
        setProvinces(res);
        setLoadProvinceSearch(false);
      });
    } else if (countCommas(address) === 1) {
      setDistrictFollowProvince(
        Util.searchByNameAddress(district, address.split(",")[1])
      );
    } else if (countCommas(address) === 2) {
      setCommuneFollowDistrict(
        Util.searchByNameAddress(district, address.split(",")[2])
      );
    }
  }, [address]);

  function clearForm() {
    setProvincesSelected(null);
    setDistrictSelected(null);
    setCommuneSelected(null);
  }

  return (
    <FormControl
      variant="standard"
      sx={{
        minWidth: 120,
        width: "100%",
        position: "relative",
        height: "100%",
      }}
    >
      <TextField
        label="Address"
        variant="standard"
        placeholder={placeholderAddress}
        value={address}
        onChange={(e) => {
          e.stopPropagation();
          const count = countCommas(e.target.value);
          setValue(count);
          setAddress(e.target.value);
        }}
        onFocus={(e) => {
          e.stopPropagation();
          setOpenSelect(true);
          if (!openSelect) {
            setPlaceholderAddress(address);
            setAddress("");
          }
        }}
        sx={{
          fontFamily: `"Barlow Condensed", "sans-serif"`,
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "absolute",
          left: "0",
          right: 0,
          top: "100%",
          boxShadow: "5px 3px 26px 1px rgba(0,0,0,0.46)",
          display: openSelect ? "" : "none",
          background: "#fff",
          zIndex: "2",
        }}
      >
        <Tabs
          value={value}
          //   onChange={handleChangeTap}
          aria-label="basic tabs example"
          sx={{
            background: "#fff",
          }}
        >
          <Tab label="Provinces" {...a11yProps(0)}></Tab>
          <Tab
            label="District"
            {...a11yProps(1)}
            sx={{
              cursor: provincesSelected ? "pointer" : "not-allowed",
            }}
          ></Tab>
          <Tab
            label="Commune"
            {...a11yProps(2)}
            sx={{
              cursor: districtSelected ? "pointer" : "not-allowed",
            }}
          ></Tab>
        </Tabs>
        <TabPanel
          value={value}
          index={0}
          sx={{
            maxHeight: "20rem",
            overflow: "auto",
            boxShadow: "1px 1px 2px rgba(0,0,0, .1)",
            background: "#fff",
          }}
        >
          {loadProvinceSearch && <CircularProgress />}
          {!loadProvinceSearch &&
            provinces &&
            provinces.length > 0 &&
            provinces.map((province) => {
              return (
                <li
                  className="list-none p-2 hover:bg-slate-100 cursor-pointer"
                  key={uuid()}
                  onClick={(e) => {
                    handleChangeProvincesSelected(province);
                    setValue(1);
                  }}
                >
                  {province.name}
                </li>
              );
            })}
          {!loadProvinceSearch && provinces && provinces.length === 0 && (
            <li className="list-none p-2 hover:bg-slate-100 cursor-pointerh">
              No province
            </li>
          )}
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          sx={{
            maxHeight: "20rem",
            overflow: "auto",
            background: "#fff",
            boxShadow: "1px 1px 2px rgba(0,0,0, .1)",
          }}
        >
          {loadDistrictSearch && <CircularProgress />}
          {!loadDistrictSearch &&
            districtFollowProvince &&
            districtFollowProvince.length > 0 &&
            districtFollowProvince.map((dis) => {
              return (
                <li
                  className="list-none p-2 hover:bg-slate-100 cursor-pointer "
                  key={uuid()}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleChangeDistrictSelected(dis);
                    setValue(2);
                  }}
                >
                  {dis.name}
                </li>
              );
            })}
          {!loadDistrictSearch &&
            districtFollowProvince &&
            districtFollowProvince.length === 0 && (
              <li className="list-none p-2 hover:bg-slate-100 cursor-pointerh">
                No district
              </li>
            )}
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
          sx={{
            maxHeight: "20rem",
            overflow: "auto",
            background: "#fff",
            boxShadow: "1px 1px 2px rgba(0,0,0, .1)",
          }}
        >
          {loadCommuneSearch && <CircularProgress />}
          {!loadCommuneSearch &&
            communeFollowDistrict &&
            communeFollowDistrict.length > 0 &&
            communeFollowDistrict.map((comm) => {
              return (
                <li
                  className="list-none p-2 hover:bg-slate-100 cursor-pointer"
                  key={uuid()}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleChangeCommuneSelected(comm);
                    setOpenSelect(false);
                    setValue(0);
                  }}
                >
                  {comm.name}
                </li>
              );
            })}
          {!loadCommuneSearch &&
            communeFollowDistrict &&
            communeFollowDistrict.length === 0 && (
              <li className="list-none p-2 hover:bg-slate-100 cursor-pointerh">
                No commune
              </li>
            )}
        </TabPanel>
      </Box>
    </FormControl>
  );
}

export default memo(SelectAddress);
