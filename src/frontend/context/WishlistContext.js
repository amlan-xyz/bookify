import axios from 'axios';
import {createContext ,useContext,useState} from 'react'
import { toast } from "react-toastify";

import { AuthContext } from '../..';

export const WishlistContext=createContext();

export function WishlistContextProvider({children}){

	const {token}=useContext(AuthContext)

	const [wishlist,setWishlist]=useState([]);

	const getWishlist=async()=>{
		const {data}=await axios.get('/api/user/wishlist',{
			headers:{authorization:token}
		})
		setWishlist(data.wishlist);
	}

	const addToWishlist=async(item)=>{
		const response=await axios.post('/api/user/wishlist',{product:item},{
			headers:{authorization:token}
		})
		getWishlist();
		toast.success("Item added to wishlist");
	}

	const removeFromWishlist=async(product_id)=>{
		const response=await axios.delete(`/api/user/wishlist/${product_id}`,{
			headers:{authorization:token}
		})
		getWishlist();
		toast.success("Item removed from wishlist");
	}

	const value={wishlist,addToWishlist,removeFromWishlist,getWishlist};

	return (
		<WishlistContext.Provider value={value}>
			{children}
		</WishlistContext.Provider>	
	)

}