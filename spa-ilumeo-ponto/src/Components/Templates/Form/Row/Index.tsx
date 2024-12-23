import React from 'react'
import './index.css'

const Row = ({ children, classRow }: any) => {
  return (
    <div className={`row${classRow ? ` ${classRow}` : ''}`}>
      {children}
    </div>
  )
}

export default Row
