import React from 'react';
import IconButton from 'react-toolbox/lib/button';
import PropTypes from 'prop-types';
import 'react-toolbox/lib/button/theme.css'; // Подключение стилей

const CustomIconButton = ({ icon, color, onClick, style }) => {
  return (
    <IconButton
      icon={icon}
      primary={color === 'primary'}
      onClick={onClick}
      style={style}
    />
  );
};

CustomIconButton.propTypes = {
  icon: PropTypes.string.isRequired, // Ожидаем строку
  color: PropTypes.oneOf(['primary', 'default']),
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default CustomIconButton;