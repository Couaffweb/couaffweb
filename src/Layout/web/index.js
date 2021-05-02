import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';
const WebLayout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

WebLayout.propType = {
	children: PropTypes.any.isRequired,
};

export default WebLayout;
