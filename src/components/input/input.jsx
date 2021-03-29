import React from 'react';
import './input.scss';

const Input = ({
  id,
  label = '',
  labelClassName = '',
  ...attrs
}) => {
  return (
    <label htmlFor={id} className={`input__container ${labelClassName}`}>
      {label}
      <input type="text" className='input' {...attrs} />
    </label>
  );
};

export default Input;
