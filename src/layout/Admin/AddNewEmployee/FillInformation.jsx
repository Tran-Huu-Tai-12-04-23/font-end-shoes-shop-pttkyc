import { useState } from "react";

import { v4 as uuid } from "uuid";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect } from "react";

function FillInformation({
  branchId,
  setBranchId,
  role,
  salary,
  branch,
  phoneNumber,
  firstName,
  lastName,
  address,
  setRole,
  setSalary,
  setBranch,
  setPhoneNumber,
  setFirstName,
  setLastName,
  setAddress,
  branchStore,
}) {
  return (
    <div className="pb-10 w-full grid-cols-2 grid gap-10 ">
      <TextField
        label="First Name"
        variant="standard"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />{" "}
      <TextField
        label="Last Name"
        variant="standard"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Phone Number"
        variant="standard"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />{" "}
      <TextField
        label="Address"
        variant="standard"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />{" "}
      <TextField
        label="Salary"
        type="number"
        variant="standard"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <FormControl fullWidth variant="standard" sx={{}}>
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value={2}>Cashier</MenuItem>
          <MenuItem value={3}>Warehouse staff</MenuItem>
          <MenuItem value={4}>Management staff</MenuItem>
        </Select>
      </FormControl>
      {branch.length > 0 && (
        <FormControl fullWidth variant="standard">
          <InputLabel>Branch store</InputLabel>
          <Select
            value={branch}
            label="branch"
            onChange={(e) => setBranch(e.target.value)}
          >
            {branchStore.map((br) => {
              return (
                <MenuItem
                  key={uuid()}
                  value={br?.name}
                  onClick={(e) => setBranchId(br?.branch_id)}
                >
                  {br?.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

export default FillInformation;
