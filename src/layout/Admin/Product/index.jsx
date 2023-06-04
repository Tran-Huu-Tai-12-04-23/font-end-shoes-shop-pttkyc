import { useEffect, useState, memo, useMemo } from "react";

import Table from "../../../components/Table";
import { v4 as uuid } from "uuid";

import MenuItem from "@mui/material/MenuItem";
import ButtonCustom from "../../../components/Button";
import CustomizedMenus from "../../../components/CustomizedMenu";

import Services from "../../../Services";
import { Button, Modal, Box } from "@mui/material";
import { FcFullTrash } from "react-icons/fc";
import { useContextStore } from "../../../Store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #fb923c",
  boxShadow: 24,
  borderRadius: ".6rem",
  p: 4,
};

function Product({ setProductDetail, setActive }) {
  const { setAlert } = useContextStore();
  const [productSelected, setProductSelected] = useState([]);
  const [activeFilter, settActiveFilter] = useState(true);
  const [filter, setFilter] = useState({});
  const [product, setProduct] = useState([]);
  const [productShow, setProductShow] = useState([]);
  const [prevFilter, setPrevFilter] = useState({});
  const [commitRemoveItem, setCommRemoveItem] = useState(false);
  const [itemRemove, setItemRemove] = useState({});
  const columns = [
    {
      field: "item_id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "link_photo",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <div className="p-4 rounded-xl">
          <img
            src={params.row.link_photo}
            alt="product"
            style={{ width: 50, height: 50 }}
          />
        </div>
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "color",
      headerName: "Color",
      width: 100,
      renderCell: (params) => (
        <div
          className="rounded-full p-2 h-3 w-3"
          alt="product"
          style={{
            border: "1px solid #fb923c",
            width: 30,
            height: 30,
            background: params.row.color,
          }}
        />
      ),
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 100,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
    },
    {
      field: "add_date",
      headerName: "Add date",
      width: 200,
    },
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            sx={{
              color: "red",
            }}
            onClick={(e) => {
              setCommRemoveItem(true);
              let data = productShow.filter((item) => {
                return item.item_id === params.row.item_id;
              });
              if (data.length > 0) {
                setItemRemove(data[0]);
              }
            }}
          >
            Remove
          </Button>
          <Button
            onClick={(e) => {
              handleDetail(params.row.item_id);
            }}
            sx={{
              marginLeft: "1rem",
              background: "#FB923C",
              color: "#fff",
              padding: ".5rem 1rem",
              "&:hover": {
                background: "rgba(251, 146, 60, .8)",
              },
            }}
          >
            Detail
          </Button>
        </>
      ),
    },
  ];

  // Function to handle detail action
  function handleDetail(id) {
    setActive(1.1);
    setProductDetail(id);
  }

  useEffect(() => {
    let limit = 100;
    let number = 0;
    const handleGetAllItems = async () => {
      const result = await Services.getDataFromApi(
        "/api/item/all",
        `/?limit=${limit}&number=${number}`
      );
      if (result.status === 200) {
        const data = JSON.parse(result.data);
        setProduct(
          data.map((item) => {
            return {
              ...item,
              id: uuid(),
            };
          })
        );
        setProductShow(
          data.map((item) => {
            return {
              ...item,
              id: uuid(),
            };
          })
        );
      } else {
        setAlert({
          type: "error",
          message: "Server is err",
        });
      }
    };
    handleGetAllItems();
  }, []);

  const filterByStatus = () => {
    return product.filter((item) => item.status === filter.value);
  };

  const filterByType = () => {
    return product.filter((item) => item.type === filter.value);
  };

  const filterByDate = () => {
    return product.filter((item) => {
      const date = new Date(item.add_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate === filter.value;
    });
  };
  const filteredProduct = useMemo(() => {
    if (!filter.type) {
      return product;
    }

    switch (filter.type) {
      case "status":
        return filterByStatus();
      case "type":
        return filterByType();
      case "date":
        return filterByDate();
      default:
        return product;
    }
  }, [filter, product]);
  useEffect(() => {
    setProduct(filteredProduct);
  }, [filter, product]);
  const removeItem = async (itemId) => {
    const result = await Services.update("/api/item/delete", {
      item_id: itemId,
    });

    if (result.status === 200) {
      setAlert({
        type: "success",
        message: "Delete product successfully!",
      });
    } else {
      setAlert({
        type: "error",
        message: "Delete product failed!",
      });
    }
    setItemRemove({});
    setCommRemoveItem(false);
  };

  return (
    <div className="w-full mt-12">
      <Modal open={commitRemoveItem} onClose={(e) => setCommRemoveItem(false)}>
        <Box sx={style}>
          <div className="flex-col flex w-full center  ">
            <FcFullTrash className="text-8xl" />
            <h1 className="font-barlow font-bold w-fit mt-5 ">
              Are you sure you want to remove item{" "}
            </h1>
            <span className="text-red-500 mt-2 font-barlow">
              {itemRemove.name}
            </span>

            <div className="justify-between w-3/5 ml-auto mr-auto flex center mt-6">
              <Button
                sx={{
                  border: "1px solid #fb923c",
                  color: "#000",
                  marginRight: "1rem",
                }}
                onClick={(e) => setCommRemoveItem(false)}
              >
                Close
              </Button>
              <Button
                sx={{
                  backgroundColor: "#ff5555",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#ff6054",
                  },
                }}
                onClick={(e) => {
                  removeItem(itemRemove.item_id);
                }}
              >
                Commit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <div className="w-full end flex mb-4">
        {filter.type && (
          <>
            <div className="font-barlow mr-2">
              Filter : {filter.type} : {filter.value}
            </div>
            <Button
              variant="outline"
              sx={{
                color: "red",
              }}
              onClick={(e) => setFilter({})}
            >
              Clear filter
            </Button>
          </>
        )}

        {productSelected.length > 0 && (
          <ButtonCustom
            nameButton="Remove product selected"
            style={{
              marginRight: "1rem",
              color: "red",
              border: "1px solid red",
            }}
          />
        )}
        <CustomizedMenus
          nameButton={"Status"}
          active={activeFilter}
          setActive={settActiveFilter}
        >
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setPrevFilter(filter);
              setFilter({
                type: "status",
                value: "90%",
              });
            }}
          >
            90%
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "status",
                value: "95%",
              });
            }}
          >
            95%
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "status",
                value: "99%",
              });
            }}
          >
            99%
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "status",
                value: "other",
              });
            }}
          >
            other
          </MenuItem>
          <MenuItem
            disableRipple
            sx={{
              color: "red",
              bproductTop: "1px solid red",
            }}
            onClick={(e) => {
              setFilter(prevFilter);
              settActiveFilter(false);
            }}
          >
            Cancel
          </MenuItem>
        </CustomizedMenus>
        <CustomizedMenus
          nameButton={"Type"}
          active={activeFilter}
          setActive={settActiveFilter}
        >
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "type",
                value: "running",
              });
            }}
          >
            Running
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "type",
                value: "sneaker",
              });
            }}
          >
            Sneaker
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "type",
                value: "sandals",
              });
            }}
          >
            Sandals
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "type",
                value: "hiking",
              });
            }}
          >
            Hiking
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={(e) => {
              setPrevFilter(filter);
              settActiveFilter(false);
              setFilter({
                type: "type",
                value: "other",
              });
            }}
          >
            Other
          </MenuItem>
          <MenuItem
            disableRipple
            sx={{
              color: "red",
              bproductTop: "1px solid red",
            }}
            onClick={(e) => {
              setFilter(prevFilter);
              settActiveFilter(false);
            }}
          >
            Cancel
          </MenuItem>
        </CustomizedMenus>
        <CustomizedMenus
          nameButton={"Date"}
          active={activeFilter}
          setActive={settActiveFilter}
        >
          <MenuItem
            disableRipple
            onClick={(e) => {
              settActiveFilter(false);
              setFilter("running");
            }}
          >
            <input
              type="date"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                setFilter({
                  type: "date",
                  value: e.target.value,
                })
              }
            />
          </MenuItem>
          <MenuItem
            disableRipple
            sx={{
              color: "red",
              bproductTop: "1px solid red",
            }}
            onClick={(e) => {
              settActiveFilter(false);
            }}
          >
            Cancel
          </MenuItem>
        </CustomizedMenus>
      </div>
      {
        <Table
          data={productShow}
          columns={columns}
          pageSize={12}
          setSelection={setProductSelected}
        ></Table>
      }
    </div>
  );
}

export default memo(Product);
