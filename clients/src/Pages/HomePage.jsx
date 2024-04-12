import React from 'react'
import { Navbar } from "../components/Navbar"
import { Provider } from "react-redux"
import { store } from '../Redux/Store'
import Slide from "../components/Slide"

const HomePage = () => {
  return (
    <Provider store={store}> 
      <Navbar />
      <Slide/>
    </Provider>
  )
}

export default HomePage
