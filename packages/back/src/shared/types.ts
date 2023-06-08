export type ExtractValueType<O extends Record<string, any>> = O extends Record<
	string,
	infer V
>
	? V
	: never;
