import React, { memo, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleAutoComplete, ServiceAutoComplete } from 'component';
const SearchBox = ({ onSelectAddress }) => {
	const history = useHistory();
	const [address, setAddress] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [addressDetails, setAddressDetails] = useState({});
	const [serviceDetails, setServiceDetails] = useState({});
	const startSearch = () => {
		history.push('/search-details', {
			...serviceDetails,
			...addressDetails,
		});
	};
	const selectAddress = useCallback(
		(val) => {
			setAddressDetails({ ...val });
			//onSelectAddress(val);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setAddressDetails]
	);
	return (
		<form>
			<ServiceAutoComplete onSelectService={(val) => setServiceDetails(val)} />
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
				<button onClick={() => startSearch()}>
					{' '}
					<i className='fa fa-paper-plane' aria-hidden='true'></i>{' '}
				</button>
			</div>
		</form>
	);
};

export default memo(SearchBox);
