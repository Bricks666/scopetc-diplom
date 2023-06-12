import { ApiPropertyOptional } from '@nestjs/swagger';
import { GenreDto } from './genre.dto';
import { CountryDto } from './country.dto';

export class FiltersDto {
	@ApiPropertyOptional()
	declare genres: GenreDto[];

	@ApiPropertyOptional()
	declare countries: CountryDto[];
}
