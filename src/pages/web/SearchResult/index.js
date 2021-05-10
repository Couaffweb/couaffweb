import React, { memo, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Image, BookService, Paginations } from 'component';
import { resultSearch } from './apis';
import { categoriesList } from 'component/comman/Forms/apis';
import { parseUrl } from 'utils';
const SearchResult = ({
	history,
	match: {
		params: { category_id = 0 },
	},
	location: {
		state = {
			id: 0,
			latitude: 0,
			longitude: 0,
			name: 'Providers',
			address: 'Near me',
		},
	},
}) => {
	const [searchInfo] = useState({ ...state });
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [categories, setCategoires] = useState([]);
	const [categoryLoading, setCategoryLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(
		parseInt(parseUrl(history.location.search, 'page')) || 1
	);
	const [totalPage, setTotalPage] = useState(1);
	useEffect(() => {
		if (parseInt(category_id) !== 0) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category_id]);
	useEffect(() => {
		categoriesList(9)
			.then(({ data: { result = [] } }) => {
				setCategoires(result);
				setCategoryLoading(false);
			})
			.catch(() => {
				setCategoryLoading(false);
			});
	}, []);
	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchInfo.id, searchInfo.latitude, searchInfo.longitude, currentPage]);
	const fetchData = () => {
		setLoading(true);

		const { latitude = 0, longitude = 0, id } = searchInfo;
		resultSearch({
			latitude,
			longitude,
			serviceId: id,
			page: currentPage,
			categoryId: category_id,
			limit: 10,
		})
			.then(({ data: { result, pagination } }) => {
				setSearchResult(result);
				setTotalPage(pagination.totalPage);
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	};
	const handlePage = useCallback(
		(pageNo) => {
			setCurrentPage(pageNo);
		},
		[setCurrentPage]
	);
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
								{searchInfo.name || 'Providers'} In (
								{searchInfo.address || 'Near me'})
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
									></div>
								</div>
							</div>
							{loading
								? [1, 2, 3].map((val) => (
										<div className='listing' key={val}>
											<div className='row'>
												<div className='col-md-3'>
													<div className='list_img'>
														<Skeleton width='100' height='200px' />
													</div>
												</div>
												<div className='col-md-9'>
													<div className='top_hnd'>
														<Link to='/'>
															<strong>
																<Skeleton width='500px' />
															</strong>
															<p>
																<Skeleton width='260px' />
															</p>
														</Link>
													</div>

													{[12, 22].map((v) => (
														<div className='btm_cnt' key={v}>
															<div className='purify_G1QImzdPFEZgTe9--pF1c'>
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
								  ))
								: searchResult.map(({ providerInfo, service }) => (
										<div className='listing' key={providerInfo.id}>
											<div className='row'>
												<div className='col-md-3'>
													<Link
														to={{
															pathname: `/provider-details/${providerInfo.id}`,
															state: { info: providerInfo },
														}}
													>
														<div className='list_img'>
															<Image
																url={
																	providerInfo.profile ||
																	'/assest/images/l1.jpg'
																}
															/>
															<div className='purify_3ptYO5CmcnzEW5HyFwvqSC purify_Y1prq6mbHtuK9nWzbTqF9 purify_3tt1vpW-yWSKbxaT7g_D6I purify_UF-uFFAoy8SzamnNLWdSo purify_1tSY3I40rjqWWnGR4fy8Wc'>
																<div className='purify_VrJ1HpsSCzC1b15frK5BF purify_2nAP5JlzNYqAL942vfvJrt purify_1rkZUT9Q222TF1-HRC0qWi'>
																	{providerInfo.totalRating}
																</div>
																<div className='purify_jYSVgwzoOcOfpiyrJrJSX purify_1MN_nIJ2zinOn-c26cMHl1'>
																	{providerInfo.totalReview} reviews
																</div>
															</div>
														</div>
													</Link>
												</div>
												<div className='col-md-9'>
													<div className='top_hnd'>
														<Link
															to={{
																pathname: `/provider-details/${providerInfo.id}`,
																state: { info: providerInfo },
															}}
														>
															<strong>{providerInfo.name}</strong>
															<p>{providerInfo.location}</p>
														</Link>
													</div>
													{service.map(({ id, name, price }) => (
														<div className='btm_cnt' key={id}>
															<div className='purify_G1QImzdPFEZgTe9--pF1c'>
																<div className='purify_v3uZMLhGy8qUJDizhuo5E'>
																	<h3 className='purify_wqgMwye7TnARoARF1p3dc purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
																		{name}
																	</h3>
																	<p></p>
																</div>
																<div className='purify_2X6cfNVFiX_rjgGxOTClgf'>
																	<div className='purify_ApHsEGcJQQXau-Xh8CB5h'>
																		<div className='purify_2yTWP98fyxRuHxfkKhiXXb'>
																			<div>
																				<div className='purify_3vqyS7lnyFQo9f7t5mfXVp purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
																					${price}
																				</div>{' '}
																			</div>
																			<div className='purify_3RwjUX8hSiee916iZITO25'>
																				<BookService
																					className='purify_3geqj2n36R8Dg7nylDdXsn purify_22UYJANSsr0z4osYrHmDD4 purify_13fyTWnkyZI2h3hIB4IlUq purify_Tf7q0lyTuYPyoIxLhB6IK purify_1bVBor9L1Nal5qAEUca1vS purify_1rkZUT9Q222TF1-HRC0qWi purify_jEiYoKzkRbjQsWvwUztCr'
																					services_ids={id}
																					massagerId={providerInfo.id}
																					price={price}
																				/>
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
							{searchResult.length === 0 && (
								<h2 className='error-text d-flex justify-content-center'>
									No Record found
								</h2>
							)}
							<Paginations
								className='pagination2'
								currentPage={currentPage}
								pageRangeDisplayed={5}
								totalPage={totalPage}
								onChange={handlePage}
							/>
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
									{categoryLoading
										? [1, 2, 3].map((val) => (
												<div className='col-lg-4 col-md-6' key={val}>
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
												<div
													className={`${
														parseInt(category_id) === id ? 'active' : ''
													} col-lg-4 col-md-6`}
													key={id}
												>
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
