import './SearchBarStyles.css'
import { useContext } from 'react';

import { ProductsContext } from "../../../index";

export function SearchBar(){
	const {searchBook,handleSearch} = useContext(ProductsContext);
	return (
		<div className="search">
        {/* <header>Search Books Here</header> */}
        <div className="search_bar">
        <label htmlFor="search_books"></label>
        <input
          placeholder="Search using title of the book"
          value={searchBook}
          id="search_book"
          onChange={handleSearch}
        />
        
        </div>
      </div>
		)
}