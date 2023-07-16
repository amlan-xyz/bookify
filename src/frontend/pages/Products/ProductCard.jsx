import './ProductsStyle.css'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart,faCartShopping} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';


import { CartContext,WishlistContext,AuthContext } from '../../../index';

export function Card({item}){
	const {cart,addToCart,removeFromCart} =useContext(CartContext);
	const {wishlist,addToWishlist,removeFromWishlist}=useContext(WishlistContext)
	const {isLoggedIn}=useContext(AuthContext)

	const {_id,title,image,author,price}=item;

	const navigate=useNavigate();

	const handleCart=()=>{
		if(isLoggedIn===false){
			navigate('/login');
		}else{
			addToCart(item);
		}
			
		
		
	}

	const handleWishlist=()=>{
		if(isLoggedIn===false){
			navigate('/login');
		}else{
			addToWishlist(item);
		}
		
	}

	const handleWishlistRemove=()=>{
		removeFromWishlist(_id);
	}

	const handleCartRemove=()=>{
		removeFromCart(_id)
	}

	return <div className="product_card">
		{
			wishlist.find(item=>item._id===_id)?<button onClick={handleWishlistRemove} className='wishlist'><FontAwesomeIcon className='wishlist-icon-active' icon={faHeart}/></button>:<button onClick={handleWishlist} className='wishlist'><FontAwesomeIcon className='wishlist-icon' icon={faHeart}/></button>
		}
		<div className="img_body" onClick={()=>{
			navigate(`/products/${_id}`)
		}}>
			<img className="product_card_img" src={image} alt="" />
		</div>
		
      <div className="product_card_body">
        <h4 className="product_card_heading">{title}</h4>
		<small>by {author}</small>
		<p>&#8377;  {price}</p>
		{
			cart.find(item=>item._id===_id)?<button onClick={(e)=>{
				e.preventDefault();
				navigate('/cart')
			}} className='cart-btn'>Go to Cart <FontAwesomeIcon className='' icon={faCartShopping}/> </button>:<button onClick={handleCart} className='cart-btn'>Add to Cart <FontAwesomeIcon className='' icon={faCartShopping}/></button>
		}
		
      </div>
	</div>
}

