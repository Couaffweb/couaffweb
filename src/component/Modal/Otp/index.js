import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Image, Input, ReactLoading } from 'component';
import { store as notify } from 'react-notifications-component';
import { setUserInfo, alertMessage, setAuthKey } from 'utils';
import { verifyOTP } from './apis';
const OTP = ({ onClose, isShow, onSuccess }) => {
	const history = useHistory();
	const [otp, setOtp] = useState({ 0: '', 1: '', 2: '', 3: '' });
	const [loading, setLoading] = useState(false);
	const checkAllValue = () => {
		const value = Object.values(otp).filter((val) => val);
		return value.length === 4;
	};
	const handleInput = function ({ target: { value, name, maxLength } }) {
		const key = name.replace('otp-', '');
		setOtp({ ...otp, [key]: value });
		if (value.length === maxLength) {
			const nextSibling = document.querySelector(
				`input[name=otp-${parseInt(key, 10) + 1}]`
			);
			if (nextSibling) {
				nextSibling.focus();
			}
		}
	};

	const submitOtp = () => {
		if (checkAllValue()) {
			setLoading(true);
			const createOtp = Object.values(otp).join('');
			verifyOTP({ otp: createOtp })
				.then(({ data }) => {
					notify.addNotification(
						alertMessage({
							title: 'Success',
							message: 'signup successfully',
						})
					);
					setUserInfo(data);
					setAuthKey(data.authorization_key);
					onClose();
					onSuccess();
					if (data.userType === 1) {
						history.push('/working-hours');
					}
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
	return (
		<>
			{isShow && (
				<div className='modal fade first_modal signup OTP show show-popup'>
					<ReactLoading isShow={loading} />
					<div className='modal-dialog'>
						<div className='modal-content animate__animated animate__zoomIn'>
							<button type='button' className='close' onClick={onClose}>
								<Image url='/assest/images/cross.png' />
							</button>
							<div className='modal-body'>
								<div className='row'>
									<div className='col-md-12'>
										<h2 className='head1'>One Time Password (OTP)</h2>
										<p className='head2'>
											We have sent 4 digit OTP on your register Email and Mobile
											number please check and enter below.
										</p>

										<div className='tab-content11' id=''>
											<div className='ww' id=''>
												<div className='log-in_form'>
													<form>
														<div className='otp1'>
															<div className='form-group log_iocns'>
																<Input
																	name='otp-0'
																	value={otp['0']}
																	maxLength='1'
																	placeholder='-'
																	type='text'
																	pattern='\d*'
																	className='form-control'
																	onChange={handleInput}
																/>
															</div>

															<div className='form-group log_iocns'>
																<Input
																	name='otp-1'
																	value={otp['1']}
																	maxLength='1'
																	placeholder='-'
																	type='text'
																	pattern='\d*'
																	className='form-control'
																	onChange={handleInput}
																/>
															</div>
															<div className='form-group log_iocns'>
																<Input
																	name='otp-2'
																	value={otp['2']}
																	maxLength='1'
																	placeholder='-'
																	type='text'
																	pattern='\d*'
																	className='form-control'
																	onChange={handleInput}
																/>
															</div>

															<div className='form-group log_iocns'>
																<Input
																	name='otp-3'
																	value={otp['3']}
																	maxLength='1'
																	placeholder='-'
																	type='text'
																	pattern='\d*'
																	className='form-control'
																	onChange={handleInput}
																/>
															</div>
														</div>

														<div className='log_button'>
															<input
																type='button'
																data-dismiss='modal'
																value='Submit'
																onClick={submitOtp}
															/>
														</div>
													</form>
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

OTP.propType = {
	onClose: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
};

export default memo(OTP);
