import React from "react";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

const CustomIconButton = ({ icon, color, onClick, style }) => {
  return (
    <IconButton
      color={color === "primary" ? "primary" : "default"}
      onClick={onClick}
      style={style}
    >
      <Icon>{icon}</Icon>
    </IconButton>
  );
};

export default CustomIconButton;
