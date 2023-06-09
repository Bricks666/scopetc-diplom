import { routes } from '@/shared/config';
import { createPageLoadModel } from '@/shared/lib';
import { authUserModel } from '@/shared/models';

export const { currentRoute } = createPageLoadModel(routes.login);

export const anonymousRoute = authUserModel.chainAnonymous({
	route: currentRoute,
	otherwise: routes.home.open,
});
