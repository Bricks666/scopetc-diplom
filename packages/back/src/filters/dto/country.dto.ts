import { ApiPropertyOptional } from '@nestjs/swagger';

export class CountryDto {
	@ApiPropertyOptional()
	declare id: number;

	@ApiPropertyOptional()
	declare country: string;
}
