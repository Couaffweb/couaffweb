import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Image } from 'component';
import { SearchBox, TopRated, CategoryList } from 'container';
const Home = () => {
	const history = useHistory();
	const [addressDetails, setAddressDetails] = useState({});
	const [serviceDetails, setServiceDetails] = useState({});
	const goToSearch = () => {
		history.push('/search-details', {
			...serviceDetails,
			...addressDetails,
		});
	};
	return (
		<>
			<section className='baner'>
				<Image url='/assest/images/banner.png' />
				<div className=' back_fruits'>
					<div className='row'>
						<div className='col-lg-12'>
							<div className='banner_text'>
								<h4> Braiding Expert</h4>
								<p>Search and book skilled braiding professional near you</p>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-lg-9 mx-auto'>
							<div className='banner_text_left1'>
								<SearchBox
									onSelectAddress={(val) => setAddressDetails(val)}
									onSelectServiceInfo={(val) => setServiceDetails(val)}
								/>
								<div className='booknow'>
									<span className='booknow-button' onClick={() => goToSearch()}>
										Book Now
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<TopRated />
			<CategoryList />
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
