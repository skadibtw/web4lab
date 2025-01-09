import React from "react";
import TextField from "@mui/material/TextField";
import "./CustomInput.css";

const CustomInput = ({
  value,
  onChange,
  label = "Name",
  name = "name",
  maxLength = 16,
  type = "text",
  error,
}) => {
  const handleChange = (event) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <TextField
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      inputProps={{
        maxLength,
      }}
      error={Boolean(error)}
      helperText={error}
      className="custom-input"
      sx={{ color: "#fff" }}
      style={{ color: "#fff" }}
    />
  );
};

export default CustomInput;
