import { sample } from 'effector';
import { not } from 'patronum';
import { authUserModel } from '@/entities/auth-user';
import { routes } from '@/shared/config';
import { currentRoute, loadedWithRouteState } from './page';

sample({
	clock: [currentRoute.opened, loadedWithRouteState],
	filter: not(authUserModel.$isAuth),
	target: routes.login.open,
});
