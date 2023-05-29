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
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
function Product({ setProductDetail, setActive }) {
  const { setAlert } = useContextStore();
  const [productSelected, setProductSelected] = useState([]);
  const [activeFilter, settActiveFilter] = useState(true);
  const [filter, setFilter] = useState({});
  const [product, setProduct] = useState([]);
  const [productShow, setProductShow] = useState([]);
  const [prevFilter, setPrevFilter] = useState({});
  const [commitRemoveItem, setCommitRemoveItem] = useState(false);
  const [itemRemove, setItemRemove] = useState({});
  const [commitRemoveItemSelect, setCommitRemoveItemSelect] = useState(false);
  const [addDateFilter, setAddDateFilter] = useState("");

  const columns = [
    {
      field: "item_id",
      headerName: "ID",
      width: 40,
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
      width: 50,
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
      width: "200",
      renderCell: (params) => (
        <div className="w-full justify-between flex items-center">
          <Button
            sx={{
              color: "red",
              padding: ".3rem 2rem",
              fontSize: ".8rem",
            }}
            onClick={(e) => {
              setCommitRemoveItem(true);
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
              background: "rgba(251, 146, 60, .8)",
              color: "#fff",
              padding: ".3rem 2rem",
              fontSize: ".8rem",
              "&:hover": {
                background: "rgba(251, 146, 60, 1)",
              },
            }}
          >
            Detail
          </Button>
        </div>
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
              id: item.item_id,
            };
          })
        );
        setProductShow(
          data.map((item) => {
            return {
              ...item,
              id: item.item_id,
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

  const filterByStatus = (data) => {
    return data.filter((item) => {
      return item.status === filter.status;
    });
  };

  const filterByType = (data) => {
    return data.filter(
      (item) => item?.type?.toLowerCase() === filter?.type?.toLowerCase()
    );
  };

  const filterByDate = (data) => {
    return data.filter((item) => {
      const date = new Date(item.add_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate === filter.addDate;
    });
  };
  const filteredProduct = useMemo(() => {
    let itemFilter = product;
    if (filter.status !== "other" && filter.status) {
      itemFilter = filterByStatus(itemFilter);
    }
    console.log(itemFilter);
    if (filter.type !== "other" && filter.type) {
      itemFilter = filterByType(itemFilter);
    }
    if (addDateFilter) {
      itemFilter = filterByDate(itemFilter);
    }

    return itemFilter;
  }, [filter]);
  useEffect(() => {
    if (!isEmptyObject(filter)) {
      setProductShow(filteredProduct);
    } else {
      setProductShow(product);
    }
  }, [filter]);
  const removeItem = async (itemId) => {
    const result = await Services.update("/api/item/delete", {
      item_id: itemId,
    });

    if (result.status === 200) {
      setAlert({
        type: "success",
        message: "Delete product successfully!",
      });
      setProductShow(productShow.filter((item) => item.item_id !== itemId));
    } else {
      setAlert({
        type: "error",
        message: "Delete product failed!",
      });
    }
    setItemRemove({});
    setCommitRemoveItem(false);
  };

  const handleRemoveItemSelected = async (itemId) => {
    const removeItemsPromise = productSelected.map(async (itemId) => {
      let result = await Services.update("/api/item/delete", {
        item_id: itemId,
      });

      if (result.status === 200) {
        return itemId;
      } else {
        return null;
      }
    });

    const resultRemoveItem = await Promise.all(removeItemsPromise);
    const successfulRemoveItems = resultRemoveItem.filter(
      (itemId) => itemId !== null
    );
    const newListProducts = product.filter(
      (item) => !successfulRemoveItems.includes(item.item_id)
    );
    setProduct(newListProducts);
    setProductShow(newListProducts);

    if (successfulRemoveItems.length > 0) {
      setAlert({
        type: "success",
        message: "Remove items successfully!",
      });
      setCommitRemoveItemSelect(false);
    } else {
      setAlert({
        type: "error",
        message: "Remove items failed!",
      });
    }
  };
  return (
    <div className="w-full mt-12">
      <Modal
        open={commitRemoveItem}
        onClose={(e) => setCommitRemoveItem(false)}
      >
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
                onClick={(e) => setCommitRemoveItem(false)}
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
      <Modal
        open={commitRemoveItemSelect}
        onClose={(e) => setCommitRemoveItemSelect(false)}
      >
        <Box sx={style}>
          <div className="flex-col flex w-full center  ">
            <FcFullTrash className="text-8xl" />
            <h1 className="font-barlow font-bold w-fit mt-5 ">
              Are you sure you want to remove all items selected{" "}
            </h1>

            <div className="justify-between w-3/5 ml-auto mr-auto flex center mt-6">
              <Button
                sx={{
                  border: "1px solid #fb923c",
                  color: "#000",
                  marginRight: "1rem",
                }}
                onClick={(e) => setCommitRemoveItemSelect(false)}
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
                onClick={handleRemoveItemSelected}
              >
                Commit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <div className="w-full end flex mb-4">
        {!isEmptyObject(filter) && (
          <div className="font-barlow mr-2">Filter :</div>
        )}
        {filter.status && (
          <h5 className="font-barlow mr-2">status : {filter.status}</h5>
        )}
        {filter.type && (
          <h5 className="font-barlow mr-2">- type : {filter.type}</h5>
        )}
        {filter.addDate && (
          <h5 className="font-barlow mr-2">- add date : {filter.addDate}</h5>
        )}
        {!isEmptyObject(filter) && (
          <Button
            variant="outline"
            sx={{
              color: "red",
              marginRight: "1rem",
              border: "1px solid red",
            }}
            onClick={(e) => setFilter({})}
          >
            Clear filter
          </Button>
        )}

        {productSelected.length > 0 && (
          <ButtonCustom
            nameButton="Remove product selected"
            style={{
              marginRight: "1rem",
              color: "red",
              border: "1px solid red",
            }}
            onClick={(e) => setCommitRemoveItemSelect(true)}
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
              setFilter((prev) => {
                return { ...prev, status: "90%" };
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
              setFilter((prev) => {
                return { ...prev, status: "95%" };
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
              setFilter((prev) => {
                return { ...prev, status: "99%" };
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
              return { ...prev, status: "other" };
            }}
          >
            other
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
              setFilter((prev) => {
                return { ...prev, type: "running" };
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
              setFilter((prev) => {
                return { ...prev, type: "sneaker" };
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

              setFilter((prev) => {
                return { ...prev, type: "sandals" };
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
              setFilter((prev) => {
                return { ...prev, type: "hiking" };
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
              setFilter((prev) => {
                return { ...prev, type: "other" };
              });
            }}
          >
            Other
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
              value={addDateFilter}
              onChange={(e) => {
                setAddDateFilter(e.target.value);
                setFilter((prev) => {
                  return {
                    ...prev,
                    addDate: e.target.value,
                  };
                });
              }}
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
      <Table
        data={productShow}
        columns={columns}
        pageSize={12}
        setSelection={setProductSelected}
      ></Table>
    </div>
  );
}

export default memo(Product);
