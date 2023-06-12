import { PickType } from '@nestjs/swagger';
import { GenreDto } from '@/filters';

export class FilmGenreDto extends PickType(GenreDto, ['genre']) {}
