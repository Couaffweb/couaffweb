import React, { memo } from 'react';
import ProTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => (
	<div
		style={{
			color: 'white',
			background: 'grey',
			padding: '15px 10px',
			display: 'inline-flex',
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '100%',
			transform: 'translate(-50%, -50%)',
		}}
	>
		{text}
	</div>
);
const MAP = ({
	lat = 0,
	lng = 0,
	zoom = 11,
	name = 'here',
	height = '100vh',
	width = '100%',
}) => (
	<div style={{ height, width }}>
		<GoogleMapReact
			defaultCenter={{
				center: {
					lat,
					lng,
				},
			}}
			defaultZoom={zoom}
		>
			<AnyReactComponent lat={lat} lng={lng} text={name} />
		</GoogleMapReact>
	</div>
);
MAP.propType = {
	lat: ProTypes.number,
	lng: ProTypes.number,
	zoom: ProTypes.number,
	name: ProTypes.string,
	height: ProTypes.string,
	width: ProTypes.string,
};

export default memo(MAP);
