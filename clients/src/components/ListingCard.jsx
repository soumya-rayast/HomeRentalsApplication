import React, { useState } from 'react'
import "../Styles/ListingCard.scss"
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";


const ListingCard = ({ listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price }) => {

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

  return (
    <>
      <div className='listing-card'>
        <div className="slider-container">
          <div className='slider'
            style={{ transform:`translateX(-${currentIndex * 100}%)`}}>
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
        <p>{type}</p>
        <p><span>${price}per night</span></p>
      </div>
    </>
  )
}

export default ListingCard
