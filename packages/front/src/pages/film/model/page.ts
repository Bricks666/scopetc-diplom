import { routes } from '@/shared/config';
import { createPageLoadModel } from '@/shared/lib';
import { sessionModel } from '@/shared/models';

export const {
	currentRoute,
	loaded,
	loadedWithRouteState,
	mounted,
	unmounted,
} = createPageLoadModel(routes.film);

export const authorizedRoute = sessionModel.chainAuthorized({
	route: currentRoute,
	otherwise: routes.login.open,
});
