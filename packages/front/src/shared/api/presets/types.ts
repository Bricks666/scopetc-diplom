export interface Preset {
	readonly id: number;
	readonly userId: number | null;
	readonly name: string;
	readonly brightness: number;
	readonly contrast: number;
	readonly saturation: number;
	readonly sharpness: number;
	readonly offEpilepticScene: boolean;
	readonly enableCustomGamma: boolean;
	readonly red: number;
	readonly green: number;
	readonly blue: number;
	readonly isStandard: boolean;
}

export interface CreatePresetParams
	extends Omit<Preset, 'id' | 'userId' | 'isStandard'> {}

export interface UpdatePresetParams extends Partial<Preset> {
	readonly id: number;
}

export interface RemovePresetParams {
	readonly id: number;
}
