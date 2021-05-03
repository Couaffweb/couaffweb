import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const ReactLoding = ({ isShow, type = 'Grid' }) => (
	<>
		{isShow && (
			<div className='loading-loader'>
				<Loader type={type} color='#00BFFF' height={70} width={70} />
			</div>
		)}
	</>
);

ReactLoding.propTypes = {
	isShow: PropTypes.bool.isRequired,
	type: PropTypes.string,
};

export default ReactLoding;
