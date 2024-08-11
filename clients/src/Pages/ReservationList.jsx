import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { setReservationList } from '../Redux/State';
import ListingCard from '../components/ListingCard';
import Footer from "../components/Footer";

const ReservationList = () => {
    const [loading, setLoading] = useState(true);
    const reservationList = useSelector((state) => state.user.reservationList) || [];
    const userId = useSelector((state) => state.user._id);
    const dispatch = useDispatch();

    const getReservationList = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}/reservations`, {
                method: "GET"
            });
            const data = await response.json();
            dispatch(setReservationList(data));
            setLoading(false);
        } catch (err) {
            console.log("Fetch Reservation List failed", err.message);
        }
    };

    useEffect(() => {
        if (userId) {
            getReservationList();
        }
    }, [userId, dispatch]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Navbar />
            <h1 className="title-list">Your Reservation List</h1>
            <div className="list">
                {reservationList.length > 0 ? (
                    reservationList.map((reservation) => (
                        <ListingCard
                            key={reservation._id} // Ensure each child has a unique key
                            listingId={reservation.listingId._id}
                            creator={reservation.hostId._id}
                            listingPhotoPaths={reservation.listingId.listingPhotoPaths || []}
                            city={reservation.listingId.city}
                            province={reservation.listingId.province}
                            country={reservation.listingId.country}
                            category={reservation.listingId.category}
                            startDate={reservation.startDate}
                            endDate={reservation.endDate}
                            totalPrice={reservation.totalPrice}
                            booking={reservation.booking}
                        />
                    ))
                ) : (
                    <p>No reservations found.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ReservationList;
