import { createForm } from 'effector-forms';
import { SearchFilmQuery } from '@/shared/api';

interface SearchFilmForm extends Required<Omit<SearchFilmQuery, 'page'>> {}

export const form = createForm<SearchFilmForm>({
	fields: {
		keyword: {
			init: '',
		},
		countries: {
			init: [],
		},
		genres: {
			init: [],
		},
		order: {
			init: 'RATING',
		},
		ratingFrom: {
			init: 0,
		},
		ratingTo: {
			init: 10,
		},
		type: {
			init: 'ALL',
		},
		yearFrom: {
			init: 1990,
		},
		yearTo: {
			init: new Date().getFullYear(),
		},
	},
	validateOn: ['change'],
});
