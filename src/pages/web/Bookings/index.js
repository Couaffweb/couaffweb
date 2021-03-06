import React, { memo, useCallback, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
	Image,
	ReactLoading,
	RatingModal,
	StripePaymentModal,
} from 'component';
import Alert from 'sweetalert';
import { getUserType } from 'utils';
import { getAllBookings, bookingStatusUpdate, giveRatings } from './apis';
const Bookings = () => {
	const userType = getUserType();
	const [loading, setLoading] = useState(false);
	const [reactLoading, setReactLoading] = useState(false);
	const [myService, setMyService] = useState([]);
	const [status, setStatus] = useState('0,1');
	const [showRatingPopup, setShowRatingPopUp] = useState(false);
	const [localInfo, setLocalInfo] = useState({});
	const [showPaymentModel, setShowPaymentModel] = useState(false);
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
	const updateBooking = (id, status, index, payload) => {
		setReactLoading(true);
		bookingStatusUpdate({ bookingId: id, status, paymentDetails: payload })
			.then(() => {
				if (status !== 1) {
					myService.splice(index, 1);
					if (status === 3) {
						setStatus(3);
					}
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
	const handleRating = useCallback(
		(value) => {
			myService[value.index].bookingInfo.isReview = 1;
			giveRatings(value)
				.then(({ message }) => {
					Alert('Success', message, 'success');
				})
				.catch(() => {});
		},
		[myService]
	);
	return (
		<div className='container container-all'>
			<div className='row'>
				<div className='container-fluid'>
					<div className='row'>
						<ReactLoading isShow={reactLoading} />
						{showRatingPopup && (
							<RatingModal
								isShow={showRatingPopup}
								onSubmit={handleRating}
								onClose={() => setShowRatingPopUp(false)}
								{...localInfo}
							/>
						)}
						{showPaymentModel && (
							<StripePaymentModal
								isShow={showPaymentModel}
								onClose={() => setShowPaymentModel(false)}
								onPayment={({ id, index, status, payload }) => {
									setShowPaymentModel(false);
									updateBooking(id, status, index, payload);
								}}
								{...localInfo}
							/>
						)}
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
											{userType === 1 ? 'Requests' : 'Requested'}
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
										<div className='card'>
											<Skeleton height={230} />
											<div className='card-body'>
												<h5 className='card-title'>
													<Skeleton width={220} />
												</h5>
												<p className='card-text'>
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
												date,
												isReview = 0,
												massagerId,
											},
										},
										index
									) => (
										<div className='col-lg-4 mt-3' key={id}>
											<div className='card'>
												<Image
													className='card-img-top'
													url={
														serviceDetails[0].image ||
														'http://via.placeholder.com/300x180'
													}
													alt='Card image cap'
												/>
												<div className='card-body'>
													<h5 className='card-title'>
														<p className='d-flex justify-content-center'>
															Service Info
														</p>
														<hr className='line' />
														<strong>Service Name :- </strong>
														{serviceDetails[0].name}
													</h5>
													<div className='card-text'>
														<strong>Price:</strong> ${serviceDetails[0].price}
														<hr className='line' />
														<p>
															<strong>
																{userType === 1 ? 'User Info' : 'Provider Info'}
															</strong>
														</p>
														{userType === 1 && (
															<div>
																Name: <strong>{userInfo.userName}</strong>
																<br />
																Email: <strong>{userInfo.userEmail}</strong>
																<br />
																Phone: <strong>{userInfo.userPhone}</strong>
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
														<hr className='line' />
														{date && (
															<>
																<strong>Booking Date : </strong>
																{new Date(date * 1000).toUTCString()}
															</>
														)}
													</div>
												</div>
												<div className='card-footer'>
													{userType === 1 && status === 1 && (
														<strong className='d-flex justify-content-center text-success'>
															Accepted
														</strong>
													)}
													{userType === 0 && status === 0 && (
														<strong className='d-flex justify-content-center text-info'>
															Await
														</strong>
													)}
													{userType === 1 && status === 0 && (
														<div className='d-flex justify-content-center'>
															<button
																className='btn btn-success mr-4'
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
																onClick={() => {
																	setLocalInfo({
																		bookingId: id,
																		index,
																		massagerId,
																		price: serviceDetails[0].price,
																		massagerStripeId:
																			massagerInfo.massagerStripeId,
																	});
																	setShowPaymentModel(true);
																}}
																className='btn btn-info'
																disabled={reactLoading}
															>
																Complete Payment
															</button>
														</div>
													)}
													{userType === 0 && status === 4 && !isReview && (
														<div className='d-flex justify-content-center'>
															<button
																onClick={() => {
																	setLocalInfo({
																		bookingId: id,
																		index,
																		massagerId,
																	});
																	setShowRatingPopUp(true);
																}}
																className='btn btn-info'
																disabled={reactLoading}
															>
																Give Rating
															</button>
														</div>
													)}
													{userType === 1 && status === 3 && (
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
