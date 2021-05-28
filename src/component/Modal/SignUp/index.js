import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	Image,
	Input,
	Form,
	ReactLoading,
	GoogleAutoComplete,
	Textarea,
} from 'component';
import {
	checkRequiredField,
	validateEmail,
	validatePassword,
	checkAllRequiredFieldsWithKey,
	alertMessage,
	setAuthKey,
} from 'utils';
import { store as notify } from 'react-notifications-component';
import { signUpForm } from './constants';
import { signupUser } from './apis';

const Signup = ({ onClose, openModel, isShow, userType = 0 }) => {
	const [userForm, setUserForm] = useState(signUpForm[userType]);
	const [formError, setFormError] = useState(signUpForm[userType]);
	const [loading, setLoading] = useState(false);
	const handleInput = ({ target: { name, value } }) => {
		setUserForm({ ...userForm, [name]: value });
	};
	const removeError = ({ target: { name } }) => {
		setFormError({ ...formError, [name]: '' });
	};
	const checkError = ({ target: { name, value } }) => {
		const errors = {};
		switch (name) {
			case 'email':
				Object.assign(errors, validateEmail(name, value));
				break;
			case 'password':
				Object.assign(errors, validatePassword(name, value));
				break;
			default:
				Object.assign(errors, checkRequiredField(name, value));
				break;
		}
		setFormError({ ...formError, ...errors });
	};
	const checkAllField = () => {
		const errors = checkAllRequiredFieldsWithKey(
			signUpForm[userType],
			userForm
		);
		Object.assign(errors, validatePassword('password', userForm.password));
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			setLoading(true);
			Object.assign(userForm, { userType });
			signupUser(userForm)
				.then(({ data: { authorization_key } }) => {
					setAuthKey(authorization_key);
					openModel('otp');
				})
				.catch(({ message }) => {
					notify.addNotification(
						alertMessage({
							type: 'danger',
							title: 'Error',
							message,
						})
					);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};
	const selectLocation = useCallback(
		({ latitude, longitude, address }) => {
			setUserForm((val) => ({
				...val,
				latitude,
				longitude,
				location: address,
			}));
		},
		[setUserForm]
	);
	return (
		<>
			{isShow && (
				<div
					className='modal fade first_modal signup in show-popup show'
					id='signup-modal_1'
					role='dialog'
				>
					<ReactLoading isShow={loading} />
					<div className='modal-dialog'>
						<div
							className={`modal-content ${
								userType === 1 ? 'signup-model-content' : ''
							}  animate__animated animate__zoomIn`}
						>
							<button type='button' className='close' onClick={onClose}>
								<Image url='/assest/images/cross.png' />
							</button>
							<div className='modal-body'>
								<div className='row'>
									<div className='col-md-6'>
										<h2 className='head1'> Welcome To Couaff</h2>
										<p className='head2'>
											Please enter your details for registration
										</p>

										<div className='tab-content12'>
											<div className='tab-pane33'>
												<div className='log-in_form'>
													<Form onSubmit={handleSubmit}>
														<div className='form-group log_iocns'>
															<label> Email</label>
															<Input
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.email}
																value={userForm.email}
																placeholder='Email'
																type='email'
																className='form-control'
																name='email'
																onChange={handleInput}
															/>
														</div>

														<div className='form-group log_iocns'>
															<label> Full Name</label>
															<Input
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.name}
																value={userForm.name}
																placeholder='Full Name'
																type='text'
																className='form-control'
																name='name'
																onChange={handleInput}
															/>
														</div>
														{userType === 1 && (
															<div className='form-group log_iocns'>
																<label> Location</label>
																<GoogleAutoComplete
																	onBlur={checkError}
																	onFocus={removeError}
																	isError={formError.location}
																	value={userForm.location}
																	placeholder='Add your address'
																	type='text'
																	className='form-control'
																	name='location'
																	onAddress={selectLocation}
																	onChange={(value) =>
																		handleInput({
																			target: { value, name: 'location' },
																		})
																	}
																/>
															</div>
														)}
														<div className='form-group log_iocns'>
															<label> Phone Number</label>
															<Input
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.phone}
																value={userForm.phone}
																placeholder='Phone Number'
																type='number'
																className='form-control'
																name='phone'
																onChange={handleInput}
															/>
														</div>

														<div className='form-group log_iocns'>
															<label> Password</label>
															<Input
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.password}
																value={userForm.password}
																placeholder='Password'
																type='password'
																className='form-control'
																name='password'
																onChange={handleInput}
															/>
														</div>
														{userType === 1 && (
															<div className='form-group log_iocns'>
																<label> About you</label>
																<Textarea
																	onBlur={checkError}
																	onFocus={removeError}
																	isError={formError.about_us}
																	value={userForm.about_us}
																	placeholder='About you'
																	className='form-control'
																	name='about_us'
																	onChange={handleInput}
																/>
															</div>
														)}
														<div className='form-group log_iocns11'>
															By clicking below you agree to{' '}
															<Link to='/term-conditions'>
																Couaff’s terms & conditions
															</Link>
														</div>

														<div className='log_button'>
															<input
																type='submit'
																disabled={loading}
																value='Create an Account'
															/>
														</div>

														<div className=' sign_up'>
															<h3>
																Already have an account?{' '}
																<span
																	className='click-span'
																	role='button'
																	tabIndex='1'
																	onClick={() => openModel('login')}
																	onKeyPress={() => openModel('login')}
																>
																	Sign In
																</span>{' '}
															</h3>
														</div>
													</Form>
												</div>
											</div>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='sing_image'>
											<Image src='/assest/images/about.png' />
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

Signup.propType = {
	onClose: PropTypes.func.isRequired,
	openModel: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
	userType: PropTypes.number,
};

export default Signup;
