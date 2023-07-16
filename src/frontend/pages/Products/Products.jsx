import React, { useContext, useEffect } from "react";

import { CategoryContext, ProductsContext,WishlistContext } from "../../../index";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

import './ProductsStyle.css'

import {Card} from './ProductCard'
import {Navbar} from '../../components/Navbar/Navbar'
import { Loader } from "../../components/Loader/Loader";



export function Products() {
  const {loading,getProducts,setRangeValue,selectedCategories,sortOrder,selectedRatings,rangeValue,handleCategory,handleRating,handleSort,handleClearFilters,filteredBooks} = useContext(ProductsContext);
  const {categories}=useContext(CategoryContext)

 

  useEffect(()=>{
		getProducts();
	},[])


  return (
    <div className="container">
      <Navbar/>
      <main>
      <div className="content_body">
        
      <div className="filters" >
        <div className="filter-header">
            <h2 >Filters</h2>
            <button
            onClick={handleClearFilters}
            >
             Clear Filters
            </button>
        </div>
     
        <div className="filter-range">
          <label htmlFor="price-range">Price Range</label>
          <hr/>
          <div className="range-values">
            <p>1000</p>
            <p>3000</p>
            <p>5000</p>
          </div>
        <input 
          type="range"
          max="5000"
          min="1000"
          value={rangeValue}
          onChange={(event) => setRangeValue(parseInt(event.target.value))}
          id="price-range"
        />
        </div>
        
        <div className="filter-categories">
        <h2>Category</h2>
          <ul className="category-checkboxes">
          
          {
            categories && categories.map(({categoryName})=>(
              <li>
              <label htmlFor={categoryName}>{categoryName}</label>
              <input
              type="checkbox"
              value={categoryName}
              name=""
              id={categoryName}
              onChange={() => handleCategory(categoryName)}
              checked={selectedCategories.includes(categoryName)}
              />
              </li>
              ))
          }

          </ul>
        </div>
        
      <div className="ratings">
        
      <h2>Ratings</h2>

      <div className="rating-checkboxes">
        <div className="rating-inputs">
        <label htmlFor="rating4">4 <FontAwesomeIcon className='star_icon' icon={faStar}/> and above</label>
        <input
          type="checkbox"
          value="4"
          id="rating4"
          onChange={() => handleRating("4")}
          checked={selectedRatings.includes("4")}
        />
        </div>
        
        <div className="rating-inputs">
        <label htmlFor="rating3">3 <FontAwesomeIcon className='star_icon' icon={faStar}/> and above</label>
        <input
          type="checkbox"
          value="3"
          id="rating3"
          onChange={() => handleRating("3")}
          checked={selectedRatings.includes("3")}
        />
        </div>

       <div className="rating-inputs">
       <label htmlFor="rating2">2 <FontAwesomeIcon className='star_icon' icon={faStar}/> and above</label>
        <input
          type="checkbox"
          value="2"
          id="rating2"
          onChange={() => handleRating("2")}
          checked={selectedRatings.includes("2")}
        />
       </div>

       <div className="rating-inputs">
       <label htmlFor="rating1">1 <span className="rating_margin"></span> <FontAwesomeIcon  className='star_icon' icon={faStar}/> and above</label>
        <input
          type="checkbox"
          value="1"
          id="rating1"
          onChange={() => handleRating("1")}
          checked={selectedRatings.includes("1")}
        />
       </div>

      
      </div>
        
      </div>

        <div className="sorting">
          <h2>Sort</h2>
          <div className="sorting-content">
          <label>
            <input
              type="radio"
              value="lowToHigh"
              checked={sortOrder === "lowToHigh"}
              onChange={handleSort}
            />Price
            (Low to High)
          </label>

          <label>
            <input
              type="radio"
              value="highToLow"
              checked={sortOrder === "highToLow"}
              onChange={handleSort}
            />Price
            (High to Low)
          </label>
          </div>
         
        </div>

     
      </div>

      <div className="products">
        <div className="products-heading">
        { loading && <Loader/>}
        {  !loading &&<h2>Showing Products : <span className="highlight">{filteredBooks.length}</span> </h2>}
        </div>
        
          <ul>
            { !loading && filteredBooks.map((item) => (
              <li
                key={item._id}
              >
                <Card item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>

    
    </main>
    </div>
    
  );
}
