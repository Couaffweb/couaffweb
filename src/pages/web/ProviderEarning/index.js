import React, { useState, useEffect } from 'react';
import { ReactLoading, Image } from 'component';
import { store as notify } from 'react-notifications-component';
import { authInfo, alertMessage, setUserInfo } from 'utils';
import { stripeConnectSuccess } from './apis';
const ProviderEarning = ({ location, history }) => {
	const [loading, setLoading] = useState(false);
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
	return (
		<div className='container container-all'>
			<ReactLoading isShow={loading} />
			<div className='row'>
				<div className='col-lg-12'>
					{authInfo().stripe_id ? (
						<div className='strip-account-div'>
							<h5>Click on withdrawal button to withdrawal Amount</h5>
							<button className='btn btn-primary'>Withdrawal Amount</button>
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
								<strong>Amount Avaiable : $100 </strong>
							</div>
						</div>
						<div className='card-body'></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProviderEarning;
