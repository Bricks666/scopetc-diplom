import { createMutation } from '@farfetched/core';
import { createDomain, sample } from 'effector';
import { presetsApi } from '@/shared/api';
import { createFormModel } from '../shared/lib';

const updatePreset = createDomain();

const handlerFx = updatePreset.effect(presetsApi.update);

export const mutation = createMutation({
	effect: handlerFx,
});

export const form = createFormModel(updatePreset);

sample({
	clock: mutation.finished.success,
	target: form.reset,
});
