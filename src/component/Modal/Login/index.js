import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Input, Form, ReactLoading } from 'component';
import { Link } from 'react-router-dom';
import { store as notify } from 'react-notifications-component';
import {
	checkRequiredField,
	validateEmail,
	checkAllRequiredFieldsWithKey,
	setUserInfo,
	alertMessage,
	setAuthKey,
} from 'utils';
import { userLogin } from './apis';
import { loginForm } from './constants';
const Login = ({ openModel, onClose, isShow, onSuccess }) => {
	const [activeTab, setActiveTab] = useState(0);
	const [useForm, setUserForm] = useState(loginForm);
	const [formError, setFormError] = useState(loginForm);
	const [loading, setLoading] = useState(false);
	const handleInput = ({ target: { name, value } }) => {
		setUserForm({ ...useForm, [name]: value });
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
			default:
				Object.assign(errors, checkRequiredField(name, value));
				break;
		}
		setFormError({ ...formError, ...errors });
	};
	const checkAllField = () => {
		const errors = checkAllRequiredFieldsWithKey(loginForm, useForm);
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			setLoading(true);
			Object.assign(useForm, { userType: activeTab });
			userLogin(useForm)
				.then(({ data }) => {
					notify.addNotification(
						alertMessage({ title: 'Success', message: 'Login successfully' })
					);
					setUserInfo(data);
					setAuthKey(data.authorization_key);
					onClose();
					onSuccess();
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
				<div className='modal fade first_modal in show show-popup'>
					<ReactLoading isShow={loading} />
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
									<div className='col-md-6'>
										<h2 className='head1'> Welcome To Couaff</h2>
										<p className='head2'>Please Sign in to your account!</p>

										<ul
											className='nav nav-pills mb-3 user-sign'
											id='pills-tab'
											role='tablist'
										>
											<li className='nav-item'>
												<Link
													onClick={() => setActiveTab(0)}
													className={`nav-link ${
														activeTab === 0 ? 'active' : ''
													}`}
													data-toggle='pill'
													href='#users'
													role='tab'
													aria-controls='pills-home'
													aria-selected='true'
												>
													User
												</Link>
											</li>
											<li className='nav-item'>
												<Link
													onClick={() => setActiveTab(1)}
													className={`nav-link ${
														activeTab === 1 ? 'active' : ''
													}`}
													href='#provider'
													role='tab'
													aria-controls='pills-profile'
													aria-selected='false'
												>
													Provider
												</Link>
											</li>
										</ul>

										<div className='tab-content'>
											<div className='tab-pane  show active'>
												<div className='log-in_form'>
													<Form onSubmit={handleSubmit}>
														<div className='form-group log_iocns'>
															<label> Email</label>
															<Input
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.email}
																value={useForm.email}
																placeholder='Email'
																type='email'
																className='form-control'
																name='email'
																onChange={handleInput}
															/>
															<Image url='/assest/images/mail.png' />
														</div>

														<div className='form-group log_iocns'>
															<label> Password</label>
															<Input
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.password}
																value={useForm.password}
																placeholder='Password'
																type='password'
																className='form-control'
																name='password'
																onChange={handleInput}
															/>
															<Image url='/assest/images/lock.png' />
														</div>

														<div className='form-group text-right'>
															<div className='log_btn_text'>
																<span
																	className='click-span'
																	role='button'
																	tabIndex='1'
																	onClick={() => openModel('forgotPassword')}
																	onKeyPress={() => openModel('forgotPassword')}
																>
																	Forgot Password?
																</span>
															</div>
														</div>

														<div className='log_button'>
															<input type='submit' value='Sign In' />
														</div>

														<div className='sign_up'>
															<h3>
																Don't have an account?{' '}
																<span
																	className='click-span'
																	role='button'
																	tabIndex='1'
																	onClick={() => openModel('signup')}
																	onKeyPress={() => openModel('signup')}
																>
																	Sign Up
																</span>
															</h3>
														</div>
													</Form>
												</div>
											</div>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='sing_image'>
											<Image url='/assest/images/about.png' />
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

Login.propType = {
	onClose: PropTypes.func.isRequired,
	openModel: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
	onSuccess: PropTypes.bool.isRequired,
};

export default Login;
