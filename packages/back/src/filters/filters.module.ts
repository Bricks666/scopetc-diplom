import { Module } from '@nestjs/common';
import { FiltersService } from './services';
import { FiltersController } from './controllers';

@Module({
	controllers: [FiltersController],
	providers: [FiltersService],
})
export class FiltersModule {}
