import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Image } from 'component';
import { resultSearch } from './apis';
import { categoriesList } from 'component/comman/Forms/apis';
const SearchResult = ({
	location: {
		state = {
			id: 0,
			latitude: 0,
			longitude: 0,
			name: 'Near Service Provider',
			locaion: '',
		},
	},
}) => {
	const [searchInfo, setSearchInfo] = useState({ ...state });
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [categories, setCategoires] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState();
	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchInfo.id, searchInfo.latitude, searchInfo.longitude]);
	const fetchData = () => {
		setLoading(true);
		categoriesList(9)
			.then(({ data: { result = [] } }) => {
				setCategoires(result);
			})
			.catch(() => {});

		const { latitude = 0, longitude = 0, id } = searchInfo;
		resultSearch({ latitude, longitude, serviceId: id })
			.then(({ data: { result } }) => {
				setSearchResult(result);
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<>
			<section className='recommended_slider'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h3 className='title3'>Top Results</h3>
						</div>
					</div>
				</div>
			</section>
			<section className='recommended_slider listing11'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h3 className='title3'>
								{searchInfo.name} In ({searchInfo.address || ''})
							</h3>
							<div className='sortb'>
								<div className='dropdown'>
									<button
										className='btn btn-secondary dropdown-toggle'
										type='button'
										id='dropdownMenuButton'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'
									>
										Sort By
									</button>
									<div
										className='dropdown-menu'
										aria-labelledby='dropdownMenuButton'
									>
										<Link className='dropdown-item' to='#'>
											Action
										</Link>
										<Link className='dropdown-item' to='#'>
											Another action
										</Link>
										<Link className='dropdown-item' to='#'>
											Something else here
										</Link>
									</div>
								</div>
							</div>
							{[1, 2, 3].map((val) => (
								<div className='listing' key={val}>
									<div className='row'>
										<div className='col-md-3'>
											<div className='list_img'>
												<Skeleton width='100' height='200px' />
											</div>
										</div>
										<div className='col-md-9'>
											<div className='top_hnd'>
												<Link to=''>
													<strong>
														<Skeleton width='500px' />
													</strong>
													<p>
														<Skeleton width='260px' />
													</p>
												</Link>
											</div>

											{[12, 22].map((v) => (
												<div className='btm_cnt'>
													<div className='purify_G1QImzdPFEZgTe9--pF1c' key={v}>
														<div className='purify_v3uZMLhGy8qUJDizhuo5E'>
															<h3 className='purify_wqgMwye7TnARoARF1p3dc purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
																<Skeleton width='180px' />
															</h3>
															<p>
																<Skeleton width='100px' />
															</p>
														</div>
														<div className='purify_2X6cfNVFiX_rjgGxOTClgf'>
															<div className='purify_ApHsEGcJQQXau-Xh8CB5h'>
																<div className='purify_2yTWP98fyxRuHxfkKhiXXb'>
																	<div>
																		<div className='purify_3vqyS7lnyFQo9f7t5mfXVp purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
																			<Skeleton width='20px' />
																		</div>{' '}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							))}

							<div className='listing'>
								<div className='row'>
									<div className='col-md-3'>
										<div className='list_img'>
											<Image url='/assest/images/l1.jpg' />
											<div className='purify_3ptYO5CmcnzEW5HyFwvqSC purify_Y1prq6mbHtuK9nWzbTqF9 purify_3tt1vpW-yWSKbxaT7g_D6I purify_UF-uFFAoy8SzamnNLWdSo purify_1tSY3I40rjqWWnGR4fy8Wc'>
												<div className='purify_VrJ1HpsSCzC1b15frK5BF purify_2nAP5JlzNYqAL942vfvJrt purify_1rkZUT9Q222TF1-HRC0qWi'>
													5.0
												</div>
												<div className='purify_jYSVgwzoOcOfpiyrJrJSX purify_1MN_nIJ2zinOn-c26cMHl1'>
													75 reviews
												</div>
											</div>
										</div>
									</div>
									<div className='col-md-9'>
										<div className='top_hnd'>
											<Link to=''>
												<strong>Danny Nail’d It</strong>
												<p>7271 Wurzbach Rd, San Antonio, 78240</p>
											</Link>
										</div>
										<div className='btm_cnt'>
											<div className='purify_G1QImzdPFEZgTe9--pF1c'>
												<div className='purify_v3uZMLhGy8qUJDizhuo5E'>
													<h3 className='purify_wqgMwye7TnARoARF1p3dc purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
														Hair cuts, tapers, fades, afros, etc
													</h3>
													<p>
														This service INCLUDES designs. Price of designs may
														vary.
													</p>
												</div>
												<div className='purify_2X6cfNVFiX_rjgGxOTClgf'>
													<div className='purify_ApHsEGcJQQXau-Xh8CB5h'>
														<div className='purify_2yTWP98fyxRuHxfkKhiXXb'>
															<div>
																<div className='purify_3vqyS7lnyFQo9f7t5mfXVp purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
																	$65.00
																</div>{' '}
																<span className='duration purify_3Et0DYxjLaY1d_TqtmRX-U purify_Y1prq6mbHtuK9nWzbTqF9 purify_jEiYoKzkRbjQsWvwUztCr'>
																	1h
																</span>
															</div>
															<div className='purify_3RwjUX8hSiee916iZITO25'>
																<button
																	className='purify_3geqj2n36R8Dg7nylDdXsn purify_22UYJANSsr0z4osYrHmDD4 purify_13fyTWnkyZI2h3hIB4IlUq purify_Tf7q0lyTuYPyoIxLhB6IK purify_1bVBor9L1Nal5qAEUca1vS purify_1rkZUT9Q222TF1-HRC0qWi purify_jEiYoKzkRbjQsWvwUztCr'
																	data-toggle='modal'
																	data-target='#booking'
																>
																	Book
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='btm_cnt'>
											<div className='purify_G1QImzdPFEZgTe9--pF1c'>
												<div className='purify_v3uZMLhGy8qUJDizhuo5E'>
													<h3 className='purify_wqgMwye7TnARoARF1p3dc purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
														Hair cuts, tapers, fades, afros, etc
													</h3>
													<p>
														This service INCLUDES designs. Price of designs may
														vary.
													</p>
												</div>
												<div className='purify_2X6cfNVFiX_rjgGxOTClgf'>
													<div className='purify_ApHsEGcJQQXau-Xh8CB5h'>
														<div className='purify_2yTWP98fyxRuHxfkKhiXXb'>
															<div>
																<div className='purify_3vqyS7lnyFQo9f7t5mfXVp purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
																	$65.00
																</div>{' '}
																<span className='duration purify_3Et0DYxjLaY1d_TqtmRX-U purify_Y1prq6mbHtuK9nWzbTqF9 purify_jEiYoKzkRbjQsWvwUztCr'>
																	1h
																</span>
															</div>
															<div className='purify_3RwjUX8hSiee916iZITO25'>
																<button
																	className='purify_3geqj2n36R8Dg7nylDdXsn purify_22UYJANSsr0z4osYrHmDD4 purify_13fyTWnkyZI2h3hIB4IlUq purify_Tf7q0lyTuYPyoIxLhB6IK purify_1bVBor9L1Nal5qAEUca1vS purify_1rkZUT9Q222TF1-HRC0qWi purify_jEiYoKzkRbjQsWvwUztCr'
																	data-toggle='modal'
																	data-target='#booking'
																>
																	Book
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='btm_cnt'>
											<div className='purify_G1QImzdPFEZgTe9--pF1c'>
												<div className='purify_v3uZMLhGy8qUJDizhuo5E'>
													<h3 className='purify_wqgMwye7TnARoARF1p3dc purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
														Hair cuts, tapers, fades, afros, etc
													</h3>
													<p>
														This service INCLUDES designs. Price of designs may
														vary.
													</p>
												</div>
												<div className='purify_2X6cfNVFiX_rjgGxOTClgf'>
													<div className='purify_ApHsEGcJQQXau-Xh8CB5h'>
														<div className='purify_2yTWP98fyxRuHxfkKhiXXb'>
															<div>
																<div className='purify_3vqyS7lnyFQo9f7t5mfXVp purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
																	$65.00
																</div>{' '}
																<span className='duration purify_3Et0DYxjLaY1d_TqtmRX-U purify_Y1prq6mbHtuK9nWzbTqF9 purify_jEiYoKzkRbjQsWvwUztCr'>
																	1h
																</span>
															</div>
															<div className='purify_3RwjUX8hSiee916iZITO25'>
																<button
																	className='purify_3geqj2n36R8Dg7nylDdXsn purify_22UYJANSsr0z4osYrHmDD4 purify_13fyTWnkyZI2h3hIB4IlUq purify_Tf7q0lyTuYPyoIxLhB6IK purify_1bVBor9L1Nal5qAEUca1vS purify_1rkZUT9Q222TF1-HRC0qWi purify_jEiYoKzkRbjQsWvwUztCr'
																	data-toggle='modal'
																	data-target='#booking'
																>
																	Book
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='pagination2'>
								<nav aria-label='Page navigation example'>
									<ul className='pagination'>
										<li className='page-item'>
											<Link className='page-link' to='#'>
												Previous
											</Link>
										</li>
										<li className='page-item'>
											<Link className='page-link' to='#'>
												1
											</Link>
										</li>
										<li className='page-item'>
											<Link className='page-link' to='#'>
												2
											</Link>
										</li>
										<li className='page-item'>
											<Link className='page-link' to='#'>
												3
											</Link>
										</li>
										<li className='page-item'>
											<Link className='page-link' to='#'>
												Next
											</Link>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='recommended_slider Treatments'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h3 className='title3'>Most Popular Treatments</h3>
							<div className='Treatments1'>
								<div className='row'>
									{loading
										? [1, 2, 3].map((val) => (
												<div className='col-lg-4 col-md-6'>
													<div className=''>
														<Skeleton width='100%' height='50px'>
															<i
																className='fa fa-arrow-right'
																aria-hidden='true'
															></i>
														</Skeleton>
													</div>
												</div>
										  ))
										: categories.map(({ id, name }) => (
												<div className='col-lg-4 col-md-6'>
													<Link
														to={`/search-details/${id}`}
														className='treat_text'
													>
														<strong>{name}</strong>
														<i
															className='fa fa-arrow-right'
															aria-hidden='true'
														></i>
													</Link>
												</div>
										  ))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default memo(SearchResult);
