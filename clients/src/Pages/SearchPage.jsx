import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../Styles/List.scss";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import ListingCard from '../components/ListingCard';
import { setListings } from '../Redux/State';
import Loader from '../components/Loader';
import Footer from "../components/Footer";

const SearchPage = () => {
    const [loading, setLoading] = useState(true);
    const { search } = useParams();
    const listings = useSelector((state) => state.listings) || [];
    const dispatch = useDispatch();

    const getSearchListings = async () => {
        try {
            const response = await fetch(`http://localhost:3001/properties/search/${search}`, {
                method: "GET",
            });
            const data = await response.json();
            dispatch(setListings(data)); // Assuming data is an array of listings
            setLoading(false);
        } catch (err) {
            console.log("Fetch Search List failed", err.message);
        }
    };

    useEffect(() => {
        getSearchListings();
    }, [search]);

    return loading ? <Loader /> : (
        <div>
            <Navbar />
            <h1 className='title-list'>Search Results</h1>
            <div className="list">
                {listings.length > 0 ? (
                    listings.map((listing) => (
                        <ListingCard
                            key={listing._id} // Ensure each child has a unique key
                            listingId={listing._id}
                            creator={listing.creator}
                            listingPhotoPaths={listing.listingPhotoPaths}
                            city={listing.city}
                            province={listing.province}
                            country={listing.country}
                            category={listing.category}
                            type={listing.type}
                            price={listing.price}
                            booking={listing.booking || false}
                        />
                    ))
                ) : (
                    <p>No listings found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;
