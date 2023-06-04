import { useEffect, useState } from "react";
import {
  Modal,
  Select,
  MenuItem,
  Rating,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { FcFullTrash } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { useContextStore } from "../../Store";

import Services from "../../Services";
import Util from "../../util";
import { UseAuthUserContext } from "../../AuthUser";

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
const nameRank = {
  1: "Very Poor",
  2: "Poor",
  3: "Average",
  4: "Good",
  5: "Excellent",
};
function OrderItem({ data, setOrder, order }) {
  const { user } = UseAuthUserContext();
  const { setAlert } = useContextStore();
  const [commitCancelledOrder, setCommitCancelledOrder] = useState(false);
  const [reason, setReason] = useState("Change address");
  const [enterReason, setEnterReason] = useState(false);
  const [enterReview, setEnterReview] = useState(false);
  const [rank, setRank] = useState(5);
  const [contentReview, setContentReview] = useState("");

  const handleClose = () => setCommitCancelledOrder(false);

  const cancelOrder = async (orderDetailId) => {
    const res = await Services.update("/api/item/order/cancel", {
      order_detail_id: orderDetailId,
      order_id: order.order_id,
      reason,
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
  const sendReview = async () => {
    if (!contentReview) {
      setAlert({
        type: "warning",
        message: "Please enter your review",
      });
      return;
    }
    if (rank === 0) {
      setAlert({
        type: "warning",
        message: "Please choose order rank",
      });
      return;
    }

    const dataRV = {
      account_id: user?.id,
      review: contentReview,
      rank: rank,
      item_id: data.item_id,
      order_id: data.order_id,
    };
    const result = await Services.callApi("/api/order/review/add", dataRV);

    if (result.status === 200) {
      setAlert({
        type: "success",
        message: result.message,
      });
      setEnterReview(false);
      setOrder((prev) => {
        return prev.map((od) => {
          if (od.order_id === data.order_id) {
            od.is_check_review = 1;
          }
          return od;
        });
      });
    } else {
      setAlert({
        type: "error",
        message: result.message,
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
      <Modal
        open={enterReview}
        onClose={(e) => setEnterReview(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="rounded-xl bg-slate-300 p-4  min-w-30 text-xl font-barlow">
          <div className="flex justify-between">
            <h5 className="text-xl mb-5 font-barlow font-bold">Your review</h5>
            <AiOutlineClose
              onClick={(e) => setEnterReview(false)}
              className="text-xl cursor-pointer hover:text-red-500 hover:scale-125 "
            ></AiOutlineClose>
          </div>
          <div className="flex center flex-col">
            <Rating
              value={rank}
              onChange={(event, newValue) => {
                setRank(newValue);
              }}
              sx={{
                fontSize: "3rem",
              }}
            />
            <h5
              className={`text-xl mt-2 mb-5 font-barlow
            ${
              rank === 1
                ? "text-red-500"
                : rank === 2
                ? "text-pink-500"
                : rank === 3
                ? "text-orange-500"
                : rank === 4
                ? "text-blue-500"
                : rank === 5
                ? "text-green-500"
                : ""
            }
            `}
            >
              {nameRank[rank]}
            </h5>

            <TextField
              label="Enter your review"
              multiline
              minRows={10}
              sx={{
                width: "100%",
              }}
              value={contentReview}
              onChange={(e) => setContentReview(e.target.value)}
            />

            <Button
              sx={{
                marginTop: "1rem",
                padding: ".3rem 2rem",
                color: "orange",
                fontSize: "1rem",
                border: "1px solid orange",
              }}
              onClick={(e) => {
                e.stopPropagation();
                sendReview();
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col items-start w-full font-barlow relative">
        {data.type === 1 && (
          <h5 className="absolute p-2 right-0 top-1/2 text-white text-xl font-barlow bg-orange-400 rounded-xl">
            Pre order
          </h5>
        )}
        <div className="justify-between flex w-full ">
          <h5 className="text-xl font-barlow font-bold">{data.name_item}</h5>
          <h5 className="text-xl font-barlow text-orange-400">
            $ {data.price}
          </h5>
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
                Date order: {Util.formatDate(data.order_date)}
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
        {data.status_process === 3 && (
          <Button sx={{ color: "orange", marginTop: "1rem" }}>
            {data.status}
          </Button>
        )}
        {data.status_process == 5 && (
          <Button sx={{ color: "green", marginTop: "1rem" }}>
            {data.status}
          </Button>
        )}
        {data.status_process === 5 && data.is_check_review === 0 && (
          <Button
            onClick={(e) => setEnterReview(true)}
            sx={{
              color: "orange",
              border: "1px solid orange",
              marginLeft: "1rem",
              padding: "0.3rem 2rem",
              position: "absolute",
              right: "0",
              bottom: "1rem",
              "&:hover": {
                filter: "brightness(120%)",
              },
            }}
          >
            Review
          </Button>
        )}
        {data.status_process !== -1 && data.status_process <= 3 && (
          <Button
            onClick={(e) => setEnterReason(true)}
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
