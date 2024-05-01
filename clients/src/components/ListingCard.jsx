import React from 'react'
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
  return (
    <>
      <div className='listing-card'>
        <div className="slider-container">
          <div className='slider'>
            {listingPhotoPaths?.map((photo, index) => (
              <div key={index} className='slide'>
                <img src={`http://localhost:3001${photo.replace("public", "")}`} alt={`photo ${index + 1}`} />
                <div className="prev-button">
                  <ArrowBackIosNew/>jj
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingCard
