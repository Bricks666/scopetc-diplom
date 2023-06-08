import { Domain } from 'effector';
import { createForm } from 'effector-forms';
import { Preset } from '@/shared/api';

export interface PresetFormParams
	extends Omit<Preset, 'id' | 'userId' | 'isStandard'> {}

export const createFormModel = (domain?: Domain) => {
	return createForm<PresetFormParams>({
		fields: {
			name: {
				init: '',
			},
			brightness: {
				init: 100,
			},
			contrast: {
				init: 100,
			},
			saturation: {
				init: 1,
			},
			sharpness: {
				init: 100,
			},
			offEpilepticScene: {
				init: false,
			},
			enableCustomGamma: {
				init: false,
			},
			red: {
				init: 255,
			},
			green: {
				init: 255,
			},
			blue: {
				init: 255,
			},
		},
		domain,
	});
};
