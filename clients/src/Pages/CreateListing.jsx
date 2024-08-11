import React, { useState } from 'react';
import "../Styles/CreateListening.scss";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from '../data';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';
import variables from "../Styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: ""
  });
  const [GuestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathCount, setBathCount] = useState(1);
  const [amenities, setAmenities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectAmenities = (facility) => {
    setAmenities(prev =>
      prev.includes(facility) ? prev.filter(option => option !== facility) : [...prev, facility]
    );
  };

  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, index) => index !== indexToRemove));
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription(prev => ({ ...prev, [name]: value }));
  };

  const creatorId = useSelector(state => state.user?._id);

  const navigate = useNavigate();
  
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", GuestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      photos.forEach(photo => {
        listingForm.append("listingPhotos", photo);
      });

      const response = await fetch("http://localhost:3001/properties/create", {
        method: "POST",
        body: listingForm
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to publish listing.");
      }
    } catch (error) {
      console.error("Publish Listing failed", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  key={index}
                  className={`category ${category === item.label ? "selected" : ""}`}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  key={index}
                  className={`type ${type === item.name ? "selected" : ""}`}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>
            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder='Street Address'
                  name='streetAddress'
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder='Apt, Suite, etc. (if applicable)'
                  name='aptSuite'
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder='City'
                  name='city'
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder='Province'
                  name='province'
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder='Country'
                  name='country'
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => { GuestCount > 1 && setGuestCount(GuestCount - 1) }}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  />
                  <p>{GuestCount}</p>
                  <AddCircleOutline
                    onClick={() => { setGuestCount(GuestCount + 1) }}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => { bedroomCount > 1 && setBedroomCount(bedroomCount - 1) }}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => { setBedroomCount(bedroomCount + 1) }}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => { bedCount > 1 && setBedCount(bedCount - 1) }}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => { setBedCount(bedCount + 1) }}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => { bathCount > 1 && setBathCount(bathCount - 1) }}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  />
                  <p>{bathCount}</p>
                  <AddCircleOutline
                    onClick={() => { setBathCount(bathCount + 1) }}
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create-listing2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  key={index}
                  className={`facility ${amenities.includes(item.name) ? "selected" : ""}`}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">
                    {item.icon}
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId='photos' direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          type='file'
                          style={{ display: "none" }}
                          id='image'
                          accept='image/*'
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor='image' className='alone'>
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => (
                          <Draggable key={index} draggableId={index.toString()} index={index}>
                            {(provided) => (
                              <div
                                className="photo"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img src={URL.createObjectURL(photo)} alt="place" />
                                <button type='button' onClick={() => handleRemovePhoto(index)}>
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        <input
                          type='file'
                          style={{ display: "none" }}
                          id='image'
                          accept='image/*'
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor='image' className='together'>
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <h3>What makes your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                value={formDescription.title}
                placeholder='Title'
                name='title'
                required
                onChange={handleChangeDescription}
              />
              <p>Description</p>
              <textarea
                value={formDescription.description}
                placeholder='Description'
                name='description'
                required
                onChange={handleChangeDescription}
              />
              <p>Highlight</p>
              <input
                type="text"
                value={formDescription.highlight}
                placeholder='Highlight'
                name='highlight'
                required
                onChange={handleChangeDescription}
              />
              <p>Highlight details</p>
              <textarea
                value={formDescription.highlightDesc}
                placeholder='Highlight details'
                name='highlightDesc'
                required
                onChange={handleChangeDescription}
              />
              <p>Now, set your PRICE</p>
              <span>$</span>
              <input
                type="number"
                placeholder='100'
                value={formDescription.price}
                name='price'
                className='price'
                required
                onChange={handleChangeDescription}
              />
            </div>
          </div>
          <button className='submit_btn' type='submit'>
            Create Your Listing
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateListing;
