import { Avatar, Button, Box } from "@mui/material";
import StepOrder from "./StepOrder";
import { useEffect, useState } from "react";
import { useContextStore } from "../../../Store";

import { FcFullTrash } from "react-icons/fc";
import Services from "../../../Services";

import { Modal } from "@mui/material";

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
      {orderDetail && (
        <>
          {" "}
          <h1 className="text-barlow font-bold mt-5 text-2xl w-full">
            Order detail
          </h1>
          <div className="xl:w-5/6 w-full rounded-xl p-4 bg-slate-100 mt-12">
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
                    setCommitCancelledOrder={setCommitCancelledOrder}
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
                      ${orderDetail.total}
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
