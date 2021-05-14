import React, { memo, useState, useEffect } from 'react';
import { ReactLoading, AddServiceForm, Image } from 'component';
import { store as notify } from 'react-notifications-component';
import {
	checkRequiredField,
	checkAllRequiredFieldsWithKey,
	alertMessage,
	authInfo,
	setUserInfo,
} from 'utils';

import { serviceValue } from './constants';
import { addService, stripeConnectSuccess } from './apis';
const AddService = ({ location, history }) => {
	console.log();
	const [service, setService] = useState(serviceValue);
	const [serviceImage, setServiceImage] = useState();
	const [formError, setFormError] = useState(serviceValue);
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
						history.push('/add-service');
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
	const handleFile = ({ target: { name, files } }) => {
		setService({ ...service, [name]: files[0] });
		setServiceImage(URL.createObjectURL(files[0]));
	};
	const handleInput = ({ target: { name, value } }) => {
		setService({ ...service, [name]: value });
	};
	const removeError = ({ target: { name } }) => {
		setFormError({ ...formError, [name]: '' });
	};
	const checkError = ({ target: { name, value } }) => {
		setFormError({ ...formError, ...checkRequiredField(name, value) });
	};
	const checkAllField = () => {
		const errors = checkAllRequiredFieldsWithKey(serviceValue, service);
		setFormError({ ...formError, ...errors });
		return Object.values(errors).some((value) => value.length > 0);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!checkAllField()) {
			setLoading(true);
			addService(service)
				.then(({ message }) => {
					notify.addNotification(
						alertMessage({
							title: 'Success',
							message,
						})
					);
					setService({ ...serviceValue });
					setServiceImage('');
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
		<div className='container container-all'>
			<ReactLoading isShow={loading} />
			<div className='row'>
				<div className='col-lg-12'>
					<div className='card'>
						<div className='card-body'>
							<h1 className='d-flex justify-content-center'>
								+ Add your Service
							</h1>
							<hr className='line' />

							{authInfo().stripe_id ? (
								<div className='row'>
									<div className='col-md-6 offset-md-3'>
										<AddServiceForm
											handleFile={handleFile}
											checkError={checkError}
											removeError={removeError}
											formError={formError}
											service={service}
											handleInput={handleInput}
											handleSubmit={handleSubmit}
											serviceImage={serviceImage}
										/>
									</div>
								</div>
							) : (
								<div className='strip-account-div'>
									<h2>Please connect your stripe account to add new service</h2>
									<a
										href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_TOKEN}&scope=read_write`}
									>
										<Image url='/assest/images/connectButton.png' />{' '}
									</a>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(AddService);
