import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Correct import for useSelector and useDispatch
import "../Styles/List.scss";
import Navbar from "../components/Navbar";
import ListingCard from '../components/ListingCard';
import { setPropertyList } from '../Redux/State';
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);
  const propertyList = user?.propertyList || []; // Default to empty array if propertyList is undefined
  const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
        method: "GET",
      });
      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    if (user?._id) { // Ensure user ID is available before making the request
      getPropertyList();
    }
  }, [user?._id, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Navbar />
      <h1 className='title-list'>Your Property List</h1>
      <div className="list">
        {propertyList.length > 0 ? (
          propertyList.map(({
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
              key={_id}
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
          <p>No properties found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PropertyList;
