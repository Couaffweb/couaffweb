import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { store as notify } from 'react-notifications-component';
import { Input, Textarea, Form, ReactLoading } from 'component';
import {
	checkRequiredField,
	checkAllRequiredFieldsWithKey,
	validateEmail,
	alertMessage,
} from 'utils';
import { submitContactForm } from './apis.js';
const contactform = {
	first_name: '',
	last_name: '',
	email: '',
	message: '',
};
const WebContent = () => {
	const { pathname } = useLocation();
	const [contactUsForm, setContactUsForm] = useState(contactform);
	const [formError, setFormError] = useState(contactform);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, []);
	const handleInput = ({ target: { name, value } }) => {
		setContactUsForm({ ...contactUsForm, [name]: value });
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
		const errors = checkAllRequiredFieldsWithKey(contactform, contactUsForm);
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			setLoading(true);
			submitContactForm(contactUsForm)
				.then(({ message }) => {
					notify.addNotification(
						alertMessage({
							title: 'Success',
							message,
						})
					);
					setContactUsForm({ ...contactform });
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
		<div className='container container-all'>
			<div className='row'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-lg-12 mt-3'>
							<div className='add-image-section'>
								<h6 className='heading-dynamic'>
									{pathname.replace('/', '').replace('-', ' ')}
								</h6>
							</div>
						</div>
						<hr className='line' />
						<div className='col-lg-2 mt-3' />
						<ReactLoading isShow={loading} />
						<div className='col-lg-8 mt-3'>
							<div className='card'>
								<div className='card-body form-background-contact'>
									<div className='row'>
										<div className='col-md-12 mx-auto'>
											<div className='contact-form'>
												<h1>Contact Us</h1>
												<p className='hint-text'>
													We'd love to hear from you, please drop us a line if
													you've any query.
												</p>
												<Form onSubmit={handleSubmit}>
													<div className='row'>
														<div className='col-sm-6'>
															<div className='form-group log_iocns1'>
																<label htmlFor='inputFirstName'>
																	First Name
																</label>
																<Input
																	errorClass='error-message-1'
																	onBlur={checkError}
																	onFocus={removeError}
																	onChange={handleInput}
																	isError={formError.first_name}
																	name='first_name'
																	type='text'
																	value={contactUsForm.first_name}
																	className='form-control'
																	id='inputFirstName'
																/>
															</div>
														</div>
														<div className='col-sm-6'>
															<div className='form-group log_iocns1'>
																<label htmlFor='inputLastName'>Last Name</label>
																<Input
																	errorClass='error-message-1'
																	onBlur={checkError}
																	onFocus={removeError}
																	onChange={handleInput}
																	value={contactUsForm.last_name}
																	isError={formError.last_name}
																	name='last_name'
																	type='text'
																	className='form-control'
																	id='inputLastName'
																/>
															</div>
														</div>
													</div>
													<div className='form-group log_iocns1'>
														<label htmlFor='inputEmail'>Email Address</label>
														<Input
															errorClass='error-message-1'
															onBlur={checkError}
															onFocus={removeError}
															onChange={handleInput}
															value={contactUsForm.email}
															isError={formError.email}
															name='email'
															type='email'
															className='form-control'
															id='inputEmail'
														/>
													</div>
													<div className='form-group log_iocns1'>
														<label htmlFor='inputMessage'>Message</label>
														<Textarea
															errorClass='error-message-1'
															onBlur={checkError}
															onFocus={removeError}
															onChange={handleInput}
															isError={formError.message}
															name='message'
															value={contactUsForm.message}
															className='form-control'
															id='inputMessage'
															rows='5'
														/>
													</div>
													<button type='submit' className='btn btn-primary'>
														Submit
													</button>
												</Form>
											</div>
											<div className='col-lg-2 mt-3' />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(WebContent);
