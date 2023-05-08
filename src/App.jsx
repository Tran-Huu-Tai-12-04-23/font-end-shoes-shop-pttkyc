import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./layout/Home";
import Sign from "./layout/Sign";
import ShowItem from "./layout/ShowItem";
import DetailItem from "./layout/DetailItem";
import { IoIosArrowUp } from "react-icons/io";

function App() {
  const [theme, setTheme] = useState("dark");
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 200) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    };
  }, []);
  return (
    <div
      className={`${
        theme === "dark" ? "mode-dark" : "mode-light"
      } text-pr bubble hidden-scroll`}
    >
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
        <Routes>
          <Route path="/shop" element={<ShowItem />} />
          <Route path="/sign" element={<Sign />} />
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
