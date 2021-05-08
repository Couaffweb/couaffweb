import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { Image, MAP, BookService, Input } from 'component';
import { useDebounce } from 'hooks';
import { providerService, getRatings } from './apis';
const ProviderDetails = ({ match: { params }, location: { state = {} } }) => {
	const [providerInfo, setProviderInfo] = useState(state.info || {});
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [providerRating, setProviderRating] = useState({
		loading: false,
		userRatings: [],
	});
	const debouncedSearchTerm = useDebounce(search, 500);
	useEffect(() => {
		fetchData();
		getProviderRating();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id]);
	useEffect(() => {
		fetchData(search);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm]);
	const getProviderRating = () => {
		setProviderRating({ ...providerRating, loading: true });
		getRatings(params.id)
			.then(({ data: { result = [] } }) => {
				setProviderRating({ userRatings: result, loading: false });
			})
			.catch();
	};
	const fetchData = (search = '') => {
		setLoading(true);
		providerService(params.id, search)
			.then(({ data: { services, massagerInfo } }) => {
				setProviderInfo(massagerInfo);
				setServices(services.result);
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<section className='Business_details'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-8'>
						<div className='silder11'>
							<div
								id='carouselExampleIndicators'
								className='carousel slide'
								data-ride='carousel'
							>
								<ol className='carousel-indicators'>
									<li
										data-target='#carouselExampleIndicators'
										data-slide-to='0'
										className='active'
									></li>
									<li
										data-target='#carouselExampleIndicators'
										data-slide-to='1'
									></li>
									<li
										data-target='#carouselExampleIndicators'
										data-slide-to='2'
									></li>
								</ol>
								<div className='carousel-inner'>
									<div className='carousel-item active'>
										<Image
											className='d-block w-100'
											url={providerInfo.profile || '/assest/images/barber.PNG'}
											alt='First slide'
										/>
									</div>
									<div className='carousel-item'>
										<Image
											className='d-block w-100'
											url='/assest/images/barber1.jpeg'
											alt='Second slide'
										/>
									</div>
									<div className='carousel-item'>
										<Image
											className='d-block w-100'
											url='/assest/images/barber2.jpeg'
											alt='Third slide'
										/>
									</div>
								</div>
								<Link
									className='carousel-control-prev'
									href='#carouselExampleIndicators'
									role='button'
									data-slide='prev'
								>
									<span
										className='carousel-control-prev-icon'
										aria-hidden='true'
									></span>
									<span className='sr-only'>Previous</span>
								</Link>
								<a
									className='carousel-control-next'
									href='#carouselExampleIndicators'
									role='button'
									data-slide='next'
								>
									<span
										className='carousel-control-next-icon'
										aria-hidden='true'
									></span>
									<span className='sr-only'>Next</span>
								</a>
							</div>
							<div className='purify_3ptYO5CmcnzEW5HyFwvqSC purify_Y1prq6mbHtuK9nWzbTqF9 purify_3tt1vpW-yWSKbxaT7g_D6I purify_UF-uFFAoy8SzamnNLWdSo purify_1tSY3I40rjqWWnGR4fy8Wc'>
								<div className='purify_VrJ1HpsSCzC1b15frK5BF purify_2nAP5JlzNYqAL942vfvJrt purify_1rkZUT9Q222TF1-HRC0qWi'>
									{providerInfo.totalRating}
								</div>
								<div className='purify_jYSVgwzoOcOfpiyrJrJSX purify_1MN_nIJ2zinOn-c26cMHl1'>
									{providerInfo.totalReview} reviews
								</div>
							</div>
						</div>

						<div className='purify_L83AzFuVDcsMUGu-iworl purify_2se5gmL9KHmm2yN4OtqL_X purify_2SvKv3MmhxAqq-wQiZJQc3 purify_g4ZFx3Vp_j_IFmMZMFN6T'>
							<div className='purify_1NZ8fvAg5iM_eHIylYQgHS'>
								<div style={{ width: '100%' }}>
									<h1 className='purify_1sQI6P3rgyGZvU5pf3yAvt purify_3k1NnTEGO6TSunXbY5Zrkx'>
										{providerInfo.name}
									</h1>
									<div className='purify_2U3GPA6ftCkPxPR_0NKXCC purify_Y1prq6mbHtuK9nWzbTqF9 purify_jEiYoKzkRbjQsWvwUztCr'>
										<div className=''>{providerInfo.location}</div>
									</div>
								</div>
								<div
									mode='default'
									className='purify_3otKsdI9lS_D92PQCSq2Lw purify_bcGIHqRb-2k3e0m3uLOFA purify_3dd8BXoCuu778Lk9arqv--'
									style={{ width: '36px', height: '36px' }}
								>
									<Link href='#'>
										<i className='fa fa-heart' aria-hidden='true'></i>
									</Link>
								</div>
							</div>
						</div>

						<div className='servicds'>
							<div className='purify_2Bb9PTqxYaK9qlbr90yc5f'>
								<h2 className='purify_2jycfUvFB5_MR7TPv5oX2A purify_1rkZUT9Q222TF1-HRC0qWi purify_1kwtwINWAYWvhdUjnzbb80'>
									Services
								</h2>
								<div className='purify_1yywQqdPiQchSF0Y8TcNoc'>
									<div
										type='search'
										aria-label='Search for service'
										placeholder='Search for service'
										value=''
									>
										<div className='purify_2BjQo2x5lZgAUDswjCcd8_ purify_391_SXUf6kTrP1fzafcEJU purify_1bVBor9L1Nal5qAEUca1vS purify_2LKEPV2U5S_LcccI6-gGBp purify_1pt98fHyv-ddtlHlR7ZSoM'>
											<div>
												<Input
													onChange={({ target: { value } }) => setSearch(value)}
													value={search}
													type='search'
													aria-label='Search for service'
													placeholder='Search for service'
													className='purify_1ZTfTbZjaVbhUkBRHyt0eY purify_Y1prq6mbHtuK9nWzbTqF9 purify_264bF_d7zMnGqSAM6litJ_'
												/>

												<div className='purify_BVPUBE4mrr3sjRuRGjGW1'>
													<div
														mode='default'
														className='purify_3otKsdI9lS_D92PQCSq2Lw'
													>
														<i className='fas fa-search'></i>
													</div>
												</div>
											</div>
										</div>
										<div></div>
									</div>
								</div>
							</div>
						</div>

						<div className='acordina'>
							<div id='accordion'>
								{!loading && services.length === 0 && (
									<div className='error-text'>No service found</div>
								)}
								{loading
									? [1, 2, 3, 4].map((val) => (
											<div className='card' key={val}>
												<div className='card-header'>
													<span
														className='card-link collapsed'
														data-toggle='collapse'
														role='button'
														tabIndex='1'
													>
														<Skeleton width={300} />
													</span>
												</div>
												<div className=''>
													<div className='card-body'>
														<ul className='purify_1noWHOyaADqV7ZoPnoK6YA'>
															<li className='purify_pxwM-croMXL8QulS7HGwl'>
																<div className='purify_G1QImzdPFEZgTe9--pF1c'>
																	<div className='purify_v3uZMLhGy8qUJDizhuo5E'>
																		<h3 className='purify_wqgMwye7TnARoARF1p3dc purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
																			<Skeleton width={200} />
																		</h3>
																	</div>
																	<div className='purify_2X6cfNVFiX_rjgGxOTClgf'>
																		<div className='purify_ApHsEGcJQQXau-Xh8CB5h'>
																			<div className='purify_2yTWP98fyxRuHxfkKhiXXb'>
																				<div>
																					<div className='purify_3vqyS7lnyFQo9f7t5mfXVp purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
																						<Skeleton width={100} />
																					</div>{' '}
																					<span className='duration purify_3Et0DYxjLaY1d_TqtmRX-U purify_Y1prq6mbHtuK9nWzbTqF9 purify_jEiYoKzkRbjQsWvwUztCr'></span>
																				</div>
																				<div className='purify_3RwjUX8hSiee916iZITO25'></div>
																			</div>
																		</div>
																	</div>
																</div>
															</li>
														</ul>
													</div>
												</div>
											</div>
									  ))
									: services.map(({ id, name, price, image }) => (
											<div className='card' key={id}>
												<div className='card-header'>
													<span
														className='card-link collapsed'
														data-toggle='collapse'
														role='button'
														tabIndex='1'
													>
														{name}
														<i>${price}</i>
													</span>
												</div>
												<div className=''>
													<div className='card-body'>
														<ul className='purify_1noWHOyaADqV7ZoPnoK6YA'>
															<li className='purify_pxwM-croMXL8QulS7HGwl'>
																<div className='purify_G1QImzdPFEZgTe9--pF1c'>
																	<div className='purify_v3uZMLhGy8qUJDizhuo5E'>
																		<h3 className='purify_wqgMwye7TnARoARF1p3dc purify_3k1NnTEGO6TSunXbY5Zrkx purify_264bF_d7zMnGqSAM6litJ_'>
																			<Image
																				url={image}
																				className='service-detail-image'
																			/>
																		</h3>
																	</div>
																	<div className='purify_2X6cfNVFiX_rjgGxOTClgf'>
																		<div className='purify_ApHsEGcJQQXau-Xh8CB5h'>
																			<div className='purify_2yTWP98fyxRuHxfkKhiXXb'>
																				<div className='purify_3RwjUX8hSiee916iZITO25'>
																					<BookService
																						services_ids={id}
																						massagerId={providerInfo.id}
																						price={price}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</li>
														</ul>
													</div>
												</div>
											</div>
									  ))}
							</div>
						</div>
						<div className='venue See '>
							<h4>See Our Work</h4>
							<div className='row'>
								<div className='  col-md-4 col-sm-6 mb-3'>
									<Link to='#'>
										<Image url='/assest/images/b.JPEG' />
									</Link>
								</div>
								<div className='  col-md-4 col-sm-6 mb-3'>
									<Link to='#'>
										<Image url='/assest/images/b2.JPEG' />
									</Link>
								</div>
								<div className='  col-md-4 col-sm-6 mb-3'>
									<Link to='#'>
										<Image url='/assest/images/b1.JPEG' />
									</Link>
								</div>
								<div className='  col-md-4 col-sm-6 mb-3'>
									<Link to='#'>
										<Image url='/assest/images/b5.JPEG' />
									</Link>
								</div>
								<div className='  col-md-4 col-sm-6 mb-3'>
									<Link to='#'>
										<Image url='/assest/images/b4.JPEG' />
									</Link>
								</div>
								<div className='  col-md-4 col-sm-6 mb-3'>
									<Link to='#'>
										<Image url='/assest/images/b.JPEG' />
									</Link>
								</div>
							</div>
							<hr />
						</div>
						<div className='revie'>
							<div className='purify_3nJh_zj15_yteEfXQai8_E'>
								<div className='purify_pbi2yi0foJGfKM4uiJhtE'>
									<h2 className='purify_2SWmjNNRlVfF57OgFsjnAn purify_1rkZUT9Q222TF1-HRC0qWi purify_1kwtwINWAYWvhdUjnzbb80'>
										Reviews
									</h2>
									<div className='purify_2X3G2Tw7_2Y0cGb7aNmwFg purify_Y1prq6mbHtuK9nWzbTqF9 purify_264bF_d7zMnGqSAM6litJ_'>
										Reviews are no joke! Couaff values authentic reviews and
										only verifies them if we know the reviewer has visited this
										business.
									</div>
									<div></div>
								</div>
								<div className='purify_2ejQNvhE_VYsxcE709H9Pw'>
									<div className='purify_9Cy-RHFxaOj60XZ5e271l'>
										<div className='purify_AsVoxIFDw5Y_5e6NSysK2'>
											<div className='purify_3gaZGLTrTpBMOCi6MxRFKl purify_Y1prq6mbHtuK9nWzbTqF9 purify_Jo_pJo5C9YAbReoZm7ALD'>
												{providerInfo.totalRating}
												<span className='purify_wcIXCnwwFxUeCkbrK0R1T purify_Y1prq6mbHtuK9nWzbTqF9 purify_264bF_d7zMnGqSAM6litJ_'>
													/5
												</span>
											</div>
											<ReactStars
												edit={false}
												count={5}
												size={20}
												activeColor='#ffd700'
												value={providerInfo.totalRating}
											/>
											<div className='purify_AhojriMtGGWEpdGeIdJFE purify_Y1prq6mbHtuK9nWzbTqF9 purify_jEiYoKzkRbjQsWvwUztCr'>
												{providerInfo.totalReview} reviews
											</div>
										</div>

										<ul className='purify_12NB-KoHvfjsnMl6F-Ge7_'>
											<li className='purify_gtpPOQvAFuzASPsZxiTm5'>
												<div className='purify_2ZJEuBF5oxqLkYyHt7JO41 purify_Y1prq6mbHtuK9nWzbTqF9 purify_1MN_nIJ2zinOn-c26cMHl1'>
													5
												</div>
												<div
													mode='default'
													className='purify_3otKsdI9lS_D92PQCSq2Lw purify_URcswKAGNgCBtv_eN2-e'
													icon='star'
													style={{ width: '9px', height: '9px' }}
												>
													<i className='fa fa-star' aria-hidden='true'></i>
												</div>
												<div className='purify_1ektmDihKTZMvhSWRYBGeN'>
													<i className='purify_39yRTKNPUdHam0BYy9t7S0'></i>{' '}
													<i style={{ width: '100%' }}></i>
												</div>
												<div className='purify_21ErlnIB0xXKqFKFb8FKoD purify_3k1NnTEGO6TSunXbY5Zrkx purify_1MN_nIJ2zinOn-c26cMHl1'>
													{providerInfo.rating5}
												</div>
											</li>
											<li className='purify_gtpPOQvAFuzASPsZxiTm5'>
												<div className='purify_2ZJEuBF5oxqLkYyHt7JO41 purify_Y1prq6mbHtuK9nWzbTqF9 purify_1MN_nIJ2zinOn-c26cMHl1'>
													4
												</div>
												<div
													mode='default'
													className='purify_3otKsdI9lS_D92PQCSq2Lw purify_URcswKAGNgCBtv_eN2-e'
													icon='star'
													style={{ width: '9px', height: '9px' }}
												>
													<i className='fa fa-star' aria-hidden='true'></i>
												</div>
												<div className='purify_1ektmDihKTZMvhSWRYBGeN'>
													<i className='purify_39yRTKNPUdHam0BYy9t7S0'></i>{' '}
													<i style={{ width: '1.35%' }}></i>
												</div>
												<div className='purify_21ErlnIB0xXKqFKFb8FKoD purify_3k1NnTEGO6TSunXbY5Zrkx purify_1MN_nIJ2zinOn-c26cMHl1'>
													{providerInfo.rating4}
												</div>
											</li>
											<li className='purify_gtpPOQvAFuzASPsZxiTm5'>
												<div className='purify_2ZJEuBF5oxqLkYyHt7JO41 purify_Y1prq6mbHtuK9nWzbTqF9 purify_1MN_nIJ2zinOn-c26cMHl1'>
													3
												</div>
												<div
													mode='default'
													className='purify_3otKsdI9lS_D92PQCSq2Lw purify_URcswKAGNgCBtv_eN2-e'
													icon='star'
													style={{ width: '9px', height: '9px' }}
												>
													<i className='fa fa-star' aria-hidden='true'></i>
												</div>
												<div className='purify_1ektmDihKTZMvhSWRYBGeN'>
													<i className='purify_39yRTKNPUdHam0BYy9t7S0'></i>{' '}
													<i style={{ width: '0%' }}></i>
												</div>
												<div className='purify_21ErlnIB0xXKqFKFb8FKoD purify_3k1NnTEGO6TSunXbY5Zrkx purify_1MN_nIJ2zinOn-c26cMHl1'>
													{providerInfo.rating3}
												</div>
											</li>
											<li className='purify_gtpPOQvAFuzASPsZxiTm5'>
												<div className='purify_2ZJEuBF5oxqLkYyHt7JO41 purify_Y1prq6mbHtuK9nWzbTqF9 purify_1MN_nIJ2zinOn-c26cMHl1'>
													2
												</div>
												<div
													mode='default'
													className='purify_3otKsdI9lS_D92PQCSq2Lw purify_URcswKAGNgCBtv_eN2-e'
													icon='star'
													style={{ width: '9px', height: '9px' }}
												>
													<i className='fa fa-star' aria-hidden='true'></i>
												</div>
												<div className='purify_1ektmDihKTZMvhSWRYBGeN'>
													<i className='purify_39yRTKNPUdHam0BYy9t7S0'></i>{' '}
													<i style={{ width: '0%' }}></i>
												</div>
												<div className='purify_21ErlnIB0xXKqFKFb8FKoD purify_3k1NnTEGO6TSunXbY5Zrkx purify_1MN_nIJ2zinOn-c26cMHl1'>
													{providerInfo.rating2}
												</div>
											</li>
											<li className='purify_gtpPOQvAFuzASPsZxiTm5'>
												<div className='purify_2ZJEuBF5oxqLkYyHt7JO41 purify_Y1prq6mbHtuK9nWzbTqF9 purify_1MN_nIJ2zinOn-c26cMHl1'>
													1
												</div>
												<div
													mode='default'
													className='purify_3otKsdI9lS_D92PQCSq2Lw purify_URcswKAGNgCBtv_eN2-e'
													icon='star'
													style={{ width: '9px', height: '9px;' }}
												>
													<i className='fa fa-star' aria-hidden='true'></i>
												</div>
												<div className='purify_1ektmDihKTZMvhSWRYBGeN'>
													<i className='purify_39yRTKNPUdHam0BYy9t7S0'></i>{' '}
													<i style={{ width: '0%' }}></i>
												</div>
												<div className='purify_21ErlnIB0xXKqFKFb8FKoD purify_3k1NnTEGO6TSunXbY5Zrkx purify_1MN_nIJ2zinOn-c26cMHl1'>
													{providerInfo.rating1}
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<hr />
						<div className='review_section'>
							{providerRating.loading
								? [1, 2, 3].map((val, index) => (
										<div
											className='purify_3dF0FXNcrAxxOjRAE0aOsu purify_2Ijx6eI6-t0edptgYNLYbX'
											key={val}
										>
											<div className='purify_2ufga5qKONQ261zJK_WBBS'>
												<div className='purify_1QoAiUxWDSBK8wGfk8vDGQ'>
													<div className='purify_2hl-U9Yi40L_luyHbfOS6Z'>
														<div
															mode='default'
															className='purify_3otKsdI9lS_D92PQCSq2Lw purify_1fSPSyzOPL3R-eoK09yuB5 purify_1W84gb1Ee49s0ToCV2uUbR'
															style={{ width: '32px', height: '32px;' }}
														>
															<i className='fas fa-user'></i>
														</div>
													</div>
													<div
														className='purify_2hl-U9Yi40L_luyHbfOS6Z'
														key={val}
													>
														<h3>
															{' '}
															<Skeleton width={20} />
														</h3>

														<div className='purify_1-RMaVd8UGDv2TOFLBbhSv purify_1k6778cT50NgxFa37XCsWy'>
															<div className='purify_1zyl9HeT-UsSF6ESnsKN9T purify_3pVl4aKEjYb-8ZEiWIjbII purify_JAS0fqZBY3uAN-miq-119'>
																<Skeleton width={30} />
															</div>
															<span className='purify_pQ62lLFvRLzEWf0pGOYxm purify_Y1prq6mbHtuK9nWzbTqF9 purify_jEiYoKzkRbjQsWvwUztCr'>
																<Skeleton width={10} />
															</span>
														</div>
													</div>
													{index === 0 && (
														<div className='purify_2hl-U9Yi40L_luyHbfOS6Z aa'>
															<div className='purify_3NyHwUfUZdJ6aXn9_MQ7jS purify_3k1NnTEGO6TSunXbY5Zrkx purify_1MN_nIJ2zinOn-c26cMHl1'>
																Verified by Couaff{' '}
																<div
																	mode='default'
																	className='purify_3otKsdI9lS_D92PQCSq2Lw purify_3LuOxxVZw04CKZgGLCicVW'
																	style={{ width: '14px', height: '14px' }}
																>
																	<i className='fas fa-check-circle'></i>
																</div>
															</div>
															<span className='purify_27N-FGVWIzdUy-94Bzpcyj purify_Y1prq6mbHtuK9nWzbTqF9 purify_1MN_nIJ2zinOn-c26cMHl1'>
																Report{' '}
																<div
																	mode='default'
																	className='purify_3otKsdI9lS_D92PQCSq2Lw purify_3LuOxxVZw04CKZgGLCicVW'
																>
																	<i
																		className='fa fa-flag'
																		aria-hidden='true'
																	></i>
																</div>
															</span>
														</div>
													)}
													<div className='purify_3HXjnceCTDjB4HA57RuGnk purify_Y1prq6mbHtuK9nWzbTqF9 purify_264bF_d7zMnGqSAM6litJ_'>
														<Skeleton width={100} />
													</div>
												</div>
											</div>
										</div>
								  ))
								: providerRating.userRatings.map(
										({ id, name, comment, rating, created, profile }) => (
											<div>
												<div className='review' key={id}>
													<div className='user-image'>
														<Image url={profile || '/assest/images/top1.png'} />
													</div>
													<div className='user-review'>
														<h6>{name}</h6>
														<ReactStars
															edit={false}
															count={5}
															size={10}
															activeColor='#ffd700'
															value={rating}
														/>
													</div>

													<div className='last-section'></div>
												</div>
												<div className='comment-div'>
													<div>{comment}</div>
													<div>{new Date(created * 1000).toUTCString()}</div>
												</div>
												<hr />
											</div>
										)
								  )}
						</div>
					</div>

					<div className='col-md-4'>
						<div className='mp'>
							<MAP
								lat={providerInfo.latitude}
								lng={providerInfo.lognitude}
								name={providerInfo.name}
								height='200px;'
							/>
						</div>
						<div className='aboutaa'>
							<h4 className='title4'>About Provider</h4>
							<p>{providerInfo.about_us}</p>
						</div>
						<div className='Contactusiness'>
							<h4 className='title4'>Contact & Business hours</h4>
							<div className='con'>
								<div className='con1'>
									<i className='fa fa-phone' aria-hidden='true'></i>
									{providerInfo.phone}
									<button>Call</button>
								</div>
							</div>
						</div>

						<div className='busins'>
							<div className='business-time'>
								<div className='days1'>Sunday</div>
								<div className='timeing'>10:00 AM - 10:00 PM</div>
							</div>
							<div className='business-time'>
								<div className='days1'>Sunday</div>
								<div className='timeing'>10:00 AM - 10:00 PM</div>
							</div>
							<div className='business-time'>
								<div className='days1'>Sunday</div>
								<div className='timeing'>10:00 AM - 10:00 PM</div>
							</div>
							<div className='business-time'>
								<div className='days1'>Sunday</div>
								<div className='timeing'>10:00 AM - 10:00 PM</div>
							</div>
							<div className='business-time'>
								<div className='days1'>Sunday</div>
								<div className='timeing'>10:00 AM - 10:00 PM</div>
							</div>
							<div className='business-time'>
								<div className='days1'>Sunday</div>
								<div className='timeing'>10:00 AM - 10:00 PM</div>
							</div>
							<div className='business-time'>
								<div className='days1'>Sunday</div>
								<div className='timeing'>10:00 AM - 10:00 PM</div>
							</div>
						</div>

						<p className='purify_IOiISPWJndtcc4r9FXmCL purify_Y1prq6mbHtuK9nWzbTqF9 purify_jEiYoKzkRbjQsWvwUztCr'>
							Call {providerInfo.phone} , sundays are strictly appointment only.
						</p>

						<Link to='#' className='rp'>
							Report <i className='fas fa-arrow-right'></i>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
ProviderDetails.propType = {
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
};

export default memo(ProviderDetails);
