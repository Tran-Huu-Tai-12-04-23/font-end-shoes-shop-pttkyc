import { useEffect } from "react";

import SelectAddress from "../../components/SelectAddress";

import ButtonCustom from "../../components/Button";
import Util from "../../util";

import TextField from "@mui/material/TextField";
import { useContextStore } from "../../Store";
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
function DeliveryInformation({
  userDetail,
  setReadProvic,
  handleNext = () => {},
  name,
  phoneNumber,
  email,
  address,
  specStreet,
  setName,
  setPhoneNumber,
  setEmail,
  setAddress,
  setSpecStreet,
  readProvic,
}) {
  const { setAlert } = useContextStore();
  useEffect(() => {
    setName(
      userDetail.first_name && userDetail.last_name
        ? userDetail.first_name + " " + userDetail.last_name
        : ""
    );
    setPhoneNumber(userDetail.phone_number ? userDetail.phone_number : "");
    const { firstPart, lastPart } = splitString(userDetail.address);
    setAddress(firstPart ? firstPart : "");
    setEmail(userDetail.email ? userDetail.email : "");
    setSpecStreet(lastPart ? lastPart : "");
  }, [userDetail]);
  const handleContinue = () => {
    if (!readProvic) {
      setAlert({
        type: "error",
        message: "You have to commit to privacy!",
      });
      return;
    }
    if (!name || !phoneNumber || !email || !address || !specStreet) {
      setAlert({
        type: "error",
        message: "Please enter full information!",
      });
      return;
    }
    if (!Util.isValidPhoneNumber(phoneNumber)) {
      setAlert({
        type: "error",
        message: "Your number is invalid!",
      });
      return;
    }
    if (!Util.checkIsEmail(email)) {
      setAlert({
        type: "error",
        message: "Your email is invalid!",
      });
      return;
    }

    handleNext();
  };

  return (
    <div
      className="w-full p-4 transition-all"
      style={{
        borderRight: "1px solid #f2f2f2",
        borderLeft: "1px solid #afb5bc",
      }}
    >
      <h5
        className="text-xl font-barlow"
        style={{
          borderBottom: "1px solid #f2f2f2",
        }}
      >
        Delivery Information
      </h5>

      <div className=" grid font-barlow gap-6 ">
        <TextField
          onChange={(e) => setName(e.target.value)}
          label="Name"
          variant="standard"
          value={name}
          sx={{
            fontFamily: `"Barlow Condensed", "sans-serif"`,
            width: "100%",
          }}
        />

        <SelectAddress
          address={address}
          setAddress={setAddress}
          userDetail={userDetail}
        />
        <TextField
          label="Specific street name"
          variant="standard"
          value={specStreet}
          onChange={(e) => setSpecStreet(e.target.value)}
          sx={{
            fontFamily: `"Barlow Condensed", "sans-serif"`,
            width: "100%",
          }}
        />

        <h1 className="text-xl mt-10 font-barlow">Your contact :</h1>
        <TextField
          label="Phone number"
          variant="standard"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{
            fontFamily: `"Barlow Condensed", "sans-serif"`,
            width: "100%",
          }}
        />
        <TextField
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            fontFamily: `"Barlow Condensed", "sans-serif"`,
            width: "100%",
          }}
        />
        <div className="items-start w-full flex mt-3">
          <input
            type="checkbox"
            onChange={(e) => setReadProvic(e.target.checked)}
          />
          <p className="text-xs text-clip text-gray-600 ml-3">
            I have read and consent to eShopWorid processing my information in
            accordance with the{" "}
            <a href="" className="text-blue-400 font-bold italic  ml-2 mr-2">
              Privacy
            </a>{" "}
            Statement and Cookie
            <a href="" className="text-blue-400 font-bold italic ml-2 mr-2">
              Policy
            </a>
            . eShopWortd is a trusted Nike partner.
          </p>
        </div>

        <div className="text-sm text-blue-800">
          - Currently, we only accept one type of payment, which is cash on
          delivery.
        </div>
        <button
          onClick={handleContinue}
          style={{
            padding: ".5rem 3rem",
            marginTop: "2rem",
            background: "var(--linear)",
            color: "#fff",
            width: "8rem",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: ".4rem",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DeliveryInformation;
