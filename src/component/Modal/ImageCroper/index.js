import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import { Image } from 'component';
import 'react-image-crop/dist/ReactCrop.css';
const ImageCroper = ({ src, onComplete, isShow }) => {
	const [imageUrl, setImageUrl] = useState('');
	const [imageSrc, setImageSrc] = useState(null);
	const [imageRef, setImageRef] = useState(null);
	const [crop, setCrop] = useState({
		unit: 'px',
		width: 400,
		aspect: 16 / 9,
	});
	const [fileUrl, setFileURl] = useState();
	useEffect(() => {
		if (src) {
			const reader = new FileReader();
			reader.addEventListener('load', () => setImageSrc(reader.result));
			reader.readAsDataURL(src);
		}
	}, [src]);
	const onCropChange = (crop) => {
		setCrop({ ...crop });
	};
	const onImageLoaded = (image) => {
		setImageRef(image);
	};
	const getCroppedImg = (image, crop, fileName) => {
		const canvas = document.createElement('canvas');
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob((blob) => {
				if (!blob) {
					//reject(new Error('Canvas is empty'));
					console.error('Canvas is empty');
					reject('Canvas is empty');
					return;
				}
				blob.name = fileName;
				setFileURl(blob);
				resolve(window.URL.createObjectURL(blob));
			}, 'image/jpeg');
		});
	};
	const completePath = () => {
		onComplete(fileUrl);
	};
	const onCropComplete = async (crop) => {
		if (imageRef && crop.width && crop.height) {
			const croppedImageUrl = await getCroppedImg(
				imageRef,
				crop,
				'newFile.jpeg'
			);
			setImageUrl(croppedImageUrl);
		}
	};
	return (
		<>
			{isShow && (
				<div
					className='modal fade first_modal signup in show-popup show'
					id='signup-modal_1'
					role='dialog'
				>
					<div className='modal-dialog'>
						<div
							className={`modal-content 
								  animate__animated animate__zoomIn`}
						>
							<div className='modal-body'>
								<div className='row'>
									<div className='col-md-12'>
										<h2 className='head1'> Crop your image</h2>

										<div className='tab-content12'>
											<div className='tab-pane33'>
												<div className='log-in_form'>
													{imageSrc && (
														<ReactCrop
															src={imageSrc}
															crop={crop}
															ruleOfThirds
															onImageLoaded={onImageLoaded}
															onComplete={onCropComplete}
															onChange={onCropChange}
														/>
													)}
													{imageUrl && (
														<div className='flex-image'>
															<label> Image Preview</label>
															<Image url={imageUrl} />
														</div>
													)}
													{imageUrl && (
														<div className='d-flex justify-content-center'>
															<button
																onClick={completePath}
																className='btn btn-danger'
															>
																Complete
															</button>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
ImageCroper.propTypes = {
	src: PropTypes.any.isRequired,
	onComplete: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
};
export default memo(ImageCroper);
