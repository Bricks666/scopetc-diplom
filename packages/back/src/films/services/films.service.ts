import { Injectable } from '@nestjs/common';
import { request } from '@/shared/lib';
import { GetOneParams } from './types';

@Injectable()
export class FilmsService {
	async getAll() {
		return request('v2.2/films');
	}

	getRandom() {
		return request('v2.2/films');
	}

	getOne(params: GetOneParams) {
		return request(`v2.2/films/${params.id}`);
	}
}
