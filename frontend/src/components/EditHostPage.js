import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { updateListing, getOneHost } from "../store/booking"


function EditHostPage({ book, hideForm }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id

  const { id } = useParams()
  const [location, setLocation] = useState(book?.location);
  const [price, setPrice] = useState(book?.price);
  const [pic, setPic] = useState(book?.pic);
  const [title, setTitle] = useState(book?.title);
  const [description, setDescription] = useState(book?.description);
  const [errors, setErrors] = useState([]);

  const updateLocation = (e) => setLocation(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updatePic = (e) => setPic(e.target.files[0]);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  // useEffect(() => {
  //   // dispatch(getOneHost());
  // }, [dispatch])

  console.log("picc:", pic)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id,
      userId,
      location,
      price,
      pic,
      title,
      description,
    }

    let updatedListing = await dispatch(updateListing(payload));
    if (updatedListing) {
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li className="err" key={idx}>{error}</li>)}
      </ul>
      <section>
          <label>
            location:
            <input
              type="text"
              value={location}
              onChange={updateLocation}
              required
            />
          </label>
          <label>
            price per night:
            <input
              type="number"
              value={price}
              onChange={updatePrice}
              required
            />
          </label>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={updateTitle}
              required
            />
          </label>
          <label>
            <textarea
              rows="6"
              cols="50"
              placeholder="Please describe your home...."
              value={description}
              onChange={updateDescription}
              required
            />
          </label>
          <label>
            Upload a picture:
            <input
              type="file"
              onChange={updatePic}
              required
            />
          </label>
          <button type="submit" className="submitHost">Update Listing</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
      </section>
    </form>
  );
}

export default EditHostPage;
