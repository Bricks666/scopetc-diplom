import { sample } from 'effector';
import { promoFilmsModel } from '@/widgets/films';
import { currentRoute, loadedWithRouteState } from './page';

sample({
	clock: [loadedWithRouteState, currentRoute.opened],
	target: promoFilmsModel.query.start,
});
