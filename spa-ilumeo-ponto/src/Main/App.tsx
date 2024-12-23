import React from 'react'

import { BrowserRouter } from 'react-router-dom';

import Router from './Router'

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
