import { useState, useEffect } from "react";

import signIn from "../../assets/svg/login/signIn.svg";
import signUp from "../../assets/svg/login/signUp.svg";
import Header from "../../components/Header";

import Login from "./Login.jsx";
import Register from "./Register.jsx";
import AlertCustom from "../../components/AlertCustom";

function Sign() {
  const [alert, setAlert] = useState(null);
  const [activeLogin, setActiveLogin] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(null);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  return (
    <div className="center min-h-100vh h-100vh w-100vh ">
      <Header />
      <div
        className="w-full center fixed  z-10"
        style={{
          left: "50%",
          bottom: "2rem",
          transform: "translateX(-50%)",
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

      <div className="rounded-xl w-4/6 h-5/6 min-w-1/2 miu-h-1/2 p-8 bg-blur  shadow-sm shadow-slate-300 center">
        <div className="flex justify-between w-full h-full">
          <div className="w-1/2 center overflow-hidden relative">
            <Login
              active={activeLogin}
              setActiveLogin={setActiveLogin}
              alert={alert}
              setAlert={setAlert}
            />
            <img
              src={signIn}
              alt=""
              style={{
                transform: activeLogin ? "translateX(-100vw)" : "translateX(0)",
                transition: ".8s",
              }}
            />
          </div>
          <div className="w-1/2 center overflow-hidden relative">
            <img
              src={signUp}
              alt=""
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
