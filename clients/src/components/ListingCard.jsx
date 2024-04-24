import React from 'react'
import "../Styles/ListingCard.scss"
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
            {listingPhotoPaths?.map((photo,index)=>(
              <div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingCard
