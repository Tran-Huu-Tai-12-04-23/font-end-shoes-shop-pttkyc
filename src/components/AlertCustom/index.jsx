import Alert from "@mui/material/Alert";

export default function AlertCustom({
  type = "error",
  message = "",
  width = "40vw",
  style = {},
  onClose = () => {},
}) {
  return (
    <div className="" style={{ width: width, ...style }}>
      <Alert onClose={onClose} severity={type}>
        {message}
      </Alert>
    </div>
  );
}
