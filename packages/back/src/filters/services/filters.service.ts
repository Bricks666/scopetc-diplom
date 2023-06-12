import { Injectable } from '@nestjs/common';
import { request } from '@/shared/lib';
import { FiltersDto } from '../dto';

@Injectable()
export class FiltersService {
	async getAll(): Promise<FiltersDto> {
		return request('/v2.2/films/filters');
	}

	async getAllGenres() {
		return this.getAll().then((result) => result.genres);
	}

	async getAllCountries() {
		return this.getAll().then((result) => result.countries);
	}
}
