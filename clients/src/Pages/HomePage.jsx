import React from 'react'
import Navbar  from "../components/Navbar"
import { Provider } from "react-redux"
import { store } from '../Redux/Store'
import Slide from "../components/Slide"
import Categories from '../components/Categories'

const HomePage = () => {
  return (
    <Provider store={store}> 
      <Navbar />
      <Slide/>
      <Categories/>
    </Provider>
  )
}

export default HomePage
