import { useState } from "react";

import { v4 as uuid } from "uuid";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function CreateAccount({
  email,
  username,
  password,
  confirmPassword,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
}) {
  return (
    <div className="pb-10 w-full grid-cols-2 grid gap-10 ">
      <TextField
        label="User name"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <TextField
        type="password"
        label="Password"
        variant="standard"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <TextField
        type="password"
        label="Confirm password"
        variant="standard"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  );
}

export default CreateAccount;
