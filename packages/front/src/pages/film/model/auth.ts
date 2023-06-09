import { sample } from 'effector';
import { not } from 'patronum';
import { routes } from '@/shared/config';
import { sessionModel } from '@/shared/models';
import { currentRoute, loadedWithRouteState } from './page';

sample({
	clock: [currentRoute.opened, loadedWithRouteState],
	filter: not(sessionModel.$isAuth),
	target: routes.login.open,
});
