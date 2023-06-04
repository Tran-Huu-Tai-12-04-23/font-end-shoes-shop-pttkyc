import { Avatar, Button, Box } from "@mui/material";
import StepOrder from "./StepOrder";
import { useEffect, useState } from "react";
import { useContextStore } from "../../../Store";

import { FcFullTrash } from "react-icons/fc";
import Services from "../../../Services";

import { Modal, Select, MenuItem } from "@mui/material";

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

function OrderDetail({ setOrderDetail, orderDetail, setActive }) {
  const { setAlert } = useContextStore();
  const [reason, setReason] = useState("Change address");
  const [enterReason, setEnterReason] = useState(false);
  const [commitCancelledOrder, setCommitCancelledOrder] = useState(false);
  const handleClose = () => setCommitCancelledOrder(false);
  useEffect(() => {
    if (!orderDetail) {
      setAlert({
        type: "error",
        message: "Please select an order to watch detail",
      });
      setActive(2);
    }
  }, []);

  const cancelOrder = async (orderDetailId) => {
    const res = await Services.update("/api/item/order/cancel", {
      order_detail_id: orderDetailId,
      order_id: orderDetail.order_id,
      reason: reason,
    });
    if (res.status === 200) {
      setAlert({
        type: "success",
        message: "Cancel order success full  ",
      });
      setOrderDetail((prev) => {
        return {
          ...prev,
          status_process: -1,
          status: "Cancel order successfully",
        };
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
    <div className="w-full center flex flex-col pb-10">
      <Modal open={commitCancelledOrder} onClose={handleClose}>
        <Box sx={style}>
          <div className="flex-col flex w-full center  ">
            <FcFullTrash className="text-8xl" />
            <h1 className="font-barlow font-bold w-fit mt-5">
              Are you sure you want to cancelled order
            </h1>
            <h5 className="font-barlow w-fit text-red-400 mt-2">
              "cancel order: " {orderDetail.order_detail_id}
            </h5>

            <div className="justify-between w-3/5 ml-auto mr-auto flex center mt-6">
              <Button
                sx={{
                  border: "1px solid #fb923c",
                  color: "#000",
                  marginRight: "1rem",
                }}
                onClick={(e) => setCommitCancelledOrder(false)}
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
                  cancelOrder(orderDetail.order_detail_id);
                }}
              >
                Commit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={enterReason}
        onClose={(e) => setEnterReason(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="rounded-xl bg-slate-300 p-4  min-w-30 text-xl font-barlow">
          <h5 className="text-md mb-5 ">Enter reason to cancel order</h5>
          <Select
            labelId="demo-simple-select-required-label"
            value={reason}
            sx={{ width: "100%" }}
            onChange={(e) => setReason(e.target.value)}
          >
            <MenuItem value={"Change address"}>Change address</MenuItem>
            <MenuItem value={"Change item"}>Change item</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
          <div className="end flex mt-4">
            <Button
              onClick={(e) => setEnterReason(false)}
              sx={{
                "&:hover": {
                  color: "red",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                marginLeft: "1rem",
                background: "#fb923c",
                color: "#fff",

                "&:hover": {
                  background: "rgba(251, 146, 60, .8)",
                },
              }}
              onClick={(e) => {
                if (reason) {
                  setCommitCancelledOrder(true);
                  setEnterReason(false);
                } else {
                  setAlert({
                    type: "warning",
                    message: "Please enter reason for order",
                  });
                }
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>
      {orderDetail && (
        <>
          <div className=" w-full rounded-xl p-4 bg-slate-100 mt-12">
            <h1 className="text-xl font-barlow font-bold w-full">
              Order detail
            </h1>
            <div className="justify-between flex items-center mt-5">
              <div className="flex flex-col">
                <h5 className="font-barlow text-md">
                  Order Code :{orderDetail.order_id}
                  <br />
                  <br />
                  from :
                  <span className="font-bold ml-2">
                    {orderDetail.order_date}
                  </span>
                </h5>
              </div>
            </div>

            <div
              className="w-full mt-10 flex justify-between pb-5"
              style={{
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <div className="start flex ">
                <Avatar
                  alt="guest"
                  sx={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div className="flex flex-col ml-2">
                  {orderDetail.process_status === 4 && (
                    <h5 className="font-barlow">Delivery 2 day ago.</h5>
                  )}
                  <h5 className="font-barlow mt-2 text-orange-400">Member.</h5>
                </div>
              </div>
            </div>

            <div className="w-full grid-cols-12 grid mt-5 gap-10">
              <div className="col-span-3 flex flex-col">
                <h1 className="w-full font-barlow font-bold ">Track order</h1>
                <div className="flex flex-col">
                  <StepOrder
                    setEnterReason={setEnterReason}
                    orderDetail={orderDetail}
                    setOrderDetail={setOrderDetail}
                    step={orderDetail.status_process}
                    statusProcess={orderDetail.status_process}
                  />
                </div>
              </div>
              <div className="col-span-6 flex flex-col">
                <h1 className="w-full font-barlow font-bold ">
                  Billing information
                </h1>

                <div className="flex flex-col mt-5 bg-slate-50 p-4 rounded-xl">
                  <h1 className="font-barlow mt-2">
                    Guest name : {orderDetail.name_client}
                  </h1>
                  <h5 className="font-barlow mt-2">
                    Guest address : {orderDetail.address}
                  </h5>
                  <h5 className="font-barlow mt-2">
                    Date : {orderDetail.order_date}
                  </h5>
                  <h5 className="font-barlow mt-2">
                    Payment : Payment on delivery
                  </h5>
                </div>
              </div>
              <div className="col-span-3 flex flex-col">
                <h1 className="w-full font-barlow font-bold ">Sub Summary</h1>

                <div className="flex flex-col mt-5 bg-slate-50 p-4 rounded-xl">
                  <h5 className="font-barlow mt-2 ">
                    Delivery :<span className="text-orange-400"> $2</span>
                  </h5>
                  <h5 className="font-barlow mt-5">
                    Total :{" "}
                    <span className="text-orange-400">
                      ${orderDetail.price}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderDetail;
