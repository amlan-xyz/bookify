import { createContext,useState,useEffect } from "react";

export const SingleProductContext=createContext()

export function SingleProductContextProvider({children}){

	const [productData,setProductData]=useState([]);

	const getProductData=async(product_id)=>{
		
		try{
			const response = await fetch(`/api/products/${product_id}`);
			const { product } = await response.json();
			setProductData(product)
		}catch(e){
			console.log("ERROR",e);
		}
	
	}


	const value={getProductData,productData};

	return (
		<SingleProductContext.Provider value={value}>
			{children}
		</SingleProductContext.Provider>	
	)

}