import { createHistoryRouter, redirect } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { controls, routes } from '@/shared/config';

const router = createHistoryRouter({
	routes: [
		{
			path: '/login',
			route: routes.login,
		},
		{
			path: '/',
			route: routes.home,
		},
		{
			path: '/film/:id',
			route: routes.film,
		}
	],
	controls,
});

redirect({
	clock: router.routeNotFound,
	route: routes.home,
});

router.setHistory(createBrowserHistory());

export const withRouter =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<RouterProvider router={router}>
					<Component />
				</RouterProvider>
			);
		};
