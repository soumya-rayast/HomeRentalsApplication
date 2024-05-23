import React from 'react'
import Navbar  from "../components/Navbar"
import { Provider } from "react-redux"
import { store } from '../Redux/Store'
import Slide from "../components/Slide"
import Categories from '../components/Categories'
import Listings from "../components/Listings"
import Footer from "../components/Footer"
const HomePage = () => {
  return (
    <Provider store={store}> 
      <Navbar />
      <Slide/>
      <Categories/>
      <Listings/>
      <Footer/>
    </Provider>

  )
}

export default HomePage
