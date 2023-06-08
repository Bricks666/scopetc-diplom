import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { updatePresetModel } from '@/features/presets';
import { userPresetsModel } from '@/entities/presets';
import { Preset } from '@/shared/api';
import { controls } from '@/shared/config';
import { $activePreset, DEFAULT_PRESET, restore } from './active-preset';
import { setStage, $isUpdate } from './controls-stage';

const changingPreset = createDomain();

export const $preset = changingPreset.store<Preset | null>(null);
export const $id = $preset.map((preset) => preset?.id ?? null);
export const $hasId = $id.map(Boolean);

const startUpdating = changingPreset.event();
const endUpdating = changingPreset.event();
export const selected = changingPreset.event<number | null>();

querySync({
	source: {
		id: $id,
	},
	controls,
});

sample({
	clock: selected,
	target: $id,
});

sample({
	source: { presets: userPresetsModel.query.$data, id: $id },
	filter: $hasId,
	fn: ({ presets, id }) => {
		return presets.find((preset) => preset.id === id) ?? DEFAULT_PRESET;
	},
	target: updatePresetModel.form.setForm,
});

sample({
	clock: $isUpdate,
	filter: Boolean,
	target: startUpdating,
});

sample({
	clock: $isUpdate,
	filter: (isUpdate) => !isUpdate,
	target: endUpdating,
});

sample({
	clock: [updatePresetModel.form.$values, startUpdating],
	source: updatePresetModel.form.$values,
	filter: $isUpdate,
	fn: (values) => ({ ...values, id: -1, userId: null, isStandard: false }),
	target: $activePreset,
});

sample({
	clock: updatePresetModel.form.formValidated,
	source: $id,
	filter: $hasId,
	fn: (id, values) => ({ ...values, id: Number(id) }),
	target: updatePresetModel.mutation.start,
});

sample({
	clock: updatePresetModel.mutation.finished.success,
	fn: () => 'overview' as const,
	target: setStage,
});

sample({
	clock: endUpdating,
	target: restore,
});

sample({
	clock: endUpdating,
	target: updatePresetModel.form.reset,
});

sample({
	clock: endUpdating,
	fn: () => null,
	target: $id,
});
