import { createMutation } from '@farfetched/core';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';
import { authUserModel } from '@/entities/auth-user';
import { authApi, LoginParams } from '@/shared/api';

const login = createDomain();

const handlerFx = login.effect(authApi.login);

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
	domain: login,
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
	fn: ({ result }) => result.user,
	target: authUserModel.$user,
});

sample({
	clock: mutation.finished.success,
	target: form.reset,
});
