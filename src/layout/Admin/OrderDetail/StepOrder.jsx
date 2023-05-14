import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  {
    label: "Order",
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
];

export default function StepOrder({ step = 0 }) {
  const [activeStep, setActiveStep] = React.useState(step);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
