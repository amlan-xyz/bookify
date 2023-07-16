import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { AuthContext, CartContext,WishlistContext } from "../../../index";

import './CartStyle.css'
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMultiply} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

export function Cart(){
	const {cart,removeFromCart,totalAmount,calculateCartValue,updateQty} =useContext(CartContext)
	const {addToWishlist,wishlist}=useContext(WishlistContext)
	const {loggedInUser}=useContext(AuthContext)

	const navigate=useNavigate();

	useEffect(()=>{
		calculateCartValue();
	})

	return(
		<>
			<Navbar/>
			<div className="cart">
			
			{
				cart.length>0?<p className="cart_heading">My Cart (<span className="highlight">{cart.length}</span>)</p>:<div className="empty_cart ">
					<img src="images/empty_cart.png" alt="empty cart" />
					<h3>Hi <span className="highlight">{loggedInUser.firstName}</span>, your cart is empty!</h3>
					<button onClick={()=>{
						navigate('/products')
					}}>Shop </button>
				</div>
			}

			
			<div className="cart_body">
				
				<ul className="cart_items">
					{
					 	cart && cart.map(item=>{
							const {title,_id,price,qty,image,author}=item;
							return (
								<li key={_id} className="cart_item">
									
									<div 
									onClick={()=>{
										navigate(`/products/${_id}`)
									}}
									className="cart_img">
										<img src={image} alt="item" />
									</div>
									<div className="cart_content">
									
									<h2 className="item_heading">{title}</h2>
									<small>by {author}</small>
									<p className="item_price">&#8377;  {price}
									</p>
									<p className="item_qty">
										<button className={qty===1?'btn_disable':''}  disabled={qty===1?true:false} onClick={()=>{
											updateQty(_id,'decrement')
										}}>-</button>
										<span>{qty}</span>	
										<button  onClick={()=>{
											updateQty(_id,'increment')
										}}>+</button>
									</p>
									{
										wishlist.find((item)=>item._id===_id)?<button className="cart_btn" key={_id} onClick={(e)=>{
											e.preventDefault();
											navigate('/wishlist')
										}}>Go to Wishlist</button>:<button className="cart_btn" key={_id} onClick={(e)=>{
											e.preventDefault();
											addToWishlist(item);
										}}>Add to Wishlist</button>
									}
									
									</div>
									<div className="cart_wishlist" onClick={()=>removeFromCart(_id)}>
										<FontAwesomeIcon className="cart_icon" icon={faMultiply}/>
									</div>
								</li>	
							)
						})
					}
				</ul>
				{
					cart.length!==0 && <div className="checkout_card">
					<h2 className="checkout_heading">Price Details</h2>
					<hr />
					<div className="checkout_item">
						<p>Price({cart.length} {cart.length>1?'items':'item'})</p>
						<p>&#8377; {totalAmount}</p>
					</div>
					<div className="checkout_item">
					<p>Discount</p>
					<p>-&#8377; 1000</p>
					</div>
					<div className="checkout_item">
						<p>Delivery Charges</p>
						<p>&#8377; 499</p>
					</div>
					<hr />
					<div className="checkout_item">
						<p>Total Amount</p>
						<p>&#8377; {totalAmount - 1000 +499}</p>
					</div>
					<hr />
					<p>You will save &#8377; 1000 on this order</p>
					
					<button onClick={()=>{
						navigate('/checkout');
					}} className="checkout_btn">Place Order</button>
				</div>
				}
				
			</div>
			
			</div>	
			<Footer/>
		</>
		
	)
}