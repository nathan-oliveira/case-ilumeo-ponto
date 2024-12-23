import React from 'react'
import './input.css'

interface InputParam {
  label?: string;
  type?: string;
  name?: string;
  value?: any;
  onChange?: any;
  error?: any;
  onBlur?: any;
  max?: number;
  readOnly?: any;
  onClick?: any;
}

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  max,
  readOnly,
  onClick,
}: InputParam) => {
  return (
    <div className="input-wrapper">
      <input
        type={type ?? 'text'}
        className={`input input-text-default input-text${error ? ' input-text-error' : ''}`}
        id={name}
        name={name}
        maxLength={max}
        onChange={onChange}
        autoComplete="off"
        onBlur={onBlur}
        value={type === 'file' ? '' : (value ?? '')}
        placeholder=" "
        readOnly={readOnly}
        onClick={onClick}
      />
      <label
        htmlFor={name}
        className={`input-label${error ? ' input-label-error' : ''}`}
      >{label}</label>
    </div>
  )
}

export default Input;
