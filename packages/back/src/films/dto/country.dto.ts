import { PickType } from '@nestjs/swagger';
import { CountryDto } from '@/filters';

export class FilmCountryDto extends PickType(CountryDto, ['country']) {}
