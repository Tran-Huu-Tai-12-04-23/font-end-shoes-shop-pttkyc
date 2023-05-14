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

import product1 from "../../assets/img/home/product1.png";
import product2 from "../../assets/img/home/product2.png";
import product3 from "../../assets/img/home/product3.png";

import { AiFillEdit } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import { BsUiChecks, BsCheck2Square } from "react-icons/bs";

import DeliveryInformation from "./DeliveryInformation";
import ButtonCustom from "../../components/Button";
import ItemCheckOut from "./ItemCheckOut";
import OrderSuccess from "./OrderSuccess";

import ViewOrder from "./ViewOrder";

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
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const history = useNavigate();
  const images = [
    product1,
    product2,
    product3,
    product1,
    product2,
    product3,
    product2,
  ];
  const [showFormInformation, setShowFormInformation] = useState(true);

  const handleNext = () => {
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
                <DeliveryInformation handleNext={handleNext} />
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
                    <h5 className="text-xl font-barlow">
                      Items ({images.length}):
                    </h5>
                    <span className="text-xl font-barlow text-orange-400">
                      $ 45
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
                      $ 3
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
                      $ 48
                    </span>
                  </div>
                </div>
                {images.map((item) => {
                  return <ItemCheckOut key={uuid()} data={item} />;
                })}
              </div>
            </div>
          }

          <ViewOrder
            show={activeStep === 1 ? true : false}
            handleNext={handleNext}
          />
          <OrderSuccess show={activeStep === 2 ? true : false} />
        </div>
      </div>
    </div>
  );
}
