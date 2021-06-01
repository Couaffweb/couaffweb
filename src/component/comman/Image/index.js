import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Image = ({ url, className = '', alt = 'logo', ...props }) => (
	<img src={url} className={className} alt={alt} {...props} loading='lazy' />
);

Image.propType = {
	className: PropTypes.string,
	url: PropTypes.string.isRequired,
	alt: PropTypes.string,
};

export default memo(Image);
