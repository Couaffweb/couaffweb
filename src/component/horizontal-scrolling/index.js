import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';

const ImageScoller = ({
	children,
	onLeftClick = () => {},
	onRightClick = () => {},
	animateTime = 100,
	className = 'image-container align-items-center h-100',
}) => {
	const divRef = useRef();
	const scroll = (scrollOffset, distance = 100, speed = animateTime) => {
		let scrollAmount = 0;
		const slideTimer = setInterval(() => {
			divRef.current.scrollLeft += scrollOffset;
			scrollAmount += Math.abs(scrollOffset);
			if (scrollAmount >= distance) {
				clearInterval(slideTimer);
			}
		}, speed);
	};
	return (
		<div className='image-silde-main'>
			<span
				className='prev'
				onClick={() => {
					scroll(-500);
					onLeftClick();
				}}
			>
				<i class='fas fa-chevron-circle-left fa-2x'></i>
			</span>
			<span
				className='next'
				onClick={() => {
					scroll(500);
					onRightClick();
				}}
			>
				<i class='fas fa-chevron-circle-right fa-2x'></i>
			</span>
			<div className={className} ref={divRef}>
				{children}
			</div>
		</div>
	);
};
ImageScoller.propTypes = {
	children: PropTypes.any.isRequired,
	className: PropTypes.string,
	onLeftClick: PropTypes.func,
	onRightClick: PropTypes.func,
	animateTime: PropTypes.number,
};
export default memo(ImageScoller);
