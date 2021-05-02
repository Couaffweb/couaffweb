import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'component';
import { SearchBox } from 'container';
const Home = () => {
	return (
		<>
			<section className='baner'>
				<Image url='assest/images/banner.png' />
				<div className=' back_fruits'>
					<div className='row'>
						<div className='col-lg-12'>
							<div className='banner_text'>
								<h4> Brainding Expert</h4>
								<p>Search and book skilled brainding professional near you</p>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-lg-9 mx-auto'>
							<div className='banner_text_left1'>
								<SearchBox />
								<div className='booknow'>
									<Link
										to={{
											pathname: '/search-details',
											state: {},
										}}
									>
										Book Now
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='team'>
				<div className='container'>
					<div className='row align-items-center h-100 '>
						<div className='col-md-12 mb-2'>
							<div className='how_it'>
								<h2 className='title2'>Top Rated Professionals </h2>
							</div>
						</div>
						<div className='col-md-6 col-lg-3'>
							<div className='all_team'>
								<Link to='/provider-details/1'>
									<div className='team_Image'>
										<Image url='assest/images/top1.png' />
									</div>
									<div className='team_text'>
										<h2>Hair Brainding Salon</h2>
										<h1>2223 Park Blvd, Los Angenl CA</h1>
										<p>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											233 Reviews
										</p>
									</div>
								</Link>
							</div>
						</div>
						<div className='col-md-6 col-lg-3'>
							<div className='all_team'>
								<Link to='/provider-details/1'>
									<div className='team_Image'>
										<Image url='assest/images/top1.png' />
									</div>
									<div className='team_text'>
										<h2>Hair Brainding Salon</h2>
										<h1>2223 Park Blvd, Los Angenl CA</h1>
										<p>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											233 Reviews
										</p>
									</div>
								</Link>
							</div>
						</div>
						<div className='col-md-6 col-lg-3'>
							<div className='all_team'>
								<Link to='/provider-details/1'>
									<div className='team_Image'>
										<Image url='assest/images/top1.png' />
									</div>
									<div className='team_text'>
										<h2>Hair Brainding Salon</h2>
										<h1>2223 Park Blvd, Los Angenl CA</h1>
										<p>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											233 Reviews
										</p>
									</div>
								</Link>
							</div>
						</div>
						<div className='col-md-6 col-lg-3'>
							<div className='all_team'>
								<Link to='/provider-details/1'>
									<div className='team_Image'>
										<Image url='assest/images/top1.png' />
									</div>
									<div className='team_text'>
										<h2>Hair Brainding Salon</h2>
										<h1>2223 Park Blvd, Los Angenl CA</h1>
										<p>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											<i className='fas fa-star' aria-hidden='true'></i>
											233 Reviews
										</p>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='serch_here'>
				<div className='container'>
					<div className='serch_here1'>
						<div className='row'>
							<div className='col-md-6'>
								<div className='serch_here2'>
									<div className='round1'>
										<Link className='round2 co1'>
											<i className='fa fa-book' aria-hidden='true'></i>
											<p>Lorem Ipsum</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co2'>
											<i className='fa fa-book' aria-hidden='true'></i>
											<p>Lorem Ipsum</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co3'>
											<i className='fa fa-book' aria-hidden='true'></i>
											<p>Lorem Ipsum</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co4'>
											<i className='fa fa-book' aria-hidden='true'></i>
											<p>Lorem Ipsum</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co5'>
											<i className='fa fa-book' aria-hidden='true'></i>
											<p>Lorem Ipsum</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co6'>
											<i className='fa fa-book' aria-hidden='true'></i>
											<p>Lorem Ipsum</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co7'>
											<i className='fa fa-book' aria-hidden='true'></i>
											<p>Lorem Ipsum</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co8'>
											<i className='fa fa-book' aria-hidden='true'></i>
											<p>Lorem Ipsum</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co9'>
											<i className='fa fa-book' aria-hidden='true'></i>
											<p>Lorem Ipsum</p>
										</Link>
									</div>
									<Link href='' className='mor'>
										{' '}
										& More
									</Link>
								</div>
							</div>
							<div className='col-md-6'>
								<div className='serch_here21'>
									<h2>This will be the header</h2>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Duis malesuada tortor quis consectetur convallis. Integer
										quis maximus libero.
									</p>
									<Link href=''>Search Here</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='downlod'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-6'>
							<div className='dwonnlod'>
								<h3>Download</h3>
								<h6>Our App</h6>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
								<div className='plys'>
									<Link href=''>
										<Image url='assest/images/g.png' />{' '}
									</Link>
									<Link href=''>
										<Image url='assest/images/f.png' />{' '}
									</Link>
								</div>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='dwonnlod11'>
								<Image url='assest/images/mob.png' />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
