import {
	createHistoryRouter,
	createRoute,
	createRouterControls
} from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';
import { appModel } from '../models';

export const routes = {
	login: createRoute(),
	registration: createRoute(),
	home: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
	routes: [
		{
			path: '/login',
			route: routes.login,
		},
		{
			path: '/registration',
			route: routes.registration,
		},
		{
			path: '/',
			route: routes.home,
		}
	],
	controls,
});

sample({
	clock: appModel.started,
	fn: () => createBrowserHistory(),
	target: router.setHistory,
});
