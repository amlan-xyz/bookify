import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMultiply} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';


import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";

import { AuthContext, CartContext ,WishlistContext} from "../../../index";

import './WishlistStyle.css'
import '../Products/ProductsStyle.css'

export function Wishlist(){
	const {addToCart,cart} =useContext(CartContext)
	const {wishlist,removeFromWishlist,getWishlist} =useContext(WishlistContext)
	const {loggedInUser}=useContext(AuthContext)
	const navigate=useNavigate();

	useEffect(()=>{
		getWishlist();
	},[])

	return(
		<>
		<Navbar/>
		<div className="wishlist_body">
			{
				wishlist.length>0?<header>My Wishlist ({wishlist.length})</header>:<div className="empty_wishlist ">
				<img src="images/empty_wishlist.png" alt="empty wishlist" />
				<h3>Hi <span className="highlight">{loggedInUser.firstName}</span>, your wishlist is empty!</h3>
				<button onClick={()=>{
					navigate('/products')
				}}>Shop </button>
			</div>
			}
			
			<ul>
				{
					wishlist.map(item=>{
						const {_id,title,image,author,price,rating}=item;
						return (
							<li className="product_card">
						<button onClick={(e)=>{
						e.preventDefault();
						removeFromWishlist(_id)}} className='wishlist'><FontAwesomeIcon className='wishlist-icon' icon={faMultiply}/></button>
		<div className="img_body" onClick={()=>{
			navigate(`/products/${_id}`)
		}}>
			<img className="product_card_img" src={image} alt="" />
		</div>
		
      <div className="product_card_body">
        <h4 className="product_card_heading">{title}</h4>
		<small>by {author}</small>
		<p>Rating : {rating} <br /> Price : &#8377;  {price}</p>
		
			{
				cart.find(item=>item._id===_id)?<button onClick={(e)=>{
					e.preventDefault();
					navigate('/cart')
				}} className='cart-btn'>Go to Cart</button>:<button onClick={(e)=>{
					e.preventDefault();
					addToCart(item);
					removeFromWishlist(_id);
				}} className='cart-btn'>Move to Cart</button>
			}

		
      </div>							</li>	
						)
					})
				}
			</ul>
		</div>
			
		<Footer/>
		</>	
	)
}