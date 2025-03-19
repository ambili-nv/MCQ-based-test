
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRouter } from './Routes/router';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
      <Router>
      <Toaster/>
        <MainRouter />
      </Router>
    </>
  )
}

export default App
