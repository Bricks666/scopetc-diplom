import { cache, createQuery } from '@farfetched/core';
import { createDomain } from 'effector';
import { filmsApi } from '@/shared/api';

const promoFilms = createDomain();

const handlerFx = promoFilms.effect(filmsApi.getRecommendations);

export const query = createQuery({
	initialData: [],
	effect: handlerFx,
	mapData: ({ result, }) => result.items,
});

cache(query);
