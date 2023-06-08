import { Controller, Get } from '@nestjs/common';
import { DisableAuthCheck } from '@/auth';
import { FilmsService } from '../services/films.service';

@Controller('films')
export class FilmsController {
	constructor(private readonly filmsService: FilmsService) {}

	@DisableAuthCheck()
	@Get('/')
	getAll() {
		return this.filmsService.getAll();
	}

	@DisableAuthCheck()
	@Get('/recommendations')
	getRandom() {
		return this.filmsService.getAll();
	}
}
