import React, { useState } from 'react';
import "./booking.css"
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getOneHost, deletePost, review } from '../../store/booking';
import EditHostPage from "../EditHostPage"


function Booking () {
  let { id } = useParams();
  const book = useSelector(state => state.booking.currentBooking);
  const sessionUser = useSelector((state) => state.session.user);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.length >= 10) {
      setErrors([]);
        dispatch(review({ description, rating, userId:sessionUser.id, bookingId: book.id }))
        .then(() => {
          setDescription("");
          setRating("");

        })
        .catch(async (error) => {
        });
    }
    return setErrors(["description must be longer"])
  };


  useEffect(() => {
    setShowEdit(false);
    dispatch(getOneHost(id));
  }, [dispatch, id,])

  let content = null;

  if(sessionUser && showEdit) {
    content= (
      <EditHostPage book={book} hideForm={() => setShowEdit(false)} />
      )
    }

    const deleteAction = () => {
      dispatch(deletePost(book?.id))
      history.push('/')
    }

  return (
    <>
      <div className="everything">
          <img src={book?.pic} className="housePic"/>
          <h2 className="listingTitle">{book?.title}</h2>
          <h2 className="listingLocation">LOCATION:{book?.location}</h2>
          <h2 className="listingPrice">PRICE PER NIGHT:${book?.price}</h2>
          <h3 className="listingDescription">{book?.description}</h3>
          <h4 className="createdAt">POSTED:{book?.createdAt}</h4>
          <button onClick={() => setShowEdit(true)}>Edit</button>
          <button onClick={() => deleteAction()}
          >Delete</button>
        {content}

        <form onSubmit={handleSubmit}>
          <ul>
            <label>
              What would you rate your stay out of 10?
              <input
              type='text'
              value={rating}
              onChange={(e) => setRating(e.target.value)}>
              </input>
            </label>
            <label>
              Leave your reviews:
              <textarea
              placeholder="Please describe your experience"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              >
              </textarea>
            </label>
          </ul>
          <button type="submit">Submit Your Review</button>
        </form>
      </div>
    </>
  )
}


export default Booking;
