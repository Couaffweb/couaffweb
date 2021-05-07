import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'component';
import { getUserType, authInfo } from 'utils';
const Menu = ({ logoutUser }) => {
	const userType = getUserType();
	const wrapperRef = useRef();
	const [showProfile, setShowProfile] = useState(false);
	const handleClick = ({ target, offsetX }) => {
		if (wrapperRef.current && !wrapperRef.current.contains(target)) {
			if (offsetX <= target.clientWidth) {
				setShowProfile(false);
			} else {
				setShowProfile(false);
			}
		}
	};
	useEffect(() => {
		if (showProfile) {
			document.addEventListener('mouseup', handleClick);
		} else {
			document.removeEventListener('mouseup', handleClick);
		}
		return () => {
			document.removeEventListener('mouseup', handleClick);
		};
	});
	return (
		<li className='nav-item dropdown'>
			<span className='nav-link profile click-span' ref={wrapperRef}>
				<Image
					url={authInfo().profile || '/assest/images/user.png'}
					onClick={() => setShowProfile(!showProfile)}
					alt='logo'
				/>
				{showProfile && (
					<div className='dropdown-menu show'>
						<Link
							className='dropdown-item'
							onClick={() => setShowProfile(!showProfile)}
							to='/profile'
						>
							Profile
						</Link>
						{userType === 1 && (
							<>
								<Link
									className='dropdown-item'
									onClick={() => setShowProfile(!showProfile)}
									to='/add-service'
								>
									Add Service
								</Link>
								<Link
									className='dropdown-item'
									onClick={() => setShowProfile(!showProfile)}
									to='/services'
								>
									My Services
								</Link>
								<Link
									className='dropdown-item'
									onClick={() => setShowProfile(!showProfile)}
									to='/working-pics'
								>
									My work Images
								</Link>
							</>
						)}
						<Link
							className='dropdown-item'
							onClick={() => setShowProfile(!showProfile)}
							to='/bookings'
						>
							{userType === 1 ? 'Booking request' : 'My Bookings'}
						</Link>
						<Link
							className='dropdown-item click-span'
							to='/'
							onClick={logoutUser}
						>
							Log Out
						</Link>
					</div>
				)}
			</span>
		</li>
	);
};
Menu.propType = {
	logoutUser: PropTypes.func.isRequired,
};
export default memo(Menu);
