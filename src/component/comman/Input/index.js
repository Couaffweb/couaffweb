import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef(
	(
		{
			isError = '',
			value,
			name,
			onChange,
			onBlur = () => {},
			onFocus = () => {},
			type = 'text',
			className,
			...props
		},
		ref
	) => (
		<>
			<input
				ref={ref}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				type={type}
				className={`${className} ${isError ? 'error-class' : ''}`}
				name={name}
				value={value}
				{...props}
			/>
			{isError && (
				<span className='error-message'>
					{isError || 'This field is required'}
				</span>
			)}
		</>
	)
);

Input.propType = {
	className: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	type: PropTypes.string,
	isError: PropTypes.string,
};

export default memo(Input);
