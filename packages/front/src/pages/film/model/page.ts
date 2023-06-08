import { routes } from '@/shared/config';
import { createPageLoadModel } from '@/shared/lib';

export const {
	currentRoute,
	loaded,
	loadedWithRouteState,
	mounted,
	unmounted,
} = createPageLoadModel(routes.film);
