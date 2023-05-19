import { useState } from "react";
import StepAdd from "./Step";

import ButtonCustom from "../../../components/Button";
import FillInformation from "./FillInformation";
import CreateAccount from "./CreateAccount";

import { CircularProgress, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

import Services from "../../../Services";
import { useEffect } from "react";
import { useContextStore } from "../../../Store";

function AddNewEmployee({ setActive }) {
  const { setAlert } = useContextStore();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  //   step 2
  const [role, setRole] = useState(2);
  const [salary, setSalary] = useState(200);
  const [branch, setBranch] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [showLoad, setShowLoad] = useState(false);
  const [branchStore, setBranchStore] = useState([]);
  const [branchId, setBranchId] = useState(1);

  const history = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await Services.getDataFromApiOrder("/api/get-branch");
      if (result.status === 200) {
        setBranchStore(JSON.parse(result.data));
        setBranch(JSON.parse(result.data)[0]?.name);
      }
    }
    fetchData();
  }, []);

  const handleAddNewEmployee = async () => {
    if (
      !firstName ||
      !lastName ||
      !role ||
      !phoneNumber ||
      !address ||
      !branchId ||
      !salary
    ) {
      setAlert({
        type: "error",
        message: "Please enter full information",
      });
      return;
    }
    const result = await Services.callApi("/api/user/add-employee", {
      email,
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      role,
      phoneNumber,
      address,
      branchId,
      salary,
    });

    if (result.status === 200) {
      setAlert({
        type: "success",
        message: "Add new employee successfully!",
      });
      setStep(2);
    } else {
      setAlert({
        type: "error",
        message: "Add new employee failed!",
      });
      setStep(0);
    }
  };

  const stepTwoActive = () => {
    if (!username || !password || !email || !confirmPassword) {
      setAlert({
        type: "error",
        message: "Please enter information!",
      });
    } else if (password !== confirmPassword) {
      setAlert({
        type: "error",
        message: "Password and confirm password does not match!",
      });
    } else {
      setStep((prev) => {
        return prev + 1;
      });
    }
  };

  return (
    <>
      <div className="w-full center flex mt-12 flex-col">
        <div className="w-5/6  center flex flex-col">
          <h1 className="text-3xl font-barlow font-bold ml-auto mr-auto">
            Add New Employee
          </h1>

          <div
            className="ml-4 mr-4 p-4 rounded-xl bg-orange-400  relative mt-10 "
            style={{
              zIndex: "1",
              width: "96%",
            }}
          >
            <StepAdd
              step={step}
              setActive={setActive}
              setShowLoad={setShowLoad}
            />
          </div>
          <div className="w-full pt-20 -translate-y-8 p-4 rounded-xl bg-slate-100">
            {step === 0 && (
              <CreateAccount
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                password={password}
                setPassword={setPassword}
              />
            )}
            {step === 1 && (
              <FillInformation
                setRole={setRole}
                setSalary={setSalary}
                setBranch={setBranch}
                setPhoneNumber={setPhoneNumber}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setAddress={setAddress}
                role={role}
                salary={salary}
                branch={branch}
                phoneNumber={phoneNumber}
                firstName={firstName}
                lastName={lastName}
                address={address}
                branchStore={branchStore}
                branchId={branchId}
                setBranchId={setBranchId}
              />
            )}

            {step === 2 && (
              <div className="p-4 rounded-xl center flex flex-col">
                <div className=" center flex">
                  <div className="p-4 mr-2 rounded-full center flex h-10 w-10 bg-green-300">
                    <FaCheck className="text-3xl" />
                  </div>
                  <h5 className="text-3xl font-bold font-barlow text-green-400">
                    Add new employee successfully!
                  </h5>
                </div>
                <Button
                  sx={{ marginTop: "1rem" }}
                  onClick={(e) => {
                    setStep(0);
                  }}
                >
                  Return
                </Button>
              </div>
            )}
            {step !== 2 && (
              <>
                <div className="w-full  flex end justify-between ">
                  {step !== 0 && (
                    <ButtonCustom
                      style={{}}
                      nameButton="Back"
                      onClick={(e) => setStep((prev) => prev - 1)}
                    />
                  )}
                  <ButtonCustom
                    style={{
                      marginLeft: "auto",
                      backgroundColor: "#F79540",
                      color: "#fff",
                    }}
                    nameButton="Next"
                    onClick={(e) => {
                      if (step === 0) {
                        stepTwoActive();
                      } else {
                        handleAddNewEmployee();
                      }
                    }}
                  />
                </div>
              </>
            )}
          </div>
          {/*
           */}
        </div>
      </div>
      <div
        className="bg-blur fixed top-0 bottom-0 right-0 left-0 center flex "
        style={{
          zIndex: "1000",
          display: showLoad ? "" : "none",
        }}
      >
        <CircularProgress />
      </div>
    </>
  );
}

export default AddNewEmployee;
