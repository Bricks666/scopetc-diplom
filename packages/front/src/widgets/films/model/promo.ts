import { cache, createQuery } from '@farfetched/core';
import { createDomain } from 'effector';
import { filmsApi } from '@/shared/api';

const promoFilms = createDomain();

const handlerFx = promoFilms.effect(filmsApi.getPromo);

export const query = createQuery({
	initialData: [],
	effect: handlerFx,
});

cache(query);
