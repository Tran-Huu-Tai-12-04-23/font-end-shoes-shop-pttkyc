import { useState } from "react";
import Utils from "../../../util";

import { FiTrash2 } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { FcFullTrash } from "react-icons/fc";

import { Button, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContextStore } from "../../../Store";
import Services from "../../../Services";
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
function PreviewItemSale({
  data,
  setItemSales,
  setOpenEditSale,
  setItemSaleEdit,
}) {
  const { setAlert } = useContextStore();
  const [commitRemoveModal, setCommitRemoveModal] = useState(false);
  const Util = new Utils();

  const handleOpen = () => setCommitRemoveModal(true);
  const handleClose = () => setCommitRemoveModal(false);
  const handleRemoveSaleItem = async (id) => {
    const res = await Services.remove("/api/item/sale/delete", `/?id=${id}`);
    if (res.status === 200) {
      setItemSales((prev) => {
        return prev.filter((item) => item.sale_id !== id);
      });
      setAlert({
        type: "success",
        message: res.message,
      });
    } else {
      setAlert({
        type: "error",
        message: result.message,
      });
    }
    setCommitRemoveModal(false);
  };

  return (
    <div className="p-4 rounded-xl bg-slate-50 grid-cols-2 grid  gap-10 relative">
      {data.sale && (
        <div
          className="font-barlow font-bold text-white text-center text-md absolute p-2 bg-orange-400 -top-1 -left-1 tag-sale
        rounded-bl-lg
        rounded-tr-lg
        "
        >
          {data.sale}
        </div>
      )}

      <div className="p-4 flex center flex-col rounded-xl bg-slate-100 w-full">
        <img
          src={data.link_photo}
          className="p-4 rounded-xl center "
          style={{
            width: "10rem",
            height: "10rem",
          }}
        ></img>
        <h1 className="text-md font-barlow font-bold">{data.name}</h1>
        <h1 className="text-md font-barlow mt-2">Status: {data.status}</h1>
        <h1 className="text-md font-barlow mt-2">Size: {data.size}</h1>
        <h1 className="text-md font-barlow mt-2">Quantity: {data.quantity}</h1>
      </div>

      <div className="w-full flex flex-col">
        <div className="w-full">
          <h1 className="font-barlow mt-2">
            Name : <span className="text-orange-400">{data.name}</span>
          </h1>
          <h1 className="font-barlow mt-2">
            Size : <span className="text-orange-400">{data.size}</span>
          </h1>
          <h1 className="font-barlow mt-2">
            Status : <span className="text-orange-400">{data.status}</span>
          </h1>
          <h5 className="font-barlow mt-2">Price:</h5>
          <h5 className="p-4 rounded-xl text-orange-400 font-barlow start  ">
            <span className="text-orange-300 text-sm line-through mr-2">
              ${data.cost}
            </span>
            ${data.price_sale}
          </h5>
        </div>
        <h1 className="font-barlow mt-2">
          Date start :{" "}
          <span className="text-orange-400">{data.date_start}</span>
        </h1>
        <h1 className="font-barlow mt-2">
          Date end : <span className="text-orange-400">{data.date_end}</span>
        </h1>
        <h1 className="font-barlow mt-2">
          Date number :{" "}
          <span className="text-orange-400">
            {Util.calculateDateDifference(data.date_end, data.date_start)} day
            {Util.calculateDateDifference(data.date_end, data.date_start) > 1 &&
              "s"}
          </span>
        </h1>
        <div className="start flex mt-5 ">
          <Tooltip title="Remove">
            <Button onClick={(e) => setCommitRemoveModal(true)}>
              <FiTrash2 className="text-2xl hover:text-red-600 cursor-pointer"></FiTrash2>
            </Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              onClick={(e) => {
                setOpenEditSale(true);
                setItemSaleEdit(data);
              }}
            >
              <CiEdit className="text-2xl  hover:text-orange-500 cursor-pointer"></CiEdit>
            </Button>
          </Tooltip>
          <Modal
            open={commitRemoveModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex-col flex w-full center  ">
                <FcFullTrash className="text-8xl" />
                <h1 className="font-barlow font-bold w-fit mt-5">
                  Are you sure you want to remove this sale
                </h1>
                <h5 className="font-barlow w-fit text-red-400 mt-2">
                  "remove sale with id: " {data.sale_id}
                </h5>

                <div className="justify-between w-3/5 ml-auto mr-auto flex center mt-6">
                  <Button
                    sx={{
                      border: "1px solid #fb923c",
                      color: "#000",
                      marginRight: "1rem",
                    }}
                  >
                    Cancel
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
                      handleRemoveSaleItem(data.sale_id);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default PreviewItemSale;
