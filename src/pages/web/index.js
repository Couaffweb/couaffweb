import React, { Suspense, memo } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { WebLayout } from 'Layout';
import { AuthRoute, AuthProviderRoute } from 'utils';
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
const Services = React.lazy(() =>
	import(/* webpackChunkName: "service" */ './Services')
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
				<AuthProviderRoute path='/add-service' component={AddService} />
				<AuthProviderRoute path='/services' component={Services} />
				<Route path='/' component={Home} />
			</Switch>
		</Suspense>
	</WebLayout>
);

export default withRouter(memo(WebRoutes));
