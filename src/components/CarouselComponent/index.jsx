import React from "react";
import { v4 as uuid } from "uuid";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const CarouselComponent = ({ data = [], height = "30rem", classImg }) => {
  const renderCarouselItems = () => {
    const MyPaper = styled(Paper)({
      backgroundColor: "transparent",
      height: height,
      width: "100%",
      border: "none",
    });

    return data.map((photo) => (
      <MyPaper key={uuid()}>
        <div
          className=" "
          style={{
            padding: "1rem",
            borderRadius: ".5rem",
            height: "100%",
            width: "100%",
          }}
        >
          <img
            className={`m-2 ${classImg}`}
            style={{
              height: "100%",
              margin: "0 auto",
              objectFit: "contain",
            }}
            src={photo}
          />
        </div>
      </MyPaper>
    ));
  };

  return <Carousel>{renderCarouselItems()}</Carousel>;
};

export default CarouselComponent;
