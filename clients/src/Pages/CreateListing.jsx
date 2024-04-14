import React, { useState } from 'react';
import "../Styles/CreateListening.scss";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from '../data';
import { RemoveCircleOutline, AddCircleOutline, AspectRatioOutlined } from '@mui/icons-material';
import variables from "../Styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from 'react-icons/bi';

const CreateListing = () => {
  const [category ,setCategory] = useState("");
  const [type,setType] = useState("");
  const [amenities,setAmenities] = useState([]);

  // upload ,drag and drop ,remove photos 
  const [photos, setPhotos] = useState([])
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
  }

  const handleDragPhoto = (result) => {
    if (!result.destination) return

    const items = Array.from(photos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.slice(result.destination.index, 0, reorderedItem)

    setPhotos(items)
  }
  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div>
      <Navbar />
      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form>
          <div className="create-listing_step1">
            <h2>Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div className={`category ${category === item.label ? "selected" : " "}`} key={index} onClick={()=> setCategory(item.label)}>
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div className="type" key={index}>
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input type="text" placeholder='Street Address' name='streetAddress' required />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Appartment,Suite,etc.(if applicable)</p>
                <input type="text" placeholder='Apt, Suite,etc.(if applicable)' name='aptSuite' required />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>City</p>
                <input type="text" placeholder='City' name='city' required />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Province</p>
                <input type="text" placeholder='Province' name='province' required />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Country</p>
                <input type="text" placeholder='Country' name='country' required />
              </div>
            </div>


            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline style={{ fontSize: "25px", cursor: "pointer" }} />
                  <p>1</p>
                  <AddCircleOutline style={{ fontSize: "25px", cursor: "pointer" }} />
                </div>
              </div>

              <div className="basic">
                <p>bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline style={{ fontSize: "25px", cursor: "pointer" }} />
                  <p>1</p>
                  <AddCircleOutline style={{ fontSize: "25px", cursor: "pointer" }} />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline style={{ fontSize: "25px", cursor: "pointer" }} />
                  <p>1</p>
                  <AddCircleOutline style={{ fontSize: "25px", cursor: "pointer" }} />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline style={{ fontSize: "25px", cursor: "pointer" }} />
                  <p>1</p>
                  <AddCircleOutline style={{ fontSize: "25px", cursor: "pointer" }} />
                </div>
              </div>

            </div>
          </div>

          <div className="create-listing2">
            <h2>Step 2 : Make your place stand out</h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {item.icon}
                  </div>
                  <p>
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId='photos' direction="horizontal">
                {(provided) => (
                  <div className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {photos.length < 1 && (
                      <>
                        <input type='file' 
                        style={{ display: "none" }}
                          id='image'
                          accept='image/'
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor='image' 
                        className='alone'>
                          <div className="icon" >
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable key={index} 
                            draggableId={index.toString()}
                             index={index}>
                              {(provided) => (
                                <div className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}>
                                  <img src={URL.createObjectURL(photo)} alt="place" />
                                  <button
                                   type='button'
                                    onClick={() => handleRemovePhoto(index)}>
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input type='file' style={{ display: "none" }}
                          id='image'
                          accept='image/'
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor='image' className='together'>
                          <div className="icon" >
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

            <h3>What make your place attractive and exciting? </h3>
            <div className="description">
              <p>Title</p>
              <input type="text " placeholder='Title' name='title' required />
              <p>Description</p>
              <textarea type="text " placeholder='Description' name='description' required />
              <p>Highlight</p>
              <input type="text " placeholder='Highlight' name='highlight' required />
              <p>Highlight details</p>
              <textarea type="text " placeholder='Highlight details' name='highlightDESC' required />
              
              <p>Now, set your PRICE</p>
              <span>$</span>
              <input type="number" placeholder='100' name='price' className='price' required />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateListing
