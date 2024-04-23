import React, { useEffect, useState } from 'react'
import { categories } from '../data'
import "../Styles/Listings.scss"
import ListingCard from './ListingCard'
import Loader from "./Loader"
import { useDispatch, useSelector } from "react-redux"
import setListings from "../Redux/State"

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All" 
        ? `http://localhost3000/properties?category=${selectedCategory}`
        :"http://localhost3000/properties",
        { method: "GET", });

        const data = await response.json();
        dispatch(setListings({listings:data}));
        setLoading(false);

    } catch (err) {
      console.log("Fetch Listings Failed",err.message)
    }
  };console.log(listings)

  useEffect(()=>{
    getFeedListings();
  },[selectedCategory]);

  return (
    <div className='category-list'>
      {categories?.map((category, index) => (
        <div className='category' key={index} onClick={() => setSelectedCategory(category.label)}>
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

