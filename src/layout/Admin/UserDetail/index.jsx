import { useEffect, useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import Util from "../../../util";
import { useContextStore } from "../../../Store";
import SelectAddress from "../../../components/SelectAddress";
import Services from "../../../Services";

const UserDetail = ({ userDetail, setActive }) => {
  const { setAlert } = useContextStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [activeSave, setActiveSave] = useState(false);

  useEffect(() => {
    if (!userDetail) {
      setActive(3);
      setAlert({
        type: "warning",
        message: "Please select user to watch detail",
      });
    }
  }, []);

  useEffect(() => {
    if (userDetail) {
      setFirstName(userDetail?.first_name ? userDetail.first_name : "");
      setLastName(userDetail?.last_name ? userDetail.last_name : "");
      setPhoneNumber(userDetail?.phone_number ? userDetail.phone_number : "");
      setEmail(userDetail?.email ? userDetail.email : "");
      setAddress(userDetail?.address ? userDetail.address : " ");
    }
  }, [userDetail]);

  useEffect(() => {
    if (
      firstName !== userDetail?.first_name ||
      lastName !== userDetail?.last_name ||
      email !== userDetail?.email ||
      phoneNumber !== userDetail?.phone_number ||
      address !== userDetail?.address
    ) {
      setActiveSave(true);
    } else {
      setActiveSave(false);
    }
  }, [
    {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    },
  ]);
  const verifyInformation = () => {
    if (!firstName) {
      return {
        check: false,
        message: "Please enter a first name",
      };
    }
    if (!lastName) {
      return {
        check: false,
        message: "Please enter a last name",
      };
    }
    if (!phoneNumber) {
      return {
        check: false,
        message: "Please enter a phone number",
      };
    }
    if (!email) {
      return {
        check: false,
        message: "Please enter a email ",
      };
    }

    if (!address) {
      return {
        check: false,
        message: "Please enter a address",
      };
    }

    if (!Util.checkIsEmail(email)) {
      return {
        check: false,
        message: "Email is not valid",
      };
    }
    if (!Util.checkPhoneNumber(phoneNumber)) {
      return {
        check: false,
        message: "Phone number is not valid",
      };
    }

    return true;
  };
  const updateProfile = async () => {
    const checkInformation = verifyInformation();
    if (checkInformation.check === false) {
      setAlert({
        type: "error",
        message: checkInformation.message,
      });

      return;
    }

    const data = {
      account_id: userDetail.account_id,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address: address,
      email,
    };

    const result = await Services.callApi("/api/user/update-profile", data);

    if (result.status === 200) {
      setAlert({ type: "success", message: "Updated profile successfully!" });
      setActive(3);
    } else {
      setAlert({ type: "error", message: result.message });
    }
  };
  return (
    <div>
      {userDetail && (
        <>
          <div className=" w-full rounded-xl p-4 bg-slate-100 mt-12">
            <h1 className="text-xl font-barlow font-bold w-full">
              User detail
            </h1>
            <div className="justify-between flex items-center mt-5">
              <div className="flex flex-col">
                <h5 className="font-barlow text-md">
                  Account id :{userDetail?.account_id}
                  <br />
                  <br />
                  Join at :
                  <span className="font-bold ml-2">
                    {Util.formatDate(userDetail?.create_at)}
                  </span>
                </h5>
              </div>
            </div>

            <div
              className="w-full mt-10 flex justify-between pb-5"
              style={{
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <div className="start flex mr-5">
                <Avatar
                  alt="guest"
                  sx={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              </div>
              <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 grid-cols-1   w-full gap-10">
                <TextField
                  label="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  variant="standard"
                />
                <TextField
                  label="Last name"
                  variant="standard"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  label="Phone number"
                  variant="standard"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <TextField
                  label="Email"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <SelectAddress address={address} setAddress={setAddress} />
              </div>
            </div>
            {activeSave && (
              <div className="center flex mt-5">
                <Button
                  onClick={updateProfile}
                  sx={{
                    color: "orange",
                    fontSize: "1rem",
                    background: "rgba(254, 168, 9, .1)",
                    padding: ".3rem 2rem",
                    "&:hover": {
                      background: "rgba(254, 168, 9, .1)",
                    },
                  }}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetail;
