import { createRoute, createRouterControls } from 'atomic-router';

export const routes = {
	login: createRoute(),
	home: createRoute(),
	film: createRoute<{ id: number }>(),
};

export const controls = createRouterControls();
