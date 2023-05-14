import { useState } from "react";
import StepAdd from "./Step";

import { v4 as uuid } from "uuid";
import ButtonCustom from "../../../components/Button";
import FillInformation from "./FillInformation";

import { CircularProgress } from "@mui/material";
import AddPictureProduct from "./AddPictureProduct";

import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

import Services from "../../../Services";
import { useEffect } from "react";
import { useContextStore } from "../../../Store";

function AddNewShoes({ setActive }) {
  const { setAlert } = useContextStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [listPhoto, setListPhoto] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [branch, setBranch] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [branchSelected, setBranchSelected] = useState({});
  const [cost, setCost] = useState(1);
  const [age, setAge] = useState("all");
  const [gender, setGender] = useState("male");
  const [showLoad, setShowLoad] = useState(false);

  const history = useNavigate();

  const Service = new Services();

  useEffect(() => {
    async function fetchData() {
      const result = await Service.getDataFromApiOrder("/api/get-branch");
      if (result.status === 200) {
        setBranch(JSON.parse(result.data));
        setBranchSelected(JSON.parse(result.data)[0]?.name);
      }
    }
    fetchData();
  }, []);
  const verifyInformation = () => {
    if (
      !name ||
      !des ||
      !brand ||
      !size ||
      !color ||
      !type ||
      !branchSelected ||
      !cost ||
      !gender ||
      !status ||
      !age ||
      listPhoto.length === 0
    ) {
      return false;
    }
    return true;
  };
  const handleNextStep = (value = 0) => {
    setShowLoad(true);
    setStep(value);
    const timeOut = setTimeout(() => {
      setShowLoad(false);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  };

  const handleAddNewShoes = async () => {
    const verify = verifyInformation();
    if (verify) {
      setShowLoad(true);
      const brandID = branch.filter((item) => item.name === branchSelected);
      console.log(brandID);
      const listUrlPhotoOfStorage = await Service.uploadListPhoto(listPhoto);
      const resultInsertNewShoes = await Service.callApi("/api/item/add", {
        name,
        des,
        status,
        size,
        color,
        type,
        age,
        branch_id: brandID[0].branch_id ? brandID[0].branch_id : 1,
        quantity,
        photos: listUrlPhotoOfStorage,
        gender,
        cost,
        brand,
      });

      if (resultInsertNewShoes.status === 200) {
        setAlert({
          type: "success",
          message: "Add new products successfully!",
        });
        setShowLoad(false);
        history("/admin");
        setActive(1);
      } else {
        setAlert({
          type: "error",
          message: "Add new products failed!",
        });
        setStep(0);
      }
    } else {
      setAlert({
        type: "warning",
        message: "Please enter full information!",
      });
    }
  };

  return (
    <>
      <div className="w-full center flex mt-12 flex-col">
        <div className="w-5/6  center flex flex-col">
          <h1 className="text-3xl font-barlow font-bold ml-auto mr-auto">
            Add New Product
          </h1>
          <h5 className="text-xl font-barlow text-slate-400">
            This information will describe more about the product.
          </h5>
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
              <FillInformation
                age={age}
                setAge={setAge}
                cost={cost}
                setCost={setCost}
                quantity={quantity}
                setQuantity={setQuantity}
                branchSelected={branchSelected}
                setBranchSelected={setBranchSelected}
                branch={branch}
                name={name}
                setName={setName}
                setBrand={setBrand}
                brand={brand}
                des={des}
                setDes={setDes}
                status={status}
                setStatus={setStatus}
                color={color}
                setColor={setColor}
                size={size}
                type={type}
                setType={setType}
                setSize={setSize}
                gender={gender}
                setGender={setGender}
              />
            )}
            {step === 1 && (
              <AddPictureProduct
                listPhoto={listPhoto}
                setListPhoto={setListPhoto}
              />
            )}
            {step === 2 && (
              <div className="p-4 rounded-xl center flex">
                <div className="p-4 mr-2 rounded-full center flex h-10 w-10 bg-green-300">
                  <FaCheck className="text-3xl" />
                </div>
                <h5 className="text-3xl font-bold font-barlow text-green-400">
                  Add new product successfully!
                </h5>
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
                      if (step === 1) {
                        handleAddNewShoes();
                      }
                      handleNextStep(step + 1);
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

export default AddNewShoes;
