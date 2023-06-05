import { useState, useEffect } from "react";

import { Alert, Button } from "@mui/material";
import Services from "../../../Services";
import Table from "../../../components/Table";
import { useContextStore } from "../../../Store";

const ItemTrash = () => {
  const { setAlert } = useContextStore();
  const [product, setProduct] = useState([]);
  const [productSelected, setProductSelected] = useState([]);

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
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            sx={{
              color: "red",
              padding: ".3rem 2rem",
              fontSize: ".8rem",
              "&:hover": {
                filter: "brightness(120%)",
              },
            }}
            onClick={(e) => {
              handleDetail(params.row.account_id);
            }}
          >
            Destroy
          </Button>
          <Button
            style={{
              padding: ".3rem 2rem",
              fontSize: ".8rem",
              background: "rgba(37, 134, 248, .1)",
              marginLeft: "1rem",

              "&:hover": {
                background: "rgba(37, 134, 248, .1)",
                filter: "brightness(120%)",
              },
            }}
            onClick={(e) => {
              restore(params.row.item_id);
            }}
          >
            Restore
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    const initItemTrash = async () => {
      const result = await Services.getDataFromApi("/api/item/trash");
      if (result.status === 200) {
        const productsWithId = result.data.map((item) => ({
          ...item,
          id: item.item_id, // Use the item_id as the unique identifier
        }));
        setProduct(productsWithId);
      } else {
        console.error(result);
      }
    };
    initItemTrash();
  }, []);
  const restore = async (itemId) => {
    const result = await Services.update("/api/item/restore", {
      item_id: itemId,
    });

    if (result.status === 200) {
      setAlert({
        type: "success",
        message: "Restore item successfully !",
      });
      setProduct(product.filter((product) => product.item_id !== itemId));
    } else {
      setAlert({
        type: "error",
        message: "Restore item failed !",
      });
    }
  };

  const handleRestoreItemSelect = async () => {
    const restorePromises = productSelected.map(async (itemId) => {
      const result = await Services.update("/api/item/restore", {
        item_id: itemId,
      });
      if (result.status === 200) {
        return itemId;
      }
      return null;
    });
    const restoredItems = await Promise.all(restorePromises);
    const successfulRestoreItems = restoredItems.filter(
      (itemId) => itemId !== null
    );
    setProduct(
      product.filter((item) => !successfulRestoreItems.includes(item.item_id))
    );

    if (successfulRestoreItems.length > 0) {
      setAlert({
        type: "success",
        message: "Restore items successfully!",
      });
    } else {
      setAlert({
        type: "error",
        message: "Restore items failed!",
      });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-barlow mt-5 mb-5">All items deleted</h1>

      {productSelected.length > 0 && (
        <div className="end flex ">
          <Button
            sx={{
              border: "1px solid #1976d2",
              marginLeft: "auto",
              marginBottom: "1rem",
            }}
            onClick={handleRestoreItemSelect}
          >
            Restore item selected
          </Button>
        </div>
      )}
      {product.length > 0 && (
        <Table
          data={product}
          columns={columns}
          pageSize={12}
          setSelection={setProductSelected}
        ></Table>
      )}
      {product.length <= 0 && (
        <Alert severity="info">Haven't product on trash</Alert>
      )}
    </div>
  );
};

export default ItemTrash;
