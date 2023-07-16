import { useContext,useEffect } from "react"
import { useNavigate } from "react-router-dom"



import {CategoryContext, ProductsContext} from '../../../index'

//components
import {Jumbotron} from '../../components/Jumbotron/Jumbotron'
import {Card} from './CategoryCard'
import {Navbar} from '../../components/Navbar/Navbar'
import {Footer} from '../../components/Footer/Footer'

// style
import '../Home/HomeStyle.css'

export function Home(){

	const {getCategories,categories} =useContext(CategoryContext)
	const {handleCategory} =useContext(ProductsContext)
	const navigate=useNavigate();

	useEffect(()=>{
		getCategories();
	},[])

	return (
		<div className="">
			<Navbar/>
		<main>
			<Jumbotron/>
			<div className="category_container">
				<h1>Collection of best book categories</h1>
				<p>There are many categories of books available at <span className="highlight">Bookify</span>, choose your favourite one.</p>
				<ul>
				{
					categories.map(item=>(
						<li key={item._id} onClick={()=>{
							handleCategory(item.categoryName)
							navigate('/products')
						}}><Card item={item}/></li>	
					))
				}
				</ul>
			</div>
			
		</main>
		<Footer/>
		</div>
		
	)
}