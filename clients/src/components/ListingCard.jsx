import React, { useState, useSelector, useNavigate, useDispatch } from 'react'
import "../Styles/ListingCard.scss"
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";

import { setWishList } from '../Redux/State';

const ListingCard = ({ listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking }) => {

  // slider for images 
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (
        prevIndex - 1 + listingPhotoPaths.length
      ) % listingPhotoPaths.length
    );
  };
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + listingPhotoPaths.length));
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Add to wishlist 
  const user = useSelector((state) => state.user);
  const wishList = useSelector((state) => state.user.wishList);
  const isLiked = wishList.find((item) => item._id === listingId);

  const patchWishlist = async () => {
    const response = await fetch(`http://localhost:3001/users/${user._id}/${listingId}`, {
      method: "PATCH",
      header: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    dispatch(setWishList(data.wishList));
  }
  return (
    <>
      <div className='listing-card'>
        <div className="slider-container">
          <div className='slider'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {listingPhotoPaths?.map((photo, index) => (
              <div key={index} className='slide'>
                <img src={`http://localhost:3001${photo.replace("public", "")}`}
                  alt={`photo ${index + 1}`} />

                <div className="prev-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevSlide(e);
                  }}>
                  <ArrowBackIosNew style={{ fontSize: "15px" }} />
                </div>

                <div className="next-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextSlide(e);
                  }}>
                  <ArrowForwardIos style={{ fontSize: "15px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <h3>{city},{province},{country}</h3>
        <p>{category}</p>
        {!booking ? (<>
          <p>{type}</p>
          <p><span>${price}</span> per night</p>
        </>) : (
          <>
            <p>{startDate} - {endDate}</p>
            <p><span>${totalPrice}</span>total</p>
          </>
        )}
        <div className='favorite' onClick={()=>patchWishlist()}>
          {isLiked ? 
          ( <Favorite style={{color:"red"}}/>):(
            <Favorite style={{color:"white"}}/>
          ) }
        </div>
      </div>
    </>
  )
};

export default ListingCard;
