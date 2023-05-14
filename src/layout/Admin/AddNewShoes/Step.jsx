import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { v4 as uuid } from "uuid";
import { useEffect } from "react";

const steps = ["Product information", "Media about product", "Commit"];

export default function StepAdd({ step, setActive, setShowLoad }) {
  return (
    <Box sx={{ width: "100%", color: "white" }}>
      <Stepper activeStep={step}>
        {steps.map((label, index) => {
          return (
            <Step key={uuid()}>
              <StepLabel>
                <span
                  style={{
                    color: "#fff",
                  }}
                >
                  {label}
                </span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
