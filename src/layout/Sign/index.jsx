import { useState, useEffect } from "react";

import signIn from "../../assets/svg/login/signIn.svg";
import signUp from "../../assets/svg/login/signUp.svg";
import Header from "../../components/Header";

import Login from "./Login.jsx";
import Register from "./Register.jsx";
import AlertCustom from "../../components/AlertCustom";

function Sign({ alert, setAlert }) {
  const [activeLogin, setActiveLogin] = useState(true);

  return (
    <div className="center min-h-100vh h-100vh w-100vh ">
      <Header />

      <div className="rounded-xl xl:w-5/6 lg:w-5/6 w-full xl:h-5/6 lg:h-5/6 h-full min-w-1/2 miu-h-1/2 p-8 bg-blur  shadow-sm shadow-slate-300 center">
        <div className="flex justify-between w-full h-full">
          <div
            className={`${
              !activeLogin ? "xl:block lg:block hidden" : ""
            } justify-center items-center xl:w-1/2 lg:w-1/2 w-full  overflow-hidden relative `}
          >
            <Login
              active={activeLogin}
              setActiveLogin={setActiveLogin}
              alert={alert}
              setAlert={setAlert}
            />
            <img
              src={signIn}
              alt=""
              className="xl:block lg:block hidden mt-20 mr-5"
              style={{
                transform: activeLogin ? "translateX(-100vw)" : "translateX(0)",
                transition: ".8s",
              }}
            />
          </div>
          <div
            className={`${
              activeLogin ? "xl:block lg:block hidden" : ""
            } justify-center items-center xl:w-1/2 lg:w-1/2 w-full overflow-hidden relative `}
          >
            <img
              src={signUp}
              alt=""
              className="xl:block lg:block hidden ml-5"
              style={{
                transform: !activeLogin ? "translateX(100vw)" : "translateX(0)",
                transition: ".8s",
              }}
            />
            <Register
              active={activeLogin}
              setActiveLogin={setActiveLogin}
              setAlert={setAlert}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;
