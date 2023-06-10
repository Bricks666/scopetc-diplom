import { sample } from 'effector';
import { recommendationsFilmsModel } from '@/widgets/films';
import { currentRoute, loadedWithRouteState } from './page';

sample({
	clock: [loadedWithRouteState, currentRoute.opened],
	fn: () => ({ page: 1, }),
	target: recommendationsFilmsModel.infinityScroll.start,
});

sample({
	clock: currentRoute.closed,
	target: recommendationsFilmsModel.$data.reinit!,
});
