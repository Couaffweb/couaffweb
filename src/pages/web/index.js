import React, { Suspense, memo } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { WebLayout } from 'Layout';
import { AuthRoute, AuthProviderRoute } from 'utils';
import WebContent from './WebInfo';
const Home = React.lazy(() => import(/* webpackChunkName: "home" */ './Home'));
const Profile = React.lazy(() =>
	import(/* webpackChunkName: "profile" */ './Profile')
);
const ProviderDetails = React.lazy(() =>
	import(/* webpackChunkName: "provider" */ './ProviderDetails')
);
const SearchResult = React.lazy(() =>
	import(/* webpackChunkName: "search" */ './SearchResult')
);
const AddService = React.lazy(() =>
	import(/* webpackChunkName: "add-service" */ './Services/AddService')
);
const UpdateService = React.lazy(() =>
	import(/* webpackChunkName: "edit-service" */ './Services/EditService')
);
const Services = React.lazy(() =>
	import(/* webpackChunkName: "service" */ './Services')
);
const Bookings = React.lazy(() =>
	import(/* webpackChunkName: "bookings" */ './Bookings')
);
const Images = React.lazy(() =>
	import(/* webpackChunkName: "bookings" */ './Images')
);
const WebRoutes = () => (
	<WebLayout>
		<ReactNotification />
		<Suspense fallback={<div className='loading' />}>
			<Switch>
				<Route
					path='/provider-details/:id?'
					render={(props) => <ProviderDetails {...props} />}
				/>
				<Route
					path='/search-details'
					render={(props) => <SearchResult {...props} />}
				/>
				<AuthRoute path='/profile' component={Profile} />
				<AuthRoute path='/bookings' component={Bookings} />
				<AuthProviderRoute path='/add-service' component={AddService} />
				<AuthProviderRoute path='/edit-service' component={UpdateService} />
				<AuthProviderRoute path='/services' component={Services} />
				<AuthProviderRoute path='/working-pics' component={Images} />
				<Route path='/about-us' component={WebContent} />
				<Route path='/faq' component={WebContent} />
				<Route path='/contact-us' component={WebContent} />
				<Route path='/term-conditions' component={WebContent} />
				<Route path='/' component={Home} />
			</Switch>
		</Suspense>
	</WebLayout>
);

export default withRouter(memo(WebRoutes));
