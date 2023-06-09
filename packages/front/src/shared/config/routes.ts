import { createRoute, createRouterControls } from 'atomic-router';

export const routes = {
	login: createRoute(),
	registration: createRoute(),
	home: createRoute(),
	film: createRoute<{ id: number }>(),
};

export const controls = createRouterControls();
