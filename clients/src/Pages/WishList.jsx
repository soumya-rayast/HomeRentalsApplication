import React from 'react';
import { useSelector } from 'react-redux';
import "../Styles/List.scss";
import Navbar from "../components/Navbar";
import ListingCard from '../components/ListingCard';
import Footer from "../components/Footer";

const WishList = () => {
    const wishList = useSelector((state) => state.wishList) || []; // Default to empty array if undefined

    return (
        <div>
            <Navbar />
            <h1 className='title-list'>Your Wish List</h1>
            <div className="list">
                {wishList.length > 0 ? (
                    wishList.map(({
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
                    }) => (
                        <ListingCard
                            key={_id} // Add key prop
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
                        />
                    ))
                ) : (
                    <p>No items in your wish list.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default WishList;
