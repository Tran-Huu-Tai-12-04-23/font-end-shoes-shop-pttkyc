import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { FcFullTrash } from "react-icons/fc";
import { Button } from "@mui/material";
import { useContextStore } from "../../Store";

import Services from "../../Services";

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

function OrderItem({ data, setOrder, order }) {
  const { setAlert } = useContextStore();
  const [commitCancelledOrder, setCommitCancelledOrder] = useState(false);
  const handleClose = () => setCommitCancelledOrder(false);

  const cancelOrder = async (orderDetailId) => {
    const res = await Services.update("/api/item/order/cancel", {
      order_detail_id: orderDetailId,
    });
    if (res.status === 200) {
      setAlert({
        type: "success",
        message: "Cancel order success full  ",
      });
      setOrder((prev) => {
        return order.map((od) => {
          if (od.order_detail_id === orderDetailId) {
            return {
              ...od,
              status_process: -1,
              status: "Cancel order successfully",
            };
          } else {
            return od;
          }
        });
      });
      setCommitCancelledOrder(false);
    } else {
      setAlert({
        type: "error",
        message: "cancel Order -> failed ",
      });
    }
  };

  return (
    <div
      className="p-4 flex "
      style={{
        borderBottom: "1px solid #ccc",
      }}
    >
      <Modal open={commitCancelledOrder} onClose={handleClose}>
        <Box sx={style}>
          <div className="flex-col flex w-full center  ">
            <FcFullTrash className="text-8xl" />
            <h1 className="font-barlow font-bold w-fit mt-5">
              Are you sure you want to cancel the order?
            </h1>
            <div className="justify-between w-3/5 ml-auto mr-auto flex center mt-6">
              <Button
                sx={{
                  border: "1px solid #fb923c",
                  color: "#000",
                  marginRight: "1rem",
                }}
                onClick={handleClose}
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
                  cancelOrder(data.order_detail_id);
                }}
              >
                Commit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="flex flex-col items-start w-full font-barlow">
        <div className="justify-between flex w-full">
          <h5 className="text-xl font-barlow font-bold">{data.name_item}</h5>
          <h5 className="text-xl font-barlow text-orange-400">
            $ {data.total}
          </h5>
          {data.type === 1 && (
            <h5 className=" p-2 text-white text-xl font-barlow bg-orange-400 rounded-xl">
              Pre order
            </h5>
          )}
        </div>
        <div className="flex flex-col">
          <div className="start flex">
            <div
              className="start flex mt-2 mr-4 pr-4"
              style={{
                borderRight: "1px solid #ccc",
              }}
            >
              <span className="text-md mr-2">
                Date order: {data.order_date}
              </span>
            </div>
            <div className="start flex mt-2">
              <span className="text-md mr-2">Quantity: 1</span>
            </div>
          </div>
        </div>
        {data.status_process === -1 && (
          <Button sx={{ color: "red", marginTop: "1rem" }}>
            Order cancelled
          </Button>
        )}
        {data.status_process !== -1 && data.status_process <= 4 && (
          <Button
            onClick={(e) => setCommitCancelledOrder(true)}
            sx={{
              color: "orange",
              border: "1px solid orange",
              marginTop: "1rem",
            }}
          >
            Cancel order
          </Button>
        )}
      </div>
    </div>
  );
}

export default OrderItem;
