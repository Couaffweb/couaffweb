import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Alert from 'sweetalert';
import { store as notify } from 'react-notifications-component';
import { alertMessage } from 'utils';
import { Image, ReactLoading } from 'component';

import { getAllService, deleteService } from './apis';
const GetServices = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [apiLoading, setApiLoading] = useState(false);
	const [myService, setMyService] = useState([]);
	useEffect(() => {
		getServicesData();
	}, []);
	const getServicesData = () => {
		getAllService()
			.then(({ data: { result } }) => {
				setMyService(result);
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	};
	const removeService = (id, index) => {
		Alert({
			title: 'Are you sure want to delete this service?',
			text: '',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				setApiLoading(true);
				deleteService(id)
					.then(() => {
						const newService = [...myService];
						newService.splice(index, 1);
						setMyService([...newService]);
						Alert('Service Removed Successfully', {
							icon: 'success',
						});
					})
					.catch(({ message }) => {
						notify.addNotification(
							alertMessage({ title: 'error', message, type: 'danger' })
						);
					})
					.finally(() => {
						setApiLoading(false);
					});
			} else {
				Alert('Your imaginary you is safe!');
			}
		});
	};
	const updateService = (serviceDetails) => {
		history.push('/edit-service', { serviceDetails });
	};
	return (
		<div className='container container-all'>
			<div className='row'>
				<div className='container-fluid'>
					<div className='row'>
						<ReactLoading isShow={apiLoading} />
						<div className='col-lg-12 mt-3'>
							<h2>My Services</h2>
						</div>
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
							: myService.map(({ id, name, image, price, ...rest }, index) => (
									<div className='col-lg-4 mt-3' key={id}>
										<div className='card'>
											<Image
												className='card-img-top provider-work-image'
												url={image || 'http://via.placeholder.com/300x180'}
												alt='Card image cap'
												height='250px'
											/>
											<div className='card-body'>
												<h5 className='card-title'>{name}</h5>
												<p className='card-text'>
													<strong>Price:</strong> ${price}
												</p>
											</div>
											<div className='card-footer'>
												<div className='d-flex justify-content-between'>
													<button
														className='btn btn-info'
														onClick={() =>
															updateService({ id, name, image, price, ...rest })
														}
													>
														Update
													</button>{' '}
													<button
														className='btn btn-danger'
														onClick={() => removeService(id, index)}
													>
														Remove
													</button>
												</div>
											</div>
										</div>
									</div>
							  ))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(GetServices);
