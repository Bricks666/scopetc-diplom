import { createDomain, sample } from 'effector';

const filmExtraControls = createDomain();

export type Stage = 'overview' | 'create' | 'update' | 'delete';

export const $stage = filmExtraControls.store<Stage>('overview');
export const $isOverview = $stage.map((stage) => stage === 'overview');
export const $isCreate = $stage.map((stage) => stage === 'create');
export const $isUpdate = $stage.map((stage) => stage === 'update');
export const $isDelete = $stage.map((stage) => stage === 'delete');

export const setStage = filmExtraControls.event<Stage>();

sample({
	clock: setStage,
	target: $stage,
});
