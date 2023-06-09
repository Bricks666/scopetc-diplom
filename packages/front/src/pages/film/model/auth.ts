import { sample } from 'effector';
import { not } from 'patronum';
import { routes } from '@/shared/config';
import { authUserModel } from '@/shared/models';
import { currentRoute, loadedWithRouteState } from './page';

sample({
	clock: [currentRoute.opened, loadedWithRouteState],
	filter: not(authUserModel.$isAuth),
	target: routes.login.open,
});
