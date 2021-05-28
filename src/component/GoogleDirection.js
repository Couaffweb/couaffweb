import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
const MAPDirection = React.memo(
	({
		toLat,
		toLng,
		formLat,
		formLng,
		zoom = 13,
		className = '',
		width = '100%',
		heigth = '100px',
		name,
	}) => {
		const mapRef = useRef(null);
		const directionRef = useRef(null);
		useEffect(() => {
			const initMap = () => {
				const { google } = window;
				if (!google) {
					return alert('google not define');
				}
				const mapDiv = mapRef.current;
				const directionDiv = directionRef.current;
				const directionsService = new google.maps.DirectionsService();
				const directionsDisplay = new google.maps.DirectionsRenderer();

				const map = new google.maps.Map(mapDiv, {
					zoom: 7,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
				});

				directionsDisplay.setMap(map);
				directionsDisplay.setPanel(directionDiv);
				const request = {
					origin: new google.maps.LatLng(toLat, toLng),
					destination: new google.maps.LatLng(formLat, formLng),
					optimizeWaypoints: true,
					travelMode: google.maps.DirectionsTravelMode.DRIVING,
				};

				directionsService.route(request, function (response, status) {
					if (status === google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
					}
				});
			};

			initMap();
		}, [toLat, toLng, formLat, formLng, zoom, name]);
		return (
			<>
				<div
					className={className}
					ref={mapRef}
					style={{
						height: heigth,
						width,
					}}
				/>
				<div
					ref={directionRef}
					style={{
						width: '300px',
					}}
				/>
			</>
		);
	}
);

MAPDirection.proptypes = {
	toLat: PropTypes.any.isRequired,
	toLng: PropTypes.any.isRequired,
	formLat: PropTypes.any.isRequired,
	formLng: PropTypes.any.isRequired,
	zoom: PropTypes.number,
	className: PropTypes.string,
};

export default memo(MAPDirection);
