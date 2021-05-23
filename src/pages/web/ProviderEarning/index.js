import React, { useState, useEffect, useCallback } from 'react';
import { store as notify } from 'react-notifications-component';
import Alert from 'sweetalert';
import { ReactLoading, Image, Paginations } from 'component';
import {
	authInfo,
	alertMessage,
	setUserInfo,
	parseUrl,
	dateFormate,
	priceFormate,
} from 'utils';
import {
	stripeConnectSuccess,
	getTransectionHistory,
	tranferFund,
} from './apis';
const ProviderEarning = ({ location, history }) => {
	const [loading, setLoading] = useState(false);
	const [tranSectionList, setTranSectionList] = useState([]);
	const [totalBalance, setTotalBalance] = useState(0);
	const [currentPage, setCurrentPage] = useState(
		parseInt(parseUrl(history.location.search, 'page')) || 1
	);
	const [totalPage, setTotalPage] = useState(1);
	useEffect(() => {
		getTransections();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);
	useEffect(() => {
		if (location.search) {
			const code = new URLSearchParams(location.search).get('code');
			if (code) {
				setLoading(true);
				stripeConnectSuccess({ code })
					.then(({ data, message }) => {
						notify.addNotification(alertMessage({ title: 'Success', message }));
						setUserInfo(data);
						history.push('/earning');
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);
	const getTransections = () => {
		setLoading(true);
		getTransectionHistory({ page: currentPage, limit: 20 })
			.then(
				({
					data: { walletAmount = 0, allTransection = [], pagination = {} },
				}) => {
					setTotalBalance(walletAmount);
					setTotalPage(pagination.totalPage);
					setTranSectionList(allTransection);
				}
			)
			.catch(({ message }) => {
				notify.addNotification(
					alertMessage({ title: 'error', message, type: 'danger' })
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const handlePage = useCallback(
		(pageNo) => {
			setCurrentPage(pageNo);
		},
		[setCurrentPage]
	);
	const withdrawalFund = () => {
		Alert({
			title: 'Are you sure want to withdrawal amount?',
			text: '',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				setLoading(true);
				tranferFund()
					.then(({ message, data }) => {
						tranSectionList.unshift(data);
						setTotalBalance(0);
						Alert('success', message, 'success');
					})
					.catch(({ message }) => {
						notify.addNotification(
							alertMessage({ title: 'error', message, type: 'danger' })
						);
					})
					.finally(() => {
						setLoading(false);
					});
			} else {
				Alert('Proccess cancel');
			}
		});
	};
	return (
		<div className='container container-all'>
			<ReactLoading isShow={loading} />
			<div className='row'>
				<div className='col-lg-12'>
					{authInfo().stripe_id ? (
						<div className='strip-account-div'>
							<h5>
								<br /> You can only withdrawal amount when you have more then 10
								$
							</h5>
							<button
								disabled={totalBalance < 10}
								onClick={withdrawalFund}
								className='btn btn-primary'
							>
								Withdrawal Amount
							</button>
						</div>
					) : (
						<div className='strip-account-div'>
							<h2>Please connect your stripe for withdrawal amount</h2>
							<a
								href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_TOKEN}&scope=read_write`}
							>
								<Image url='/assest/images/connectButton.png' />{' '}
							</a>
						</div>
					)}
				</div>
				<div className='col-lg-12'>
					<div className='card'>
						<div className='card-header card-header-fix'>
							<div>My Transection</div>
							<div>
								<strong>Amount Avaiable : {priceFormate(totalBalance)} </strong>
							</div>
						</div>
						<div className='card-body'>
							<table className='table table-striped'>
								<thead className='thead-dark'>
									<tr>
										<th scope='col' className='td-center'>
											#
										</th>
										<th scope='col' className='td-center'>
											Booking Id
										</th>
										<th scope='col' className='td-center'>
											Amount
										</th>
										<th scope='col' className='td-center'>
											Transection Type
										</th>
										<th scope='col' className='td-center'>
											Total Balance
										</th>
										<th scope='col' className='td-center'>
											Date
										</th>
									</tr>
								</thead>
								<tbody>
									{tranSectionList.map(
										(
											{
												id,
												bookingId,
												created,
												amount,
												transactionType,
												totalBalance,
											},
											index
										) => (
											<tr key={id}>
												<th scope='row'>{index + 1}</th>
												<td className='td-center'>{bookingId}</td>
												<td className='td-center'>{priceFormate(amount)}</td>
												<td className='td-center'>
													{transactionType === 0 ? 'Credit' : 'Withdrawal'}
													<i
														className={`ml-1 fa fa-arrow-${
															transactionType === 0 ? 'up' : 'down'
														}`}
														aria-hidden='true'
													></i>
												</td>
												<td className='td-center'>
													{priceFormate(totalBalance)}
												</td>
												<td className='td-center'>{dateFormate(created)}</td>
											</tr>
										)
									)}
								</tbody>
							</table>

							{tranSectionList.length === 0 && (
								<h2 className='error-text d-flex justify-content-center'>
									No Record found
								</h2>
							)}
							<div className='pagination-div'>
								<Paginations
									className='pagination2'
									currentPage={currentPage}
									pageRangeDisplayed={5}
									totalPage={totalPage}
									onChange={handlePage}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProviderEarning;
