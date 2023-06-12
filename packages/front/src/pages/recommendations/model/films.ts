import { querySync } from 'atomic-router';
import { sample } from 'effector';
import { debounce } from 'patronum';
import { recommendationsFilmsModel } from '@/widgets/films';
import { currentRoute } from './page';
import { searchFilmFiltersModel } from '@/features/films';
import { filmFiltersModel } from '@/entities/film';
import { controls } from '@/shared/config';

const { fields, setInitialForm, $values, } = searchFilmFiltersModel.form;

sample({
	clock: currentRoute.opened,
	source: $values,
	fn: (params, { query, }) => ({ page: 1, ...params, ...query, }),
	target: recommendationsFilmsModel.infinityScroll.start,
});

sample({
	clock: currentRoute.opened,
	target: filmFiltersModel.query.start,
});

sample({
	clock: currentRoute.opened,
	fn: ({ query, }) => query,
	target: setInitialForm,
});

sample({
	clock: currentRoute.closed,
	target: recommendationsFilmsModel.infinityScroll.$data.reinit!,
});

const debouncedChange = debounce({
	source: $values.updates,
	timeout: 300,
});

sample({
	clock: debouncedChange,
	fn: (params) => ({ ...params, page: 1, }),
	target: recommendationsFilmsModel.infinityScroll.start,
});

querySync({
	source: {
		yearFrom: fields.yearFrom.$value,
		yearTo: fields.yearTo.$value,
		countries: fields.countries.$value,
		genres: fields.genres.$value,
		order: fields.order.$value,
		ratingFrom: fields.ratingFrom.$value,
		ratingTo: fields.ratingTo.$value,
		type: fields.type.$value,
		keyword: fields.keyword.$value,
	},
	clock: debouncedChange,
	route: currentRoute,
	controls,
});
