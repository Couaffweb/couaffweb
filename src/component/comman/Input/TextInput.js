import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Textarea = React.forwardRef(
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
			errorClass = 'error-message',
			...props
		},
		ref
	) => (
		<>
			<textarea
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
				<span className={errorClass}>
					{isError || 'This field is required'}
				</span>
			)}
		</>
	)
);

Textarea.propType = {
	className: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	type: PropTypes.string,
	isError: PropTypes.string,
	errorClass: PropTypes.string,
};

export default memo(Textarea);
