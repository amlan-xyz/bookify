import axios from 'axios';
import {createContext ,useContext,useState} from 'react'
import { toast } from "react-toastify";

import { AuthContext } from './AuthContext';

export const CartContext=createContext();

export function CartContextProvider({children}){

	const [cart,setCart]=useState([]);
	const [totalAmount,setTotalAmount]=useState(0);
	const {token}=useContext(AuthContext)

	const getCartItems=async()=>{
		const {data:{cart}}=await axios.get('/api/user/cart',{
			headers:{authorization:token}
		})
		setCart(cart)
	}

	const addToCart=async(item)=>{
		const response=await axios.post('/api/user/cart',{product:item},{
			headers:{authorization:token}
		})
		getCartItems();
		toast.success("Item added to cart");
	}

	const removeFromCart=async(product_id)=>{
		const response=await axios.delete(`/api/user/cart/${product_id}`,{
			headers:{authorization:token}
		})
		getCartItems();
		toast.success("Item removed from cart");
	}

	const calculateCartValue=()=>{
		const total=cart.reduce((acc,curr)=>acc+(curr.qty*curr.price),0);
		setTotalAmount(total)
	}

	const updateQty=async(product_id,type)=>{
		const response=await axios.post(`/api/user/cart/${product_id}`,{
			action:{
				type:type,
		}
	},{
			headers:{authorization:token}
		})
		getCartItems();
		calculateCartValue();
	}

	const value={cart,addToCart,removeFromCart,totalAmount,calculateCartValue,updateQty};

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>	
	)

}