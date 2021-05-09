import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
const MAP = React.memo(
	({
		lat,
		lng,
		zoom = 13,
		className = '',
		width = '100%',
		heigth = '100px',
		name,
	}) => {
		const mapRef = useRef(null);
		useEffect(() => {
			const initMap = () => {
				const { google } = window;
				if (!google) {
					return alert('google not define');
				}
				const mapDiv = mapRef.current;
				const map = new google.maps.Map(mapDiv, {
					center: { lat, lng },
					zoom,
				});
				const infowindow = new google.maps.InfoWindow({
					content: name,
				});
				const marker = new google.maps.Marker({
					position: new google.maps.LatLng(lat, lng),
					map,
					title: name,
					draggable: false,
					label: name,
				});
				marker.addListener('click', () => {
					infowindow.open(map, marker);
				});
			};

			initMap();
		}, [lat, lng, zoom, name]);
		return (
			<div
				className={className}
				ref={mapRef}
				style={{
					height: heigth,
					width,
				}}
			/>
		);
	}
);

MAP.proptypes = {
	lat: PropTypes.any.isRequired,
	lng: PropTypes.any.isRequired,
	zoom: PropTypes.number,
	className: PropTypes.string,
};

export default memo(MAP);
