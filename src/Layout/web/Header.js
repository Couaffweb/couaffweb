import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import {
	Image,
	LoginModal,
	ForgetPasswordModal,
	SignUpModal,
	OtpModal,
	Menu,
} from 'component';
import { SearchBox } from 'container';
import { isUserLogin, removeAuth } from 'utils';
import { popUps } from './constants';
const Header = () => {
	const history = useHistory();
	const { pathname } = useLocation();
	const isHome = pathname === '/';
	const [showPopup, setShowPopup] = useState(popUps);
	const [userType, setUserType] = useState(0);
	const [isLogin, setIsLogin] = useState(isUserLogin());
	useEffect(() => {
		const header = document.getElementById('myHeader');
		window.addEventListener('isLogin', () => {
			setShowPopup({ ...showPopup, login: true });
		});
		if (header && !isHome) {
			const sticky = header.offsetTop;
			const scrollCallBack = window.addEventListener('scroll', () => {
				if (window.pageYOffset > sticky) {
					header.classList.add('sticky');
				} else {
					header.classList.remove('sticky');
				}
			});
			return () => {
				window.removeEventListener('scroll', scrollCallBack);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isHome]);

	const logoutUser = () => {
		removeAuth();
		setIsLogin(false);
		history.push('/');
	};
	const openPopup = useCallback(
		(type) => {
			setShowPopup({ ...popUps, [type]: true });
		},
		[setShowPopup]
	);
	const onLogin = () => {
		setIsLogin(true);
	};
	const closePopUp = useCallback(() => {
		setShowPopup({ ...popUps });
	}, [setShowPopup]);
	return (
		<>
			<LoginModal
				isShow={showPopup.login}
				onClose={closePopUp}
				openModel={openPopup}
				onSuccess={onLogin}
			/>
			<ForgetPasswordModal
				isShow={showPopup.forgotPassword}
				onClose={closePopUp}
				openModel={openPopup}
			/>
			{showPopup.signup && (
				<SignUpModal
					userType={userType}
					isShow={showPopup.signup}
					onClose={closePopUp}
					openModel={openPopup}
				/>
			)}
			<OtpModal
				isShow={showPopup.otp}
				onClose={closePopUp}
				openModel={openPopup}
				onSuccess={onLogin}
			/>
			<header className={`fixed-top11 ${!isHome ? 'inner' : ''}`} id='navbar'>
				<div className='header_top'>
					<div className='container'>
						<div className='row'>
							<Link className='navbar-brand' to='/'>
								<Image url='/assest/images/logo.png' alt='logo' />
							</Link>
							<ul className='inr_drop'>
								{isLogin && <Menu logoutUser={logoutUser} />}
								{!isLogin && (
									<>
										<li className='nav-item'>
											<Link
												className='nav-link'
												onClick={() => openPopup('login')}
											>
												Login
											</Link>
											<Link
												onClick={() => {
													setUserType(0);
													openPopup('signup');
												}}
												to='#signup-user'
											>
												/ Sign Up
											</Link>
										</li>
										<li className='nav-item'>
											<Link
												onClick={() => {
													setUserType(1);
													openPopup('signup');
												}}
												to='#signup-provider'
												className='nav-link log_in'
											>
												List Your Business
											</Link>
										</li>
									</>
								)}
							</ul>
						</div>
					</div>
				</div>
				<div className='header_tm'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-12'>
								<nav className='navbar navbar-expand-lg navbar-light '>
									<button
										className='navbar-toggler'
										type='button'
										data-toggle='collapse'
										data-target='#navbarSupportedContent'
										aria-controls='navbarSupportedContent'
										aria-expanded='false'
										aria-label='Toggle navigation'
									>
										<span className='navbar-toggler-icon'></span>
									</button>
									<div
										className='collapse navbar-collapse'
										id='navbarSupportedContent'
									>
										<ul className='navbar-nav nav_custom'>
											<li className='nav-item'>
												<a className='nav-link active ' href='index.html'>
													{' '}
													Home{' '}
												</a>
											</li>
											<li className='nav-item'>
												<a className='nav-link ' href='About.html'>
													{' '}
													About Us
												</a>
											</li>
											<li className='nav-item'>
												<a className='nav-link ' href='Services.html'>
													{' '}
													Services
												</a>
											</li>
											<li className='nav-item'>
												<a className='nav-link ' href='Contact.html'>
													{' '}
													Contact Us
												</a>
											</li>
											<li className='nav-item'>
												<a className='nav-link ' href='Contact.html'>
													{' '}
													Contact Us
												</a>
											</li>
											<li className='nav-item'>
												<a className='nav-link ' href='Contact.html'>
													{' '}
													Contact Us
												</a>
											</li>
											<li className='nav-item'>
												<a className='nav-link ' href='Contact.html'>
													{' '}
													Contact Us
												</a>
											</li>
											<li className='nav-item'>
												<a className='nav-link ' href='Contact.html'>
													{' '}
													Contact Us
												</a>
											</li>
										</ul>
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</header>
			{!isHome && (
				<section className='baner inn' id='myHeader'>
					<div className=' back_fruits'>
						<div className='row'>
							<div className='col-lg-9 mx-auto'>
								<div className='banner_text_left1'>
									<SearchBox />
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Header;
