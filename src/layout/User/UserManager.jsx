import { useEffect, useState } from "react";

import userManager from "../../assets/icon/userManager.svg";

import { InputBase, FormControl, Select, MenuItem } from "@mui/material";

import { useContextStore } from "../../Store";

import { FiEdit } from "react-icons/fi";
import SelectAddress from "../../components/SelectAddress";
import Utils from "../../util";
import { UseAuthUserContext } from "../../AuthUser";
import Services from "../../Services";
import Util from "../../util";

function splitString(str) {
  if (!str) {
    return {
      firstPart: "",
      lastPart: "",
    };
  }
  const parts = str.split(",");
  const lastPart = parts.pop().trim();
  const firstPart = parts.join(",").trim();

  return {
    firstPart,
    lastPart,
  };
}

function UserManager({ userDetail, setUserDetail }) {
  const { user } = UseAuthUserContext();
  const { setAlert } = useContextStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [disableFirstName, setDisableFirstName] = useState(true);
  const [disableLastName, setDisableLastName] = useState(true);
  const [disableEmail, setDisableEmail] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disablePhone, setDisablePhone] = useState(true);
  const [joinDate, setJoinDate] = useState("");
  const [address, setAddress] = useState("");
  const [detailStreet, setDetailStreet] = useState("");
  const [disableDetailStreet, setDisableDetailStreet] = useState(true);

  useEffect(() => {
    setFirstName(userDetail.first_name ? userDetail.first_name : "");
    setLastName(userDetail.last_name ? userDetail.last_name : "");
    setPhoneNumber(userDetail.phone_number ? userDetail.phone_number : "");
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    }).format(new Date(userDetail.create_at));
    setJoinDate(formattedDate ? formattedDate : "");
    const { firstPart, lastPart } = splitString(userDetail.address);
    setAddress(firstPart ? firstPart : "");
    setEmail(userDetail.email ? userDetail.email : "");
    setDetailStreet(lastPart ? lastPart : "");
  }, [userDetail]);
  const verifyDataIsEmpty = () => {
    if (!email) {
      setAlert({
        type: "error",
        message: "Please enter your email address",
      });
      return false;
    }
    if (!phoneNumber) {
      setAlert({
        type: "error",
        message: "Please enter your phone number ",
      });
      return false;
    }
    if (!firstName) {
      setAlert({
        type: "error",
        message: "Please enter your first name ",
      });
      return false;
    }
    if (!lastName) {
      setAlert({
        type: "error",
        message: "Please enter your last name ",
      });
      return false;
    }
    if (!address) {
      setAlert({
        type: "error",
        message: "Please enter your address ",
      });
      return false;
    }
    if (!detailStreet) {
      setAlert({
        type: "error",
        message: "Please enter your detail street ",
      });
      return false;
    }

    return true;
  };

  const verifyEmailAndPhone = () => {
    const Util = new Utils();

    if (!Util.checkIsEmail(email)) {
      setAlert({ type: "error", message: "Email is invalid" });
      return false;
    }

    if (!Util.isValidPhoneNumber(phoneNumber)) {
      setAlert({ type: "error", message: "Phone number is invalid" });
      return false;
    }

    return true;
  };
  const handleSaveChangeProfile = async () => {
    if (!verifyDataIsEmpty()) {
      return;
    }

    if (!verifyEmailAndPhone()) {
      return;
    }

    const data = {
      phone_number: phoneNumber,
      email,
      address: address + "," + detailStreet,
      first_name: firstName,
      last_name: lastName,
      account_id: user.id,
    };

    const result = await Services.callApi("/api/user/update-profile", data);

    if (result.status === 200) {
      setAlert({
        type: "success",
        message: result.message,
      });
      setUserDetail({
        ...userDetail,
        phone_number: phoneNumber,
        email,
        address: address + "," + detailStreet,
        first_name: firstName,
        last_name: lastName,
      });
    } else {
      setAlert({
        type: "error",
        message: result.message,
      });
    }
  };
  return (
    <div className="w-full flex flex-col ">
      <div className="w-full flex center flex-col ">
        <img
          src={userManager}
          style={{
            width: "10rem",
          }}
        ></img>
      </div>

      <div className="w-full center flex flex-col">
        <div className="xl:w-4/6 w-full grid grid-cols-2 gap-10">
          <div className=" w-full mt-12 relative flex-col flex start">
            <h1 className="w-full ml-2 text-xl"> First name</h1>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                width: "100%",
                background: "#f1eaf8",
                padding: ".5rem 1rem",
                borderRadius: ".4rem",
                border: "1px solid #b3adb8",
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={disableFirstName}
              placeholder={"Enter first name"}
              inputProps={{ "aria-label": "search google maps" }}
              onBlur={(e) => setDisableFirstName(!disableFirstName)}
            />
            {disableFirstName && (
              <FiEdit
                onClick={(e) => setDisableFirstName(!disableFirstName)}
                className="absolute right-2 top-2/3 -translate-y-1/2  hover:text-orange-400 cursor-pointer"
              />
            )}
          </div>
          <div className=" w-full mt-12 relative flex-col flex start">
            <h1 className="w-full ml-2 text-xl">Last Name</h1>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                width: "100%",
                background: "#f1eaf8",
                padding: ".5rem 1rem",
                borderRadius: ".4rem",
                border: "1px solid #b3adb8",
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={disableLastName}
              placeholder={"Enter your last name"}
              onBlur={(e) => setDisableLastName(!disableLastName)}
            />
            {disableFirstName && (
              <FiEdit
                onClick={(e) => setDisableLastName(!disableLastName)}
                className="absolute right-2 top-2/3 -translate-y-1/2  hover:text-orange-400 cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="xl:w-4/6 w-full mt-6 relative flex-col flex start">
          <h1 className="w-full ml-2 text-xl">Phone Number</h1>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              width: "100%",
              background: "#f1eaf8",
              padding: ".5rem 1rem",
              borderRadius: ".4rem",
              border: "1px solid #b3adb8",
            }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={disablePhone}
            placeholder={"Enter phone number"}
            onBlur={(e) => setDisablePhone(!disablePhone)}
          />
          <FiEdit
            onClick={(e) => setDisablePhone(!disablePhone)}
            className="absolute right-2 top-2/3 -translate-y-1/2  hover:text-orange-400 cursor-pointer"
          />
        </div>
        <div className="xl:w-4/6 w-full mt-6 relative flex-col flex start">
          <h1 className="w-full ml-2 text-xl">Email</h1>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              width: "100%",
              background: "#f1eaf8",
              padding: ".5rem 1rem",
              borderRadius: ".4rem",
              border: "1px solid #b3adb8",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disableEmail}
            placeholder={"Enter your email address"}
            onBlur={(e) => setDisableEmail(!disableEmail)}
          />
          <FiEdit
            onClick={(e) => setDisableEmail(!disableEmail)}
            className="absolute right-2 top-2/3 -translate-y-1/2  hover:text-orange-400 cursor-pointer"
          />
        </div>
        <div className="xl:w-4/6 w-full mt-6 relative flex-col flex start">
          <h1 className="w-full ml-2 text-xl">Join date</h1>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              width: "100%",
              background: "#f1eaf8",
              padding: ".5rem 1rem",
              borderRadius: ".4rem",
              border: "1px solid #b3adb8",
            }}
            value={Utils.formatDate(joinDate)}
            disabled={true}
            placeholder={"No updating"}
            inputProps={{ "aria-label": "search google maps" }}
          />
        </div>

        <div className="xl:w-4/6  w-full mt-6 relative flex-col flex start">
          <h1 className="w-full ml-2 text-xl">Address</h1>
        </div>
        <div
          style={{
            background: "#f1eaf8",
            borderRadius: ".4rem",
            border: "1px solid #b3adb8",
          }}
          className="xl:w-4/6 ml-2 pl-2 w-full  relative flex-col flex start"
        >
          <SelectAddress
            address={address}
            setAddress={setAddress}
          ></SelectAddress>
        </div>
        <div className="xl:w-4/6 w-full mt-12 relative flex-col flex start">
          <h1 className="w-full ml-2 text-xl">Detail Street</h1>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              width: "100%",
              background: "#f1eaf8",
              padding: ".5rem 1rem",
              borderRadius: ".4rem",
              border: "1px solid #b3adb8",
            }}
            value={detailStreet}
            onChange={(e) => setDetailStreet(e.target.value)}
            disabled={disableDetailStreet}
            placeholder={"Enter street address"}
            inputProps={{ "aria-label": "search google maps" }}
            onBlur={(e) => setDisableDetailStreet(!disableDetailStreet)}
          />
          {setDisableDetailStreet && (
            <FiEdit
              onClick={(e) => setDisableDetailStreet(!disableDetailStreet)}
              className="absolute right-2 top-2/3 -translate-y-1/2  hover:text-orange-400 cursor-pointer"
            />
          )}
        </div>
        <button
          className="p-2 rounded-xl"
          style={{
            marginTop: "2rem",
            border: "1px solid #fb923c",
            background: "#fb923c",
            color: "white",
          }}
          onClick={handleSaveChangeProfile}
        >
          Update your information
        </button>
      </div>
    </div>
  );
}

export default UserManager;
