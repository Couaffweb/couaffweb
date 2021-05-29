import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NewsLatters } from 'component';
const Footer = () => {
	const [showPopUp, setShowPopUp] = useState(false);
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-3 col-sm-6'>
						<h2 className='footer_hnd'>About Us</h2>
						<p>
							Lorem ipsum dolor amet consectetur adipisicing elitiuim sete
							eiusmod tempor incididunt ut labor
						</p>
						{showPopUp && (
							<NewsLatters
								isShow={showPopUp}
								onClose={() => setShowPopUp(!showPopUp)}
							/>
						)}
						<div className='social'>
							<Link to=''>
								<i className='fab fa-facebook-f'></i>
							</Link>
							<Link to=''>
								<i className='fa fa-twitter' aria-hidden='true'></i>
							</Link>
							<Link to=''>
								<i className='fa fa-instagram' aria-hidden='true'></i>
							</Link>
							<Link to=''>
								<i className='fa fa-linkedin' aria-hidden='true'></i>
							</Link>
						</div>
					</div>
					<div className='col-lg-3 col-sm-6'>
						<h2 className='footer_hnd'>Contact Us</h2>

						<ul className='cont'>
							<li>
								<Link to=''>
									<i className='fa fa-phone' aria-hidden='true'></i>{' '}
									<span>+15-563-562-5623</span>
								</Link>
							</li>
							<li>
								<Link to=''>
									<i className='fa fa-envelope' aria-hidden='true'></i>
									<span>lorem@gmail.com</span>
								</Link>
							</li>
							<li>
								<Link to=''>
									<i className='fa fa-map-marker' aria-hidden='true'></i>
									<span>lorem ipsum</span>
								</Link>
							</li>
							<li>
								<Link to=''>
									<i className='fa fa-calendar' aria-hidden='true'></i>
									<span>5 PM 25/2/21</span>
								</Link>
							</li>
						</ul>
					</div>
					<div className='col-lg-3 col-sm-6'>
						<h2 className='footer_hnd'>Contact with us </h2>
						<ul className='cont'>
							<li>
								<span
									className='click-button'
									role='button'
									tabIndex='1'
									onKeyPress={() => setShowPopUp(!showPopUp)}
									onClick={() => setShowPopUp(!showPopUp)}
								>
									Subscribe
								</span>
							</li>
						</ul>
					</div>
					<div className='col-lg-3 col-sm-6'>
						<h2 className='footer_hnd'>Quick Links</h2>

						<ul className='cont'>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to='/about-us'>About Us</Link>
							</li>
							<li>
								<Link to='/faq'>FAQ</Link>
							</li>
							<li>
								<Link to='/term-conditions'>Terms & conditions</Link>
							</li>
						</ul>
					</div>
					<div className='col-lg-12 col-sm-12'>
						<p className='cop'>
							Copyright @{new Date().getFullYear()} All Rights Reserved{' '}
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
