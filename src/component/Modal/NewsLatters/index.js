import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { store as notify } from 'react-notifications-component';
import { Image, Form, Input, ReactLoading } from 'component';
import { alertMessage, validateEmail } from 'utils';
import { sendEmail } from './apis';
const NewsLatters = ({ onClose, isShow }) => {
	const [email, setEmail] = useState('');
	const [formError, setFormError] = useState('');
	const [loading, setLoading] = useState(false);
	const removeError = () => {
		setFormError('');
	};
	const checkError = ({ target: { name, value } }) => {
		const error = validateEmail(name, value);
		setFormError(error.Formvalue);
	};
	const checkAllField = () => {
		const error = validateEmail({ email });
		if (error.value) {
			setFormError(error.value);
			return false;
		}

		return true;
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			setLoading(true);
			sendEmail(email)
				.then(() => {
					notify.addNotification(
						alertMessage({
							title: 'Success',
							message: 'Newslatters Subscribe Successfully',
						})
					);
					onClose();
				})
				.catch(({ message }) => {
					notify.addNotification(
						alertMessage({ title: 'error', message, type: 'danger' })
					);
				})
				.finally(() => {
					setLoading(false);
				});
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
								<ReactLoading isShow={loading} />
								<div className='row'>
									<div className='col-md-12'>
										<h2 class='head1'> Signup Up For Our Newslatters</h2>
										<p className='head2'>
											Register now and get special offers delivered right into
											your inbox.
										</p>
										<div className='tab-content'>
											<div className='tab-pane  show active'>
												<div className='log-in_form'>
													<Form onSubmit={handleSubmit}>
														<div className='form-group log_iocns'>
															<label> EMail </label>
															<div classNames='d-flex justify-content-center'>
																<Input
																	count={5}
																	onChange={({ target: { value } }) =>
																		setEmail(value)
																	}
																	placeholder='Enter your email'
																	isError={formError}
																	onBlur={checkError}
																	onFocus={removeError}
																	name='email'
																	value={email}
																/>
															</div>
														</div>
														<div className='log_button booking-button'>
															<button
																disable={loading}
																className='btn btn-primay'
																type='submit'
															>
																<i className='fa fa-arrow-right'></i> Subscribe
															</button>
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

NewsLatters.propType = {
	onClose: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
};

export default NewsLatters;
