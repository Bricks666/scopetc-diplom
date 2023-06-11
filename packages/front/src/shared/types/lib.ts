import { AsyncResult } from 'effector';

export interface ParamsAndResult<Params, Result> {
	readonly params: Params;
	readonly result: AsyncResult<Result>;
}
