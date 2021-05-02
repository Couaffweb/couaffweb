import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ onSubmit, children, className = '', ...props }) => (
	<form onSubmit={onSubmit} className={className} {...props}>
		{children}
	</form>
);

Form.propType = {
	className: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	children: PropTypes.any.isRequired,
};

export default Form;
