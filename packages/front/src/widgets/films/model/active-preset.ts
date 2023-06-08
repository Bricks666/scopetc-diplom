import { createDomain, sample } from 'effector';
import { snapshot } from 'patronum';
import { userPresetsModel } from '@/entities/presets';
import { Preset } from '@/shared/api';

const activePreset = createDomain();

export const DEFAULT_PRESET: Preset = {
	blue: 255,
	brightness: 100,
	contrast: 100,
	enableCustomGamma: false,
	green: 255,
	id: -1,
	name: '',
	offEpilepticScene: false,
	red: 255,
	saturation: 1,
	sharpness: 10,
	userId: null,
	isStandard: true,
};

export const $id = activePreset.store<number>(1);
export const $activePreset = activePreset.store(DEFAULT_PRESET);

export const copy = activePreset.event();

export const selected = activePreset.event<number | null>();
export const restore = activePreset.event();

export const $snapshot = snapshot({
	source: $activePreset,
	clock: copy,
});

sample({
	clock: selected,
	filter: Boolean,
	target: $id,
});

sample({
	source: {
		presets: userPresetsModel.query.$data,
		id: $id,
	},
	fn: ({ presets, id }) => {
		return (
			presets.find((preset) => preset.id === id) ??
			presets.at(0) ??
			DEFAULT_PRESET
		);
	},
	target: $activePreset,
});

sample({
	clock: restore,
	source: $snapshot,
	target: $activePreset,
});
