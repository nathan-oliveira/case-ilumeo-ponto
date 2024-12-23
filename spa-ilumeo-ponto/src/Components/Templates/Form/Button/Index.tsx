import React from 'react'
import './index.css'

const Button = ({ children, color, classBtn, ...props }: any) => {
  return (
    <button {...props} className={`button${classBtn ? ` ${classBtn}`: ''}`}>
      {children}
    </button>
  )
}

export default Button
