import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Input, Form, ReactLoading } from 'component';
import { store as notify } from 'react-notifications-component';
import { validateEmail, alertMessage } from 'utils';
import { forGetPasswordUser } from './apis';
const ForgotPassword = ({ onClose, openModel, isShow }) => {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [loading, setLoading] = useState(false);
	const removeError = () => {
		setEmailError('');
	};
	const checkError = ({ target: { name, value } }) => {
		const error = validateEmail(name, value);
		setEmailError(error[name]);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!emailError) {
			setLoading(true);
			forGetPasswordUser({ email })
				.then(({ message }) => {
					notify.addNotification(alertMessage({ title: 'Success', message }));
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
				<div className='modal fade first_modal2 in show show-popup'>
					<ReactLoading isShow={loading} />
					<div className='modal-dialog'>
						<div className='modal-content animate__animated animate__zoomIn'>
							<button type='button' className='close' onClick={onClose}>
								<Image url='/assest/images/cross.png' />
							</button>
							<div className='modal-body'>
								<Image className='forgot_logo' url='/assest/images/logo.png' />
								<h2 className='head1'> Forgot Passowrd</h2>
								<p className='head2'>
									Please enter the register phone numberWe will send you otp
									Code.
								</p>

								<div className='log-in_form'>
									<Form onSubmit={handleSubmit}>
										<div className='form-group log_iocns'>
											<label> Email</label>
											<Input
												onBlur={checkError}
												onFocus={removeError}
												isError={emailError}
												placeholder=' Enter Email Address'
												type='email'
												className='form-control'
												name='email'
												value={email}
												onChange={({ target: { value } }) => setEmail(value)}
											/>
											<Image url='/assest/images/call.png' />
										</div>

										<div className='log_button'>
											<input type='submit' value='Send' />
										</div>

										<div className='sign_up'>
											<h3>
												<span
													onClick={() => openModel('login')}
													onKeyPress={() => openModel('login')}
													role='button'
													tabIndex='1'
													className='click-span'
												>
													Sign In
												</span>
											</h3>
										</div>
									</Form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

ForgotPassword.propType = {
	onClose: PropTypes.func.isRequired,
	openModel: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
};

export default ForgotPassword;
