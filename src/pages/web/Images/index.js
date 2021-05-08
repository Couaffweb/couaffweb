import React, { memo, useCallback, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Image, ReactLoading, AddImage } from 'component';
import Alert from 'sweetalert';
import { store as notify } from 'react-notifications-component';
import { alertMessage } from 'utils';
import { getAllImages, removeImage, addProviderImage } from './apis';
const Images = () => {
	const [loading, setLoading] = useState(true);
	const [imageLoading, setImageLoading] = useState(false);
	const [providerImages, setProviderImages] = useState([]);
	const [addImagePopup, setAddImagePopup] = useState(false);
	useEffect(() => {
		getProviderImages();
	}, []);
	const getProviderImages = () => {
		getAllImages()
			.then(({ data: { result } }) => {
				setProviderImages(result);
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	};
	const removeSingleImage = (id, index) => {
		Alert({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able recover account!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				setImageLoading(true);
				removeImage(id)
					.then(() => {
						providerImages.splice(index, 1);
						Alert('Poof! Your imaginary file has been deleted!', {
							icon: 'success',
						});
					})
					.catch(({ message }) => {
						notify.addNotification(
							alertMessage({ title: 'error', message, type: 'danger' })
						);
					})
					.finally(() => {
						setImageLoading(false);
					});
			} else {
				Alert('Your imaginary you is safe!');
			}
		});
	};
	const addImages = useCallback(
		(data) => {
			setImageLoading(true);
			addProviderImage(data)
				.then(({ data }) => {
					providerImages.unshift(data[0]);
				})
				.catch(({ message }) => {
					notify.addNotification(
						alertMessage({ title: 'error', message, type: 'danger' })
					);
				})
				.finally(() => {
					setImageLoading(false);
				});
		},
		[providerImages]
	);
	return (
		<div className='container container-all'>
			<div className='row'>
				<div className='container-fluid'>
					<div className='row'>
						<ReactLoading isShow={imageLoading} />
						{addImagePopup && (
							<AddImage
								isShow={addImagePopup}
								onClose={() => setAddImagePopup(false)}
								onSubmit={addImages}
							/>
						)}
						<div className='col-lg-12 mt-3'>
							<div className='add-image-section'>
								<h2>My Work Images</h2>
								{providerImages.length < 6 && (
									<button
										className='btn btn-info'
										onClick={() => setAddImagePopup(true)}
									>
										+ Add Image{' '}
									</button>
								)}
							</div>
						</div>
						<hr className='line' />
						{providerImages.length === 0 && !loading && (
							<h5 className='error-text'>Nothing Added Yet</h5>
						)}
						{loading
							? [1, 2, 3].map((val) => (
									<div className='col-lg-4 mt-3' key={val}>
										<div className='card'>
											<Skeleton height={348} />
										</div>
									</div>
							  ))
							: providerImages.map(({ id, image }, index) => (
									<div className='col-lg-4 mt-3' key={id}>
										<div class='card'>
											<Image
												className='card-img-top'
												url={image || 'http://via.placeholder.com/300x180'}
												alt='Card image cap'
												height='300px'
											/>
											<div className='card-footer'>
												<div className='d-flex justify-content-center'>
													<button
														onClick={() => removeSingleImage(id, index)}
														className='btn btn-danger'
													>
														Remove <i className='fa fa-trash'> </i>
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

export default memo(Images);
