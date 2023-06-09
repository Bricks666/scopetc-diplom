import { routes } from '@/shared/config';
import { createPageLoadModel } from '@/shared/lib';
import { authUserModel } from '@/shared/models';

export const {
	currentRoute,
	loaded,
	loadedWithRouteState,
	mounted,
	unmounted,
} = createPageLoadModel(routes.film);

export const authorizedRoute = authUserModel.chainAuthorized({
	route: currentRoute,
	otherwise: routes.login.open,
});
