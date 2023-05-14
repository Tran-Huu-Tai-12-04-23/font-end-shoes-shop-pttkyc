import { Avatar, Button } from "@mui/material";
import StepOrder from "./StepOrder";

function OrderDetail() {
  return (
    <div className="w-full center flex flex-col pb-10">
      <h1 className="text-barlow font-bold mt-5 text-2xl w-full">
        Order detail
      </h1>
      <div className="xl:w-5/6 w-full rounded-xl p-4 bg-slate-100 mt-12">
        <h1 className="text-xl font-barlow font-bold w-full">Order detail</h1>
        <div className="justify-between flex items-center mt-5">
          <div className="flex flex-col">
            <h5 className="font-barlow text-md">
              Order Code : xxx-xxx-xxx
              <br />
              <br />
              from :<span className="font-bold ml-2">1/1/2023</span>
            </h5>
          </div>
          <Button
            variant="outline"
            sx={{
              color: "#fff",
              backgroundColor: "#fb923c",
              height: "2rem",

              "&:hover": {
                backgroundColor: "#ffb566",
              },
            }}
          >
            Invoice
          </Button>
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
              <h5 className="font-barlow">Delivery 2 day ago.</h5>
              <h5 className="font-barlow mt-2 text-orange-400">Member.</h5>
            </div>
          </div>

          <Button
            sx={{
              height: "2rem",
              color: "#fb923c",
              border: "1px solid #fb923c",
            }}
          >
            Contact Us
          </Button>
        </div>

        <div className="w-full grid-cols-12 grid mt-5 gap-10">
          <div className="col-span-3 flex flex-col">
            <h1 className="w-full font-barlow font-bold ">Track order</h1>
            <div className="flex flex-col">
              <StepOrder step={3} />
            </div>
          </div>
          <div className="col-span-6 flex flex-col">
            <h1 className="w-full font-barlow font-bold ">
              Billing information
            </h1>

            <div className="flex flex-col mt-5 bg-slate-50 p-4 rounded-xl">
              <h1 className="font-barlow mt-2">Guest name : Tran Huu Tai</h1>
              <h5 className="font-barlow mt-2">
                Guest address : My chau phu my binh dinh
              </h5>
              <h5 className="font-barlow mt-2">Date : 1/1/2023</h5>
              <h5 className="font-barlow mt-2">
                Payment : Payment on delivery
              </h5>
            </div>
          </div>
          <div className="col-span-3 flex flex-col">
            <h1 className="w-full font-barlow font-bold ">Sub Summary</h1>

            <div className="flex flex-col mt-5 bg-slate-50 p-4 rounded-xl">
              <h1 className="font-barlow mt-2">
                Product price :<span className="text-orange-400"> $40</span>
              </h1>
              <h5 className="font-barlow mt-2 ">
                Delivery :<span className="text-orange-400"> $2</span>
              </h5>
              <h5 className="font-barlow mt-5">
                Total : <span className="text-orange-400">$42</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
