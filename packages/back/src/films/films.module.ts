import { Module } from '@nestjs/common';
import { FilmsService } from './services';
import { FilmsController } from './controllers';

@Module({
	controllers: [FilmsController],
	providers: [FilmsService],
})
export class FilmsModule {}
