import { createContext,useState } from "react";
import axios from 'axios'

export const CategoryContext=createContext();

export function CategoryContextProvider({children}){

	const [categories,setCategories]=useState([]);

	const getCategories=async()=>{
		const {data}=await axios.get('/api/categories');
		setCategories(data.categories);
	}

	const value={categories,getCategories};

	return (
		<CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>	
	)
}