import React, { Fragment } from 'react';
import "./booking.css"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getOneHost } from '../../store/booking';


function Booking () {
  let { id } = useParams();
  const book = useSelector(state => state.booking.currentBooking);
  const dispatch = useDispatch();
  console.log(book,"this is book")
  useEffect(() => {
    dispatch(getOneHost(id));

  }, [dispatch, id])



  return (
    <>
      <div className="everything">
        <img src={book?.pic} className="housePic"/>
        <h2 className="listingTitle">{book?.title}</h2>
        <h2 className="listingLocation">LOCATION:{book?.location}</h2>
        <h2 className="listingPrice">PRICE PER NIGHT:{book?.price}</h2>
        <h3 className="listingDescription">{book?.description}</h3>
        <h4 className="createdAt">POSTED:{book?.createdAt}</h4>

      </div>




    </>
  )
}


export default Booking;
