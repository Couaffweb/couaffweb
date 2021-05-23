import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Alert from 'sweetalert';
import { store as notify } from 'react-notifications-component';
import {
	Image,
	LoginModal,
	ForgetPasswordModal,
	SignUpModal,
	OtpModal,
	Menu,
	ReactLoading,
} from 'component';
import { serviceBookProvide } from 'component/comman/BookService/apis';
import { SearchBox } from 'container';
import { isUserLogin, removeAuth, getUserType, alertMessage } from 'utils';
import { popUps } from './constants';

const Header = () => {
	const history = useHistory();
	const { pathname } = useLocation();
	const isHome = pathname === '/';
	const [showPopup, setShowPopup] = useState(popUps);
	const [userType, setUserType] = useState(0);
	const [isLogin, setIsLogin] = useState(isUserLogin());
	const [bookingInfo, setBookingInfo] = useState({});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const header = document.getElementById('myHeader');
		const handleLogin = window.addEventListener('isLogin', ({ detail }) => {
			setShowPopup({ ...showPopup, login: true });
			setBookingInfo({ ...detail });
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
				window.removeEventListener('isLogin', handleLogin);
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
		if (bookingInfo.massagerId && parseInt(getUserType()) === 0) {
			setLoading(true);
			serviceBookProvide(bookingInfo)
				.then(({ message, data }) => {
					setBookingInfo({});
					Alert( 	
						'success',
						`${message}. Your booking ID is ${data.id}`,
						'success'
					);
				})
				.catch(({ message }) => {
					Alert('error', message, 'error');
					notify.addNotification(
						alertMessage({ title: 'error', message, type: 'danger' })
					);
				})
				.finally(() => {
					setLoading(false);
				});
		}
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
												<Link
													className={`nav-link ${
														pathname === '/' ? 'active' : ''
													}`}
													to='/'
												>
													{' '}
													Home{' '}
												</Link>
											</li>
											<li>
												<Link
													className={`nav-link ${
														pathname === '/about-us' ? 'active' : ''
													}`}
													to='/about-us'
												>
													About Us
												</Link>
											</li>

											{getUserType() === 1 && (
												<li className='nav-item'>
													<Link
														className={`nav-link ${
															pathname === '/services' ? 'active' : ''
														}`}
														to='/services'
													>
														Service
													</Link>
												</li>
											)}
											<li className='nav-item'>
												<Link
													className={`nav-link ${
														pathname === '/contact-us' ? 'active' : ''
													}`}
													to='/contact-us'
												>
													Contact Us
												</Link>
											</li>
											<li className='nav-item'>
												<Link
													className={`nav-link ${
														pathname === '/term-conditions' ? 'active' : ''
													}`}
													to='/term-conditions'
												>
													Term&Conditions
												</Link>
											</li>
											<li className='nav-item'>
												<Link
													className={`nav-link ${
														pathname === '/faq' ? 'active' : ''
													}`}
													to='/faq'
												>
													FAQ
												</Link>
											</li>
											{isLogin && (
												<li className='nav-item'>
													<Link
														className={`nav-link ${
															pathname === '/profile' ? 'active' : ''
														}`}
														to='/profile'
													>
														Profile
													</Link>
												</li>
											)}
											{isLogin && (
												<li className='nav-item'>
													<Link
														className='nav-link'
														onClick={logoutUser}
														to='#'
													>
														Logout
													</Link>
												</li>
											)}
										</ul>
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</header>
			<ReactLoading isShow={loading} />
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
