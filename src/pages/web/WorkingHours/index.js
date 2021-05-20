import React, { memo, useState, useEffect } from 'react';
import TimePicker from 'react-time-picker';
import { useHistory } from 'react-router-dom';
import { store as notify } from 'react-notifications-component';
import { ReactLoading, Form } from 'component';
import { authInfo, alertMessage, setUserInfo } from 'utils';
import { workingHours as Hours } from './constants';
import { updateProfile } from './apis';
const WorkingHours = () => {
	const history = useHistory();
	const { working_hours, id } = authInfo();
	const [loading, setLoading] = useState(false);
	const [workingHours, setWorkingHours] = useState(Hours);
	useEffect(() => {
		if (working_hours) {
			setWorkingHours(JSON.parse(working_hours));
		}
	}, [working_hours]);
	const handleInput = (val, key, index) => {
		const currentState = JSON.parse(JSON.stringify(workingHours));
		currentState[index][key] = val;
		setWorkingHours([...currentState]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		updateProfile({ id, working_hours: JSON.stringify(workingHours) })
			.then(({ data }) => {
				notify.addNotification(
					alertMessage({
						title: 'Success',
						message: 'Profile Updated successfully',
					})
				);
				setUserInfo(data);
				history.push(working_hours ? '/profile' : '/add-service');
			})
			.catch(({ message }) => {
				notify.addNotification(
					alertMessage({ title: 'error', message, type: 'danger' })
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div classNameName='container container-all'>
			<ReactLoading isShow={loading} />
			<div classNameName='row'>
				<div classNameName='col-lg-8'>
					<div className='card'>
						<div className='card-body'>
							<h1 className='d-flex justify-content-center'>Working Hours</h1>
							<hr className='line' />
							<div className='row'>
								<div className='col-md-6 offset-md-3'>
									<Form onSubmit={handleSubmit}>
										{workingHours.map(({ day, openTime, closeTime }, index) => (
											<div className='row time-zone' key={index}>
												<div className='col-sm-12 list'>
													<div className='mb-2 row justify-content-between px-3'>
														<strong>{day} : </strong>
														<div className='mob'>
															<label className='text-grey mr-1'>From</label>{' '}
															<TimePicker
																amPmAriaLabel={'Select AM/PM'}
																className='form-control'
																type='time'
																name='from'
																value={openTime}
																onChange={(value) =>
																	handleInput(value, 'openTime', index)
																}
															/>{' '}
														</div>
														<div className='mob mb-1'>
															<label className='text-grey mr-4'>To</label>{' '}
															<TimePicker
																amPmAriaLabel={'Select AM/PM'}
																className='form-control'
																type='time'
																name='to'
																value={closeTime}
																onChange={(value) =>
																	handleInput(value, 'closeTime', index)
																}
															/>{' '}
														</div>
													</div>
												</div>
											</div>
										))}
										<div className='row mt-5 d-flex justify-content-center'>
											<button className='btn btn-info'>
												{!working_hours ? 'Save' : 'Update'} Working hours
											</button>
										</div>
									</Form>
									<hr className='line' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(WorkingHours);
