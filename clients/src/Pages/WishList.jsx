import React from 'react'
import { useSelector } from "react-redux"
import "../Styles/List.scss"
import Navbar from "../components/Navbar"
import ListingCard from '../components/ListingCard'
const WishList = () => {
    const wishList = useSelector((state) => state.wishList)
    return (
        <div>
            <Navbar />
            <h1 className='title-list'>Your Wish List</h1>
            <div className="list">
                {wishList.map((
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
        </div>
    )
}
export default WishList
