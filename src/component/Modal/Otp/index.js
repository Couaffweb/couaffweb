import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'component';
const OTP = ({ onClose, isShow, onSuccess }) => {
	return (
		<>
			{isShow && (
				<div className='modal fade first_modal signup OTP show show-popup animate__animated animate__zoomIn'>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<button type='button' className='close' onClick={onClose}>
								<Image url='assest/images/cross.png' />
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
																<input
																	placeholder='-'
																	type='email'
																	className='form-control'
																/>{' '}
															</div>

															<div className='form-group log_iocns'>
																<input
																	placeholder='-'
																	type='text'
																	className='form-control'
																	id='email1'
																	name='email'
																	required=''
																/>
															</div>
															<div className='form-group log_iocns'>
																<input
																	placeholder='-'
																	type='text'
																	className='form-control'
																	id='email1'
																	name='email'
																	required=''
																/>
															</div>

															<div className='form-group log_iocns'>
																<input
																	placeholder='-'
																	type='text'
																	className='form-control'
																	id='email1'
																	name='email'
																	required=''
																/>
															</div>
														</div>

														<div className='log_button'>
															<input
																type='submit'
																data-dismiss='modal'
																value='Submit'
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
