import React, { useEffect, useState } from 'react';
import "../Styles/List.css";
import Loader from "../components/Loader";
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setListings } from '../Redux/State';
import ListingCard from '../components/ListingCard';
import Footer from "../components/Footer";

const CategoryPage = () => {
    const [loading, setLoading] = useState(true);
    const { category } = useParams();
    const listings = useSelector((state) => state.listings);
    const dispatch = useDispatch();

    const getFeedListings = async () => {
        try {
            const response = await fetch(`http://localhost:3001/properties?category=${category}`);
            const data = await response.json();
            dispatch(setListings({ listings: data }));
            setLoading(false);
        } catch (err) {
            console.log("Fetch Listings Failed", err.message);
        }
    };

    useEffect(() => {
        getFeedListings();
    }, [category]);

    return loading ? <Loader /> : (
        <>
            <Navbar />
            <h1 className='title-list'>{category} listings</h1>
            <div className="list">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing._id}
                        listingId={listing._id}
                        creator={listing.creator}
                        listingPhotoPaths={listing.listingPhotoPaths}
                        city={listing.city}
                        province={listing.province}
                        country={listing.country}
                        category={listing.category}
                        type={listing.type}
                        price={listing.price}
                        booking={listing.booking}
                    />
                ))}
            </div>
            <Footer />
        </>
    );
};

export default CategoryPage;
