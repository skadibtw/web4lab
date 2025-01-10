import React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const CustomInput = ({ type, value, onChange, error, label, style }) => {
  return (
    <TextField
      type={type}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
      label={label}
      variant="outlined"
      InputProps={{
        step: "any",
        maxLength: 12,
        style: {
          color: "#fff",
          ...style,
        },
      }}
      InputLabelProps={{
        style: {
          color: "#fff",
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#fff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
          },
        },
        "& .MuiFormHelperText-root": {
          color: "#f44336",
        },
      }}
    />
  );
};

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default CustomInput;
