import React, { memo, useState } from 'react';
import { Input, Form, Image, ReactLoading } from 'component';
import {
	checkRequiredField,
	checkAllRequiredFieldsWithKey,
	alertMessage,
} from 'utils';
import { store as notify } from 'react-notifications-component';
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
		<div classNameName='container container-all'>
			<ReactLoading isShow={loading} />
			<div classNameName='row'>
				<div classNameName='col-lg-8'>
					<div className='card'>
						<div className='card-body'>
							<div className='row'>
								<div className='col-md-6 offset-md-3'>
									<Form
										className='edit_profile1 form-inline'
										onSubmit={handleSubmit}
									>
										<div className='edit_profile_data'>
											<div className='form-group log_iocns'>
												<label htmlFor='email'>Service Name:</label>
												<Input
													onBlur={checkError}
													onFocus={removeError}
													isError={formError.name}
													value={service.name}
													placeholder='Name'
													type='text'
													className='form-control'
													name='name'
													onChange={handleInput}
												/>
											</div>

											<div className='form-group log_iocns'>
												<label> Category </label>
												<select
													onBlur={checkError}
													onFocus={removeError}
													isError={formError.category_id}
													defaultValue={service.phone}
													type='number'
													className='form-control'
													name='category_id'
													onChange={handleInput}
												>
													<option value=''>--Please select category--</option>
													<option value='1'>Hair Cute</option>
												</select>
											</div>
											<div className='form-group log_iocns'>
												<label> Price</label>
												<Input
													onBlur={checkError}
													onFocus={removeError}
													isError={formError.price}
													value={service.price}
													placeholder='Price'
													type='number'
													className='form-control'
													name='price'
													onChange={handleInput}
												/>
											</div>
											<div className='form-group log_iocns'>
												<label> Image</label>
												<Input
													onBlur={checkError}
													onFocus={removeError}
													isError={formError.image}
													placeholder='Price'
													type='file'
													className='form-control'
													name='image'
													onChange={handleFile}
												/>
											</div>
											{serviceImage && (
												<div className='form-group'>
													<label> Image Preview</label>
													<Image url={serviceImage} />
												</div>
											)}
											<div className='Explore_all_services'>
												<button type='submit' className='btn btn-secondary'>
													Add New Service
												</button>
											</div>
										</div>
									</Form>
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
