import React, { useEffect, useState } from 'react';
import "../Styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { setTripList } from '../Redux/State';
import ListingCard from '../components/ListingCard';
import Footer from "../components/Footer";

const TripList = () => {
    const [loading, setLoading] = useState(true);
    const tripList = useSelector((state) => state.user.triplist) || []; // Default to empty array if undefined
    const userId = useSelector((state) => state.user._id);

    const dispatch = useDispatch();

    const getTriplist = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}/trips`, {
                method: "GET"
            });
            const data = await response.json();
            dispatch(setTripList(data));
            setLoading(false);
        } catch (err) {
            console.log("Fetch Trip List failed", err.message);
        }
    };

    useEffect(() => {
        getTriplist();
    }, [userId]); // Add userId as a dependency

    return loading ? <Loader /> : (
        <>
            <Navbar />
            <h1 className="title-list">Your Trip List</h1>
            <div className="list">
                {tripList.length > 0 ? (
                    tripList.map((trip) => (
                        <ListingCard
                            key={trip.listingId._id} // Add key prop
                            listingId={trip.listingId._id}
                            creator={trip.hostId._id}
                            listingPhotoPaths={trip.listingId.listingPhotoPaths}
                            city={trip.listingId.city}
                            province={trip.listingId.province}
                            country={trip.listingId.country}
                            category={trip.listingId.category}
                            startDate={trip.startDate}
                            endDate={trip.endDate}
                            totalPrice={trip.totalPrice}
                            booking={trip.booking || true}
                        />
                    ))
                ) : (
                    <p>No trips found.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default TripList;
