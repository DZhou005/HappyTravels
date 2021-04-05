import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './host.css';
import { Redirect, useHistory } from "react-router-dom";
import * as hostActions from "../../store/host";
import picture from "../../images/Airbnb-TravelTrends2021-Header.webp"

function HostPage() {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [pic, setPic] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) return <Redirect to="/" />;




  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(hostActions.host({ location, price, pic, title, description, userId:sessionUser.id }));
    history.push(`/pages`)
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if(file) setPic(file)
  }


  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li className="err" key={idx}>{error}</li>)}
      </ul>
      <div className="hostInputs">
        <img src={picture} className="pic"/>
          <label className="location">
            location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label className="price">
            price per night:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label className="title">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label className="description">
            <textarea
              rows="6"
              cols="50"
              placeholder="Please describe your home...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label className="upload">
            Upload a picture:
            <input
              type="file"
              onChange={updateFile}
              required
            />
          </label>
          <button type="submit" className="submitHost">Submit</button>
      </div>
    </form>
  );
}

export default HostPage;
