import './FooterStyle.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF,faInstagram } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';


export function Footer(){
	return <footer>
		<div className="content">
			<h3 className="hightlight">Bookify</h3>
			<p>Enjoy our vast collections of books and have fun shopping.</p>
			<p>Privacy Policy</p>
			<small>	&#169; 2023 Bookify</small>
		</div>
		<div className="socials">
			<div className="links">
				<a href=""><FontAwesomeIcon className='icon' icon={faFacebookF} /> Facebook</a>
				<a href=""><FontAwesomeIcon className='icon' icon={faInstagram} /> Instagram </a>
			</div>
			
		</div>
	</footer>
}