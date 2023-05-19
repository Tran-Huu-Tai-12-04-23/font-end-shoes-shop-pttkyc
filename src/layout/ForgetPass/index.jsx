import { Button, TextField, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState } from "react";
import { UseAuthUserContext } from "../../AuthUser";
import Utils from "../../util";
import Services from "../../Services";
import { useContextStore } from "../../Store";
import WaitEnterCode from "./WaitEnterCode";

function ForgetPass() {
  const { setAlert } = useContextStore();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeVerify, setCodeVerify] = useState("");
  const [codeToVerify, setCodeToVerify] = useState("");
  const [isCheckCode, setIsCheckCode] = useState(false);
  const [loadSend, setLoadSend] = useState(false);
  const [timeValid, setTimeValid] = useState(0);
  const Util = new Utils();
  const history = useNavigate();

  const handleSendCode = async () => {
    if (!email) {
      setAlert({
        type: "error",
        message: "Please enter email !",
      });
      return;
    }
    if (!Util.checkIsEmail(email)) {
      setAlert({
        type: "error",
        message: "Email invalid",
      });
      return;
    }
    setLoadSend(true);
    let result = await Services.callApi("/api/user/send-email", {
      email,
    });

    if (result.status === 200) {
      setCodeToVerify(result.code);
    } else {
      setAlert({
        type: "error",
        message: "Server send email failed",
      });
    }
    setLoadSend(false);
  };

  const handleSubmitCode = () => {
    if (!codeVerify) {
      setAlert({
        type: "error",
        message: "Please enter code!!",
      });
    }
    if (!(codeToVerify === codeVerify)) {
      setAlert({
        type: "error",
        message: "Code invalid !",
      });
      return;
    }
    setIsCheckCode(true);
    setAlert({
      type: "success",
      message: "Code matching , please change your password !",
    });
  };

  const handleSavePassword = async () => {
    if (!password) {
      setAlert({
        type: "error",
        message: "Please enter your new password!",
      });
      return;
    }
    if (!confirmPassword) {
      setAlert({
        type: "error",
        message: "Please enter your new confirm password!",
      });
      return;
    }
    if (!(password === confirmPassword)) {
      setAlert({
        type: "error",
        message: "Password and confirm password is not matching !",
      });
      return;
    }

    const result = await Services.callApi("/api/user/change-password", {
      password,
      confirmPassword,
      email,
    });

    if (result.status === 200) {
      setAlert({
        type: "success",
        message: "Change password successfully!",
      });
      history("/sign");
    } else {
      setAlert({
        type: "error",
        message: result.message,
      });
    }
  };

  //   const { user } = UseAuthUserContext();
  return (
    <div className="">
      <Header />

      <div className="mt-12 w-full center ">
        <div className="xl:w-3/6 w-5/6 center flex flex-col rounded-xl bg-slate-50 mt-10 p-10">
          {!isCheckCode && (
            <div className="w-full center font-barlow text-2xl">
              Forget Password
            </div>
          )}
          {isCheckCode && (
            <>
              <div className="w-full center mt-10">
                <h1 className="text-xl font-bold font-barlow">
                  Change new your password
                </h1>
              </div>
              <div className="w-full flex flex-col">
                <TextField
                  label="Password"
                  type="password"
                  variant="standard"
                  sx={{
                    marginTop: "2rem",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  type="password"
                  label="Confirm password"
                  variant="standard"
                  sx={{
                    marginTop: "2rem",
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}
          {!isCheckCode && (
            <div className="grid grid-cols-1  w-full">
              <TextField
                label="Email to recovery"
                variant="standard"
                type="email"
                sx={{
                  marginTop: "2rem",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="justify-between flex mt-5 ">
                <TextField
                  label="Code verify"
                  variant="standard"
                  type={"number"}
                  sx={{
                    width: "70%",
                  }}
                  value={codeVerify}
                  onChange={(e) => setCodeVerify(e.target.value)}
                />
                <Button
                  variant="outline"
                  sx={{
                    background: "#fb923c",
                    color: "#fff",
                    height: "2.5rem",
                    marginLeft: "2rem",
                    marginTop: ".5rem",
                    "&:hover": {
                      background: "#ffae3c",
                    },
                  }}
                  onClick={(e) => {
                    if (timeValid >= 59 || !codeToVerify) {
                      handleSendCode();
                    }
                  }}
                >
                  {!loadSend && !codeToVerify && "Send code"}
                  {!loadSend && timeValid >= 59 && "Send code"}
                  {!loadSend && !(timeValid >= 59) && codeToVerify && (
                    <WaitEnterCode
                      timeValid={timeValid}
                      setTimeValid={setTimeValid}
                    ></WaitEnterCode>
                  )}
                  {loadSend && <CircularProgress size={"1.5rem"} />}
                </Button>
              </div>
              {codeToVerify && (
                <div className="w-full mt-5 font-barlow">
                  Check your email {email} to verify code and change password
                </div>
              )}
              <Button
                variant="outline"
                sx={{
                  background: "#fb923c",
                  color: "#fff",
                  height: "2.5rem",
                  marginTop: "2rem",

                  "&:hover": {
                    background: "#ffae3c",
                  },
                }}
                onClick={handleSubmitCode}
              >
                Submit
              </Button>
            </div>
          )}

          {isCheckCode && (
            <Button
              variant="outline"
              sx={{
                background: "#fb923c",
                color: "#fff",
                height: "2.5rem",
                marginTop: "2rem",

                "&:hover": {
                  background: "#ffae3c",
                },
              }}
              onClick={handleSavePassword}
            >
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;
