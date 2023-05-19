import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepLabel } from "@mui/material";
import Services from "../../../Services";
import { useContextStore } from "../../../Store";

import { FcFullTrash } from "react-icons/fc";

import { Button, Modal } from "@mui/material";

const steps = [
  {
    label: "Wait to confirmation",
    description: ``,
  },
  {
    label: "Prepare Item",
    description: "",
  },
  {
    label: "Delivery",
    description: ``,
  },
  {
    label: "Order Delivered",
    description: ``,
  },
  {
    label: "Order complete",
    description: ``,
  },
];

function switchDataStatusOrder(step, order_detail_id, item_id) {
  switch (step) {
    case 0: {
      return { order_detail_id, status_process: 1, status: "Preparing" };
    }
    case 1: {
      return {
        order_detail_id,
        status_process: 2,
        status: "Delivery",
      };
    }
    case 2: {
      return {
        order_detail_id,
        status_process: 3,
        status: "Wait received to order",
      };
    }
    case 3: {
      return {
        order_detail_id,
        status_process: 4,
        status: "Guest confirm received",
      };
    }
    case 4: {
      return {
        order_detail_id,
        status_process: 5,
        status: "Completed",
      };
    }
    default:
      console.log("Invalid case");
      return {};
  }
}
export default function StepOrder({
  setCommitCancelledOrder,
  step = 0,
  statusProcess,
  setOrderDetail,
  orderDetail,
}) {
  const { setAlert } = useContextStore();
  const [activeStep, setActiveStep] = React.useState(step);
  const [openEditSale, setOpenEditSale] = useState(false);
  const [itemSaleEdit, setItemSaleEdit] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const changeStatusOrder = async (status, orderId) => {
    const data = switchDataStatusOrder(status, orderId);
    const res = await Services.update("/api/item/order/edit", data);
    if (res.status === 200) {
      setAlert({
        type: "success",
        message: "Order -> " + data.status,
      });
      setOrderDetail((prev) => {
        return {
          ...prev,
          status_process: data.status_process,
          status: data.status,
        };
      });
      setActiveStep((prev) => prev + 1);
    } else {
      setAlert({
        type: "error",
        message: "Order -> failed ",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step
            key={step.label}
            sx={{
              "& svg": {
                color: activeStep >= index ? "#ffae3c!important" : "",
              },
            }}
          >
            <StepLabel>{step.label}</StepLabel>
            {activeStep == index && (
              <Button
                style={{
                  background: "#ffae3c",
                  color: "#fff",
                  marginLeft: "2rem",
                }}
                onClick={(e) => {
                  changeStatusOrder(statusProcess, orderDetail.order_detail_id);
                }}
              >
                Confirm
              </Button>
            )}
          </Step>
        ))}
      </Stepper>
      {orderDetail.status_process !== -1 && (
        <Button
          onClick={(e) => setCommitCancelledOrder(true)}
          sx={{ color: "red", border: "1px solid red", marginTop: "1rem" }}
        >
          Cancel order
        </Button>
      )}{" "}
      {orderDetail.status_process === -1 && (
        <Button
          sx={{ color: "red", border: "1px solid red", marginTop: "1rem" }}
        >
          Order cancelled
        </Button>
      )}
    </Box>
  );
}
