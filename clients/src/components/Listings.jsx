import React from 'react'
import { categories } from '../data'
import "../Styles/Listings.scss"
import ListingCarD from './ListingCard'
import Loader from "./Loader"

const Listings = () => {
  
  return (
    <div className='category-list'>
      {categories?.map((category,index) => (
        <div className='category' key={index}>
           <div className="category_icon">
           {category.icon}
           </div>
           <p>{category.label}</p>
        </div>
      ))}
    </div>
  )
}

export default Listings;

