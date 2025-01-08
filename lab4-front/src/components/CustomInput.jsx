import React from 'react';
import Input from 'react-toolbox/lib/input';
import PropTypes from 'prop-types';
import './CustomInput.css'; // Импортируем стили

const CustomInput = ({
  value,
  onChange,
  label = 'Name',
  name = 'name',
  maxLength = 16,
  type = 'text',
  error,
}) => {
  return (
    <Input
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      error={error} // Передаём текст ошибки через проп 'error'
      className="custom-input" // Добавляем класс для стилизации
    />
  );
};

CustomInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  type: PropTypes.string,
  error: PropTypes.string,
};

export default CustomInput;