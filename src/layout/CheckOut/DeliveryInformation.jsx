import { useState } from "react";
import Input from "../../components/Input";
import SelectAddress from "./SelectAddress";

import ButtonCustom from "../../components/Button";

import TextField from "@mui/material/TextField";

function DeliveryInformation({ handleNext = () => {} }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [specStreet, setSpecStreet] = useState("");

  const handleContinue = () => {
    // if (!name || !phoneNumber || !email || !address || !specStreet) {
    //   return;
    // }
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

        <SelectAddress address={address} setAddress={setAddress} />
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
          <input type="checkbox" />
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
        <ButtonCustom
          nameButton="Continue"
          sx={{
            padding: ".5rem 3rem",
            marginTop: "2rem",
            background: "var(--linear)",
            color: "#fff",
            width: "10rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={handleContinue}
        />
      </div>
    </div>
  );
}

export default DeliveryInformation;
