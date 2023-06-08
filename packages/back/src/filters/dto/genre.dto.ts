import { ApiPropertyOptional } from '@nestjs/swagger';

export class GenreDto {
	@ApiPropertyOptional()
	declare id: number;

	@ApiPropertyOptional()
	declare genre: string;
}
