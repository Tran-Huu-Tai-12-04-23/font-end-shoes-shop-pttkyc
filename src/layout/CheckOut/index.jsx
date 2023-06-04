import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Header from "../../components/Header";

import { AiFillEdit } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import { BsUiChecks, BsCheck2Square } from "react-icons/bs";

import DeliveryInformation from "./DeliveryInformation";
import ButtonCustom from "../../components/Button";
import ItemCheckOut from "./ItemCheckOut";
import OrderSuccess from "./OrderSuccess";

import { useContextStore } from "../../Store";
import ViewOrder from "./ViewOrder";
import { UseAuthUserContext } from "../../AuthUser";
import Services from "../../Services";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 136deg, #5fd28f 0%, #479f6c 50%, #1976d2 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 136deg, #5fd28f 0%, #479f6c 50%, #1976d2 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#000",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, #5fd28f 0%, #479f6c 50%, #1976d2 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    background:
      "linear-gradient( 136deg, #5fd28f 0%, #479f6c 50%, #1976d2 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
}));
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <AiFillEdit className="text-2xl" />,
    2: <BsUiChecks className="text-2xl" />,
    3: <BsCheck2Square className="text-2xl" />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ active, completed }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

function getSteps() {
  return ["Fill information", "Confirm Check", "Complete"];
}
export default function CheckOut() {
  const { user } = UseAuthUserContext();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [specStreet, setSpecStreet] = useState("");
  const [readProvic, setReadProvic] = useState(false);
  //
  const { itemsBag, setItemsBag, setAlert } = useContextStore();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const history = useNavigate();
  const [total, setTotal] = useState(0);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    const initUser = async () => {
      const result = await Services.getDataFromApi(
        "/api/user/get-detail-user/" + `?id=${user?.id}`
      );
      if (result.status === 200) {
        setUserDetail(JSON.parse(result.data));
      }
    };
    initUser();
  }, [user]);

  useEffect(() => {
    let calculatedTotal = 0;
    itemsBag.forEach((item) => {
      if (item.price_sale) {
        calculatedTotal += item.price_sale;
      } else {
        calculatedTotal += item.cost;
      }
    });
    setTotal(calculatedTotal);
    return () => {};
  }, [itemsBag]);

  useEffect(() => {
    const itemFilter = itemsBag.reduce((accumulator, currentItem) => {
      if (!accumulator.some((item) => item.item_id === currentItem.item_id)) {
        const count = itemsBag.filter(
          (item) => item.item_id === currentItem.item_id
        ).length;
        const updatedItem = { ...currentItem, quantityOrder: 1 };
        return [...accumulator, updatedItem];
      }
      return accumulator;
    }, []);

    setItemsBag(itemFilter);
  }, []);

  const [showFormInformation, setShowFormInformation] = useState(true);

  const handleNext = async () => {
    if (activeStep === 1) {
      // const result = await
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    if (activeStep === 0) {
      setShowFormInformation(true);
    }
    if (activeStep === 1) {
      const timeout = setTimeout(() => {
        setShowFormInformation(false);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [activeStep]);
  const checkOut = async () => {
    const nameCheck = [];
    const itemIdCheck = [];
    const priceCheck = [];
    const quantity = [];
    const typeOrder = [];
    itemsBag.forEach((item) => {
      nameCheck.push(item.name);
      itemIdCheck.push(item.item_id);
      priceCheck.push(item.price_sale ? item.price_sale : item.cost);
      quantity.push(1);
      typeOrder.push(item.quantity <= 0 ? 1 : 0);
    });

    const dataCheck = {
      nameItem: nameCheck,
      item_id: itemIdCheck,
      phoneNumber,
      email,
      price: priceCheck,
      address: address + "," + specStreet,
      quantity: quantity,
      nameUser: user ? user.username : "guest",
      accountId: user ? user.id : null,
      typeOrder: typeOrder,
    };
    const result = await Services.callApi("/api/item/order", dataCheck);
    if (result.status === 200) {
      setAlert({
        type: "success",
        message: "Order successfully ",
      });
      setItemsBag([]);
      localStorage.clear();
      return true;
    } else {
      setAlert({
        type: "error",
        message: "Order failed ",
      });
      return false;
    }
  };

  useEffect(() => {
    if (itemsBag.length <= 0) {
      history("/bag");
    }
  }, [itemsBag]);
  return (
    <div>
      <Header />
      <div className="center flex w-full pt-12">
        <div className="w-full xl:w-4/6 pt-12 flex flex-col pb-12">
          <div className="start flex items-center">
            {activeStep === 1 && (
              <ButtonCustom
                nameButton={"Prev"}
                onClick={handleBack}
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
                iconLeft={
                  <MdArrowBackIosNew className="cursor-pointer  text-xl hover:text-orange-500" />
                }
              />
            )}
            {activeStep === 0 && (
              <>
                <MdArrowBackIosNew
                  className="cursor-pointer mt-1 text-2xl hover:text-orange-500"
                  onClick={(e) => {
                    history("/bag");
                  }}
                />
                <h1 className="font-barlow font-bold text-xl  ml-2">
                  Check Out
                </h1>
              </>
            )}
          </div>
          <Stack
            sx={{
              width: "100%",
              fontFamily: `"Barlow Condensed", "sans-serif"`,
            }}
            spacing={4}
          >
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>

          {
            <div
              className="grid grid-cols-2 gap-10 mt-10 "
              style={{
                position: activeStep !== 0 ? "fixed" : "",
              }}
            >
              <div
                className="col-span-1"
                style={{
                  transition: "1s",
                  transform: activeStep !== 0 ? "translateX(-200%)" : "",
                }}
              >
                <DeliveryInformation
                  handleNext={handleNext}
                  setName={setName}
                  setPhoneNumber={setPhoneNumber}
                  setEmail={setEmail}
                  setAddress={setAddress}
                  setSpecStreet={setSpecStreet}
                  name={name}
                  phoneNumber={phoneNumber}
                  email={email}
                  address={address}
                  specStreet={specStreet}
                  readProvic={readProvic}
                  setReadProvic={setReadProvic}
                  userDetail={userDetail}
                />
              </div>
              <div
                className="col-span-1 flex justify-start flex-col p-4"
                style={{
                  transition: "1s",
                  transform: activeStep !== 0 ? "translateX(200%)" : "",
                }}
              >
                <div className=" flex flex-col">
                  <h1
                    className="text-xl font-barlow"
                    style={{
                      borderBottom: "1px solid #f2f2f2",
                    }}
                  >
                    Or Summary
                  </h1>
                  <div
                    className="justify-between flex mt-5 pb-4"
                    style={{
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <h5 className="text-xl font-barlow">Items :</h5>
                    <span className="text-xl font-barlow text-orange-400">
                      {itemsBag.length}
                    </span>
                  </div>
                  <div
                    className="justify-between flex mt-5 pb-4"
                    style={{
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <h5 className="text-xl font-barlow">Shipping :</h5>
                    <span className="text-xl font-barlow text-orange-400">
                      free
                    </span>
                  </div>
                  <div
                    className="justify-between flex mt-5 pb-4"
                    style={{
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <h5 className="text-xl font-barlow">Total :</h5>
                    <span className="text-xl font-barlow text-orange-400">
                      ${total}
                    </span>
                  </div>
                </div>
                {itemsBag.map((item) => {
                  return <ItemCheckOut key={uuid()} data={item} />;
                })}
              </div>
            </div>
          }

          <ViewOrder
            show={activeStep === 1 ? true : false}
            handleNext={handleNext}
            name={name}
            phoneNumber={phoneNumber}
            email={email}
            address={address}
            specStreet={specStreet}
            total={total}
            checkOut={checkOut}
          />
          <OrderSuccess show={activeStep === 2 ? true : false} />
        </div>
      </div>
    </div>
  );
}
