import React, { memo, useState } from 'react';
import { ReactLoading, AddServiceForm } from 'component';
import { store as notify } from 'react-notifications-component';
import {
	checkRequiredField,
	checkAllRequiredFieldsWithKey,
	alertMessage,
} from 'utils';

import { serviceValue } from './constants';
import { addService } from './apis';
const AddService = () => {
	const [service, setService] = useState(serviceValue);
	const [serviceImage, setServiceImage] = useState();
	const [formError, setFormError] = useState(serviceValue);
	const [loading, setLoading] = useState(false);
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(AddService);
