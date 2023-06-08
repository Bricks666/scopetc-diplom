import { cache, createQuery } from '@farfetched/core';
import { createDomain } from 'effector';
import { presetsApi } from '@/shared/api';

const userPresets = createDomain();

const handlerFx = userPresets.effect(presetsApi.getAll);

export const query = createQuery({
	initialData: [],
	effect: handlerFx,
});

cache(query);
