
import { useContext, useState } from 'react'
import './AuthStyle.css'
import { AuthContext } from '../../../index'
import { Link } from 'react-router-dom'


import { Navbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'

export function Signup(){
	const {setCredentials,handleSignup} =useContext(AuthContext)
	const [passwordType,setPasswordType]=useState("password")

	  
	const togglePasswordVisibility = () => {
		setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
	  };
	

	return (
		<div className="">
			<Navbar/>
			<div className="auth_body">
			<div className="auth_container">
			<h2>Sign In</h2>
			<hr />
			<form onSubmit={handleSignup}>
				<label htmlFor="firstName">First Name</label>
				<input type="text" name="" id="firstName" onChange={(e)=>setCredentials(form=>({...form,firstName:e.target.value}))} />
				<label htmlFor="lastName">Last Name</label>
				<input type="text" name="" id="lastName" onChange={(e)=>setCredentials(form=>({...form,lastName:e.target.value}))} />
				<label htmlFor="email">Email</label>
				<input type="email" id='email' 
					onChange={(e)=>setCredentials(form=>({...form,email:e.target.value}))}
				/>
				<label htmlFor="password">Password</label>
				<input type={passwordType} name="" id="password" 
					onChange={(e)=>setCredentials(form=>({...form,password:e.target.value}))}
				/>
				<div className="password_checkbox">
				<label htmlFor="show_password">Show Password</label>
				<input type="checkbox" onClick={togglePasswordVisibility} id="show_password" />
			  </div>
				<button className='auth_btn' type='submit'>Sign In</button>
				<div className="alternate_links">
			<span>Already Signed up. <Link to='/login'>Login</Link></span>
			</div>
			</form>
		
		</div>	
			</div>
			<Footer/>
		</div>	
		
	)
}

export function Login() {
	const { setCredentials, handleLogin, handleGuestLogin } = useContext(AuthContext);
	const [passwordType, setPasswordType] = useState("password");
  
	const togglePasswordVisibility = () => {
	  setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
	};
  
	return (
	  <div className="auth_content">
		<Navbar />
		<div className="auth_body">
		  <div className="auth_container">
			<h2>Login</h2>
			<hr />
			<form onSubmit={handleLogin}>
			  <label htmlFor="email">Email</label>
			  <input
				type="email"
				id="email"
				onChange={(e) => setCredentials((form) => ({ ...form, email: e.target.value }))}
			  />
			  <label htmlFor="password">Password</label>
			  <input
				type={passwordType}
				id="password"
				onChange={(e) => setCredentials((form) => ({ ...form, password: e.target.value }))}
			  />
			  <div className="password_checkbox">
				<label htmlFor="show_password">Show Password</label>
				<input type="checkbox" onClick={togglePasswordVisibility} id="show_password" />
			  </div>
  
			  <button className="auth_btn" type="submit">
				Submit
			  </button>
			</form>
			<div className="alternate_links">
			  <span>
				Create New Account. <Link to="/signup">Signup</Link>
			  </span>
			  <button onClick={handleGuestLogin}>Guest login</button>
			</div>
		  </div>
		</div>
		<Footer />
	  </div>
	);
  }
  