import '../Jumbotron/JumbotronStyle.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { useNavigate } from 'react-router-dom'

export function Jumbotron(){

const navigate=useNavigate();
return <div className="jumbotron">
		<img src='/images/banner-alt.png' alt="" />
		<div className="">
			<h1>Welcome to <span className='highlight'>Bookify</span> </h1>
			<p>Browse through our collection.</p>
			<button onClick={()=>{
				navigate('/products')
			}}>Shop <FontAwesomeIcon className='shopping_bag' icon={faShoppingBag}/></button>
		</div>
		
	</div>
}