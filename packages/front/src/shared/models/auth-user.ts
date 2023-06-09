import { createQuery } from '@farfetched/core';
import { RouteInstance, RouteParams, chainRoute } from 'atomic-router';
import {
	Effect,
	Event,
	createDomain,
	createEffect,
	createEvent,
	sample,
} from 'effector';
import { authApi } from '../api';
import { debug } from 'patronum';

const authUser = createDomain();

enum AuthorizationStatus {
	Initial = 1,
	Pending,
	Anonymous,
	Authorized,
}

export const $user = authUser.store<{ id: number } | null>(null);
const $authorizationStatus = authUser.store<AuthorizationStatus>(
	AuthorizationStatus.Initial
);
export const $isAuth = $authorizationStatus.map(
	(status) => status === AuthorizationStatus.Authorized
);
export const auth = createQuery({
	effect: createEffect(authApi.auth),
});

sample({
	clock: auth.start,
	fn: () => AuthorizationStatus.Pending,
	target: $authorizationStatus,
});

sample({
	clock: auth.finished.failure,
	fn: () => AuthorizationStatus.Anonymous,
	target: $authorizationStatus,
});

sample({
	clock: auth.finished.success,
	fn: () => AuthorizationStatus.Authorized,
	target: $authorizationStatus,
});

sample({
	clock: auth.finished.success,
	fn: ({ result }) => result.user,
	target: $user,
});

export interface ChainAuthOptions<Params extends RouteParams> {
	readonly route: RouteInstance<Params>;
	readonly otherwise?: Event<any> | Effect<any, any, any>;
}

export const chainAuthorized = <Params extends RouteParams>(
	options: ChainAuthOptions<Params>
) => {
	const { route, otherwise } = options;

	const checkAuthorization = createEvent<any>();
	const alreadyAuthorized = createEvent();
	const alreadyAnonymous = createEvent();

	const authorizationSuccess = createEvent();
	const authorizationFailure = createEvent();

	sample({
		clock: checkAuthorization,
		filter: $isAuth,
		target: alreadyAuthorized,
	});

	sample({
		clock: checkAuthorization,
		source: $authorizationStatus,
		filter: (status) => status === AuthorizationStatus.Anonymous,
		target: alreadyAnonymous,
	});

	sample({
		clock: checkAuthorization,
		source: $authorizationStatus,
		filter: (status) => status === AuthorizationStatus.Anonymous,
		target: auth.start,
	});

	sample({
		clock: [alreadyAuthorized, auth.finished.success],
		fn: () => undefined,
		target: authorizationSuccess,
	});

	sample({
		clock: [alreadyAnonymous, auth.finished.failure],
		fn: () => undefined,
		target: authorizationFailure,
	});

	if (otherwise) {
		sample({
			clock: authorizationFailure,
			target: otherwise as Event<any>,
		});
	}

	return chainRoute({
		route,
		beforeOpen: checkAuthorization,
		openOn: authorizationSuccess,
		cancelOn: authorizationFailure,
	});
};

export const chainAnonymous = <Params extends RouteParams>(
	options: ChainAuthOptions<Params>
) => {
	const { route, otherwise } = options;

	const checkAuthorization = createEvent<any>();
	const alreadyAuthorized = createEvent();
	const alreadyAnonymous = createEvent();

	const authorizationSuccess = createEvent();
	const authorizationFailure = createEvent();

	sample({
		clock: checkAuthorization,
		filter: $isAuth,
		target: alreadyAuthorized,
	});

	sample({
		clock: checkAuthorization,
		source: $authorizationStatus,
		filter: (status) => status === AuthorizationStatus.Anonymous,
		target: alreadyAnonymous,
	});

	sample({
		clock: checkAuthorization,
		source: $authorizationStatus,
		filter: (status) => status === AuthorizationStatus.Anonymous,
		target: auth.start,
	});

	sample({
		clock: [alreadyAuthorized, auth.finished.success],
		fn: () => undefined,
		target: authorizationSuccess,
	});

	sample({
		clock: [alreadyAnonymous, auth.finished.failure],
		fn: () => undefined,
		target: authorizationFailure,
	});

	if (otherwise) {
		sample({
			clock: authorizationFailure,
			target: otherwise as Event<any>,
		});
	}

	return chainRoute({
		route,
		beforeOpen: checkAuthorization,
		cancelOn: authorizationSuccess,
		openOn: authorizationFailure,
	});
};
