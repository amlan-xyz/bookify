import { createContext,useEffect,useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

export const AuthContext=createContext();

export function AuthContextProvider({children}){
	const [isLoggedIn,setIsLoggedIn]=useState(false);
	const [loggedInUser,setLoggedInUser]=useState([]);
	const [credentials,setCredentials]=useState([]);
	const [token,setToken]=useState([]);

	const location=useLocation();
	const navigate=useNavigate();

	const handleLogin=async(e)=>{
		e.preventDefault();
		try{
			
			const {data:{foundUser,encodedToken}}=await axios.post('/api/auth/login',{...credentials});
			localStorage.setItem('jwt_token',encodedToken);
			setIsLoggedIn(true);
			setLoggedInUser(foundUser);
			toast.success("Logged In Successfully");
			navigate(location?.state?.from?.pathname || '/')
			setCredentials([])
		}catch(err){
			console.log(err);
		}
	}


	const handleGuestLogin=async(e)=>{
		e.preventDefault();
		try{
			
			const {data:{foundUser,encodedToken}}=await axios.post('/api/auth/login',{email:'amlan@gmail.com',password:'1234'})
			localStorage.setItem('jwt_token',encodedToken);
			setIsLoggedIn(true);
			setLoggedInUser(foundUser);
			toast.success("Logged In Successfully");
			navigate(location?.state?.from?.pathname || '/')
			setCredentials([])
		}catch(err){
			console.log(err);
		}
	}
	
	const handleSignup=async(e)=>{
		e.preventDefault();
		try{
			
			const {data:{createdUser,encodedToken}}=await axios.post('/api/auth/signup',{...credentials});
			localStorage.setItem('jwt_token',encodedToken);
			setIsLoggedIn(true);
			setLoggedInUser(createdUser);
			toast.success("Logged In Successfully");
			navigate(location?.state?.from?.pathname || '/')
			console.log(createdUser);
			setCredentials([])
		}catch(err){
			console.log(err);
		}
	}

	const logout=()=>{
		navigate('/login')
		localStorage.removeItem('jwt_token');
		setLoggedInUser(null);
		setIsLoggedIn(false);
		toast.success("Logged out Successfully");
	}

	useEffect(()=>{
		setToken(localStorage.getItem('jwt_token'));
	})

	const value={loggedInUser,isLoggedIn,setIsLoggedIn,setCredentials,handleLogin,handleSignup,handleGuestLogin,token,logout};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>	
	)
}