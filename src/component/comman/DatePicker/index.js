import React, { memo } from 'react';
import PropTypes from 'prop-types';
import DatePickerInput from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const DatePicker = React.forwardRef(
	(
		{
			isError = '',
			value,
			name,
			onChange,
			onBlur = () => {},
			onFocus = () => {},
			className,
			...props
		},
		ref
	) => (
		<>
			<DatePickerInput
				ref={ref}
				onChange={(value) => onChange({ target: { name, value } })}
				onBlur={() => onBlur({ target: { name, value } })}
				onFocus={() => onFocus({ target: { name, value } })}
				className={`${className} ${isError ? 'error-class' : ''}`}
				name={name}
				selected={value}
				dateFormat='yyyy/MM/dd'
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

DatePicker.propType = {
	className: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	isError: PropTypes.string,
};

export default memo(DatePicker);
