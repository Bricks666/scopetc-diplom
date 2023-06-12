import { cache, createQuery } from '@farfetched/core';
import { createDomain } from 'effector';
import { filmsApi } from '@/shared/api';

const filters = createDomain();

const handlerFx = filters.effect(filmsApi.getFilters);

export const query = createQuery({
	initialData: { genres: [], countries: [], },
	effect: handlerFx,
});

cache(query, { staleAfter: '30min', });
