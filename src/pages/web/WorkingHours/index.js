import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { store as notify } from 'react-notifications-component';
import { ReactLoading, Form, DatePicker, Input } from 'component';
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
	const setHour = (time) => {
		if (time === 'closed') return null;
		const date = new Date();
		const getHours = time.split(':');
		date.setHours(getHours[0], getHours[1], 0);
		return date;
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
				<div classNameName='col-lg-12'>
					<div className='card'>
						<div className='card-body'>
							<h1 className='d-flex justify-content-center'>Working Hours</h1>
							<hr className='line' />
							<div className='row'>
								<div className='col-lg-8 offset-md-2'>
									<Form onSubmit={handleSubmit}>
										{workingHours.map(({ day, openTime, closeTime }, index) => (
											<div className='row time-zone' key={index}>
												<div className='col-sm-12 list'>
													<div className='mb-2 row justify-content-between px-3'>
														<strong>{day} : </strong>
														<div className='mob'>
															<label className='text-grey mr-1'>From</label>{' '}
															<DatePicker
																showTimeSelect
																showTimeSelectOnly
																timeIntervals={30}
																disableClock
																timeCaption='Time'
																placeholder='Time'
																dateFormat='h:mm aa'
																timeClassName={() => 'text-success'}
																amPmAriaLabel={'Select AM/PM'}
																className='form-control'
																type='time'
																name='openTime'
																format='hh:mm:ss a'
																disabled={closeTime === 'closed'}
																placeholderText={
																	closeTime === 'closed'
																		? 'Closed'
																		: 'Open Time'
																}
																value={setHour(openTime)}
																onChange={({ target: { value, name } }) => {
																	const date = new Date(value);
																	const hours = date.getHours();
																	const min = date.getMinutes();
																	handleInput(`${hours}:${min}`, name, index);
																}}
															/>{' '}
														</div>
														<div className='mob mb-1'>
															<label className='text-grey mr-4'>To</label>{' '}
															<DatePicker
																showTimeSelect
																showTimeSelectOnly
																timeIntervals={30}
																disableClock
																timeCaption='Time'
																placeholder='Time'
																dateFormat='h:mm aa'
																timeClassName={() => 'text-success'}
																amPmAriaLabel={'Select AM/PM'}
																className='form-control'
																type='time'
																name='closeTime'
																format='hh:mm:ss a'
																disabled={closeTime === 'closed'}
																placeholderText={
																	closeTime === 'closed'
																		? 'Closed'
																		: 'Close Time'
																}
																value={setHour(closeTime)}
																onChange={({ target: { value, name } }) => {
																	const date = new Date(value);
																	const hours = date.getHours();
																	const min = date.getMinutes();
																	handleInput(`${hours}:${min}`, name, index);
																}}
															/>{' '}
														</div>
														<div className='mob mb-1'>
															<label className='text-grey'>Close</label>{' '}
															<Input
																type='checkbox'
																className='form-control'
																checked={
																	openTime === 'closed' ||
																	closeTime === 'closed'
																}
																onChange={({ target: { checked } }) => {
																	const date = new Date();
																	const hours = date.getHours();
																	let valueOpen = `${hours}:00`;
																	let valueClose = `${hours + 1}:00`;
																	if (checked) {
																		valueOpen = valueClose = 'closed';
																	}
																	const currentState = JSON.parse(
																		JSON.stringify(workingHours)
																	);
																	currentState[index]['openTime'] = valueOpen;
																	currentState[index]['closeTime'] = valueClose;
																	setWorkingHours([...currentState]);
																}}
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
