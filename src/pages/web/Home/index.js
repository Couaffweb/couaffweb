import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'component';
import { SearchBox, TopRated } from 'container';
const Home = () => {
	return (
		<>
			<section className='baner'>
				<Image url='/assest/images/banner.png' />
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
			<TopRated />
			<section className='serch_here'>
				<div className='container'>
					<div className='serch_here1'>
						<div className='row'>
							<div className='col-md-6'>
								<div className='serch_here2'>
									<div className='round1'>
										<Link className='round2 co1'>
											<Image
												url='/assest/images/Icon1.png'
												className='cat-image'
												aria-hidden='true'
											/>
											<p>Nails</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co2'>
											<Image
												url='/assest/images/icon2.png'
												className='cat-image'
												aria-hidden='true'
											/>
											<p>Make up</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co3'>
											<Image
												url='/assest/images/icon3.png'
												className='cat-image'
												aria-hidden='true'
											/>
											<p>Massage</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co4'>
											<Image
												url='/assest/images/Icon4.png'
												className='cat-image'
												aria-hidden='true'
											/>
											<p>Beauty Salon</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co5'>
											<Image
												url='/assest/images/icon5.png'
												className='cat-image'
												aria-hidden='true'
											/>
											<p>Haircuts</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co6'>
											<Image
												url='/assest/images/icon6.png'
												className='cat-image'
												aria-hidden='true'
											/>
											<p>Afro Braiding</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co7'>
											<Image
												url='/assest/images/Icon7.png'
												className='cat-image'
												aria-hidden='true'
											/>
											<p>Braids</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co8'>
											<Image
												url='/assest/images/Icon8.png'
												className='cat-image'
												aria-hidden='true'
											/>
											<p>Barbershop</p>
										</Link>
									</div>
									<div className='round1'>
										<Link className='round2 co9'>
											<Image
												url='/assest/images/Icon9.png'
												className='cat-image'
												aria-hidden='true'
											/>
											<p>Eyelashes</p>
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
										<Image url='/assest/images/g.png' />{' '}
									</Link>
									<Link href=''>
										<Image url='/assest/images/f.png' />{' '}
									</Link>
								</div>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='dwonnlod11'>
								<Image url='/assest/images/mob.png' />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
