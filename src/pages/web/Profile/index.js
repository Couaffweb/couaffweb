import React, { useState, memo, useCallback } from 'react';
import {
	Image,
	Input,
	Form,
	GoogleAutoComplete,
	ReactLoading,
} from 'component';
import {
	checkRequiredField,
	validateEmail,
	validatePassword,
	checkAllRequiredFieldsWithKey,
	getUserType,
	authInfo,
	matchPassword,
	alertMessage,
	setUserInfo,
} from 'utils';
import { store as notify } from 'react-notifications-component';
import { signUpForm, passwordForm } from './constants';
import { updatePassword, updateProfile } from './apis';
const Profile = () => {
	const userType = getUserType();
	const [isEdit, setEdit] = useState(false);
	const [userForm, setUserForm] = useState(authInfo());
	const [formError, setFormError] = useState(signUpForm[userType]);
	const [changePassword, setChangePassword] = useState(passwordForm);
	const [passwordFormError, setPasswordFormError] = useState(passwordForm);
	const [loading, setLoading] = useState(false);
	const [userPic, setUserPic] = useState(
		userForm.profile || '/assest/images/pro.png'
	);
	const handleFile = ({ target: { name, files } }) => {
		setUserForm({ ...userForm, [name]: files[0] });
		setUserPic(URL.createObjectURL(files[0]));
	};
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
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			setLoading(true);
			updateProfile(userForm)
				.then(({ data }) => {
					notify.addNotification(
						alertMessage({
							title: 'Success',
							message: 'Profile Updated successfully',
						})
					);
					setUserInfo(data);
					setEdit(!isEdit);
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
	const handleInputPassword = ({ target: { name, value } }) => {
		setChangePassword({ ...changePassword, [name]: value });
	};

	const removeErrorPassword = ({ target: { name } }) => {
		setPasswordFormError({ ...passwordFormError, [name]: '' });
	};
	const checkErrorPassword = ({ target: { name, value } }) => {
		const errors = {};
		switch (name) {
			case 'confirm_password':
				Object.assign(
					errors,
					matchPassword(name, value, changePassword.new_password)
				);
				break;
			case 'old_password':
				Object.assign(errors, checkRequiredField(name, value));
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
			setLoading(true);
			updatePassword(changePassword)
				.then(() => {
					setChangePassword({ ...passwordForm });
					notify.addNotification(
						alertMessage({
							title: 'Success',
							message: 'Password changed successfully',
						})
					);
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
			{!isEdit ? (
				<section className='mender_details prfile animate__animated animate__zoomIn container-all'>
					<div className='container'>
						<div className='card'>
							<div className='card-body'>
								<div className='row'>
									<div className='col-lg-3 col-md-4 col-sm-5'>
										<div className='mendr_img'>
											<Image url={userPic} width='100%' />
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
													<strong>Address :</strong> {userForm.location}
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
						</div>
					</div>
				</section>
			) : (
				<>
					<ReactLoading isShow={loading} />
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
													<input
														type='file'
														id='edit_pic'
														onChange={handleFile}
														name='profile'
														accept='image/*'
													/>
													<Image url={userPic} alt='profile' />
													<label htmlFor='edit_pic'>
														<Image url='/assest/images/cam.png' />
													</label>
												</div>
												<div className='edit_profile_data'>
													<div className='form-group log_iocns'>
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
													<div className='form-group log_iocns'>
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
													<div className='form-group log_iocns'>
														<label htmlFor='email'>Old Password:</label>
														<Input
															onBlur={checkErrorPassword}
															onFocus={removeErrorPassword}
															isError={passwordFormError.old_password}
															value={changePassword.old_password}
															placeholder='Old Password'
															type='password'
															className='form-control'
															name='old_password'
															onChange={handleInputPassword}
														/>
													</div>

													<div className='form-group log_iocns'>
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
													<div className='form-group log_iocns'>
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
