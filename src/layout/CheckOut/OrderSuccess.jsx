import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function OrderSuccess({ show }) {
  const [loader, setLoader] = useState(false);
  const history = useNavigate();

  setTimeout(() => {
    if (show) {
      const timeOut = setTimeout(() => {
        setLoader(true);
      }, 3000);
      const timeOut2 = setTimeout(() => {
        history("/bag");
      }, 4800);
    }
    return () => {
      clearInterval(timeOut);
      clearInterval(timeOut2);
    };
  }, [show]);

  return (
    <>
      <div
        className="w-100 pt-20 left-0 right-0"
        style={{
          transition: "1s",
          position: show ? "" : "fixed",
          transform: show ? "" : "scale(0)",
          opacity: show ? "1" : "0",
          zIndex: 0,
        }}
      >
        <div className="p-4 center flex flex-col rounded-xl ">
          <BsCheck2
            className="text-8xl scale-animation text-green-500"
            style={{}}
          ></BsCheck2>
          <h5 className="text-xl font-barlow font-bold text-green-500">
            Order Successfully!
          </h5>

          <div className="loader">
            <p>Redirect to you bag in </p>
            <div className="words">
              <span className="word">1</span>
              <span className="word">2</span>
              <span className="word">3</span>
            </div>
          </div>
        </div>
      </div>
      {loader && (
        <div className="fixed top-0 bottom-0 right-0 left-0 center flex">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default OrderSuccess;
