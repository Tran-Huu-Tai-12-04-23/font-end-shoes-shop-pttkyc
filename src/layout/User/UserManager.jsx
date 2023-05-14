import { useState } from "react";

import userManager from "../../assets/icon/userManager.svg";

import { InputBase, FormControl, Select, MenuItem } from "@mui/material";

import ButtonCustom from "../../components/Button";

import { FiEdit } from "react-icons/fi";

function UserManager({ show }) {
  const [fullName, setFullName] = useState("Tran Huu Tai");
  const [disableUserName, setDisableUserName] = useState(true);
  const [gender, setGender] = useState("Male");
  const [disableGender, setDisableGender] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("0376100548");
  const [disablePhone, setDisablePhone] = useState(true);

  const handleChange = (e) => {
    setGender(e.target.value);
    setDisableGender(!disableGender);
  };
  return (
    <div
      className="w-full flex flex-col"
      style={{
        transition: ".8s",
        transform: show ? "" : "scale(0)",
        opacity: show ? "" : "0",
        position: show ? "" : "fixed",
      }}
    >
      <div className="w-full flex center flex-col ">
        <img
          src={userManager}
          style={{
            width: "10rem",
          }}
        ></img>
        <h5 className="font-barlow font-bold mt-5">Tran Huu Tai</h5>
      </div>

      <div className="w-full center flex flex-col">
        <div className="xl:w-4/6 w-full mt-12 relative flex-col flex start">
          <h1 className="w-full ml-2 text-xl">Full Name</h1>
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={disableUserName}
            placeholder={fullName}
            inputProps={{ "aria-label": "search google maps" }}
            onBlur={(e) => setDisableUserName(!disableUserName)}
          />
          {disableUserName && (
            <FiEdit
              onClick={(e) => setDisableUserName(!disableUserName)}
              className="absolute right-2 top-2/3 -translate-y-1/2  hover:text-orange-400 cursor-pointer"
            />
          )}
        </div>
        <div className="xl:w-4/6 w-full mt-6 relative flex-col flex start">
          <h1 className="w-full ml-2 text-xl">Gender</h1>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label=""
            onChange={handleChange}
            sx={{
              ml: 1,
              flex: 1,
              width: "100%",
              background: "#f1eaf8",
              borderRadius: ".4rem",
              "& div": {
                border: "none",
              },
            }}
            disabled={disableGender}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
          {disableGender && (
            <FiEdit
              onClick={(e) => setDisableGender(!disableGender)}
              className="absolute right-2 top-2/3 -translate-y-1/2  hover:text-orange-400 cursor-pointer"
            />
          )}
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
            placeholder={fullName}
            inputProps={{ "aria-label": "search google maps" }}
            onBlur={(e) => setDisablePhone(!disablePhone)}
          />
          <FiEdit
            onClick={(e) => setDisablePhone(!disablePhone)}
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
            value={"1/1/2023"}
            disabled={true}
            placeholder={"1/1/2023"}
            inputProps={{ "aria-label": "search google maps" }}
          />
        </div>
        <div className="xl:w-4/6 w-full mt-6 relative flex-col flex start">
          <h1 className="w-full ml-2 text-xl">Total bought</h1>
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
            value={"$20"}
            disabled={true}
            placeholder={"$20"}
            inputProps={{ "aria-label": "search google maps" }}
          />
        </div>
        <div className="xl:w-4/6 w-full mt-6 relative flex-col flex start">
          <h1 className="w-full ml-2 text-xl">Your address</h1>
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
            value={"my chau , phu my, binh dinh"}
            disabled={true}
            placeholder={"my chau , phu my, binh dinh"}
            inputProps={{ "aria-label": "search google maps" }}
            // onBlur={}
          />
          <FiEdit
            // onClick={}
            className="absolute right-2 top-2/3 -translate-y-1/2  hover:text-orange-400 cursor-pointer"
          />
        </div>

        <button
          className="p-2 rounded-xl"
          style={{
            marginTop: "2rem",
            border: "1px solid #fb923c",
            background: "#fb923c",
            color: "white",
          }}
        >
          Update your information
        </button>
      </div>
    </div>
  );
}

export default UserManager;
