import Pagination from "@mui/material/Pagination";

function PaginationCustom({ setPageActive, setLoadItem, count = 10 }) {
  const handleChange = (event, value) => {
    setPageActive(value);
    setLoadItem(true);
  };

  return (
    <Pagination
      count={count}
      size="large"
      variant="outlined"
      color="primary"
      onChange={handleChange}
    />
  );
}

export default PaginationCustom;
