import React from 'react'

const If = (props: any) => {
  if (props.test) {
    return props.children
  } else {
    return false
  }
}

export default If
