import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import ReactStars from 'react-rating-stars-component';
import SimpleImageSlider from 'react-simple-image-slider';
import { Link } from 'react-router-dom';
import { Image, MAP, BookService, Input } from 'component';
import { useDebounce } from 'hooks';
import { spliceText, hourFormate } from 'utils';
import { providerService, getRatings } from './apis';
const ProviderDetails = ({ match: { params }, location: { state = {} } }) => {
	const [providerInfo, setProviderInfo] = useState(state.info || {});
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [silderImages, setSilderImages] = useState([]);
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
	const seeMore = (index, type) => {
		const currentService = { ...services[index] };
		currentService['isShow'] = type;
		services[index] = currentService;
		setServices([...services]);
	};
	const getProviderRating = () => {
		setProviderRating({ ...providerRating, loading: true });
		getRatings(params.id)
			.then(({ data: { result = [] } }) => {
				setProviderRating({ userRatings: result, loading: false });
			})
			.catch(() => {
				setProviderRating({ ...providerRating, loading: false });
			});
	};
	const fetchData = (search = '') => {
		setLoading(true);
		providerService(params.id, search)
			.then(({ data: { services, massagerInfo } }) => {
				setProviderInfo(massagerInfo);
				setServices(services.result);
				const newImages = [
					{
						url: massagerInfo?.profile || '/assest/images/top1.png',
					},
				];
				massagerInfo.userImages.forEach(({ image }) => {
					newImages.push({ url: image });
				});
				setSilderImages(newImages);
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	};
	const openPhone = (phone) => {
		window.open(`tel:+${phone}`, '_blank');
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
								{silderImages.length > 0 ? (
									<SimpleImageSlider
										showBullets
										showNavs
										useGPURender
										height={450}
										width='100%'
										images={silderImages}
									/>
								) : (
									<div className='carousel-inner'>
										<div className='carousel-item active'>
											<Image
												className='d-block w-100'
												url={
													providerInfo.profile || '/assest/images/barber.PNG'
												}
												alt='First slide'
											/>
										</div>
									</div>
								)}
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
									<Link to='#'>
										<i className='fa fa-heart' aria-hidden='true'></i>
									</Link>
								</div>
							</div>
						</div>

						<div className='servicds'>
							<div className='purify_2Bb9PTqxYaK9qlbr90yc5f'>
								{false && (
									<h2 className='purify_2jycfUvFB5_MR7TPv5oX2A purify_1rkZUT9Q222TF1-HRC0qWi purify_1kwtwINWAYWvhdUjnzbb80'>
										Services
									</h2>
								)}
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
									? [77, 23, 35, 44].map((val) => (
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
									: services.map(
											(
												{ id, name, price, image, description, isShow = false },
												index
											) => (
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
																			{description && (
																				<>
																					<h6
																						className='click-button'
																						role='button'
																						tab-tabIndex='1'
																						onClick={() =>
																							seeMore(index, !isShow)
																						}
																						onKeyPress={() =>
																							seeMore(index, !isShow)
																						}
																					>
																						{spliceText(
																							description,
																							40,
																							isShow
																						)}
																					</h6>
																					<hr />
																				</>
																			)}
																			<div className='booking-section'>
																				<Image
																					url={image}
																					className='service-detail-image'
																				/>
																				<div>
																					<BookService
																						services_ids={id}
																						massagerId={providerInfo.id}
																						price={price}
																						workingHours={
																							providerInfo.working_hours &&
																							JSON.parse(
																								providerInfo.working_hours
																							)
																						}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																</li>
															</ul>
														</div>
													</div>
												</div>
											)
									  )}
							</div>
						</div>
						<div className='venue See '>
							<h4>See Our Work</h4>
							<br />
							<div className='row'>
								{!loading && providerInfo?.userImages?.length === 0 && (
									<h4 className='error-text'>No Image Provide By Provider</h4>
								)}
								{loading
									? [1, 2, 3].map((id) => (
											<div className='col-md-4 col-sm-6 mb-3' key={id}>
												<Link to='#'>
													<Skeleton height='181px' />
												</Link>
											</div>
									  ))
									: providerInfo?.userImages?.map(({ id, image }) => (
											<div className='col-md-4 col-sm-6 mb-3' key={id}>
												<Link to='#'>
													<Image
														className='provider-work-image'
														url={image || '/assest/images/b.JPEG'}
														height='181px'
													/>
												</Link>
											</div>
									  ))}
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
													style={{ width: '9px', height: '9px' }}
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
								? [11, 22, 33].map((val) => (
										<div key={val}>
											<div className='review'>
												<div className='user-image'>
													<Skeleton
														height={30}
														width={30}
														circle
														className='img-skel'
													/>
												</div>
												<div className='user-review'>
													<h6>
														<Skeleton width='50px' />
													</h6>
													<Skeleton width='90px' />
												</div>

												<div className='last-section'></div>
											</div>
											<div className='comment-div'>
												<div>
													<Skeleton width='290px' />
												</div>
											</div>
											<hr />
										</div>
								  ))
								: providerRating.userRatings.map(
										({ id, name, comment, rating, created, profile }) => (
											<div key={id}>
												<div className='review'>
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
								lat={providerInfo.latitude || 0}
								lng={providerInfo.longitude || 0}
								name={providerInfo.name}
								heigth='160px'
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
									<button onClick={() => openPhone(providerInfo.phone)}>
										Call
									</button>
								</div>
							</div>
						</div>

						<div className='busins'>
							{providerInfo.working_hours &&
							Array.isArray(JSON.parse(providerInfo.working_hours)) ? (
								[...JSON.parse(providerInfo.working_hours)].map(
									({ day, openTime, closeTime }) => (
										<div className='business-time' key={day}>
											<div className='days1'>{day}</div>
											<div className='timeing'>
												{hourFormate(openTime)} - {hourFormate(closeTime)}
											</div>
										</div>
									)
								)
							) : (
								<h6 className='error-text d-flex justify-content-center'>
									No working hour provided
								</h6>
							)}
						</div>

						<p className='purify_IOiISPWJndtcc4r9FXmCL purify_Y1prq6mbHtuK9nWzbTqF9 purify_jEiYoKzkRbjQsWvwUztCr'>
							Call {providerInfo.phone} , for appointment.
						</p>

						{false && (
							<Link to='#' className='rp'>
								Report <i className='fas fa-arrow-right'></i>
							</Link>
						)}
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
