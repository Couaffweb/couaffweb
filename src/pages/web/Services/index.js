import React, { memo, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Image } from 'component';
import { getAllService } from './apis';
const GetServices = () => {
	const [loading, setLoading] = useState(true);
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
	return (
		<div className='container container-all'>
			<div className='row'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-lg-12 mt-3'>
							<h2>My Services</h2>
						</div>
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
							: myService.map(({ id, name, image, price }) => (
									<div className='col-lg-4 mt-3' key={id}>
										<div class='card'>
											<Image
												className='card-img-top'
												url={image || 'http://via.placeholder.com/300x180'}
												alt='Card image cap'
											/>
											<div class='card-body'>
												<h5 class='card-title'>{name}</h5>
												<p class='card-text'>
													<strong>Price:</strong> {price}
												</p>
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
