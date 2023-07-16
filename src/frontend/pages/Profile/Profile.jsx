
import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
// components
import {Navbar} from '../../components/Navbar/Navbar'
import {Footer} from '../../components/Footer/Footer'

import './ProfileStyle.css'
import { AddressContext, AuthContext } from '../../../index'


export function Profile(){

	const {address,addDummyAddress,addAddress,deleteAddress}=useContext(AddressContext)
	const {loggedInUser,logout}=useContext(AuthContext)

	const [showModal,setShowModal]=useState(false)
	const [inputAddress,setInputAddress]=useState({id:uuidv4()});

	const handleSubmit=(e)=>{
		e.preventDefault();
		console.log(inputAddress)
		addAddress(inputAddress);
		setInputAddress({id:uuidv4()})
		setShowModal(!showModal)
	}

	

	return (
		<div className="profile_container">
		<Navbar/>
		<div className="profile_body">
			<div className="profile_heading">
				<header>Profile Details</header>
				<hr />
				<p>Name : {loggedInUser.firstName} {loggedInUser.lastName} </p>
				<p>Email : {loggedInUser.email}</p>

				<button className='profile_btn' onClick={logout}>Logout</button>
				<hr />
				<header>Address Management</header>
				<hr />
				<button onClick={() => setShowModal(!showModal)} className='profile_btn'>Add New Address</button>

				<ol className='address_list'>
					{
						address.map(({id,name,city,houseNo,state,country,mobile,pincode})=>(
							<li key={id} className='address'>
							<div className="">
								<p>{name}</p>
								<button onClick={()=>{
									deleteAddress(id)
								}}>Delete</button>
							</div>
							
							<p>#{houseNo}, {city}, {pincode}, {state}, {country}</p>
							<p>Mobile No. : {mobile}</p>
							</li>	
						))
					}
				</ol>
			</div>
			
		</div>
		{showModal && <div className="modal">
			<div className="modal_wrapper"></div>
			<div className="modal_container">  
			<button className='close_btn' onClick={() => setShowModal(!showModal)}>Close</button>
			<header className='form_heading'>Add New Address</header>
			<hr />
			<form onSubmit={handleSubmit} className='address_form'>
				<label htmlFor="name">Enter your Name</label>
				<input type="text" name="" id="name" placeholder='Name' onChange={(e)=>{
					setInputAddress(form=>({...form,name:e.target.value}))
					console.log(e.target.value)
				}}
					 />
				<label htmlFor="houseNo">Enter your House No.</label>
				<input type="text" name="" id="houseNo" placeholder='House No., Flat, Building, Street'  onChange={(e)=>setInputAddress(form=>({...form,houseNo:e.target.value}))}/>
				<label htmlFor="city">Enter your City</label>
				<input type="text" name="" id="city" placeholder='City'onChange={(e)=>setInputAddress(form=>({...form,city:e.target.value}))} />
				<label htmlFor="state">Enter your State</label>
				<input type="text" name="" id="state" placeholder='State' onChange={(e)=>setInputAddress(form=>({...form,state:e.target.value}))} />
				<label htmlFor="country">Enter your country</label>
				<input type="text" name="" id="country" placeholder='Country' onChange={(e)=>setInputAddress(form=>({...form,country:e.target.value}))} />
				<label htmlFor="pincode">Enter your Pincode</label>
				<input type="text" name="" id="pincode" placeholder='pincode' onChange={(e)=>setInputAddress(form=>({...form,pincodeo:e.target.value}))}/>
				<label htmlFor="mobile">Enter your mobile number</label>
				<input type="number" name="" id="mobile" placeholder='mobile' onChange={(e)=>setInputAddress(form=>({...form,mobile:e.target.value}))}/>
				<button className='submit_btn' type='submit'>Add Address</button>
			</form>
			<button onClick={()=>{
				setShowModal(!showModal)
				addDummyAddress();
			}} className='dummy_btn'>Add Dummy Data</button>
			</div>
		  </div>}
		<Footer/>
		</div>
	)
}