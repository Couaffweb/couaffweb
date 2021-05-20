import React, { memo, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleAutoComplete, ServiceAutoComplete } from 'component';
const SearchBox = ({
	onSelectAddress = () => {},
	onSelectServiceInfo = () => {},
}) => {
	const history = useHistory();
	const [address, setAddress] = useState('');
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
			onSelectAddress(val);
			if (typeof window.CustomEvent === 'function') {
				const event = new CustomEvent('searchTrigger', {
					detail: {
						...val,
						...serviceDetails,
					},
				});
				window.dispatchEvent(event);
			}
			history.push('/search-details', {
				...val,
				...serviceDetails,
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setAddressDetails]
	);
	const onSelectService = useCallback(
		(val) => {
			setServiceDetails(val);
			onSelectServiceInfo(val);
			if (typeof window.CustomEvent === 'function') {
				const event = new CustomEvent('searchTrigger', {
					detail: {
						...val,
						...addressDetails,
					},
				});
				window.dispatchEvent(event);
			}
			history.push('/search-details', {
				...val,
				...addressDetails,
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setServiceDetails]
	);
	return (
		<form>
			<ServiceAutoComplete
				onSelectService={onSelectService}
				value={serviceDetails.name}
			/>
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
				<button type='button' onClick={() => startSearch()}>
					{' '}
					<i className='fa fa-paper-plane' aria-hidden='true'></i>{' '}
				</button>
			</div>
		</form>
	);
};

export default memo(SearchBox);
