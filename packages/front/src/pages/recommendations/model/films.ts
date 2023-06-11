import { sample } from 'effector';
import { debounce } from 'patronum';
import { recommendationsFilmsModel } from '@/widgets/films';
import { currentRoute } from './page';
import { searchFilmFiltersModel } from '@/features/films';
import { filmFiltersModel } from '@/entities/film';

sample({
	clock: currentRoute.opened,
	source: searchFilmFiltersModel.form.$values,
	fn: (params) => ({ page: 1, ...params, }),
	target: recommendationsFilmsModel.infinityScroll.start,
});

sample({
	clock: currentRoute.opened,
	target: filmFiltersModel.query.start,
});

sample({
	clock: currentRoute.closed,
	target: recommendationsFilmsModel.infinityScroll.$data.reinit!,
});

const debouncedChange = debounce({
	source: searchFilmFiltersModel.form.$values.updates,
	timeout: 300,
});

sample({
	clock: debouncedChange,
	fn: (params) => ({ ...params, page: 1, }),
	target: recommendationsFilmsModel.infinityScroll.start,
});
