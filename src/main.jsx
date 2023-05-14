import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Store from "./Store";
import AuthUser from "./AuthUser";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthUser>
      <Store>
        <App />
      </Store>
    </AuthUser>
  </React.StrictMode>
);
