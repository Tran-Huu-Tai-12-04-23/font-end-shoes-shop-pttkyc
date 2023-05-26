import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel({ value }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={(value * 100) / 60}
        size={"1.8rem"}
        sx={{
          color: "#ccc",
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="text-sm font-barlow text-gray-200">{`${Math.round(
          value
        )}s`}</h1>
      </Box>
    </Box>
  );
}

export default function WaitEnterCode({ timeValid = 0, setTimeValid }) {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeValid((prev) => (prev >= 60 ? 0 : prev + 1));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={timeValid} />;
}
