import { createDomain, sample } from 'effector';
import { $isCreate, setStage } from './controls-stage';
import { $activePreset, copy, restore, DEFAULT_PRESET } from './active-preset';
import { createPresetModel } from '@/features/presets';

const creatingPreset = createDomain();

const startCreating = creatingPreset.event();
const endCreating = creatingPreset.event();

sample({
	clock: $isCreate,
	filter: Boolean,
	target: startCreating,
});

sample({
	clock: startCreating,
	target: copy,
});

sample({
	clock: startCreating,
	fn: () => DEFAULT_PRESET,
	target: $activePreset,
});

sample({
	clock: $isCreate,
	filter: (isCreate) => !isCreate,
	target: endCreating,
});

sample({
	clock: endCreating,
	target: restore,
});

sample({
	clock: endCreating,
	target: createPresetModel.form.reset,
});

sample({
	clock: [createPresetModel.form.$values, startCreating],
	source: createPresetModel.form.$values,
	filter: $isCreate,
	fn: (preset) => ({ ...DEFAULT_PRESET, ...preset }),
	target: $activePreset,
});

sample({
	clock: createPresetModel.mutation.finished.success,
	fn: () => 'overview' as const,
	target: setStage,
});
