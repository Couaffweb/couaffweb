import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Flickity from 'react-flickity-component';
import { Image } from 'component';
import './styles.css';
const ImageSilder = ({ images = [], className = '' }) => (
	<Flickity options={{ initialIndex: 0 }} className={'carousel'}>
		{images.map((val, index) => (
			<Image url={val.url} key={index} className={className}></Image>
		))}
	</Flickity>
);
ImageSilder.propTypes = {
	images: PropTypes.array,
	className: PropTypes.string,
};
export default memo(ImageSilder);
