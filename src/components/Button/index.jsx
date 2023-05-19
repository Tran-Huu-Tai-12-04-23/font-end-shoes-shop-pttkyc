import Button from "@mui/material/Button";
import { styled } from "@mui/system";

function ButtonCustom({
  disabled,
  nameButton = "",
  type = "text",
  className = {},
  style = {},
  onClick = () => {},
  iconLeft,
  iconRight,
  sx = {},
  hoverBg,
}) {
  const MyButton = styled(Button)({
    fontFamily: `"Barlow Condensed", "sans-serif"`,
    color: "#000",
    ...style,
    "&:hover": {
      backgroundColor: hoverBg ? hoverBg : "transparent",
    },
  });
  return (
    <MyButton variant={type} onClick={onClick} className={className} sx={sx}>
      {iconLeft}
      <span>{nameButton}</span>
      {iconRight}
    </MyButton>
  );
}

export default ButtonCustom;
