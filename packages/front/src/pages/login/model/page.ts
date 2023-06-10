import { routes } from '@/shared/config';
import { createPageLoadModel } from '@/shared/lib';
import { sessionModel } from '@/shared/models';

export const { currentRoute, } = createPageLoadModel(routes.login);

export const anonymousRoute = sessionModel.chainAnonymous({
	route: currentRoute,
	otherwise: routes.home.open,
});
