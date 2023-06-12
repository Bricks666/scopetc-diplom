import { Injectable } from '@nestjs/common';
import { request } from '@/shared/lib';
import { SearchDto, SearchedFilmDto } from '../dto';

@Injectable()
export class FilmsService {
	async getRecommendations(query: SearchDto) {
		const queryParams = new URLSearchParams(query as Record<string, string>);
		return request<SearchedFilmDto[]>(
			`v2.2/films?${queryParams.toString()}`,
			{}
		);
	}
}
