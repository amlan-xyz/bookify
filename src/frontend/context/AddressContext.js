import {useState,createContext} from 'react';


import { v4 as uuidv4 } from 'uuid';

export const AddressContext=createContext();


export function AddressContextProvider({children}){

	const [address,setAddress]=useState([{
		id:uuidv4(),
		name:'Amlan',
		houseNo:'House No. 111',
		city:'Sibsagar',
		state:'Assam',
		country:'India',
		pincode:'785640',
		mobile:123456789}]);

	const [primaryAddress,setPrimaryAddress]=useState([])

	const dummy_address={
		id:uuidv4(),
		name:'AdarshBalak',
		houseNo:'House No. 000',
		city:'AdarshNagar',
		state:'Adarshpur',
		country:'India',
		pincode:'785213',
		mobile:123456789
	}

	const addAddress=(new_address)=>{
		setAddress(address=>[...address,new_address])
	}

	const addDummyAddress=()=>{
		setAddress(address=>[...address,dummy_address])
	}

	const deleteAddress=(address_id)=>{
		setAddress(address.filter(({id})=>id!==address_id));
	}

	const addPrimaryAddress=(address_id)=>{
		setPrimaryAddress(address.find(({id})=>id===address_id))
		setAddress(address.filter(({id})=>id!==address_id));
	}

	const value={addAddress,addDummyAddress,address,deleteAddress,primaryAddress,addPrimaryAddress}

	return (
		<AddressContext.Provider value={value}>{children}</AddressContext.Provider>	
	)
}