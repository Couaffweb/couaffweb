import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';
import { Image, Form } from 'component';
import { checkRequiredField, checkAllRequiredFieldsWithKey } from 'utils';
import { Textarea } from 'component/comman';
const form = {
	comment: '',
	rating: '',
};
const Rating = ({
	onClose,
	isShow,
	onSubmit,
	index,
	bookingId,
	massagerId,
}) => {
	const [ratingForm, setRatingForm] = useState(form);
	const [formError, setFormError] = useState(form);
	const handleInput = ({ target: { name, value } }) => {
		setRatingForm({ ...ratingForm, [name]: value });
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
		const errors = checkAllRequiredFieldsWithKey(form, ratingForm);
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			Object.assign(ratingForm, { index, bookingId, massagerId });
			onSubmit(ratingForm);
			onClose();
		}
	};
	return (
		<>
			{isShow && (
				<div className='modal fade first_modal in show show-popup'>
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
										<h2 class='head1'> Please give your valuable feedback</h2>

										<div className='tab-content'>
											<div className='tab-pane  show active'>
												<div className='log-in_form'>
													<Form onSubmit={handleSubmit}>
														<div className='form-group log_iocns'>
															<label> Date </label>
															<ReactStars
																count={5}
																onChange={(value) =>
																	handleInput({
																		target: { name: 'rating', value },
																	})
																}
																size={24}
																activeColor='#ffd700'
																value={ratingForm.rating}
															/>
														</div>

														<div className='form-group log_iocns'>
															<label> Your Review </label>
															<Textarea
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.time}
																value={ratingForm.time}
																placeholder='Your review'
																className='form-control'
																name='comment'
																onChange={handleInput}
															/>
														</div>

														<div className='log_button booking-button'>
															<input type='submit' value='Your Feedback' />
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

Rating.propType = {
	onClose: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	bookingId: PropTypes.number.isRequired,
	massagerId: PropTypes.number.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default Rating;
