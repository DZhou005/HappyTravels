import React from 'react';
import "../SearchBar/SearchBar.css"

const SearchBar = ({keyword,setKeyword}) => {

  return (
    <input
      className="search"
     key="random1"
     value={keyword}
     placeholder={"Where would you like to go?"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar
