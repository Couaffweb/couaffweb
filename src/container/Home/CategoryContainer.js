import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { categoriesList } from 'component/comman/Forms/apis';
import { Image } from 'component';
const CategoryContainer = () => {
	const [categoires, setCategoires] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		categoriesList()
			.then(({ data: { result = [] } }) => {
				setCategoires(result);
			})
			.catch(() => {})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return (
		<section className='serch_here'>
			<div className='container'>
				<div className='serch_here1'>
					<div className='row'>
						<div className='col-md-6'>
							<div className='serch_here2'>
								{loading
									? [11, 22, 33, 44, 55, 66, 77, 88, 99].map((val) => (
											<div className='round1' key={val}>
												<span className='round2 co1'>
													<Skeleton circle height='30px' width='30px' />
													<p>
														<Skeleton width='20px' />
													</p>
												</span>
											</div>
									  ))
									: categoires.map(({ id, name, image }) => (
											<div className='round1' key={IDBCursor}>
												<Link
													className='round2 co1'
													to={`search-details/${id}`}
												>
													<Image
														url={`/assest/images/${image}`}
														className='cat-image'
														aria-hidden='true'
													/>
													<p>{name}</p>
												</Link>
											</div>
									  ))}

								{!loading && (
									<Link to='/search-details/0' className='mor'>
										{' '}
										& More
									</Link>
								)}
							</div>
						</div>
						<div className='col-md-6'>
							<div className='serch_here21'>
								<h2>This will be the header</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
									malesuada tortor quis consectetur convallis. Integer quis
									maximus libero.
								</p>
								<Link to='/search-details/0'>Search Here</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default memo(CategoryContainer);
