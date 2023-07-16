import { useContext, useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart,faCartShopping} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';


import { SingleProductContext,CartContext, WishlistContext, AuthContext} from "../../../index"

import './ProductStyle.css'

// components

import { Navbar } from "../../components/Navbar/Navbar"
import { Footer } from "../../components/Footer/Footer"

export function Product(){
	const {productData,getProductData}=useContext(SingleProductContext)
	const {addToCart,cart}=useContext(CartContext);
	const {wishlist,addToWishlist}=useContext(WishlistContext)
	const {isLoggedIn}=useContext(AuthContext)
	const {productId}=useParams();

	const {_id ,title,author,price,categoryName,image,rating}=productData;

	const navigate=useNavigate();

	const handleCart=()=>{
		if(isLoggedIn===false){
			navigate('/login')
		}else{
			addToCart(productData);
		}
		
	}


	const handleWishlist=()=>{
		if(isLoggedIn===false){
			navigate('/login')
		}else{
			addToWishlist(productData);
		}
	}


	useEffect(()=>{
		getProductData(productId);
	},[])
	
	return (
		<div className="product_container">
			<Navbar/>
			<div className="product_body">
				<div className="product_img">
					<img src={image} alt="" />
				</div>
				<div className="product_content">
					<h2>{title}</h2>
					<small>by {author}</small>
					<p>Rating: <span>{rating}</span> </p>
					<p>Price:<span>{price}</span></p>
					<p>Category: <span>{categoryName}</span></p>
					<div className="product_btns">
						{
							cart.find(item=>item._id===_id)?<button onClick={()=>{
								navigate('/cart')
							}}>Go to Cart <FontAwesomeIcon icon={faCartShopping}/></button>:<button onClick={handleCart}>Add to Cart <FontAwesomeIcon icon={faCartShopping}/></button>
						}
					
					{
						wishlist.find(item=>item._id===_id)?<button className="alt-btn" onClick={()=>{
							navigate('/wishlist')
						}}>Go to Wishlist <FontAwesomeIcon icon={faCartShopping}/></button>:<button className="alt-btn" onClick={handleWishlist}>Add to Wishlist <FontAwesomeIcon icon={faHeart}/></button>
					}
					</div>
				</div>
				
			</div>
			<Footer/>
		</div>	
	)
}