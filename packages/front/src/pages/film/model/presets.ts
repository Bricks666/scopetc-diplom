import { update } from '@farfetched/core';
import { sample } from 'effector';
import {
	createPresetModel,
	removePresetModel,
	updatePresetModel,
} from '@/features/presets';
import { userPresetsModel } from '@/entities/presets';
import { currentRoute, loadedWithRouteState } from './page';

sample({
	clock: [currentRoute.opened, loadedWithRouteState],
	target: userPresetsModel.query.start,
});

update(userPresetsModel.query, {
	on: createPresetModel.mutation,
	by: {
		success: ({ mutation, query }) => {
			if (!query) {
				return {
					result: [],
					refetch: true,
				};
			}

			if ('error' in query) {
				return {
					error: query.error,
					refetch: true,
				};
			}

			return {
				result: [...query.result, mutation.result],
			};
		},
	},
});

update(userPresetsModel.query, {
	on: updatePresetModel.mutation,
	by: {
		success: ({ mutation, query }) => {
			if (!query) {
				return {
					result: [],
					refetch: true,
				};
			}

			if ('error' in query) {
				return {
					error: query.error,
					refetch: true,
				};
			}

			return {
				result: query.result.map((preset) =>
					preset.id === mutation.params.id ? mutation.result : preset
				),
			};
		},
	},
});

update(userPresetsModel.query, {
	on: removePresetModel.mutation,
	by: {
		success: ({ mutation, query }) => {
			if (!query) {
				return {
					result: [],
					refetch: true,
				};
			}

			if ('error' in query) {
				return {
					error: query.error,
					refetch: true,
				};
			}
			return {
				result: query.result.filter(
					(preset) => preset.id !== mutation.params.id
				),
			};
		},
	},
});
