import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "../Styles/ListingCard.scss";
import { ArrowForwardIos, ArrowBackIosNew, Favorite } from "@mui/icons-material";
import { setWishList } from '../Redux/State';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths = [],
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const isLiked = wishList.some((item) => item._id === listingId);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const patchWishlist = async () => {
    if (user?._id !== creator._id) {
      try {
        const response = await fetch(`http://localhost:3001/users/${user._id}/wishList/${listingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        dispatch(setWishList(data.wishList));
      } catch (err) {
        console.error("Update Wishlist Failed", err.message);
      }
    }
  };

  const handleClick = () => {
    navigate(`/properties/${listingId}`);
  };

  return (
    <div className='listing-card' onClick={handleClick}>
      <div className="slider-container">
        <div className='slider' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {listingPhotoPaths.map((photo, index) => {
            const imageUrl = `http://localhost:3001/uploads/${photo}`;
            console.log("Image URL:", imageUrl); // Log the image URL

            return (
              <div key={index} className='slide'>
                <img src={imageUrl} alt={`photo ${index + 1}`} />
                <div className="prev-button" onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}>
                  <ArrowBackIosNew style={{ fontSize: "15px" }} />
                </div>
                <div className="next-button" onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}>
                  <ArrowForwardIos style={{ fontSize: "15px" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <h3>{city}, {province}, {country}</h3>
      <p>{category}</p>
      {!booking ? (
        <>
          <p>{type}</p>
          <p><span>${price}</span> per night</p>
        </>
      ) : (
        <>
          <p>{startDate} - {endDate}</p>
          <p><span>${totalPrice}</span> total</p>
        </>
      )}
      <button className='favorite' onClick={(e) => {
        e.stopPropagation();
        patchWishlist();
      }} disabled={!user}>
        {isLiked ? (
          <Favorite style={{ color: "red" }} />
        ) : (
          <Favorite style={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard;