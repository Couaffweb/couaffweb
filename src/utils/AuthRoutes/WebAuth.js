import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isUserLogin } from 'utils';

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
