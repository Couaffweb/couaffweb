import React, { useState, memo } from 'react';
import { Image, Input, Form } from 'component';
import {
	checkRequiredField,
	validateEmail,
	validatePassword,
	checkAllRequiredFieldsWithKey,
	getUserType,
	authInfo,
	matchPassword,
} from 'utils';
import { signUpForm, passwordForm } from './constants';
const Profile = () => {
	const userType = getUserType();
	const [isEdit, setEdit] = useState(false);
	const [userForm, setUserForm] = useState(authInfo());
	const [formError, setFormError] = useState(signUpForm[userType]);
	const [changePassword, setChangePassword] = useState(passwordForm);
	const [passwordFormError, setPasswordFormError] = useState(passwordForm);
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
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const checkPasswordField = () => {
		const errors = checkAllRequiredFieldsWithKey(passwordForm, changePassword);
		setPasswordFormError({ ...passwordFormError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			setEdit(!isEdit);
		}
	};
	const handleInputPassword = ({ target: { name, value } }) => {
		setChangePassword({ ...passwordForm, [name]: value });
	};

	const removeErrorPassword = ({ target: { name } }) => {
		setPasswordFormError({ ...formError, [name]: '' });
	};
	const checkErrorPassword = ({ target: { name, value } }) => {
		const errors = {};
		switch (name) {
			case 'confirm_password':
				Object.assign(errors, matchPassword(name, value));
				break;
			default:
				Object.assign(errors, validatePassword(name, value));
				break;
		}
		setPasswordFormError({ ...formError, ...errors });
	};
	const handlePasswordform = (event) => {
		event.preventDefault();
		if (!checkPasswordField()) {
		}
	};
	return (
		<>
			{!isEdit ? (
				<section className='mender_details prfile animate__animated animate__zoomIn'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-3 col-md-4 col-sm-5'>
								<div className='mendr_img'>
									<Image url='assest/images/pro.png' width='100%' />
								</div>
							</div>
							<div className='col-lg-9 col-md-8 col-sm-7'>
								<div className='mendr_details'>
									<h2>About</h2>

									<p>
										<strong>Name :</strong> {userForm.name}
									</p>
									<p>
										<strong>Email :</strong> {userForm.email}
									</p>
									<p>
										<strong>Phone :</strong>
										{userForm.phone}
									</p>
									{userType === 1 && (
										<p>
											<strong>Address :</strong> {userForm.address}
										</p>
									)}
									<button
										type='button'
										onClick={() => setEdit(!isEdit)}
										className='btn btn-primary et'
									>
										Edit
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				<>
					<section className='payment ediprofile1 animate__animated animate__zoomIn'>
						<div className='container'>
							<div className='row'>
								<div className='col-md-12'>
									<h3 className='title3'>Profile</h3>
								</div>
							</div>
						</div>
					</section>
					<section className='my_jobs EditProfile animate__animated animate__slideInDown'>
						<div className='container'>
							<div className='row'>
								<div className='col-md-12'>
									<div className='row'>
										<div className='col-md-6 offset-md-3'>
											<Form
												className='edit_profile1 form-inline'
												onSubmit={handleSubmit}
											>
												<div className='form-group edit_pic'>
													<input type='file' id='edit_pic' />
													<Image url='assest/images/pro.png' />
													<label htmlFor='edit_pic'>
														<Image url='assest/images/cam.png' />
													</label>
												</div>
												<div className='edit_profile_data'>
													<div className='form-group'>
														<label htmlFor='email'>Name:</label>
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
													<div className='form-group'>
														<label htmlFor='email'>Email:</label>
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
															readOnly
														/>
													</div>
													{userType === 1 && (
														<div className='form-group'>
															<label> Location</label>
															<Input
																onBlur={checkError}
																onFocus={removeError}
																isError={formError.location}
																value={userForm.location}
																placeholder='Add your address'
																type='text'
																className='form-control'
																name='location'
																onChange={handleInput}
															/>
														</div>
													)}
													<div className='form-group'>
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
												</div>
												<div className='Explore_all_services'>
													<button type='submit' className='btn btn-secondary'>
														Update
													</button>
												</div>
											</Form>

											<Form
												className='edit_profile1 form-inline'
												onSubmit={handlePasswordform}
											>
												<h3>Change Password</h3>
												<div className='edit_profile_data update_password'>
													<div className='form-group'>
														<label htmlFor='email'>Old Password:</label>
														<Input
															onBlur={checkErrorPassword}
															onFocus={removeErrorPassword}
															isError={passwordFormError.old_passworld}
															value={changePassword.old_passworld}
															placeholder='Old Password'
															type='password'
															className='form-control'
															name='old_passworld'
															onChange={handleInputPassword}
														/>
													</div>

													<div className='form-group'>
														<label htmlFor='email'>New Password:</label>
														<Input
															onBlur={checkErrorPassword}
															onFocus={removeErrorPassword}
															isError={passwordFormError.new_password}
															value={changePassword.new_password}
															placeholder='New Password'
															type='password'
															className='form-control'
															name='new_password'
															onChange={handleInputPassword}
														/>
													</div>
													<div className='form-group'>
														<label htmlFor='email'>Confirm Password:</label>
														<Input
															onBlur={checkErrorPassword}
															onFocus={removeErrorPassword}
															isError={passwordFormError.confirm_password}
															value={changePassword.confirm_password}
															placeholder='Confirm Password'
															type='password'
															className='form-control'
															name='confirm_password'
															onChange={handleInputPassword}
														/>
													</div>
												</div>
												<div className='Explore_all_services'>
													<button type='submit' className='btn btn-danger'>
														Update
													</button>
												</div>
											</Form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</>
			)}
		</>
	);
};

export default memo(Profile);
