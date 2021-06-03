import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Image, Input, Form, ImageCroper } from 'component';
import { checkRequiredField, checkAllRequiredFieldsWithKey } from 'utils';
const form = {
	image: '',
	previewImage: '',
};
const AddImage = ({ onClose, isShow, onSubmit }) => {
	const [image, setImage] = useState(form);
	const [formError, setFormError] = useState(form);
	const [showCroper, setShowCroper] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const handleInput = ({ target: { files } }) => {
		setShowCroper(true);
		setSelectedFile(files[0]);
	};
	const removeError = ({ target: { name } }) => {
		setFormError({ ...formError, [name]: '' });
	};
	const checkError = ({ target: { name, value } }) => {
		const errors = {};
		Object.assign(errors, checkRequiredField(name, value));
		setFormError({ ...formError, ...errors });
	};
	const checkAllField = () => {
		const errors = checkAllRequiredFieldsWithKey(form, image);
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			onClose();
			onSubmit(image);
		}
	};
	const handleComplete = useCallback(
		(files) => {
			setShowCroper(false);
			setImage((val) => ({
				...val,
				image: files,
				previewImage: URL.createObjectURL(files),
			}));
		},
		[setImage, setShowCroper]
	);
	return (
		<>
			{showCroper && (
				<ImageCroper
					src={selectedFile}
					isShow={showCroper}
					onComplete={handleComplete}
					onClose={() => setShowCroper(false)}
				/>
			)}
			{isShow && !showCroper && (
				<div className='modal fade first_modal first_modal1 in show show-popup'>
					<div className='modal-dialog'>
						<div className='modal-content animate__animated animate__zoomIn'>
							<button
								type='button'
								className='close'
								onClick={onClose}
								data-dismiss='modal'
							>
								<Image url='/assest/images/cross.png' />
							</button>
							<div className='modal-body'>
								<div className='row'>
									<div className='col-md-12'>
										<h2 class='head1'> Please Add Image</h2>

										<div className='tab-content'>
											<div className='tab-pane  show active'>
												<div className='log-in_form'>
													<Form onSubmit={handleSubmit}>
														<div className='form-group log_iocns'>
															<label> Image </label>
															<Input
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.image}
																type='file'
																className='form-control'
																name='image'
																onChange={handleInput}
																accept='image/*'
															/>
														</div>

														<div className='form-group'>
															<label> Preview Image</label>

															{image.previewImage && (
																<Image
																	className='provider-work-image'
																	height='181px'
																	url={
																		image.previewImage ||
																		'/assest/images/time.png'
																	}
																/>
															)}
														</div>

														<div className='log_button booking-button'>
															<input type='submit' value='Save' />
														</div>
													</Form>
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

AddImage.propType = {
	onClose: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
	onSubmit: PropTypes.bool.isRequired,
};

export default AddImage;
