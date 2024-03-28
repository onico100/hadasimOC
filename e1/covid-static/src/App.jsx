import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ScreenContainer from './screens/ScreenContainer'
import './App.css'
import React from 'react'
import Home from './screens/Home/Home'
import PatientForm from "./components/Patient/PatientForm"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (<ScreenContainer><Home /></ScreenContainer>)
    },
    {
      path: "/patient-form",
      element: (<ScreenContainer><PatientForm /></ScreenContainer>)
    },

  ])

  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
