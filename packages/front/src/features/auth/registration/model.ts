import { createMutation } from '@farfetched/core';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';
import { authApi, LoginParams } from '@/shared/api';

const registration = createDomain();

const handlerFx = registration.effect(authApi.registration);

export const mutation = createMutation({
	effect: handlerFx,
});

export const form = createForm<LoginParams>({
	fields: {
		login: {
			init: '',
		},
		password: {
			init: '',
		},
	},
	domain: registration,
});

sample({
	clock: form.formValidated,
	target: mutation.start,
});

sample({
	clock: mutation.finished.failure,
	target: form.fields.password.resetValue,
});

sample({
	clock: mutation.finished.success,
	target: form.reset,
});
