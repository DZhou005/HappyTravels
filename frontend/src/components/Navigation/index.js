import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SearchBar from "../SearchBar/index"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
    <div>
      <ProfileButton user={sessionUser} />
      <NavLink to="/host" className="host">Host now</NavLink>
      <br></br>
      <NavLink to="/pages" className="yourListings">Your Listings</NavLink>
    </div>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal className="login"/>
        <NavLink to="/signup" className="signUp">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li className="nav">
        <NavLink exact to="/" className='homeButton'>Home</NavLink>
        <SearchBar className="search"/>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
