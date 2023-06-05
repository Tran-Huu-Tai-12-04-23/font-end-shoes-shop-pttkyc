import React from "react";
import { v4 as uuid } from "uuid";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const CarouselComponent = ({ data = [], classImg }) => {
  const renderCarouselItems = () => {
    const MyPaper = styled(Paper)({
      backgroundColor: "transparent",
      height: "unset",
      width: "100%",
      border: "none",
      borderRadius: "20px",
    });

    return data.map((photo) => (
      <MyPaper key={uuid()}>
        <img
          className={`m-2 rounded-xl ${classImg}`}
          style={{
            height: "100%",
            margin: "0 auto",
            objectFit: "contain",
          }}
          src={photo}
        />
      </MyPaper>
    ));
  };

  return <Carousel>{renderCarouselItems()}</Carousel>;
};

export default CarouselComponent;
