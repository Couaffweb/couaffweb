import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'component';
const ForgotPassword = ({ onClose, openModel, isShow }) => {
	return (
		<>
			{isShow && (
				<div className='modal fade first_modal2 in show show-popup animate__animated animate__zoomIn'>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<button type='button' className='close' onClick={onClose}>
								<Image url='assest/images/cross.png' />
							</button>
							<div className='modal-body'>
								<Image className='forgot_logo' url='assest/images/logo.png' />
								<h2 className='head1'> Forgot Passowrd</h2>
								<p className='head2'>
									Please enter the register phone numberWe will send you otp
									Code.
								</p>

								<div className='log-in_form'>
									<form>
										<div className='form-group log_iocns'>
											<label> Phone Number</label>
											<input
												placeholder=' +123 Enter Phone Number'
												type='email'
												className='form-control'
												id='email1'
												name='email'
												required=''
											/>
											<Image url='assest/images/call.png' />
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
									</form>
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
