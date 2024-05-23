import React, { useEffect, useState,useDispatch } from 'react'
import { useSelector } from "react";
import "../Styles/List.scss";
import Navbar from "../components/Navbar";
import ListingCard from '../components/ListingCard';
import { setPropertyList } from '../Redux/State';
import Loader from "../components/Loader"
import Footer from "../components/Footer"
const PropertyList = () => {
  const [loading,setLoading] = useState(true)
  const user = useSelector((state => state.user));
  const propertyList = user?.propertyList;
  const dispatch = useDispatch()
  const getPropertyList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user._id}/properties`,{
        method: "GET",
      })
      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed ",err.message);

    }
  }
  useEffect(()=>{
    getPropertyList()
  },[])
  return loading ? <Loader/> :(
    <div>
      <Navbar />
      <h1 className='title-list'>Your Property List</h1>
      <div className="list">
        {propertyList.map((
          _id,
          creator,
          listingPhotoPaths,
          city,
          province,
          country,
          category,
          type,
          price,
          booking = false
        ) => (<ListingCard
          listingId={_id}
          creator={creator}
          listingPhotoPaths={listingPhotoPaths}
          city={city}
          province={province}
          country={country}
          category={category}
          type={type}
          price={price}
          booking={booking}
        />))}
      </div>
      <Footer/>
    </div>
  )
}
export default PropertyList
