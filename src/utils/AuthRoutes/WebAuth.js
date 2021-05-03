import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isUserLogin, getUserType } from 'utils';

export const AuthRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isUserLogin() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/',
					}}
				/>
			)
		}
	/>
);

export const AuthProviderRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isUserLogin() && getUserType() === 1 ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/',
					}}
				/>
			)
		}
	/>
);
