import { cache, createQuery } from '@farfetched/core';
import { createDomain, sample } from 'effector';
import { filmsApi } from '@/shared/api';
import { authorizedRoute } from './page';

const film = createDomain();

const handlerFx = film.effect(filmsApi.getOne);

export const query = createQuery({
	effect: handlerFx,
});

cache(query);

sample({
	clock: authorizedRoute.opened,
	fn: ({ params }) => params,
	target: query.start,
});
