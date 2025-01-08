import React from 'react';
import Input from 'react-toolbox/lib/input';
import './CustomInput.css'; // Импортируем стили

const CustomInput = ({
  value,
  onChange,
  label = 'Name',
  name = 'name',
  maxLength = 16,
  type = 'text',
  error,
  helperText
}) => {
  return (
    <Input
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      error={error}
      errorText={helperText}
      className="custom-input" // Добавляем класс для стилизации
    />
  );
};

export default CustomInput;