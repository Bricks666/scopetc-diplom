export interface ItemsResponse<I> {
	readonly total: number;
	readonly totalPages: number;
	readonly items: I[];
}
