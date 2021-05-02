import React, { memo, useState, useCallback } from 'react';
import { GoogleAutoComplete } from 'component';
const SearchBox = ({ onSelectAddress }) => {
	const [address, setAddress] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [addressDetails, setAddressDetails] = useState({});
	const selectAddress = useCallback(
		(val) => {
			setAddressDetails({ ...val });
			onSelectAddress(val);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setAddressDetails]
	);
	return (
		<form>
			<div className='left_input'>
				<input className='one' type='text' placeholder=' Search Services' />
				<button>
					{' '}
					<i className='fa fa-search' aria-hidden='true'></i>{' '}
				</button>
			</div>
			<div className='left_input left_input1'>
				<GoogleAutoComplete
					value={address}
					onChange={(val) => setAddress(val)}
					onAddress={selectAddress}
					className='one'
					type='text'
					placeholder=' Enter City and Zip Code'
				/>
				<i className='fa fa-map-marker' aria-hidden='true'></i>
				<button>
					{' '}
					<i className='fa fa-paper-plane' aria-hidden='true'></i>{' '}
				</button>
			</div>
		</form>
	);
};

export default memo(SearchBox);
