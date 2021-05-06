import React, { memo, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Image, ReactLoading } from 'component';
import Alert from 'sweetalert';
import { getUserType } from 'utils';
import { getAllBookings, bookingStatusUpdate } from './apis';
const Bookings = () => {
	const userType = getUserType();
	const [loading, setLoading] = useState(false);
	const [reactLoading, setReactLoading] = useState(false);
	const [myService, setMyService] = useState([]);
	const [status, setStatus] = useState('0,1');
	useEffect(() => {
		getServicesData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);
	const getServicesData = () => {
		setLoading(true);
		getAllBookings(status)
			.then(({ data: { bookings = [] } }) => {
				setMyService(bookings);
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	};
	const updateBooking = (id, status, index) => {
		setReactLoading(true);
		bookingStatusUpdate({ bookingId: id, status })
			.then(() => {
				if (status !== 1) {
					myService.splice(index, 1);
				} else {
					myService[index].bookingInfo.status = 1;
				}
				Alert('Infomation', 'Information updated successfully', 'success');
			})
			.catch(({ message }) => {
				Alert('Error', message, 'error');
			})
			.finally(() => {
				setReactLoading(false);
			});
	};
	return (
		<div className='container container-all'>
			<div className='row'>
				<div className='container-fluid'>
					<div className='row'>
						<ReactLoading isShow={reactLoading} />
						<div className='col-lg-12 mt-3'>
							<h2>{userType === 1 ? 'Booking Request' : 'My Bookings'}</h2>
							<div className='booking-tabs'>
								<ul
									className='nav nav-pills mb-3 user-sign'
									id='pills-tab'
									role='tablist'
								>
									<li className='nav-item'>
										<span
											onClick={() => setStatus('0,1')}
											className={`nav-link click-span ${
												status === '0,1' ? 'active' : ''
											}`}
											data-toggle='pill'
											href='#users'
											role='tab'
											aria-controls='pills-home'
											aria-selected='true'
										>
											Requested
										</span>
									</li>
									<li className='nav-item'>
										<span
											onClick={() => setStatus(3)}
											className={`nav-link click-span ${
												status === 3 ? 'active' : ''
											}`}
											href='#provider'
											role='tab'
											aria-controls='pills-profile'
											aria-selected='false'
										>
											In Progress
										</span>
									</li>
									<li className='nav-item'>
										<span
											onClick={() => setStatus(4)}
											className={`nav-link click-span ${
												status === 4 ? 'active' : ''
											}`}
											role='tab'
											aria-controls='pills-profile'
											aria-selected='false'
										>
											Complete
										</span>
									</li>
								</ul>
							</div>
						</div>
						<hr className='line' />
						{!loading && myService.length === 0 && (
							<h6 className='error-text'> No Record found </h6>
						)}
						{loading
							? [1, 2, 3].map((val) => (
									<div className='col-lg-4 mt-3' key={val}>
										<div class='card'>
											<Skeleton height={230} />
											<div class='card-body'>
												<h5 class='card-title'>
													<Skeleton width={220} />
												</h5>
												<p class='card-text'>
													<Skeleton width={160} />
												</p>
											</div>
										</div>
									</div>
							  ))
							: myService.map(
									(
										{
											userInfo = {},
											massagerInfo = {},
											bookingInfo: {
												id,
												status,
												paymentStatus,
												serviceDetails = [],
											},
										},
										index
									) => (
										<div className='col-lg-4 mt-3' key={id}>
											<div class='card'>
												<Image
													className='card-img-top'
													url={
														serviceDetails[0].image ||
														'http://via.placeholder.com/300x180'
													}
													alt='Card image cap'
												/>
												<div class='card-body'>
													<h5 class='card-title'>
														<p className='d-flex justify-content-center'>
															Service Info
														</p>
														<hr className='line' />
														<strong>Service Name :- </strong>
														{serviceDetails[0].name}
													</h5>
													<p class='card-text'>
														<strong>Price:</strong> ${serviceDetails[0].price}
														<hr className='line' />
														<p>
															<strong>
																{userType === 1 ? 'User Info' : 'Provider Info'}
															</strong>
														</p>
														{userType === 1 && (
															<div>
																Name: <strong>{userInfo.name}</strong>
																<br />
																Email: <strong>{userInfo.email}</strong>
																<br />
																Phone: <strong>{userInfo.phone}</strong>
																<br />
															</div>
														)}
														{userType === 0 && (
															<div>
																Name:{' '}
																<strong>{massagerInfo.massagerName}</strong>
																<br />
																Email:{' '}
																<strong>{massagerInfo.massagerEmail}</strong>
																<br />
																Phone:{' '}
																<strong>{massagerInfo.massagerPhone}</strong>
																<br />
																Location:{' '}
																<strong>{massagerInfo.massagerLocation}</strong>
															</div>
														)}
													</p>
												</div>
												<div class='card-footer'>
													{userType === 1 && status === 0 && (
														<div className='d-flex justify-content-center'>
															<button
																className='btn btn-success'
																onClick={() => updateBooking(id, 1, index)}
																disabled={reactLoading}
															>
																Accept
															</button>
															{'  '}
															<button
																onClick={() => updateBooking(id, 2, index)}
																className='btn btn-danger'
																disabled={reactLoading}
															>
																Reject
															</button>
														</div>
													)}
													{userType === 0 && status === 1 && (
														<div className='d-flex justify-content-center'>
															<button
																onClick={() => updateBooking(id, 3, index)}
																className='btn btn-info'
																disabled={reactLoading}
															>
																complete Payment
															</button>
														</div>
													)}
													{userType === 1 &&
														status === 3 &&
														paymentStatus === 1 && (
															<div className='d-flex justify-content-center'>
																<button
																	onClick={() => updateBooking(id, 4, index)}
																	className='btn btn-primary'
																	disabled={reactLoading}
																>
																	Complete Booking
																</button>
															</div>
														)}
												</div>
											</div>
										</div>
									)
							  )}
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Bookings);
