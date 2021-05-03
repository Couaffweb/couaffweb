import React, { useState, useEffect, memo } from 'react';
import { Image } from 'component';
import Skeleton from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { TopRatedInfo } from './apis';
const ToRated = () => {
	const history = useHistory();
	const [topMassgerRated, setTopMassgerRated] = useState([]);
	const [loading, setLoading] = useState(true);
	const redirect = (id = 1) => {
		history.push('/provider-details', {
			state: id,
		});
	};
	useEffect(() => {
		getRatingFormServer();
	}, []);
	const getRatingFormServer = () => {
		TopRatedInfo()
			.then(({ data: { result } }) => {
				setTopMassgerRated(result);
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<section className='team'>
			<div className='container'>
				<div className='row align-items-center h-100 '>
					<div className='col-md-12 mb-2'>
						<div className='how_it'>
							<h2 className='title2'>Top Rated Professionals </h2>
						</div>
					</div>
					{loading
						? [1, 2, 3, 4].map((val) => (
								<div className='col-md-6 col-lg-3' key={val}>
									<div className='all_team'>
										<span>
											<div className='team_Image'>
												<Skeleton height={150} />
											</div>
											<div className='team_text'>
												<h2>
													<Skeleton width={140} />
												</h2>
												<h1>
													<Skeleton width={70} />
												</h1>
											</div>
										</span>
									</div>
								</div>
						  ))
						: topMassgerRated.map(({ profile, name, id, location }) => (
								<div className='col-md-6 col-lg-3' key={id}>
									<div className='all_team'>
										<span onClick={() => redirect(id)}>
											<div className='team_Image'>
												<Image
													className='top-rated '
													url={profile || 'assest/images/top1.png'}
												/>
											</div>
											<div className='team_text'>
												<h2>{name}</h2>
												<h1>{location}</h1>
												<p>
													<i className='fas fa-star' aria-hidden='true'></i>
													<i className='fas fa-star' aria-hidden='true'></i>
													<i className='fas fa-star' aria-hidden='true'></i>
													<i className='fas fa-star' aria-hidden='true'></i>
													<i className='fas fa-star' aria-hidden='true'></i>
													233 Reviews
												</p>
											</div>
										</span>
									</div>
								</div>
						  ))}
				</div>
			</div>
		</section>
	);
};

export default memo(ToRated);
