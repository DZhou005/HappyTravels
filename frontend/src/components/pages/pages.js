import React, { useEffect } from 'react'
import "./pages.css"
import { getAllPages } from "../../store/pages"
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function ShowPages () {
  const dispatch = useDispatch();
  const pages = useSelector(state => state.pages.allListings)
  var owner = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getAllPages())
  }, [dispatch])
  console.log("pages", pages)
  const yourPages = [];

  if(pages?.length > 0) {
    pages.map((page) => {
      if(owner.id === page.userId) {
        yourPages.push(
        <li key={page.id}>
          <NavLink to={`/host/${page.id}`}>
            Listing #{page.id} <br></br><br></br>
          </NavLink>
        </li>)
      }
    })
  }

  console.log("yourPages", yourPages)

  return (
    <div>
      <ul className="allUserListings">
        Here are all your current listings:
        <br></br>
        <br></br>
        <br></br>
        {yourPages}
      </ul>

    </div>
  )
}



export default ShowPages;
