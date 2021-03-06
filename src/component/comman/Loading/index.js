import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const ReactLoding = ({
	isShow,
	type = 'Grid',
	className = 'loading-loader',
}) => (
	<>
		{isShow && (
			<div className={className}>
				<Loader type={type} color='#00BFFF' height={70} width={70} />
			</div>
		)}
	</>
);

ReactLoding.propTypes = {
	isShow: PropTypes.bool.isRequired,
	type: PropTypes.string,
	className: PropTypes.string,
};

export default ReactLoding;
