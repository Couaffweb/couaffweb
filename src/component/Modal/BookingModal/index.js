import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Form, DatePicker } from 'component';
import {
	checkRequiredField,
	checkAllRequiredFieldsWithKey,
	getCurrentDay,
} from 'utils';
const form = {
	date: '',
	time: '',
};
const BookingModal = ({ onClose, isShow, onSubmit, workingHours }) => {
	const [bookingForm, setBookingForm] = useState({ ...form, date: new Date() });
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
	const handleColor = (time) => {
		let bookingDate = new Date(bookingForm.date);
		bookingDate.setHours(time.getHours());
		bookingDate = Math.round(new Date(bookingDate).getTime() / 1000, 0);
		const todayWorkingHour = workingHours.find(
			(val) => val.day === getCurrentDay(bookingDate)
		);
		const openTime = new Date(bookingDate * 1000);
		const openHours = todayWorkingHour.openTime.split(':');
		openTime.setHours(openHours[0], openHours[1], 0);
		const openUnixTime = Math.round(openTime.getTime() / 1000, 0);
		const closeTime = new Date(bookingDate * 1000);
		const closeHours = todayWorkingHour.closeTime.split(':');
		closeTime.setHours(closeHours[0], closeHours[1], 0);
		const closeUnixTime = Math.round(closeTime.getTime() / 1000, 0);
		if (openUnixTime > bookingDate || bookingDate >= closeUnixTime - 3600) {
			return 'text-error';
		}
		return 'text-success';
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
															<DatePicker
																minDate={new Date()}
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.date}
																value={bookingForm.date}
																placeholder='Date'
																className='form-control'
																name='date'
																onChange={handleInput}
																withPortal={
																	!/^((?!chrome|android).)*safari/i.test(
																		navigator.userAgent
																	)
																}
																isClearable
																calendarClassName='rasta-stripes'
															/>
															<Image url='/assest/images/clender.png' />
														</div>

														<div className='form-group log_iocns'>
															<label> Time </label>

															<DatePicker
																showTimeSelect
																showTimeSelectOnly
																timeIntervals={60}
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.time}
																value={bookingForm.time}
																placeholder='Time'
																type='time'
																className='form-control'
																name='time'
																onChange={handleInput}
																timeCaption='Time'
																dateFormat='h:mm aa'
																timeClassName={handleColor}
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
