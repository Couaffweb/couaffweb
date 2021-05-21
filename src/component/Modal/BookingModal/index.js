import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'configurable-date-input-polyfill';
import { Image, Input, Form } from 'component';
import { checkRequiredField, checkAllRequiredFieldsWithKey } from 'utils';
const form = {
	date: '',
	time: '',
};
const BookingModal = ({ onClose, isShow, onSubmit }) => {
	const [bookingForm, setBookingForm] = useState(form);
	const [formError, setFormError] = useState(form);
	const handleInput = ({ target: { name, value } }) => {
		setBookingForm({ ...bookingForm, [name]: value });
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
		const errors = checkAllRequiredFieldsWithKey(form, bookingForm);
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			onSubmit(bookingForm);
		}
	};
	return (
		<>
			{isShow && (
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
										<h2 class='head1'> Please Select Date and Time</h2>

										<div className='tab-content'>
											<div className='tab-pane  show active'>
												<div className='log-in_form'>
													<Form onSubmit={handleSubmit}>
														<div className='form-group log_iocns'>
															<label> Date </label>
															<Input
																min={new Date().toISOString().split('T')[0]}
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.date}
																value={bookingForm.date}
																placeholder='Date'
																type='date'
																className='form-control'
																name='date'
																onChange={handleInput}
															/>
															<Image url='/assest/images/clender.png' />
														</div>

														<div className='form-group log_iocns'>
															<label> Time </label>
															<Input
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.time}
																value={bookingForm.time}
																placeholder='Time'
																type='time'
																className='form-control'
																name='time'
																onChange={handleInput}
															/>
															<Image url='/assest/images/time.png' />
														</div>

														<div className='log_button booking-button'>
															<input type='submit' value='Book Appointment' />
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

BookingModal.propType = {
	onClose: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
	onSubmit: PropTypes.bool.isRequired,
};

export default BookingModal;
