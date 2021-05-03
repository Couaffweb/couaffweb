import React, { forwardRef, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'component';
let googleListner;
const GoogleAutoComplete = ({ onAddress, onChange, ...props }) => {
	const currentRef = useRef(null);
	useEffect(() => {
		const { google } = window;
		if (currentRef.current) {
			const autocompleteField = currentRef.current;
			const autocomplete = new google.maps.places.Autocomplete(
				autocompleteField
			);
			googleListner = google.maps.event.addListener(
				autocomplete,
				'place_changed',
				() => {
					const gettingReasult = {};
					const populateAddressData = (address, addressObj) => {
						const addressType = address.types[0];
						if (addressObj.address === addressType) {
							const place = autocomplete.getPlace();
							const addressValues =
								addressObj.id === 'address_line_one'
									? place.name
									: address.long_name;
							if (addressValues) {
								gettingReasult[addressObj.id] = addressValues;
							}
						}
					};
					const addressDetails = [
						{ address: 'route', id: 'route' },
						{ address: 'street_number', id: 'street_number' },
						{ address: 'neighborhood', id: 'neighborhood' },
						{ address: 'premise', id: 'premise' },
						{ address: 'locality', id: 'locality' },
						{
							address: 'administrative_area_level_1',
							id: 'address_line_two',
						},
						{
							address: 'administrative_area_level_2',
							id: 'address_line_three',
						},
						{ address: 'postal_town', id: 'town' },
						{ address: 'postal_code', id: 'postcode' },
						{ address: 'country', id: 'country' },
					];
					const place = autocomplete.getPlace();
					addressDetails.forEach((item) => {
						const matchedPlace = place.address_components;
						const address = item;
						if (matchedPlace) {
							matchedPlace.forEach((el) => {
								populateAddressData(el, address, place);
							});
						}
					});
					const {
						town,
						postcode,
						country,
						address_line_three,
					} = gettingReasult;
					const addressObject = {
						address_line_one: makeAddressOne(gettingReasult),
						address_line_two: '',
						address_line_three,
						town,
						postcode,
						country,
					};

					addressObject.address = currentRef.current.value;
					addressObject.latitude = place.geometry.location.lat();
					addressObject.longitude = place.geometry.location.lng();
					onAddress(addressObject);
				}
			);
		}

		return () => {
			const { google } = window;
			google.maps.event.removeListener(googleListner);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const makeAddressOne = (address) => {
		const {
			street_number,
			route,
			premise,
			locality,
			address_line_two,
		} = address;
		switch (true) {
			case !!(street_number && route):
				return street_number + ' ' + route;
			case !!route:
				return route;
			case !!premise:
				return premise;
			case !!locality:
				return locality;
			default:
				return address_line_two !== 'England' ? address_line_two : '';
		}
	};

	return (
		<Input
			{...props}
			ref={currentRef}
			value={
				(currentRef && currentRef.current && currentRef.current.value) ||
				props.value ||
				''
			}
			onChange={({ target: { value } }) => onChange(value)}
		/>
	);
};

GoogleAutoComplete.propTypes = {
	onChange: PropTypes.func.isRequired,
	onAddress: PropTypes.func.isRequired,
	value: PropTypes.string,
};

GoogleAutoComplete.defaultProps = {
	value: '',
};

export default memo(
	forwardRef((props, ref) => <GoogleAutoComplete {...props} />)
);
