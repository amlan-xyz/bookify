import { useContext ,useEffect,useState} from "react"


import { Navbar } from "../../components/Navbar/Navbar"
import { Footer } from "../../components/Footer/Footer"

import './CheckoutStyle.css'

import { AddressContext ,CartContext} from "../../../index"


export function Checkout(){
	const {address}=useContext(AddressContext)
	const {cart,totalAmount}=useContext(CartContext)

	const [primaryAddress,setPrimaryAddress]=useState(null);

	// const addPrimaryAddress=(item)=>{
	// 	setPrimaryAddress(item);
	// }

	// useEffect(()=>{
	// 	console.log(primaryAddress)
	// })

	return(
			<div className="checkout">
				<Navbar/>
				<div className="checkout_heading">
					<h2>Checkout</h2>
				</div>
				<div className="checkout_body">
					<div className="checkout_address">
						<header>Select Address</header>
							<form action="">
							{
								address.map(item=>(
									<div className="">
										  <input
                onChange={() => setPrimaryAddress(item)}
                type="radio"
                id={item.id}
                name="address"
                checked={primaryAddress && primaryAddress.id === item.id}
              />
									  <label for={item.id}>
										{item.name} <br />
										#{item.houseNo}, {item.city}, {item.state}, {item.pincode}, {item.country}
										<br />
										Mobile No. : {item.mobile}
									  </label>
									</div>
									
								))
							}
							</form>
							
					</div>
					<div className="order_details">
						<h3>Order Details</h3>
						<hr />

						<ul>
							<li>
								<p className="bold">Item</p>
								<p className="bold">Qty</p>
							</li>
							{
								cart.map(item=>(
									<li>
										<p>{item.title}</p>
										<p>{item.qty}</p>
									</li>	
								))
							}
						</ul>
						<hr />
						<h3>Price Details</h3>
						<hr />
						<div className="checkout_items">
							<p>Price ({cart.length} {cart.length>1?'items':'item'})</p>
							<p>&#8377; {totalAmount}</p>
						</div>
						<div className="checkout_items">
							<p>Discount</p>
							<p>- &#8377; 1000</p>
						</div>
						<div className="checkout_items">
							<p>Delivery Charges</p>
							<p>+ &#8377; 499</p>
						</div>
						<div className="checkout_items">
							<p className="bold">Total Amount</p>
							<p className="bold">&#8377; {totalAmount -1000+499}</p>
						</div>
						<hr />
						<h3>Deliver To</h3>
						<hr />
						<div className="selected_address">
							{
								primaryAddress!==null?<p>
										{primaryAddress.name} <br />
										#{primaryAddress.houseNo}, {primaryAddress.city}, {primaryAddress.state}, {primaryAddress.pincode}, {primaryAddress.country}
										<br />
										Mobile No. : {primaryAddress.mobile}

								</p>:<p>
									No delivery Address Selected
								</p>
							}
						</div>
						<div className="place_order">
							<button >Place Order</button></div>
						
					</div>
				</div>
				<Footer/>
			</div>
		)
}