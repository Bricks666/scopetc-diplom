import { sample } from 'effector';
import { recommendationsFilmsModel } from '@/widgets/films';
import { currentRoute, loadedWithRouteState } from './page';

sample({
	clock: [loadedWithRouteState, currentRoute.opened],
	target: recommendationsFilmsModel.query.start,
});
