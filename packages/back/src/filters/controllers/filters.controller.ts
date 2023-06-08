import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { FiltersService } from '../services/filters.service';

@ApiTags('Фильтры')
@Controller('filters')
export class FiltersController {
	constructor(private readonly filtersService: FiltersService) {}

	@ApiOperation({
		summary: 'Получение всех жанров и стран',
	})
	@Get('/')
	getAll() {
		return this.filtersService.getAll();
	}

	@ApiOperation({
		summary: 'Получение всех жанров',
	})
	@Get('/genres')
	getGenres() {
		return this.filtersService.getAllGenres();
	}

	@ApiOperation({
		summary: 'Получение всех стран',
	})
	@Get('/countries')
	getOne() {
		return this.filtersService.getAllCountries();
	}
}
