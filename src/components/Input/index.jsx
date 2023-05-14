import { useState } from "react";
import "./style.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { v4 as uuid } from "uuid";

function Input({
  line = true,
  iconLeft,
  label = "",
  type = "text",
  className = "",
  value = "",
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onKeyPressEnter = () => {},
  style = {},
  styleInput = {},
  iconInput,
  placeholder = " ",
}) {
  const [lock, setLock] = useState(true);
  const [typeInput, setType] = useState(type);
  const id = uuid();
  const showPass = () => {
    setLock(!lock);
    setType((prev) => {
      if (!lock) {
        setType("text");
      } else {
        setType("password");
      }
    });
  };

  return (
    <div
      className={` wrapper-input text-lg font-barlow relative ${className} `}
      style={{
        ...style,
      }}
    >
      <input
        name={convertToNameInput(label)}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        style={{ borderBottom: "1px solid #757575", ...styleInput }}
        className="reset bg-transparent"
        placeholder={placeholder}
        type={type && !lock ? "text" : type}
        id={id}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onKeyPressEnter();
          }
        }}
      />
      {iconLeft && iconLeft}
      {type === "password" && !lock && (
        <FiEye className="icon-lock" onClick={showPass} />
      )}
      {type === "password" && lock && (
        <FiEyeOff className="icon-lock" onClick={showPass} />
      )}
      {line && <span className="line-input"></span>}
      <div className="flex start label">
        {iconInput}
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );
}
function convertToNameInput(label) {
  const invalidChars = /[^\w\s]/g;
  const cleanedLabel = label.replace(invalidChars, "");
  const nameInput = cleanedLabel.replace(/\s+/g, "_").toLowerCase();
  return nameInput;
}

export default Input;
