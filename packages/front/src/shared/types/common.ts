export type VoidFunction = () => void;
export type ExtractValueType<O extends Record<string, any>> = O extends Record<
	infer V,
	any
>
	? V
	: never;
