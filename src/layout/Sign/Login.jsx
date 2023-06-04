import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import header_login from "../../assets/svg/login/header-logo.svg";
import Input from "../../components/Input";
import ButtonCustom from "../../components/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import google_icon from "../../assets/icon/google_icon.svg";
import facebook_icon from "../../assets/icon/facebook_icon.svg";

import Util from "../../util/index";
import Services from "../../Services";

import { googleSignIn } from "../../Firebase/AuthGoogle";
import { facebookSignIn } from "../../Firebase/AuthFacebook";
import { auth } from "../../Firebase/index";
import { onAuthStateChanged } from "firebase/auth";
import { UseAuthUserContext } from "../../AuthUser";

function Login({ active, setActiveLogin = () => {}, setAlert = () => {} }) {
  const { setUser, user } = UseAuthUserContext();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const { displayName, email, uid, photoURL } = currentUser;
        let isNewUser =
          currentUser.metadata.creationTime ===
          currentUser.metadata.lastSignInTime;
        const dataUser = {
          username: displayName,
          password: password,
          avatar: photoURL,
          confirmPassword: password,
          email: email,
          id: uid,
          role_account: null,
        };
        if (isNewUser) {
          let password = uuid();
          await registerUserLogin(
            {
              username: displayName,
              password: password,
              avatar: photoURL,
              confirmPassword: password,
              email: email,
            },
            dataUser
          );
        } else {
          const result = await Services.callApi("/api/user/get-id-user", {
            email: email,
          });

          console.log(result);

          if (result.status === 200) {
            setUser({
              ...dataUser,
              id: result.id,
            });
            setAlert({
              message: "Login successfully!",
              type: "success",
            });
          }
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const registerUserLogin = async (data, dataUser) => {
    try {
      const res = await Services.addDataToTable(
        "account",
        "/api/user/register",
        {
          ...data,
        }
      );
      if (res.status === 200) {
        setAlert({
          type: "success",
          message: "Login successfully!",
        });
        setUser({
          ...dataUser,
          id: res.id,
        });
        setAlert({
          message: "Login successfully!",
          type: "success",
        });
        setActiveLogin(true);
      } else {
        setAlert({
          message: res.message,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogin = async () => {
    if (!usernameOrEmail) {
      setAlert({
        message: "Please enter your username & email!",
        type: "warning",
      });
      return;
    }
    if (!password) {
      setAlert({
        message: "Please enter your password!",
        type: "warning",
      });
      return;
    }
    if (usernameOrEmail.includes("@") && !Util.checkIsEmail(usernameOrEmail)) {
      setAlert({
        message: "Invalid email!",
        type: "warning",
      });
      return;
    }
    if (!Util.checkMinLength(usernameOrEmail, 6)) {
      setAlert({
        message: "Username must has min 6 character!",
        type: "warning",
      });
      return;
    }

    const data = {
      username_email: usernameOrEmail,
      password: password,
    };
    try {
      const result = await Services.callApi("/api/user/login", {
        ...data,
      });
      if (result) {
        if (result.status === 200) {
          const { username, account_id, email, role_account } = result.data;
          setUser({
            id: account_id,
            username: username,
            email: email,
            role_account,
          });
          setAlert({
            message: result.message,
            type: "success",
          });
          // history("/");
        } else {
          setAlert({
            message: result.message,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (user && !user.role_account) {
      history("/");
    } else if (user && user.role_account > 0) {
      history("/admin");
    }
  }, [user]);
  return (
    <>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 font-barlow"
        style={{
          transform: !active ? "translateX(-100vw)" : "translateX(0)",
          transition: ".8s",
        }}
      >
        <div className="flex w-full items-start justify-center flex-col flex-1 absolute top-0 bottom-0 left-0 right-0">
          <div className="flex start mb-8">
            <div className="text-4xl font-barlow font-bold">Login</div>
            <img src={header_login} className="w-10 h-10 " />
          </div>
          <div className="flex w-full items-start justify-center flex-col mt-5">
            <Input
              type="filled"
              value={usernameOrEmail}
              label="Username & Email"
              className={"w-full bg-transparent mb-5"}
              style={{
                background: "transparent",
              }}
              styleInput={{
                padding: ".5rem",
              }}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              iconInput={<AiOutlineUser className="text-xl"></AiOutlineUser>}
            ></Input>
            <Input
              type="password"
              value={password}
              label="Password"
              className={"w-full bg-transparent mt-5 mb-5"}
              style={{
                background: "transparent",
              }}
              styleInput={{
                padding: ".5rem",
              }}
              onChange={(e) => setPassword(e.target.value)}
              iconInput={<BiLockAlt className="text-xl"></BiLockAlt>}
            ></Input>
            <div className="w-full">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="remember"
              />
            </div>
          </div>
          <ButtonCustom
            nameButton="Login"
            className={"text-primary hover-bg"}
            style={{
              fontWeight: "bold",
              minWidth: "10rem",
              margin: "0 auto",
              marginTop: "2rem",
              background: ` linear-gradient(90deg, rgba(40,28,237,0.5998774509803921) 0%, rgba(239,0,255,0.5242471988795518) 78%)`,
            }}
            onClick={handleLogin}
          />
          <div
            onClick={(e) => history("/forget-pass")}
            className="w-full cursor-pointer hover:text-orange-400 transition-all center mt-10 text-blue-700 font-barlow font-bold"
          >
            Forget password
          </div>
          <div className="w-full flex mt-5 flex-col justify-center items-center mb-5">
            <h5 className="text-lg font-bold font-barlow w-full center">
              Login with :
            </h5>
            <div className="center flex w-full mt-2">
              <ButtonCustom
                iconLeft={<img src={google_icon} className="w-9 h-9"></img>}
                onClick={handleGoogleSignIn}
              />
              <ButtonCustom
                onClick={handleFacebookSignIn}
                iconLeft={<img src={facebook_icon} className="w-8 h-8"></img>}
              />
            </div>
          </div>
          <div className="w-full center mt-5">
            <ButtonCustom
              nameButton="Not a member? "
              style={{
                color: "#000",
              }}
            />
            <ButtonCustom
              nameButton="Register"
              onClick={() => setActiveLogin(!active)}
              style={{
                fontWeight: "bold",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
