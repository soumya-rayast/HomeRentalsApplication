import React from 'react'
import { Navbar } from "../components/Navbar"
import { Provider } from "react-redux"
import { store } from '../Redux/Store'


const HomePage = () => {
  return (
    <Provider store={store}> 
      <Navbar />
    </Provider>
  )
}

export default HomePage
