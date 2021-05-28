import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { spliceText } from 'utils';
const SeeMore = ({ text, limit = 20, className = 'click-button' }) => {
	const [show, setShow] = useState(false);
	return (
		<p
			className={className}
			role='button'
			tabIndex='1'
			onKeyPress={() => setShow(!show)}
			onClick={() => setShow(!show)}
		>
			{spliceText(text, limit, show)}
		</p>
	);
};
SeeMore.propType = {
	text: PropTypes.string.isRequired,
	className: PropTypes.string,
	limit: PropTypes.number,
};

export default memo(SeeMore);
