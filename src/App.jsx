import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./layout/Home";
import Sign from "./layout/Sign";
import ShowItem from "./layout/ShowItem";
import DetailItem from "./layout/DetailItem";
import { IoIosArrowUp } from "react-icons/io";
import Search from "./layout/Search";
import Bag from "./layout/Bag";
import CheckOut from "./layout/CheckOut";
import User from "./layout/User";
import Admin from "./layout/Admin";
import WrapperApp from "./WrapperApp";
import AlertCustom from "./components/AlertCustom";
import { useContextStore } from "./Store";
import ForgetPass from "./layout/ForgetPass";

function App() {
  const [theme, setTheme] = useState("dark");
  const [scrollTop, setScrollTop] = useState(false);
  const { alert, setAlert } = useContextStore();

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 200) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(null);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  return (
    <div
      className={`${
        theme === "dark" ? "mode-dark" : "mode-light"
      } text-pr bubble hidden-scroll`}
    >
      {
        <div
          className="w-full center fixed flex left-0 right-0 z-10"
          style={{
            bottom: "2rem",
            transform: alert ? "translateY(0)" : "translateY(10rem)",
          }}
        >
          <AlertCustom
            message={alert?.message}
            width="30rem"
            type={alert?.type}
            onClose={(e) => setAlert(null)}
            style={{
              transform: alert ? "translateY(0)" : "translateY(10rem)",
              transition: ".4s",
              zIndex: "2",
            }}
          />
        </div>
      }
      <div
        className="fixed rounded-1/2 bg-slate-700 opacity-40  blur-3xl -left-1/4 -bottom-1/4"
        style={{
          minWidth: "50rem",
          width: "50vw",
          minHeight: "50rem",
          height: "50vw",
          zIndex: "-1",
        }}
      ></div>
      <div
        className="fixed rounded-1/2 opacity-10 bg-linear blur-3xl -right-1/4 -top-1/4 "
        style={{
          minWidth: "50rem",
          width: "50vw",
          minHeight: "80rem",
          height: "50vw",
          zIndex: "-1",
        }}
      ></div>
      <BrowserRouter>
        <WrapperApp></WrapperApp>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/forget-pass" element={<ForgetPass />} />
          <Route path="/shop" element={<ShowItem />} />
          <Route path="/user" element={<User />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/sign"
            element={<Sign alert={alert} setAlert={setAlert} />}
          />
          <Route path="/detail-item" element={<DetailItem />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

      {scrollTop && (
        <div
          className="p-3 center flex fixed bottom-5 cursor-pointer hover:bg-slate-500 right-5 rounded-full bg-slate-400"
          onClick={(e) => {
            setScrollTop(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <IoIosArrowUp className="text-white text-2xl" />
        </div>
      )}
    </div>
  );
}

export default App;
