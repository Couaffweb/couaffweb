import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'component';
const Menu = ({ logoutUser }) => {
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
					url='assest/images/user.png'
					onClick={() => setShowProfile(!showProfile)}
					alt='logo'
				/>
				{showProfile && (
					<div className='dropdown-menu show'>
						<Link className='dropdown-item' to='/profile'>
							Profile
						</Link>
						<Link className='dropdown-item' to='/'>
							Payment
						</Link>
						<Link className='dropdown-item' to='/terms_conditions'>
							Terms Of Service
						</Link>
						<span className='dropdown-item click-span' onClick={logoutUser}>
							Log Out
						</span>
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
