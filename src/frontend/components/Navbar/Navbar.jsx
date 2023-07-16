import { NavLink,useNavigate} from 'react-router-dom'
import { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping,faHeart,faUser,faBook} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

// components

import {SearchBar} from '../SearchBar/SearchBar'
import {CartContext,AuthContext,WishlistContext} from '../../../index'

import '../Navbar/NavbarStyle.css'

export function Navbar(){
	const {isLoggedIn,loggedInUser,logout}=useContext(AuthContext)
	const {cart}=useContext(CartContext)
	const {wishlist} =useContext(WishlistContext)
	const navigate=useNavigate();
	return (
		<nav>
			<div className="nav_left">
				<NavLink className='nav_item' to='/'>Bookify <FontAwesomeIcon icon={faBook}/></NavLink>
			</div>
			<div className="nav_search">
			<SearchBar/>
			</div>

				<div className="nav_right">
				{!isLoggedIn &&  <NavLink to='/login' className='nav_item sign_btn'>Login</NavLink>}

				<NavLink className='nav_item' to='/cart'><FontAwesomeIcon className='nav_icon' icon={faCartShopping}/>Cart </NavLink>
				 <NavLink className='nav_item' to='/wishlist'><FontAwesomeIcon className='nav_icon' icon={faHeart}/> Wishlist</NavLink>
				<NavLink className='nav_item' to='/profile'><FontAwesomeIcon className='nav_icon' icon={faUser}/>{loggedInUser?.firstName} </NavLink>
				{isLoggedIn &&  <NavLink onClick={logout} className='nav_item sign_btn'>Logout</NavLink>}
				</div>

		
		</nav>
		
	)
}