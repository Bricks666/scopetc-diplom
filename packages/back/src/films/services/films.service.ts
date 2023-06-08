import { Injectable } from '@nestjs/common';
import { request } from '@/shared/lib';
import { SearchDto } from '../dto';
import { GetOneParams } from './types';

@Injectable()
export class FilmsService {
	async getAll(query: SearchDto) {
		const queryParams = new URLSearchParams(query as Record<string, string>);
		console.log(queryParams.toString());
		return request(`v2.2/films?${queryParams.toString()}`, {});
	}

	getRandom() {
		return request('v2.2/films');
	}

	getOne(params: GetOneParams) {
		return request(`v2.2/films/${params.id}`);
	}
}
