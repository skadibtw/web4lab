import React from "react";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";

const CustomIconButton = ({ icon, color, onClick }) => {
  return (
    <IconButton onClick={onClick} color={color}>
      <span
        style={{
          color: color === "primary" ? "#1976d2" : "#fff",
        }}
      >
        {icon}
      </span>
    </IconButton>
  );
};

CustomIconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["primary", "default"]),
  onClick: PropTypes.func.isRequired,
};

export default CustomIconButton;
