import { useState, useRef } from "react";

import header_login from "../../assets/svg/login/header-logo.svg";
import Input from "../../components/Input";
import ButtonCustom from "../../components/Button";

import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";

import Utils from "../../util";
import Services from "../../Services";

function Register({ active, setActiveLogin = () => {}, setAlert = () => {} }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const Util = new Utils();
  const form = useRef(null);

  const handleRegister = async () => {
    if (!username) {
      setAlert({
        message: "Please enter your username",
        type: "warning",
      });
      return;
    }
    if (!email) {
      setAlert({
        message: "Please enter your email",
        type: "warning",
      });
      return;
    }
    if (!Util.checkIsEmail(email)) {
      setAlert({
        message: "Email is invalid",
        type: "warning",
      });
      return;
    }
    if (!password) {
      setAlert({
        message: "Please enter your password",
        type: "warning",
      });
      return;
    }
    if (!confirmPassword) {
      setAlert({
        message: "Please enter your confirm password",
        type: "warning",
      });
      return;
    }
    if (!Util.checkMinLength(username, 6)) {
      setAlert({
        message: "Username must be at least 6 characters",
        type: "warning",
      });
      return;
    }
    if (!(password === confirmPassword)) {
      setAlert({
        message: "Password and confirm password is not match",
        type: "warning",
      });
      return;
    }
    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      email: email,
    };
    try {
      const res = await Services.addDataToTable(
        "account",
        "/api/user/register",
        data
      );
      if (res.status === 200) {
        setAlert({
          type: "success",
          message: res.message,
        });
        clearForm();
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

  function clearForm() {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
  }

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0"
      style={{
        transform: active ? "translateX(100vw)" : "translateX(0)",
        transition: ".8s",
      }}
    >
      <div className="w-full items-center justify-center  h-full flex-col flex ">
        <div className="flex start mb-8">
          <div className="text-4xl font-barlow font-bold">Register</div>
          <img src={header_login} className="w-10 h-10 " />
        </div>
        <form
          ref={form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="flex w-full items-center justify-center flex-col mt-5"
        >
          <Input
            type="filled"
            value={username}
            label="Username"
            className={"w-full bg-transparent mb-5"}
            style={{
              background: "transparent",
            }}
            styleInput={{
              padding: ".5rem",
            }}
            onChange={(e) => setUsername(e.target.value)}
            iconInput={<AiOutlineUser className="text-xl"></AiOutlineUser>}
          ></Input>
          <Input
            type="filled"
            value={email}
            label="Email"
            className={"w-full bg-transparent mb-5 mt-5"}
            style={{
              background: "transparent",
            }}
            styleInput={{
              padding: ".5rem",
            }}
            onChange={(e) => setEmail(e.target.value)}
            iconInput={
              <HiOutlineMail className="text-xl mr-1 mt-1"></HiOutlineMail>
            }
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
          <Input
            type="password"
            value={confirmPassword}
            label="Confirm Password"
            className={"w-full bg-transparent  mt-5"}
            style={{
              background: "transparent",
            }}
            styleInput={{
              padding: ".5rem",
            }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            iconInput={<BiLockAlt className="text-xl"></BiLockAlt>}
          ></Input>
        </form>
        <ButtonCustom
          nameButton="Register"
          className={"text-primary hover-bg"}
          style={{
            fontWeight: "bold",
            minWidth: "10rem",
            margin: "0 auto",
            marginTop: "2rem",
            background: ` linear-gradient(90deg, rgba(40,28,237,0.5998774509803921) 0%, rgba(239,0,255,0.5242471988795518) 78%)`,
          }}
          onClick={handleRegister}
        />
        <div className="w-full center mt-5">
          <ButtonCustom
            nameButton="Are you member? "
            style={{
              color: "#000",
            }}
          />
          <ButtonCustom
            nameButton="Login"
            onClick={() => setActiveLogin(!active)}
            style={{
              fontWeight: "bold",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
