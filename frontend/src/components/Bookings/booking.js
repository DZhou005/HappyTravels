import React, { useState } from 'react';
import "./booking.css"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getOneHost } from '../../store/booking';
import EditHostPage from "../EditHostPage"

function Booking () {
  let { id } = useParams();
  const book = useSelector(state => state.booking.currentBooking);
  const sessionUser = useSelector((state) => state.session.user);
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    setShowEdit(false);
    dispatch(getOneHost(id));

  }, [dispatch, id])

  let content = null;

  if(sessionUser && showEdit) {
  content= (
    <EditHostPage book={book} hideForm={() => setShowEdit(false)} />
  )
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
        {content}
      </div>
    </>
  )
}


export default Booking;
