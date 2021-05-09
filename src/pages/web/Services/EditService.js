import React, { memo, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { ReactLoading, AddServiceForm } from 'component';
import {
	checkRequiredField,
	checkAllRequiredFieldsWithKey,
	alertMessage,
} from 'utils';
import { store as notify } from 'react-notifications-component';
import { serviceValue } from './constants';
import { updateService } from './apis';
const EditService = ({ location }) => {
	const { serviceDetails } = location.state;
	const history = useHistory();
	const [service, setService] = useState({ ...serviceDetails });
	const [serviceImage, setServiceImage] = useState(serviceDetails.image);
	const [formError, setFormError] = useState(serviceValue);
	const [loading, setLoading] = useState(false);
	if (!location.state) {
		return <Redirect to='/services' />;
	}
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
			updateService(service)
				.then(({ message }) => {
					notify.addNotification(
						alertMessage({
							title: 'Success',
							message,
						})
					);
					history.push('/services');
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
		<div classNameName='container container-all'>
			<ReactLoading isShow={loading} />
			<div classNameName='row'>
				<div classNameName='col-lg-8'>
					<div className='card'>
						<div className='card-body'>
							<h1 className='d-flex justify-content-center'>
								Update Service ({service.name})
							</h1>
							<hr className='line' />
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
										isEdit
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(EditService);
