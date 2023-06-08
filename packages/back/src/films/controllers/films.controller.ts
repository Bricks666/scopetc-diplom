import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DisableAuthCheck } from '@/auth';
import { FilmsService } from '../services/films.service';
import { SearchDto } from '../dto';

@ApiTags('Фильмы')
@Controller('films')
export class FilmsController {
	constructor(private readonly filmsService: FilmsService) {}

	@DisableAuthCheck()
	@Get('/')
	getAll(@Query() search: SearchDto) {
		return this.filmsService.getAll(search);
	}

	@DisableAuthCheck()
	@Get('/recommendations')
	getRandom(@Query() search: SearchDto) {
		return this.filmsService.getAll(search);
	}
}
